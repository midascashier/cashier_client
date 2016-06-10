import {CashierStore} from '../stores/CashierStore'
import assign from 'object-assign'
import {sendMessage} from './stompService'

/**
 * function to get Customer Information
 */
exports.getCountries = () => {
	let rabbitQueue = "customer";
	let f = {f: "countries"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(f, application);
	sendMessage(rabbitQueue, "", rabbitRequest);
};