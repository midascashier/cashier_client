import {CashierStore} from '../stores/CashierStore'
import assign from 'object-assign'
import {sendMessage} from './stompService'

/**
 * function to get Countries
 */
exports.getCountries = () => {
	let rabbitQueue = "customer";
	let data = {};
	data.f = {f: "countries"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data.f, application);
	sendMessage(rabbitQueue, "", rabbitRequest);
};

/**
 * function to get States
 */
exports.getStates = (country) => {
	let rabbitQueue = "customer";
	let data = {};
	data.f = "states";
	if (!country)
	{
		country = CashierStore.getCustomer().personalInformation.country
	}

	data.country=country;
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	sendMessage(rabbitQueue, "", rabbitRequest);
};