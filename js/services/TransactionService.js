import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import { stompConnector } from './StompConnector'
import { UIService } from './UIService'
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
	 * this function sends to process a transaction
	 */
	process(dynamicParams){
		let application = CashierStore.getApplication();
		let customerInfo = CashierStore.getCustomer();
		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();
		let action = "d";
		let isDefer = 0;
		if(CashierStore.getIsWithdraw()){
			action = "w";
			isDefer = 1;
		}
		let rabbitRequest = {
			f: "process",
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
			type: action,
			isDefer: isDefer,
			processorId: processorSelected.processorId,
			amount: transaction.amount,
			payAccountId: payAccountSelected.payAccountId,
			sys_access_pass: application.sys_access_pass,
			sid: application.sid,
			dynamicParams: dynamicParams
		};

		UIService.processTransaction();
		stompConnector.makeProcessRequest("", rabbitRequest);
	};

	/**
	 * get the details for the specific transaction Id
	 */
	getTransactionDetails(){
		let transaction = CashierStore.getLastTransactionResponse();
		let transactionId = transaction.transactionId;
		let data = {
			f: "getBitCoinTransaction", module: 'transaction', transactionId: transactionId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeBackendRequest("", rabbitRequest);
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