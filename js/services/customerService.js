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
	let f = {f: "customerInfo"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(f, application);
	sendMessage(queue, "", rabbitRequest);
};
