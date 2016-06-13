import {CashierStore} from '../stores/CashierStore'
import {makeCustomerRequest} from './stompService'

/**
 * function to get Company Info
 */
exports.getCompanyInfo = () => {
	let data = {f: "getCompanyInfo"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	makeCustomerRequest("", rabbitRequest);
};

/**
 * function to get Countries
 */
exports.getCountries = () => {
	let data = {f: "countries"};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	makeCustomerRequest("", rabbitRequest);
};

/**
 * function to get States
 *
 * @param country
 */
exports.getStates = (country = null) => {
	if (!country) {
		country = CashierStore.getCustomer().personalInformation.country
	}
	let data = {f: "states", country: country};
	let application = CashierStore.getApplication();
	let rabbitRequest = Object.assign(data, application);
	makeCustomerRequest("", rabbitRequest);
};