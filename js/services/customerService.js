import {CashierStore} from '../stores/CashierStore'
import assign from 'object-assign'
import {prepareConnection, sendMessage} from './stompService'

/**
 *Starts connection with RabbitMQ and then do the login
 *
 * @param loginInfo
 */
exports.stompConnection = (loginInfo) => {
	prepareConnection()
		.then(()=> {
			customerLogin(loginInfo);
		});
};

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
	sendMessage(queue, "", rabbitRequest);
};

/**
 * function to get Customer Information
 */
exports.getCustomerInfo = () => {
	let queue = "customer";
	let data = {f: "customerInfo"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	sendMessage(queue, "", rabbitRequest);
};

/**
 * function to get Customer Processors
 */
exports.getCustomerProcessors = () => {
  let queue = "customer";
  let data = {f: "processors"};
  let application = CashierStore.getApplication();
  let rabbitRequest = Object.assign(data, application);
  sendMessage(queue, "", rabbitRequest);
};
