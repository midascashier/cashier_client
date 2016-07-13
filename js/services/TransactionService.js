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
	 * @param timeFrame
	 */
	setTimeFrame(timeFrame){
		CashierActions.setTransactionTimeFrame(timeFrame);
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
	 * @returns {{companyId: number, username: string, password: string, remoteAddr: string, remoteHost: string, referrer: string, xForwardedFor: string, lang: string, platform: string, userAgent: string, createdBy: number, sys_access_pass: string, sid: null, type: string, isDefer: number}}
	 */
	getProxyRequest(){

		let application = CashierStore.getApplication();
		let customerInfo = CashierStore.getCustomer();

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
			sys_access_pass: application.sys_access_pass,
			sid: application.sid,
			type: "d",
			isDefer: 0
		};

		//payouts params
		if(CashierStore.getIsWithdraw()){
			req.type = "w";
			req.isDefer = 1;
			req.feeType = 'FREE';
			req.currencyFee = 0;
			req.feeBP = 0;
		}

		return req;
	}

	/**
	 * this function sends to process a transaction
	 */
	process(dynamicParams, nextStep){

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
	 * this function sends to process a p2p transaction (get name)
	 */
	processGetName(nextStep){

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

		UIService.processTransaction(nextStep);
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * this function sends to process a cc transaction
	 */
	processCC(){

		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();

		let p2pRequest = {
			f: "ccProcess",
			processorId: processorSelected.processorId,
			payAccountId: payAccountSelected.payAccountId,
			amount: transaction.amount,
			journalIdSelected: 0
		};
		let rabbitRequest = assign(this.getProxyRequest(), p2pRequest);

		UIService.processTransaction();
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * get the BitCoin transaction details for the specific transaction Id
	 *
	 * @param transactionId
	 */
	getBitCoinTransaction(transactionId){
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
	getCreditCardTransaction(transactionId){
		let data = {
			f: "getCreditCardTransaction", module: 'transaction', transactionId: transactionId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeBackendRequest("", rabbitRequest);
	};

	/**
	 * get the P2P transaction details for the specific transaction Id
	 *
	 * @param transactionId
	 */
	getP2PTransaction(uniqueId){
		let data = {
			f: "getP2PNameInfo", module: 'transaction', tuid: uniqueId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeTransactionRequest("", rabbitRequest);
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
					this.getBitCoinTransaction(transactionId);
				}
				if(processorClassId == cashier.PROCESSOR_CLASS_ID_CREDIT_CARDS){
					this.getCreditCardTransaction(transactionId);
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
}

export let TransactionService = new transactionService();