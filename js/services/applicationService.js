import {CashierStore} from '../stores/CashierStore'
import {sendMessage} from './stompService'

/**
 * function to get Company Info
 */
exports.getCompanyInfo = () => {
	let rabbitQueue = "customer";
	let data = {f: "getCompanyInfo"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	sendMessage(rabbitQueue, "", rabbitRequest);
};

/**
 * function to get Countries
 */
exports.getCountries = () => {
	let rabbitQueue = "customer";
	let data = {f: "countries"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	sendMessage(rabbitQueue, "", rabbitRequest);
};

/**
 * function to get States
 *
 * @param country
 */
exports.getStates = (country = null) => {
	let rabbitQueue = "customer";

	if (!country)
	{
		country = CashierStore.getCustomer().personalInformation.country
	}
  let data = {f: "states", country: country};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	sendMessage(rabbitQueue, "", rabbitRequest);
};