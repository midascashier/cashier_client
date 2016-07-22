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
	getCountryStates(country = null){
		if(!country){
			country = CashierStore.getUI().selectedCountry;
		} else{
			CashierActions.setSelectedCountry(country);
		}
		let data = { f: "states", country: country };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	};

	/**
	 * Validate form entry data
	 *
	 * @param value
	 * @param type
	 * @returns {*}
	 */
	validateInfo(value, type){
		let regExp = [];
		regExp['isCreditNumber'] = { Visa: /^4[0-9]{12}(?:[0-9]{3})?$/, MC: /^5[1-5][0-9]{14}$/ };
		regExp['isCVV'] = { cvv: /^[0-9]{3}$/i };
		regExp['isNumber'] = { int: /^[0-9]+$/, float: /[0-9]+[,\.][0-9]+/ };
		regExp['isIP'] = { ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ };
		regExp['isBitCoinAddress'] = { bitcoinAddress: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/i };
		regExp['isEmail'] = { email: /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/ };
		regExp['isString'] = { string: /^[a-zA-Z\s]*$/ };
		regExp['isControlNumber'] = { MG: /^[0-9]{8}$/, WU: /^[0-9]{10}$/, RIA: /^[0-9]{11}$/ };

		let isValid;
		for(let regExpOpt in regExp[type]){
			let validationRegExp = new RegExp(regExp[type][regExpOpt]);
			if(validationRegExp.test(value)){
				isValid = true;
			}
			else{
				if(!isValid){
					isValid = false;
				}
			}
		}
		return isValid;
	};

}

export let ApplicationService = new applicationService();
