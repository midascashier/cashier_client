import assign from 'object-assign'
import {UIService} from './UIService'
import cashier from '../constants/Cashier'
import actions from '../constants/Actions'
import {ConnectorServices} from './ConnectorServices'
import {CustomerService} from './CustomerService'
import {CashierStore} from '../stores/CashierStore'
import {CashierActions} from '../actions/CashierActions'

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
		let data = {
			f: "processors"
		};

		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);

		ConnectorServices.makeCashierRequest(actions.PROCESSORS_RESPONSE, rabbitRequest);
	};

	/**
	 * cancel pending payout
	 */
	cancelPendingPayout(journalId){

		let customer = CashierStore.getCustomer();
		let pendingPayouts = customer.pendingPayouts;
		let tuid, sid;

		pendingPayouts.map((payout) =>{
			if(journalId == payout['caJournal_Id']){
				sid = payout.SessionId;
				tuid = payout.TransUniqueId;
			}
		});

		let data = {
			sid: sid,
			tuid: tuid,
			f: "changeStatus",
			isFlowBack: cashier.IS_FLOWBACK,
			beUserId: cashier.ONLINE_BE_USER_ID,
			statusId: cashier.TRANSACTION_STATUS_CANCELLED,
		};

		let rabbitRequest = Object.assign(data, "");

		if(sid && tuid){
			ConnectorServices.makeCashierRequest(actions.CHANGE_STATUS_RESPONSE, rabbitRequest);
		}
	};

	/**
	 * Function to get pay account previous pay accounts
	 */
	getProcessorsMinMax(processorID){
		let company = CashierStore.getCompany();
		let customer = CashierStore.getCustomer();
		let processor = CashierStore.getProcessor();
		if(processorID || processor.processorId){
			let data = {
				module: "limits",
				companyId: company.companyId,
				f: "getProcessorMinMaxLimits",
				currencyCode: customer.currency,
				isWithdraw: CashierStore.getIsWithdraw(),
				level: customer.personalInformation.level,
				processorId: (processorID) ? processorID : processor.processorId
			};

			let application = CashierStore.getApplication();
			let rabbitRequest = Object.assign(data, application);

			ConnectorServices.makeBackendRequest(actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeTransactionRequest(actions.PROCESSORS_LIMIT_RULES_RESPONSE, rabbitRequest);
	};

	/**
	 * get payAccount limits
	 *
	 * @param payAccountId
	 */
	getPayAccountLimits(payAccountId){

		let company = CashierStore.getCompany();
		let customer = CashierStore.getCustomer();
		let payAccount = CashierStore.getCurrentPayAccount();

		if(payAccountId || payAccount.payAccountId){
			let data = {
				f: "getPayAccountLimits",
				payAccountId: (payAccountId) ? payAccountId : payAccount.payAccountId,
				customerId: customer.customerId,
				companyId: company.companyId
			};
			let application = CashierStore.getApplication();
			let rabbitRequest = Object.assign(data, application);
			ConnectorServices.makeTransactionRequest(actions.GET_PAY_ACCOUNT_LIMITS_RESPONSE, rabbitRequest);
		}
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
			ConnectorServices.makeCustomerRequest(actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeTransactionRequest(actions.PROCESSOR_FEES_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeTransactionRequest(actions.SEND_TRANSACTION_TOKEN_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeTransactionRequest(actions.VERIFY_TRANSACTION_TOKEN_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeTransactionRequest(actions.PROCESSOR_FEES_CONFIGURATION_RESPONSE, rabbitRequest);
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
	 * @param address
	 */
	setCryptoAddress(address){
		CashierActions.setCryptoAddress(address);
	}

	/**
	 * @param currencyISO
	 */
	setCryptoCurrencyISO(currencyISO){
		CashierActions.setCryptoCurrencyISO(currencyISO);
	}

	/**
	 * @param currencyName
	 */
	setCryptoCurrencyName(currencyName){
		CashierActions.setCryptoCurrencyName(currencyName);
	}

	/**
	 * @param BTCConversionAmount
	 */
	setTransactionBTCConversionAmount(BTCConversionAmount){
		CashierActions.setTransactionBTCConversionAmount(BTCConversionAmount);
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

		let req = {
			lang: application.lang,
			createdBy: cashier.ONLINE_BE_USER_ID,
			alsid: application.sid,
			sid: application.sid,
			tuid: application.tuid,
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
		ConnectorServices.makeProcessRequest(actions.PROCESS_RESPONSE, rabbitRequest);
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
			dynamicParams: dynamicParams,
			promoCode: transaction.promoCode
		};
		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);
		UIService.processTransaction(nextStep);
		ConnectorServices.makeProcessRequest(actions.PROCESS_CC_RESPONSE, rabbitRequest);
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
			f: 'process',
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
		ConnectorServices.makeProcessRequest(actions.PROCESS_RESPONSE, rabbitRequest);
	};

	/**
	 * make a crypto transaction request
	 *
	 * @param processorId
	 * @param amount
	 */
	getCryptoAddress(processorId, amount) {
		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let customer = CashierStore.getCustomer();

		let rabbitRequest = {
			f: 'process',
			processorId: processorId,
			payAccountId: 0,
			amount: amount,
			dynamicParams: {account: customer.username}
		};
		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);
		ConnectorServices.makeProcessRequest(actions.PROCESS_GET_ADDRESS_RESPONSE, rabbitRequest);
	}

	/**
	 * this function sends to process a transaction
	 */
	processCryptoTransfer(dynamicParams, nextStep){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let isWithdraw = CashierStore.getIsWithdraw();
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
			isWithdraw: isWithdraw,
			dynamicParams: dynamicParams
		};

		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);
		UIService.processTransaction(nextStep);
		ConnectorServices.makeProcessRequest(actions.PROCESS_RESPONSE, rabbitRequest);
	};

	/**
	 * Send to process a Agent2Player transaction
	 * @param nextStep
	 */
	processAgentTransfer(nextStep){
		const transaction = CashierStore.getTransaction();
		const processor = CashierStore.getProcessorId();
		const playerAccount = CashierStore.getPlayerAccount();
		const account = CashierStore.getCurrentPayAccount();

		let request = {
			f: 'processTransfer',
			payAccountId: account.payAccountId,
			authHash: transaction.hash,
			amount: transaction.amount,
			authUniqueId: transaction.randomTuid,
			processorId: processor,
			isWithdraw: true,
			promoCode: transaction.promoCode,
			feeType: transaction.feeType.toUpperCase(),
			currencyFee: transaction.fee,
			feeBP: 0,
			transferLink: playerAccount.transfer.link,
			isCashier: 1
		};

		Object.assign(request, this.getProxyRequest());
		UIService.processTransaction(nextStep);
		ConnectorServices.makeProcessRequest(actions.PROCESS_RESPONSE, request);
		CashierStore.cleanPlayerAccount();
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
		let payAccount = Object.assign({}, payAccountSelected);

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
		ConnectorServices.makeCustomerRequest(actions.PAYACCOUNTS_VALIDATE_SECURE_RESPONSE, validateRabbitRequest);
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
			journalIdSelected: 0,
			amount: transaction.amount,
			promoCode: transaction.promoCode,
			processorId: processorSelected.processorId,
			payAccountId: payAccountSelected.payAccountId
		};

		let rabbitRequest = assign(this.getProxyRequest(), CCRequest);
		UIService.processTransaction('instructions');
		ConnectorServices.makeCashierRequest(actions.PROCESS_CC_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeProcessRequest(actions.PROCESS_P2P_GET_NAME_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeProcessRequest(actions.PROCESS_P2P_SUBMIT_RESPONSE, rabbitRequest);

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
		ConnectorServices.makeBackendRequest(actions.GET_BITCOIN_TRANSACTION_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeBackendRequest(actions.GET_CRYPTO_TRANSFER_TRANSACTION_RESPONSE, rabbitRequest);
	};

	/**
	 * get the Crypto Screen transaction details for the specific transaction Id
	 *
	 * @param transactionId
	 */
	getCryptoTransaction(transactionId){
		let data = {
			f: "getCryptoTransaction", module: 'transaction', transactionId: transactionId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeBackendRequest(actions.GET_CRYPTO_TRANSACTION_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeBackendRequest(actions.GET_CREDITCARD_TRANSACTION_RESPONSE, rabbitRequest);
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
		}else{
			this.getTransactionDetails();
			UIService.processResponse(data);
		}
	};

	/**
	 * process the get crypto Address response
	 *
	 * @param data
	 */
	getCryptoAddressResponse(data) {
		let processorSelected = CashierStore.getProcessor();
		let processorId = processorSelected.processorId;
		if(data.response){
			if(data.response.transaction){
				let transaction = data.response.transaction;
				if(transaction.caTransactionStatus_Id == cashier.TRANSACTION_STATUS_PENDING){
					processorId = parseInt(processorId);
					switch(processorId){
						case cashier.PROCESSOR_ID_BITCOIN:
							this.bitCoinTransaction(transaction.caTransaction_Id);
							break;
						case cashier.PROCESSOR_ID_CRYPTO_TRANSFER:
							this.cryptoTransferTransaction(transaction.caTransaction_Id);
							break;
						case cashier.PROCESSOR_ID_CRYPTOScreen:
							this.getCryptoTransaction(transaction.caTransaction_Id);
							break;
					}
				}
			}
		}
	};

	/**
	 * make a crypto deposit using coindirect balance
	 */
	cryptoDepositWithBalance() {
		if(CashierStore.getBuyCryptoUseBalance()) {
			CashierStore.setBuyCryptoUseBalance(false);
			this.buyCryptoDepositWithBalance();
		} else {
			console.log('no voy a hacer nada');
		}
	};

	/**
	 * execute deposit with coindirect balance
	 */
	buyCryptoDepositWithBalance() {
		let processor = CashierStore.getProcessor();
		let transaction = CashierStore.getLastTransactionResponse();
		let processorId = processor.processorId;
		let transactionId = transaction.transactionId;
		let data = {
			f: "coinDirectPayment",
			tid: transactionId,
			processorSelected: processorId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCashierRequest(actions.CRYPTO_DEPOSIT_WITH_BALANCE, rabbitRequest);
	};

	/**
	 * unpack deposit with balance response and redirect to ticket
	 *
	 * @param data
	 */
	buyCryptoDepositWithBalanceResponse(data) {
		if(data.response) {
			if(data.response.coinDirectData) {
				let coinDirectData = data.response.coinDirectData;
				if(coinDirectData.success == 1 ) {
					console.log('todo fue bien en coindirect');
					UIService.changeUIState('/fund/bitcoin/ticket/approved');
				} else {
					console.log(coinDirectData.message);
					UIService.changeUIState('/fund/bitcoin/ticket/rejected');
				}
			}
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
		ConnectorServices.makeBackendRequest(actions.VALIDATE_PAYACCOUNT, rabbitRequest);
	};

	registerPayAccountBitcoin(payAccountInfo){
		let transactionType = UIService.getIsWithDraw();

		let data = {
			f: "validatePayAccount",
			module: 'payAccount'
		};

		let selectedProcessorId = payAccountInfo.processorId;

		let payAccount = {
			processorIdRoot: selectedProcessorId,
			customerId: CashierStore.getCustomer().customerId,
			transactionType: transactionType
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application, payAccount, payAccountInfo);
		ConnectorServices.makeBackendRequest(actions.REGISTER_PAYACCOUNT_BITCOIN, rabbitRequest);
	}

	buyCryptos(buyCryptosInfo){

		let data = {
			f: "coinDirectBuyCrypto",
			payAccountId: buyCryptosInfo.payAccountId,
			amount: buyCryptosInfo.amount,
			cryptoCurrencyCode: buyCryptosInfo.cryptoCurrencyCode
		};

		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);

		ConnectorServices.makeCashierRequest(actions.BUY_CRYPTOS, rabbitRequest);
	}

	getCryptoRate(cryptoCurrencyCode, currecyCode){
		let data = {
			f: "getCurrentCryptoRate",
			currencyCode: cryptoCurrencyCode,
			customerCurrency: currecyCode
		};

		let application = CashierStore.getApplication();
		let request = Object.assign(data, application);

		ConnectorServices.makeCashierRequest(actions.BUY_CRYPTOS_RATE, request);
	}

	/**
	 * Send info to register payAccount
	 *
	 * @param payAccountInfo
	 * @returns {Promise.<any>}
	 */
	registerPayAccountAsync(payAccountInfo){
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
		let rabbitRequest = Object.assign({}, data, application, payAccount, payAccountInfo);
		return ConnectorServices.makeBackendRequestAsync(rabbitRequest);
	};

	/**
	 * Get a list of available links for players
	 *
	 * @returns {Promise<any>}
	 */
	getTransferLinks(){
		const data = {
			f: 'getTransferLinks',
			module: 'payAccount',
			processorId: this.getCurrentProcessor().processorId,
		}

		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign({}, data, application);
		return ConnectorServices.makeCashierRequestAsync(rabbitRequest)
			.then(resp => resp.response.links);
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
		ConnectorServices.makeCustomerRequest(actions.GET_PENDING_PAYOUT_RESPONSE, rabbitRequest);

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
		ConnectorServices.makeProcessRequest(actions.PAYACCOUNTS_VALIDATE_SECURE_RESPONSE, rabbitRequest);
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

	/**
	 * Sets player account to be accredited by Agent Transfer
	 * @param {string} account
	 */
	setPlayerAccount(account){
		CashierActions.setPlayerAccount(account);
	}

	/**
	 * Returns the logged user information
	 * @returns {*|{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: Array, load: (function(*))}}
	 */
	getCustomer(){
		return CashierStore.getCustomer();
	}

	/**
	 * Save docs on files
	 */
	docsFileSave(request){
		ConnectorServices.makeDocsFileSave(request);
	};
}

export let TransactionService = new transactionService();