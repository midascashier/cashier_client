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
		UIService.startTransaction();
		if(CashierStore.getIsWithdraw()){
			this.getProcessorFeesConfiguration();
			this.getProcessorFees();
		}
	};

	/**
	 * Do some other actions after login response
	 */
	loginResponse(){
		this.getProcessors();
	}

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
	 * Function to get pay account previous pay accounts
	 */
	getProcessorsMinMax(processorID){
		let data = {
			f: "getProcessorMinMaxLimits", processorId: processorID, isWithdraw: CashierStore.getIsWithdraw()
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeTransactionRequest("", rabbitRequest);
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
		let data = {
			f: "getPayAccountsByCustomer", processorId: processorID, isWithdraw: CashierStore.getIsWithdraw()
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
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
		this.getProcessorLimitRules(processorID);
		this.getProcessorsMinMax(processorID);
		this.getPreviousPayAccount(processorID);
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
	 * @param amount
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
	 *
	 * @param controlNumber
	 */
	setControlNumber(controlNumber){
		CashierActions.setTransactionControlNumber(controlNumber);
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
	 * @returns {{companyId: number, username: string, password: string, remoteAddr: string, remoteHost: string, referrer: string, xForwardedFor: string, lang: string, platform: string, userAgent: string, createdBy: number, sid: null, type: string, isDefer: number}}
	 */
	getProxyRequest(){

		let application = CashierStore.getApplication();
		let customerInfo = CashierStore.getCustomer();
		let transaction = CashierStore.getTransaction();

		var req = {
			companyId: customerInfo.companyId,
			username: customerInfo.username,
			password: customerInfo.password,
			remoteAddr: application.remoteAddr,
			remoteHost: application.remoteHost,
			referrer: application.referrer,
			xForwardedFor: application.xForwardedFor,
			lang: application.lang,
			platform: application.platform,
			userAgent: application.userAgent,
			createdBy: 10093, //TODO: temporary
			sid: application.sid,
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
			dynamicParams: dynamicParams
		};
		rabbitRequest = assign(this.getProxyRequest(), rabbitRequest);

		UIService.processTransaction(nextStep);
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * this function sends to process a cc transaction
	 */
	processCC(){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();

		let CCRequest = {
			f: "ccProcess",
			processorId: processorSelected.processorId,
			payAccountId: payAccountSelected.payAccountId,
			amount: transaction.amount,
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
	 */
	processSubmit(){

		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();
		let transaction = CashierStore.getTransaction();
		let transactionResponse = CashierStore.getLastTransactionResponse();

		let p2pRequest = {
			f: "p2pSendMTCN",
			id: transactionResponse.transactionId,
			amount: transaction.amount,
			fee: transaction.fee,
			controlNumber: transaction.controlNumber,
			bonusId: 0,
			processorId: processorSelected.processorId,
			payAccountId: payAccountSelected.payAccountId,
			firstName: payAccountSelected.personal.firstName,
			lastName: payAccountSelected.personal.lastName,
			country: payAccountSelected.address.country,
			state: payAccountSelected.address.state,
			city: payAccountSelected.address.city,
			phone: payAccountSelected.personal.phone
		};

		let rabbitRequest = assign(this.getProxyRequest(), p2pRequest);

		UIService.processTransaction('instructions');
		stompConnector.makeProcessRequest("", rabbitRequest);

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();
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
		this.getTransactionDetails();
		UIService.processResponse(data);
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
	 * Updates the secure information of a credit card.
	 *
	 * @param payAccountInfo
	 */
	updateCreditCardSecure(payAccountInfo){
		let customerId = CashierStore.getCustomer().customerId;
		let payAccountId = CashierStore.getCurrentPayAccount().payAccountId;
		let secureData = payAccountInfo.secure;

		let payAccountRequest = {
			f: "updateCreditCardSecureInfo",
			payAccountId: payAccountId,
			customerId: customerId,
			ccNumber: secureData.account,
			ccCVV: secureData.password,
			ccName: secureData.extra3,
			ccExpMonth: secureData.extra1,
			ccExpYear: secureData.extra2
		};

		let rabbitRequest = assign(this.getProxyRequest(), payAccountRequest);
		stompConnector.makeProcessRequest("", rabbitRequest);
	}
}

export let TransactionService = new transactionService();