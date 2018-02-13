import {UIService} from './UIService'
import actions from '../constants/Actions'
import {CashierStore} from '../stores/CashierStore'
import {ConnectorServices} from './ConnectorServices'
import {CashierActions} from '../actions/CashierActions'

class applicationService {

	/**
	 * Do some other actions after login response
	 */
	loginResponse(){
		this.getCountries();
		this.getCompanyInfo();
	};

	/**
	 * checks if property exists
	 *
	 * @param obj
	 * @returns {boolean}
	 */
	checkNested(obj){
		let args = Array.prototype.slice.call(arguments, 1);

		for(let i = 0; i < args.length; i++){
			if(!obj || !obj.hasOwnProperty(args[i])){
				return false;
			}
			obj = obj[args[i]];
		}

		return true;
	};

	/**
	 * function to get Company Info
	 */
	getCompanyInfo(){
		let data = { f: "getCompanyInfo" };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCustomerRequest(actions.COMPANY_INFO_RESPONSE, rabbitRequest);
	};

	/**
	 * function to get Countries
	 */
	getCountries(){
		let data = { f: "countries" };
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCustomerRequest(actions.COUNTRIES_RESPONSE, rabbitRequest);
	};

	/**
	 * function to get States
	 *
	 * @param country
	 */
	getCountryStates(country = null){
		if(!country){
			country = CashierStore.getUI().selectedCountry;
		}else{
			CashierActions.setSelectedCountry(country);
		}

		let countryStates = CashierStore.getUI().countryStates;
		let states = countryStates[country];
		if(!states || states.length <= 0){
			let data = { f: "states", country: country };
			let application = CashierStore.getApplication();
			let rabbitRequest = Object.assign(data, application);
			ConnectorServices.makeCustomerRequest(actions.STATES_RESPONSE, rabbitRequest);
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
		ConnectorServices.makeCustomerRequest(actions.GET_CURRENCY_RESPONSE, rabbitRequest);
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
	 * Checking if any input data in form is empty and mark this input
	 * 
	 * @param input
	 * @returns {boolean}
     */
	emptyInput(input){
		input.preventDefault();

		for(let i = 0; i < input.target.length; i++){
			if(input.target[i].type != 'submit' && input.target[i].type != 'button' && input.target[i].type != 'checkbox'){
				input.target[i].style['border-color'] = '';
				if(parseInt(input.target[i].getAttribute('data-isRequired')) == 1 && input.target[i].value.length <= 0){
					input.target[i].style['border-color'] = 'red';
					input.target[i].focus();
					return true;
				}

				let validate;
				let dataValidate = input.target[i].getAttribute('data-validation');
				if(dataValidate == 'rgxValidate'){
					let rgx = '';
					let id = input.target[i].getAttribute('id');
					if(id == 'zip'){
						let compare = UIService.getCountrySelected();
						rgx = UIService.getCurrentZipCodeRgx(compare);
					}

					validate = this.validateInfo(input.target[i].value, dataValidate, rgx);
				}else if(dataValidate != null){
					validate = this.validateInfo(input.target[i].value, dataValidate);
				}else{
					validate = true;
				}

				if(!validate){
					input.target[i].style['border-color'] = 'red';
					input.target[i].focus();
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Validate form entry data
	 *
	 * @param value
	 * @param type
	 * @param rgx
     * @returns {*}
     */
	validateInfo(value, type, rgx = null){
		if (!type){
			type = "isString";
		}
		let regExp = [];
		regExp['isCreditNumber'] = { Visa: /^4[0-9]{12}(?:[0-9]{3})?$/, MC: /^5[1-5][0-9]{14}$/, OTHERS: /^[0-9]{15,16}$/ };
		regExp['isVisa'] = { Visa: /^4[0-9]{12}(?:[0-9]{3})?$/ };
		regExp['isMC'] = { MC: /^5[1-5][0-9]{14}$/ };
		regExp['isCVV'] = { cvv: /^[0-9]{3}$/ };
		regExp['isSSN'] = { ssn: /^[0-9]{4}$/ };
		regExp['isCVV4'] = { cvv: /^[0-9]{4}$/ };
		regExp['isNumber'] = { int: /^[0-9]+$/, float: /[0-9]+[,\.][0-9]+/ };
		regExp['isIP'] = { ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ };
		regExp['isBitCoinAddress'] = { bitcoinAddress: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/i };
		regExp['isEmail'] = { email: /^[_a-z0-9-$]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/ };
		regExp['isString'] = { string: /^[a-zA-Z0-9\,\.\s]{1,}$/ };
		regExp['isText'] = { text: /^([^0-9]*)$/};
		regExp['password'] = { string: /^.{5,}$/ };
		regExp['isControlNumber'] = { MG: /^[0-9]{8}$/, WU: /^[0-9]{10}$/, RIA: /^[0-9]{11}$/ };
		regExp['rgxValidate'] = {rgxValidate: rgx};

		let isValid;
		for(let regExpOpt in regExp[type]){

			if(rgx){
				regExp[type][regExpOpt] = rgx.split('/').join('');
			}

			let validationRegExp = new RegExp(regExp[type][regExpOpt]);
			if(validationRegExp.test(value)){
				isValid = true;
			}else{
				if(!isValid){
					isValid = false;
				}
			}
		}
		
		return isValid;
	}

	currency_format(n){
		n = parseFloat(n);
		if (!isNaN(n)){
			return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		}
	}

	/**
	 * check if string is a valid JSON
	 *
	 * @param str
	 * @returns {boolean}
	 * @constructor
     */
	IsJsonString(str){
		try{
			JSON.parse(str);
		} catch(e){
			return false;
		}
		return true;
	}

	/**
	 * Convert string to camelCase format
	 *
	 * @param str
	 * @returns {string|XML}
     */
	toCamelCase(str){
		let build =  str.match(/\s/g);
		str = str.toLowerCase();
		if(build){
			return str
				.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
				.replace(/\s/g, '')
				.replace(/^(.)/, function($1) { return $1.toLowerCase(); });
		}

		return str;
	}

	/**
	 * Convert string to snake_case format
	 * 
	 * @param string
	 * @returns {*}
     */
	toSnakeCase(string){
		let upperChars = string.match(/([A-Z])/g);
		if (! upperChars) {
			return this;
		}

		let str;
		for (var i = 0, n = upperChars.length; i < n; i++) {
			str = string.replace(new RegExp(upperChars[i]), '_' + upperChars[i].toLowerCase());
		}

		if (str.slice(0, 1) === '_') {
			str = str.slice(1);
		}

		return str;
	}
}

export let ApplicationService = new applicationService();
