import assign from 'object-assign'
import { CashierStore } from '../stores/CashierStore'
import { stompConnector } from './StompConnector'
import { HTTPRequest } from './HTTPRequest'
import { ApplicationService } from './ApplicationService'
import { UIService } from './UIService'
import { TransactionService } from './TransactionService'

class customerService {

	/**
	 * Create RabbitMQ connection and login to client
	 */
	customerLogin(){
		this.stompConnection(loginInfo);
	};

	/**
	 * Starts connection with RabbitMQ and then do the login
	 *
	 * @param loginInfo
	 */
	stompConnection(loginInfo){
		stompConnector.initConnection()
			.then(()=>{
				this.login(loginInfo);
			});
	};

	/**
	 * Sends login information to RabbitMQ to be process
	 *
	 * @param loginInfo
	 */
	login(loginInfo){
		let data = { f: "authCustomer", companyId: 9 };
		let application = CashierStore.getApplication();
		let rabbitRequest = assign(data, loginInfo, application);
		//HTTPRequest.post(rabbitRequest);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * Do some other actions after login response
	 */
	loginResponse(){
		this.getCustomerInfo();
		TransactionService.loginResponse();
		UIService.loginResponse();
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
	customerProcessorsResponse(processor) {
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
		let data = { f: "disableCustomerPayAccount", payAccountId: payAccountId.payAccountId, customerId: customerId.customerId };
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

	/**
	 * Function to change current processor
	 */
	changeProcessor(processorID){
		CashierActions.selectProcessor(processorID);
		this.getProcessorLimitRules(processorID);
		this.getCustomerProcessorsMinMax(processorID);
		this.getCustomerPreviousPayAccount(processorID);
	};

}

export let CustomerService = new customerService();
