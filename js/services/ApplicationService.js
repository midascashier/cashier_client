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

		let countryStates = CashierStore.getUI().countryStates;
		let states = countryStates[country];
		if(!states || states.length <= 0){
			let data = { f: "states", country: country };
			let application = CashierStore.getApplication();
			let rabbitRequest = Object.assign(data, application);
			stompConnector.makeCustomerRequest("", rabbitRequest);
		}
	};

	/**
	 *  function to get currency info or all currencies
	 *
	 * @param currencyCode
	 */
	getCurrency(currencyCode = null){
		let data = { f: "getCurrency", currencyCode: currencyCode };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		stompConnector.makeCustomerRequest("", rabbitRequest);
	}

	/**
	 * Clone Obj
	 *
	 * @param obj
	 * @returns {*}
	 */
	clone(obj){
		let copy;

		if(obj == null || typeof obj != "object") return obj;

		if(obj instanceof Object){
			copy = {};
			for(let attr in obj){
				if(obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
			}
			return copy;
		}
	}

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
		regExp['isString'] = { string: /^[a-zA-Z0-9\s]{1,}$/ };
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
	}

	/**
	 * check if string is a valid JSON
	 *
	 * @param str
	 * @returns {boolean}
	 * @constructor
	 */
	IsJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

}

export let ApplicationService = new applicationService();
