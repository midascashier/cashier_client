import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import { stompConnector } from './StompConnector'

class applicationService {

	/**
	 * Do some other actions after login response
	 */
	loginResponse(){
		this.getCompanyInfo();
		this.getCountries();
	};


	/**
	 * function to get Company Info
	 */
	getCompanyInfo(){
		let data = { f: "getCompanyInfo" };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get Countries
	 */
	getCountries(){
		let data = { f: "countries" };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * function to get States
	 *
	 * @param country
	 */
	getStates(country = null){
		if(!country){
			country = CashierStore.getUI().selectedCountry;
		}else{
			CashierActions.setSelectedCountry(country);
		}
		let data = { f: "states", country: country };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};
}

export let ApplicationService = new applicationService();
