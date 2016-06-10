import {StompService} from './stompService'
import {CashierStore} from '../stores/CashierStore'
import assign from 'object-assign'

/**
 *
 * @type {*|StompService}
 */
let stomp = new StompService();

/**
 *sends login information to RabbitMQ to be process
 *
 * @param application
 * @param loginInfo
 */
let customerLogin = (loginInfo) => {
	let queue = "customer";
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(loginInfo, application);
	stomp.sendMessage(queue, "", rabbitRequest);
};

/**
 *Starts connection with RabbitMQ and then do the login
 *
 * @param loginInfo
 */
exports.stompConnection = (loginInfo) => {
	stomp.prepareConnection()
		.then(()=> {
			customerLogin(loginInfo);
		});
};

/**
 * function to get Customer Information
 */
exports.getCustomerInfo = () => {
	let queue = "customer";
	let f = {f: "customerInfo"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(f, application);
	stomp.sendMessage(queue, "", rabbitRequest);
};

/**
 * function to get Customer Processors
 */
exports.getCustomerProcessors = () => {
  let queue = "customer";
  let f = {f: "processors"};
  let application = CashierStore.getApplication();
  let rabbitRequest = Object.assign(f, application);
  stomp.sendMessage(queue, "", rabbitRequest);
};
