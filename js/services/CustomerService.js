import assign from 'object-assign'
import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import { stompConnector } from './StompConnector'
import { ApplicationService } from './ApplicationService'
import { UIService } from './UIService'
import { TransactionService } from './TransactionService'
import actions from '../constants/Actions'

class customerService {

	/**
	 * Create RabbitMQ connection and login to client
	 */
	startConnection(){
		let data = loginInfo;
		this.setLoginInfo(data);
		this.stompConnection(data);
	};

	/**
	 * Starts connection with RabbitMQ and then do the login
	 *
	 */
	stompConnection(data){
		stompConnector.initConnection()
			.then(()=>{
				this.connectionDone(data);
			});

	};

	/**
	 * Sends login information to RabbitMQ to be process
	 *
	 */
	setLoginInfo(data){
		let action = actions.LOGIN_RESPONSE;
		CashierActions.responses(action, data);
	};

	/**
	 * Do some other actions after login response
	 */
	connectionDone(data){
		this.getCustomerInfo();
		TransactionService.loginResponse();
		UIService.loginResponse(data);
		ApplicationService.loginResponse();
	};

	/**
	 * Function to get Customer Information
	 */
	getCustomerInfo(){
		let data = { f: "customerInfo" };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
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
		stompConnector.makeCustomerRequest("", rabbitRequest);
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
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * Function to get pay account previous pay accounts
	 */
	getCustomerPreviousPayAccount(processorID){
		let data = {
			f: "getPayAccountsByCustomer", processorId: processorID, isWithdraw: CashierStore.getIsWithdraw()
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
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
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * Function to get pay account previous pay accounts
	 */
	getCustomerProcessorsMinMax(processorID){
		let data = {
			f: "getProcessorMinMaxLimits", processorId: processorID, isWithdraw: CashierStore.getIsWithdraw()
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
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
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};
}

export let CustomerService = new customerService();
