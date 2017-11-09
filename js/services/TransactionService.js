import assign from 'object-assign'
import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import { stompConnector } from './StompConnector'
import { UIService } from './UIService'
import { CustomerService } from './CustomerService'
import cashier from '../constants/Cashier'

class transactionService {

	/**
	 * here is where we start the transaction process
	 */
	startTransaction(){
		CashierActions.startTransaction();
		let processorID = UIService.getProcessorId();
		this.getPreviousPayAccount(processorID);
		UIService.startTransaction();
		if(CashierStore.getIsWithdraw()){
			this.getProcessorFeesConfiguration();
			this.getProcessorFees();
		}
	};

	/**
	 * Do some other actions after login response
	 */
	loginResponse(data){
		if(data.restart){
			CashierActions.setTransactionResponse(data.Tstatus);
		}
		this.getProcessors();
	};

	/**
	 * Function to get Customer Processors
	 */
	getProcessors(){
		let data = { f: "processors" };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * cancel pending payout
	 */
	cancelPendingPayout(journalId){

		let customer = CashierStore.getCustomer();
		let pendingPayouts = customer.pendingPayouts;
		let tuid, sid;

		pendingPayouts.map((payout) =>{
			if (journalId == payout['caJournal_Id']){
				sid = payout.SessionId;
				tuid = payout.TransUniqueId;
			}
		});

		let data = {
			f: "changeStatus", beUserId: cashier.ONLINE_BE_USER_ID, statusId: cashier.TRANSACTION_STATUS_CANCELLED, isFlowBack: cashier.IS_FLOWBACK, tuid: tuid, sid: sid
		};

		let rabbitRequest = Object.assign(data, "");

		if (sid && tuid){
			stompConnector.makeTransactionRequest("", rabbitRequest);
		}
	};

	/**
	 * Function to get pay account previous pay accounts
	 */
	getProcessorsMinMax(processorID){

		let company = CashierStore.getCompany();
		let processor = CashierStore.getProcessor();
		let customer = CashierStore.getCustomer();

		if (processorID || processor.processorId){
			let data = {
				f: "getProcessorMinMaxLimits",
				module: "limits",
				companyId: company.companyId,
				processorId: (processorID) ? processorID : processor.processorId,
				level: customer.personalInformation.level,
				isWithdraw: CashierStore.getIsWithdraw(),
				currencyCode: customer.currency
			};
			let application = CashierStore.getApplication();
			let rabbitRequest = Object.assign(data, application);
			stompConnector.makeBackendRequest("", rabbitRequest);
		}
	};

	/**
	 * Function to get processor limit rules
	 */
	getProcessorLimitRules(processorID){
		let data = {
			f: "getProcessorLimits", processorId: processorID, isWithdraw: CashierStore.getIsWithdraw()
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeTransactionRequest("", rabbitRequest);
	};

	/**
	 * Function to get pay account previous pay accounts
	 */
	getPreviousPayAccount(processorID){

		let getPayAccounts = false;

		if(processorID == cashier.PROCESSOR_ID_ECOPAYZ && CashierStore.getIsWithdraw()){
			getPayAccounts = true;
		}else{
			if(processorID != cashier.PROCESSOR_ID_BITCOIN && processorID != cashier.PROCESSOR_ID_ASTROPAY && processorID != cashier.PROCESSOR_ID_1TAP){
				getPayAccounts = true;
			}
		}

		if(getPayAccounts){
			let data = {
				f: "getPayAccountsByCustomer", processorId: processorID, isWithdraw: CashierStore.getIsWithdraw()
			};
			let application = CashierStore.getApplication();
			let rabbitRequest = Object.assign(data, application);
			stompConnector.makeCustomerRequest("", rabbitRequest);
		}
	};

	/**
	 * Function to get processor fees
	 */
	getProcessorFees(){
		let processorID = UIService.getProcessorId();
		let customer = CashierStore.getCustomer();
		let companyId = customer.companyId;
		let data = {
			f: "getProcessorFees", processorId: processorID, companyId: companyId, customerId: customer.customerId
		};

		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeTransactionRequest("", rabbitRequest);
	};

	/**
	 * Request transaction Token
	 */
	sendTransactionToken(phone){
		let randomTuid = Math.floor(Math.random() * 1000000000);
		CashierActions.setTransactionRandomTuid(randomTuid);

		let data = {
			f: "sendTransactionToken", phone: phone
		};

		let application = CashierStore.getApplication();

		let rabbitRequest = Object.assign(data, application);
		rabbitRequest.tuid = randomTuid;
		stompConnector.makeTransactionRequest("", rabbitRequest);
	};

	/**
	 * Verify is token is valid
	 */
	verifyTransactionToken(token){

		let transaction = CashierStore.getTransaction();
		let hash = transaction.hash;

		let data = {
			f: "verifyTransactionToken", token: token, hash: hash
		};

		let application = CashierStore.getApplication();

		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeTransactionRequest("", rabbitRequest);
	};

	/**
	 * Change max attempts to star over
	 */
	startSecondFactorProcess(){
		CashierActions.startSecondFactorProcess();
	};

	/**
	 * Function to get processor fees configuration
	 */
	getProcessorFeesConfiguration(){
		let processorID = UIService.getProcessorId();
		let customer = CashierStore.getCustomer();
		let companyId = customer.companyId;

		let data = {
			f: "getProcessorFeesConfig", processorId: processorID, companyId: companyId, customerId: customer.customerId
		};

		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeTransactionRequest("", rabbitRequest);
	};

	/**
	 * Function to change current processor
	 */
	selectProcessor(processorID){
		this.getProcessorsMinMax(processorID);
	};

	/**
	 *
	 * @param amount
	 */
	setAmount(amount){
		CashierActions.setTransactionAmount(amount);
	};

	/**
	 *
	 * @param CVV
     */
	setCVV(CVV){
		CashierActions.setCVV(CVV);
	};

	/**
	 *
	 * @param fee
     */
	setFeeAmount(fee){
		CashierActions.setTransactionFeeAmount(fee);
	};

	/**
	 *
	 * @param checked
	 */
	setTermsAndConditions(checked){
		CashierActions.setTransactionTerms(checked);
	};

	/**
	 *
	 * @param timeFrame
	 */
	setTimeFrame(timeFrame){
		CashierActions.setTransactionTimeFrame(timeFrame);
	}

	/**
	 * @param controlNumber
	 */
	setControlNumber(controlNumber){
		CashierActions.setTransactionControlNumber(controlNumber);
	}

	/**
	 *
	 * @param sendBy
	 */
	setSendBy(sendBy){
		CashierActions.setTransactionSendBy(sendBy);
	}

	/**
	 * @param promoCode
	 */
	setPromoCode(promoCode){
		CashierActions.setTransactionPromoCode(promoCode);
	}

	/**
	 * return PayAccount
	 */
	getCurrentPayAccount(){
		return CashierStore.getCurrentPayAccount();
	}

	/**
	 * return selected processor
	 */
	getCurrentProcessor(){
		return CashierStore.getProcessor();
	}

	/**
	 * Adds all the default parameters for the proxy request
	 *
	 * @returns {{companyId: number, username: string, password: string, lang: string, platform: string, createdBy: number, alsid: null, type: string, isDefer: number}}
	 */
	getProxyRequest(){

		let application = CashierStore.getApplication();
		let transaction = CashierStore.getTransaction();

		var req = {
			lang: application.lang,
			createdBy: 10093, //TODO: temporary
			alsid: application.sid,
			type: "d",
			isDefer: 0
		};

		//payouts params
		if(CashierStore.getIsWithdraw()){
			req.type = "w";
			req.isDefer = 1;
			req.feeType = transaction.feeType.toUpperCase();
			req.currencyFee = transaction.fee;
			req.feeBP = 0;
		}

		return req;
	}

	/**
	 * this function sends to process a transaction
	 */
	process(dynamicParams, nextStep){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();

		let rabbitRequest = {
			f: "process",
			processorId: processorSelected.processorId,
			payAccountId: payAccountSelected.payAccountId,
			amount: transaction.amount,
			promoCode: transaction.promoCode,
			dynamicParams: dynamicParams
		};
		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);

		UIService.processTransaction(nextStep);
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	processAstroPay(dynamicParams, amount, nextStep){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();
		let transaction = CashierStore.getTransaction();

		let rabbitRequest = {
			f: "process",
			processorId: cashier.PROCESSOR_ID_ASTROPAY,
			payAccountId: 0,
			amount: amount,
			promoCode: transaction.promoCode,
			dynamicParams: dynamicParams
		};
		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);
		UIService.processTransaction(nextStep);
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * this function sends to process a transaction
	 */
	processBTC(dynamicParams, nextStep){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();

		let rabbitRequest = {
			f: "process",
			processorId: processorSelected.processorId,
			payAccountId: 0, //Bitcoin doesn't need payaccountID
			amount: transaction.amount,
			promoCode: transaction.promoCode,
			authHash: transaction.hash,
			authUniqueId: transaction.randomTuid,
			dynamicParams: dynamicParams
		};
		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);

		UIService.processTransaction(nextStep);
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * this function sends to process a transaction
	 */
	processCryptoTransfer(dynamicParams, nextStep){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();

		let rabbitRequest = {
			f: "process",
			payAccountId: 0,
			authHash: transaction.hash,
			amount: transaction.amount,
			promoCode: transaction.promoCode,
			authUniqueId: transaction.randomTuid,
			processorId: processorSelected.processorId,
			dynamicParams: dynamicParams
		};

		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);
		console.log('processCryptoTransfer');
		console.log(rabbitRequest);
		UIService.processTransaction(nextStep);
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * update payAccount with transaction info
	 */
	updatePayAccount(payAccountEdit = null){
		let application = CashierStore.getApplication();
		let transaction = CashierStore.getTransaction();
		let payAccountSelected = CashierStore.getCurrentPayAccount();
		let customer = CashierStore.getCustomer();
		let processor = CashierStore.getProcessor();
		let payAccount = {};

		if(!payAccountEdit){
			payAccount = {
				payAccountId: payAccountSelected.payAccountId,
				ccName: payAccountSelected.secure.extra3,
				ccExpMonth: transaction.expirationMonth,
				ccExpYear: transaction.expirationYear,
				ccFirstName: payAccountSelected.personal.firstName,
				ccLastName: payAccountSelected.personal.lastName,
				ccCountry: payAccountSelected.address.country,
				ccState: payAccountSelected.address.state,
				ccCity: payAccountSelected.address.city,
				ccAddress1: payAccountSelected.address.address1,
				ccAddress2: payAccountSelected.address.address2,
				ccPostalCode: payAccountSelected.address.zip,
				ccEmail: payAccountSelected.personal.email,
				ccPhone: payAccountSelected.personal.phone,
				ccSSN: transaction.ssn,
				ccDateOfBirth: transaction.dobYear + "-" + transaction.dobMonth + "-" + transaction.dobDay,
				ccCVV: transaction.password,
				customerId: customer.customerId,
				processorIdRoot: processor.processorClass
			};
		}else{
			payAccount = {
				ccName: payAccountSelected.secure.extra3,
				ccExpMonth: payAccountSelected.secure.extra1,
				ccExpYear: payAccountSelected.secure.extra2,
				ccSSN: payAccountSelected.extra.ssn,
				ccDateOfBirth: payAccountSelected.extra.dobYear + "-" + payAccountSelected.extra.dobMonth + "-" + payAccountSelected.extra.dobDay,
				payAccountId: payAccountEdit.payAccountId,
				ccFirstName: payAccountEdit.firstName,
				ccLastName: payAccountEdit.lastName,
				ccCountry: payAccountEdit.country,
				ccState: payAccountEdit.state,
				ccCity: payAccountEdit.city,
				ccAddress1: payAccountEdit.address1,
				ccPostalCode: payAccountEdit.zip,
				ccEmail: payAccountEdit.email,
				ccPhone: payAccountEdit.phone,
				ccCVV: transaction.password,
				customerId: customer.customerId,
				processorIdRoot: processor.processorClass
			}
		}

		let validateRabbitRequest = {
			f: "updateCreditCardSecureInfo",
			module: 'payAccount',
			sid: application.sid
		};

		validateRabbitRequest = Object.assign(validateRabbitRequest, payAccount);

		stompConnector.makeCustomerRequest("", validateRabbitRequest);
	}

	/**
	 * this function sends to process a cc transaction
	 */
	processCC(){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();

		if(!payAccountSelected.extra.dob || !payAccountSelected.extra.dobDay || !payAccountSelected.extra.dobMonth || !payAccountSelected.extra.dobYear || !payAccountSelected.extra.ssn){
			this.updatePayAccount();
		}

		let CCRequest = {
			f: "ccProcess",
			processorId: processorSelected.processorId,
			payAccountId: payAccountSelected.payAccountId,
			amount: transaction.amount,
			promoCode: transaction.promoCode,
			journalIdSelected: 0
		};

		let rabbitRequest = assign(this.getProxyRequest(), CCRequest);

		UIService.processTransaction('instructions');
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * this function sends to process a p2p transaction (get name)
	 */
	processGetName(){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();

		let p2pRequest = {
			f: "p2pGetName",
			processorId: processorSelected.processorId,
			payAccountId: payAccountSelected.payAccountId,
			amount: transaction.amount,
			firstName: payAccountSelected.personal.firstName,
			lastName: payAccountSelected.personal.lastName,
			country: payAccountSelected.address.country,
			state: payAccountSelected.address.state,
			city: payAccountSelected.address.city,
			phone: payAccountSelected.personal.phone,
			email: payAccountSelected.personal.email,
			timeFrameDay: transaction.timeFrameDay,
			timeFrameTime: transaction.timeFrameTime,
			sendEmail: 0
		};
		let rabbitRequest = assign(this.getProxyRequest(), p2pRequest);

		UIService.processTransaction('instructions');
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * this function sends submit transaction
	 *
	 * @param p2pTransaction [optional]
	 */
	processSubmit(p2pTransaction = null){

		let p2pRequest = {};
		let processorName;
		if(!p2pTransaction){
			let processorSelected = CashierStore.getProcessor();
			let payAccountSelected = CashierStore.getCurrentPayAccount();
			let transaction = CashierStore.getTransaction();
			let transactionResponse = CashierStore.getLastTransactionResponse();

			p2pRequest = {
				f: "p2pSendMTCN",
				id: transactionResponse.transactionId,
				amount: transaction.amount,
				fee: transaction.fee,
				controlNumber: transaction.controlNumber,
				bonusId: 0,
				promoCode: transaction.promoCode,
				processorId: processorSelected.processorId,
				payAccountId: payAccountSelected.payAccountId,
				firstName: payAccountSelected.personal.firstName,
				lastName: payAccountSelected.personal.lastName,
				country: payAccountSelected.address.country,
				state: payAccountSelected.address.state,
				city: payAccountSelected.address.city,
				phone: payAccountSelected.personal.phone,
				email: payAccountSelected.personal.email
			};

		}else{
			let Customer = CashierStore.getCustomer();
			Customer.depositProcessors.map((processor) =>{
				if(processor.caProcessor_Id == p2pTransaction.caProcessor_Id_Root){
					processorName = processor.Name;
				}
			});
			this.setAmount(p2pTransaction.CurrencyAmount);
			this.setFeeAmount(p2pTransaction.CurrencyFee);
			this.setControlNumber(p2pTransaction.ControlNumber);

			p2pRequest = {
				f: "p2pSendMTCN",
				id: p2pTransaction.caTransaction_Id,
				amount: p2pTransaction.CurrencyAmount,
				fee: p2pTransaction.CurrencyFee,
				controlNumber: p2pTransaction.ControlNumber,
				bonusId: 0,
				promoCode: p2pTransaction.promoCode,
				processorId: p2pTransaction.caProcessor_Id_Root,
				payAccountId: p2pTransaction.caPayAccount_Id,
				firstName: p2pTransaction.PAFirstName,
				lastName: p2pTransaction.PALastName,
				country: p2pTransaction.PACountry,
				state: p2pTransaction.PAState,
				city: p2pTransaction.PACity,
				phone: p2pTransaction.PAPhone,
				email: p2pTransaction.PAEmail
			};
		}

		let rabbitRequest = assign(this.getProxyRequest(), p2pRequest);

		UIService.processTransaction('instructions', processorName);
		stompConnector.makeProcessRequest("", rabbitRequest);

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();
	};

	/**
	 * this function sends to process a transaction
	 */
	processGenCK(){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let transaction = CashierStore.getTransaction();
		let dynamicParams = {
			sendBy: transaction.sendBy
		};

		this.process(dynamicParams, 'ticket')
	};

	/**
	 * get the BitCoin transaction details for the specific transaction Id
	 *
	 * @param transactionId
	 */
	bitCoinTransaction(transactionId){
		let data = {
			f: "getBitCoinTransaction", module: 'transaction', transactionId: transactionId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeBackendRequest("", rabbitRequest);
	};

	/**
	 * get the cryptoTransfer transaction details for the specific transaction Id
	 *
	 * @param transactionId
	 */
	cryptoTransferTransaction(transactionId){
		let data = {
			f: "getCryptoTransferTransaction", module: 'transaction', transactionId: transactionId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeBackendRequest("", rabbitRequest);
	};

	/**
	 * get the BitCoin transaction details for the specific transaction Id
	 *
	 * @param transactionId
	 */
	creditCardTransaction(transactionId){
		let data = {
			f: "getCreditCardTransaction", module: 'transaction', transactionId: transactionId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeBackendRequest("", rabbitRequest);
	};

	/**
	 * get the details for the specific transaction Id
	 */
	getTransactionDetails(){
		let isWithdraw = CashierStore.getIsWithdraw();
		let processor = CashierStore.getProcessor();
		let processorId = processor.processorId;
		let processorClassId = processor.processorClass;
		let transactionResponse = CashierStore.getLastTransactionResponse();
		let transactionId = transactionResponse.transactionId;

		if(transactionId){

			// reload customer information to refresh balance
			CustomerService.getCustomerInfo();

			//get specific info
			if(!isWithdraw){
				if(processorId == cashier.PROCESSOR_ID_BITCOIN){
					this.bitCoinTransaction(transactionId);
				}
				if(processorClassId == cashier.PROCESSOR_CLASS_ID_CREDIT_CARDS){
					this.creditCardTransaction(transactionId);
				}
			}
		}

	};

	/**
	 * process the transaction response
	 *
	 * @param data
	 */
	processResponse(data){
		let processor = CashierStore.getProcessor();
		let processorClassId = processor.processorClass;
		if(processorClassId == cashier.PROCESSOR_CLASS_ID_CREDIT_CARDS && data.response.transaction.caTransactionStatus_Id != cashier.TRANSACTION_STATUS_APPROVED && data.response.transaction.caTransaction_Id != ""){
			this.processResponseCC();
		} else{
			this.getTransactionDetails();
			UIService.processResponse(data);
		}
	};

	/**
	 * process the transaction response
	 *
	 */
	processResponseCC(){
		this.getTransactionDetails();
	};

	/**
	 * process the cc transaction response
	 *
	 * @param data
	 */
	creditCardTransactionResponse(data){
		UIService.creditCardTransactionResponse(data);
	};

	/**
	 * Send info to register payAccount
	 */
	registerPayAccount(payAccountInfo){
		let transactionType = UIService.getIsWithDraw();

		let data = {
			f: "validatePayAccount",
			module: 'payAccount'
		};

		let payAccount = {
			processorIdRoot: this.getCurrentProcessor().processorId,
			customerId: CashierStore.getCustomer().customerId,
			transactionType: transactionType
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application, payAccount, payAccountInfo);
		stompConnector.makeBackendRequest("", rabbitRequest);
	};

	/**
	 * gets customers pending transactions
	 */
	getPendingPayout(){
		let data = {
			f: "getPendingPayout"
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);

	}

	/**
	 * Updates the secure information of a credit card.
	 */
	updateCreditCardSecure(){
		let application = CashierStore.getApplication();
		let customer = CashierStore.getCustomer();
		let payAccount = CashierStore.getCurrentPayAccount();

		let customerId = customer.customerId;
		let payAccountId = payAccount.payAccountId;
		let secureData = payAccount.secure;

		let payAccountRequest = {
			f: "updateCreditCardSecureInfo",
			sid: application.sid,
			payAccountId: payAccountId,
			customerId: customerId,
			ccNumber: secureData.account,
			ccCVV: secureData.password,
			ccName: secureData.extra3,
			ccExpMonth: secureData.extra1,
			ccExpYear: secureData.extra2
		};

		let rabbitRequest = assign(payAccountRequest);
		stompConnector.makeProcessRequest("", rabbitRequest);
	}

	/**
	 * Set transaction Fee Type
	 */
	setTransactionFeeType(fee){
		CashierActions.setTransactionFeeType(fee);
	};

	/**
	 * Set transaction Fee
	 */
	setTransactionFee(fee){
		CashierActions.setTransactionFee(fee);
	};

	/**
	 * Set transaction fee
	 */
	setFeeAmount(fee){
		CashierActions.setFeeAmount(fee);
	};

	/**
	 * sets bitcoin address
	 *
	 * @param address
	 */
	setBitcoinAddress(address){
		CashierActions.setBitcoinAddress(address);
	};

	/**
	 * sets crypto transfer transaction
	 *
	 * @param transaction
	 */
	setCryptoTransferTransaction(transaction){
		CashierActions.setCryptoTransferTransaction(transaction);
	};
}

export let TransactionService = new transactionService();