import actions from '../constants/Actions'
import {UIService} from './UIService'
import {ConnectorServices} from './ConnectorServices'
import {CashierStore} from '../stores/CashierStore'
import {TransactionService} from './TransactionService'
import {ApplicationService} from './ApplicationService'
import {CashierActions} from '../actions/CashierActions'

class customerService{

	/**
	 * Create RabbitMQ connection and login to client
	 */
	startConnection(){
		let data = loginInfo;

		if(data){
			this.setLoginInfo(data);
			this.getCustomerInfo();
		}
	};

	/**
	 * Starts connection with RabbitMQ and then do the login
	 *
	 */
	stompConnection(data){
		this.connectionDone(data);
	};

	/**
	 * Sends login information to RabbitMQ to be process
	 *
	 */
	setLoginInfo(data){
		CashierActions.responses(actions.LOGIN_RESPONSE, data);
	};

	/**
	 * Do some other actions after login response
	 *
	 * @param data
     */
	connectionDone(data){
		UIService.loginResponse(data);
		ApplicationService.loginResponse();
		TransactionService.loginResponse(data);
	};

	/**
	 * Function to get Customer Information
	 */
	getCustomerInfo(){
		let data = {
			f: "customerInfo"
		};

		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCustomerRequest(actions.CUSTOMER_INFO_RESPONSE, rabbitRequest);
	};

	/**
	 * Do some actions after processors response
	 */
	customerProcessorsResponse(processor){
		UIService.customerProcessorsResponse(processor);
	};

	/**
	 * Function to get Customer Last transactions
	 */
	getCustomerTransactions(){
		let data = { f: "customerLastTransactions", limit: 10 };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCustomerRequest(actions.CUSTOMER_TRANSACTIONS_RESPONSE, rabbitRequest);
	};

	/**
	 * Function to get pending mtcn transactions
	 */
	getPendingMTCNTransactions(){
		let customer = CashierStore.getCustomer();
		let username = customer.username;
		let companyId = customer.companyId;
		let data = { f: "getAssignedP2PNames", username: username, companyId: companyId, processorId: 0 };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCustomerRequest(actions.CUSTOMER_TRANSACTIONS_PENDING_MTCN_RESPONSE, rabbitRequest);
	};

	/**
	 * Function to disable pay account
	 */
	getDisablePayAccount(){
		let customerId = CashierStore.getCustomer();
		let payAccountId = CashierStore.getCurrentPayAccount();
		let data = {
			f: "disableCustomerPayAccount",
			payAccountId: payAccountId.payAccountId,
			customerId: customerId.customerId
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCustomerRequest(actions.PAYACCOUNTS_DISABLE_RESPONSE, rabbitRequest);
	};

	/**
	 * Function to get pay account previous pay accounts
	 *
	 * @param processorID
     */
	getCustomerProcessorsMinMax(processorID){
		let data = {
			f: "getProcessorMinMaxLimits", processorId: processorID, isWithdraw: CashierStore.getIsWithdraw()
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCustomerRequest(actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeCustomerRequest(actions.PROCESSORS_LIMIT_RULES_RESPONSE, rabbitRequest);
	};
}

export let CustomerService = new customerService();