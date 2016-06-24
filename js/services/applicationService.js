import {CashierStore} from '../stores/cashierStore'
import {stompConnector} from './stompConnector'

class ApplicationService {
	/**
	 * function to get Company Info
	 */
	getCompanyInfo() {
		let data = {f: "getCompanyInfo"};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get Countries
	 */
	getCountries(){
		let data = {f: "countries"};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get States
	 *
	 * @param country
	 */
	getStates(country = null) {
		if (!country) {
			country = CashierStore.getCustomer().personalInformation.country
		}
		let data = {f: "states", country: country};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};
}

export let applicationService = new ApplicationService();