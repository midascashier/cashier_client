import assign from 'object-assign'
import {CashierStore} from '../stores/CashierStore'
import {CashierActions} from '../actions/CashierActions'
import {stompConnector} from './StompConnector'

class CustomerService {
	constructor(){
		this.stompConnection(loginInfo);
	};

	/**
	 *Starts connection with RabbitMQ and then do the login
	 *
	 * @param loginInfo
	 */
	stompConnection(loginInfo){
		stompConnector.initConnection()
			.then(()=>{
				this.customerLogin(loginInfo);
			});
	};

	/**
	 *sends login information to RabbitMQ to be process
	 *
	 * @param loginInfo
	 */
	customerLogin(loginInfo){
		let data = {f: "authCustomer", companyId: 9};
		let application = CashierStore.getApplication();
		let rabbitRequest = assign(data, loginInfo, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get Customer Information
	 */
	getCustomerInfo(){
		let data = {f: "customerInfo"};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get Customer Processors
	 */
	getCustomerProcessors(){
		let data = {f: "processors"};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get Customer Last transactions
	 */
	getCustomerTransactions(){
		let data = {f: "transactions", type: 0, limit: 10};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get pay account previous pay accounts
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
	 * function to disable pay account
	 */
	getDisablePayAccount(){
		let data = {f: "disableCustomerPayAccount", payAccountId: CashierStore.getUI().payAccountId};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get pay account previous pay accounts
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
	 * function to get processor limit rules
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
	 * function to changen current processor
	 */
	changeMethod(processorID){
		CashierActions.changeCurrentProcessor(processorID);
		this.getProcessorLimitRules(processorID);
		this.getCustomerProcessorsMinMax(processorID);
		this.getCustomerPreviousPayAccount(processorID);
	};

}

export let customerService = new CustomerService();
