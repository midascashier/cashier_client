let EventEmitter = require('events').EventEmitter;
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

import ReactGA from 'react-ga'
import assign from 'object-assign'
import actions from '../constants/Actions'
import cashier from '../constants/Cashier'
import processors from '../constants/Processors'
import {translate} from '../constants/Translate'
import {ConnectorServices} from '../services/ConnectorServices'

/**
 * Login info from alDEN
 *
 * @type {{}}
 */
let _loginInfo = {};

/**
 * UI
 *
 * @type {{language: string, currentView: string, currentStep: string, currentProcessorSteps: Array, processorId: number, payAccountId: number, countryInfo: Array, countries: {}, selectedCountry: string, countryStates: Array, currencies: {}}}
 * @private
 */
let _UI = {
	serverTime: '',
	language: '',
	currentView: '',
	currentStep: '',
	currentProcessorSteps: [],
	processorId: 0,
	payAccountId: 0,
	countryInfo: [],
	countries: {},
	selectedCountry: '',
	countryStates: [],
	currencies: [],
	connectionError: 0,
	userMessage: '',
	ccEdit: 0,
	currentSelectedCountry: ''
};

/**
 * application object
 *
 * @type {{sid: null, lang: string, referrer: string, remoteAddr: string, remoteHost: string, xForwardedFor: string, platform: string, redirectSite: string, userAgent: string, isMobile: (())}}
 * @private
 */
let _application = {
	sid: null,
	lang: "en",
	referrer: '',
	remoteAddr: '',
	remoteHost: '',
	xForwardedFor: '',
	platform: '',
	redirectSite: '',
	userAgent: navigator.userAgent
};

/**
 * Customer Data
 *
 * @type {{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, currency: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: Array, load: (function(*))}}
 * @private
 */
let _customer = {
	atDeviceId: '',
	ioBB: '',
	companyId: 0,
	customerId: 0,
	username: '',
	password: '',
	currencySymbol: '',
	currency: '',
	balance: '',
	balanceBP: '',
	lang: '',
	personalInformation: {
		level: '',
		firstName: '',
		middleName: '',
		lastName: '',
		secondLastName: '',
		dateOfBirth: '',
		ssn: '',
		email: '',
		mobile: '',
		phone: '',
		fax: '',
		docsOnFile: '',
		isAgent: '',
		personalId: '',
		addressOne: '',
		addressTwo: '',
		country: '',
		countryName: '',
		countryPhoneCode: '',
		state: '',
		stateName: '',
		city: '',
		postalCode: ''
	},
	depositProcessors: [],
	withdrawProcessors: [],
	pendingP2PTransactions: [],
	lastTransactions: [],
	pendingPayouts: [],
	load(data){
		this.companyId = data.companyId;
		this.customerId = data.customerId;
		this.username = data.username;
		this.password = data.password;
		this.currency = data.currency;
		this.currencySymbol = data.currencySymbol;
		this.balance = Math.round(data.balance * 100) / 100;
		this.balanceBP = data.balanceBP;
		this.lang = data.lang;
		this.personalInformation.level = data.vip;
		this.personalInformation.firstName = data.firstName;
		this.personalInformation.middleName = data.middleName;
		this.personalInformation.lastName = data.lastName;
		this.personalInformation.secondLastName = data.secondLastName;
		this.personalInformation.dateOfBirth = data.dateOfBirth;
		this.personalInformation.ssn = data.ssn;
		this.personalInformation.email = data.email;
		this.personalInformation.mobile = data.mobile;
		this.personalInformation.phone = data.phone;
		this.personalInformation.fax = data.fax;
		this.personalInformation.personalId = data.personalId;
		this.personalInformation.addressOne = data.addressOne;
		this.personalInformation.addressTwo = data.addressTwo;
		this.personalInformation.country = data.country;
		this.personalInformation.countryName = data.countryName;
		this.personalInformation.countryPhoneCode = data.countryPhoneCode;
		this.personalInformation.state = data.state;
		this.personalInformation.stateName = data.stateName;
		this.personalInformation.city = data.city;
		this.personalInformation.postalCode = data.postalCode;
		this.personalInformation.isAgent = data.isAgent;
	}
};

/**
 * company information
 *
 * @type {{companyId: number, companyName: string, phone: string, companyLabel: Array, load: (function(*))}}
 * @private
 */
let _company = {
	companyId: 0,
	companyName: '',
	phone: '',
	companyLabel: {},
	load(data){
		this.companyId = data.companyId;
		this.companyName = data.name;
		this.phone = data.servicePhone;
		//company labels
		if(data.labels){
			data.labels.map((item, i) =>{
				this.companyLabel[item.Code] = item.Value;
			})
		}
	}
};

/**
 *
 * @type {{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, rate: number, limits: Array, waitLimits: boolean, limitRules: Array, limitCurrency: Array, fees: {enableBP: number, enableCash: number, enableFree: number, cashType: string, structure: Array}, load(*): void}}
 * @private
 */
let _processor = {
	processorClass: 0,
	processorId: 0,
	Name: '',
	displayName: '',
	bonus: [],
	rate: 0,
	limits: [],
	waitLimits: false,
	limitRules: [],
	limitCurrency: [],
	fees: {
		enableBP: 0,
		enableCash: 0,
		enableFree: 0,
		cashType: "",
		structure: []
	},
	load(processorId){
		let processor = [];
		if(_UI.currentView == cashier.VIEW_DEPOSIT && _customer.depositProcessors.length > 0){
			_customer.depositProcessors.map((item) =>{
				if(processorId == item.caProcessor_Id){
					processor = item;
				}
			});
		}else if(_customer.withdrawProcessors.length > 0){
			_customer.withdrawProcessors.map((item) =>{
				if(processorId == item.caProcessor_Id){
					processor = item;
				}
			});
		}
		//set values
		this.processorClass = processor.caProcessorClass_Id;
		this.processorId = processor.caProcessor_Id;
		this.displayName = processor.DisplayName;
		this.Name = processor.Name;
	}
};

/**
 * PayAccount Data
 *
 * @type {{payAccountId: null, displayName: null, updateSuccess: number, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}}
 * @private
 */
let _payAccount = {
	payAccountId: null,
	displayName: null,
	updateSuccess: 1,
	personal: {
		firstName: null,
		middleName: null,
		lastName: null,
		lastName2: null,
		phone: null,
		email: null,
		personalId: null,
		personalIdType: null
	},
	address: {
		country: null,
		countryName: null,
		state: null,
		stateName: null,
		city: null,
		address1: null,
		address2: null,
		zip: null
	},
	secure: {account: null, password: null, extra1: null, extra2: null, extra3: null},
	extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null},
	limitsData: {
		available: null,
		type: null,
		remaining: null,
		enabled: null,
		enabledOn: null,
		minAmount: null,
		maxAmount: null,
		availableWithdraw: null,
		remainingWithdraw: null,
		enabledWithdraw: null,
		enabledOnWithdraw: null,
		minAmountWithdraw: null,
		maxAmountWithdraw: null,
		depositLimits: {},
		withdrawLimits: {},
		/**
		 * After all the limits validations are made, this is the flag that says if the pay account passes or not.
		 */
		limitsPassed: false
	},
	cleanPayAccount(){
		this.payAccountId = null;
		this.displayName = null;
		this.limitsData = {};

	},
	load(data){
		this.payAccountId = data.payAccountId;
		this.displayName = data.displayName;
		//limits information
		this.limitsData = data.limitsData;
		//personal information
		this.personal = data.personalData;
		//address information
		this.address = data.addressData;
		//secure information
		this.secure = data.secureData;
		//extra information
		this.extra = data.extraData;
	}
};

/**
 * PayAccount list
 *
 * @type {Array}
 * @private
 */
let _payAccounts = [];

/**
 * Stores information of the transaction
 *
 * @type {{amount: string, fee: number, feeType: string, bonusId: number, secondFactorAuth: number, bitcoinAddress: string, checkTermsAndConditions: number, controlNumber: string, sendBy: string, timeFrameDay: null, timeFrameTime: null, dobMonth: string, dobDay: string, dobYear: string, ssn: string, expirationMonth: string, expirationYear: string, randomTuid: string, hash: string, isCodeValid: number, secondFactorMessage: string, secondFactorMaxAttempts: boolean, promoCode: string, cryptoAddress: string, currencyName: string, currencySymbol: string, BTCConversionAmount: string, cleanTransaction: Function}}
 * @private
 */
let _transaction = {
	amount: '',
	fee: 0,
	feeType: '',
	bonusId: 0,
	secondFactorAuth: 0,
	bitcoinAddress: '',
	checkTermsAndConditions: 1,
	controlNumber: '',
	sendBy: '',
	timeFrameDay: null,
	timeFrameTime: null,
	dobMonth: '',
	dobDay: '',
	dobYear: '',
	ssn: '',
	expirationMonth: '',
	expirationYear: '',
	randomTuid: '',
	hash: '',
	isCodeValid: 0,
	secondFactorMessage: '',
	secondFactorMaxAttempts: false,
	promoCode: '',
	cryptoAddress: '',
	currencyName: '',
	currencySymbol: '',
	BTCConversionAmount: '',
	cleanTransaction(){
		this.amount = '';
		this.fee = 0;
		this.hash = '';
		this.randomTuid = '';
		this.bitcoinAddress = '';
		this.feeType = '';
		this.bonusId = 0;
		this.secondFactorAuth = 0;
		this.checkTermsAndConditions = 1;
		this.timeFrameDay = null;
		this.isCodeValid = 0;
		this.secondFactorMessage = '';
		this.timeFrameTime = null;
		this.controlNumber = '';
		this.promoCode = '';
		this.cryptoAddress = '';
		this.currencyName = '';
		this.currencySymbol = '';
		this.BTCConversionAmount = '';
	}
};

/**
 * Stores transaction result
 *
 * @type {{transactionId: number, journalId: number, amount: string, feeType: string, fee: number, userMessage: string, state: string, status: string, details: Array, data: null, cleanTransaction: Function}}
 * @private
 */
let _transactionResponse = {
	transactionId: 0,
	journalId: 0,
	amount: "",
	feeType: '',
	fee: 0,
	userMessage: "",
	state: "",
	status: "",
	details: [],
	data: null,
	cleanTransaction(){
		this.transactionId = 0;
		this.journalId = 0;
		this.amount = "";
		this.feeType = '';
		this.fee = 0;
		this.userMessage = "";
		this.state = "";
		this.status = "";
		this.details = [];
		this.data = null;
	}
};

let _CryptoTransfer = {
	rate: 0,
	minerFee: 0,
	promoCode: '',
	cryptoAmount: '',
	conversionRate: 0,
	currencies: false,
	customerAmount: '',
	cryptoAddress: null,
	loadingLimits: false,
	currentLimits: false,
	cryptoCurrencyISO: '',
	cryptoCurrencyName: '',
	validCurrentAddress: true
};

/**
 * Contains information related with the user who is going to be accredited by agent
 *
 * @type {{account: string, name: string, feePaymentMethod: string, waitForValidation: boolean, consulted: boolean, transfer: {usernameFrom: string, usernameTo: string, fullnameTo: string, link: string}}}
 * @private
 */
let _Player2Agent = {
	account: '',
	name: '',
	feePaymentMethod : '',
	waitForValidation: false,
	consulted: false,
	transfer: {
		usernameFrom: "",
		usernameTo: "",
		fullnameTo: "",
		link: ""
	}
}

let _DocsFile = {
	step : 0,
	currentStep : 1,
	categoriesList : {},
	checkOption : false,
	responseUpload : false,
	pendingRecovery : false,
	currentOptionSelected : '',
	pendingAdditionalInfo : false,
	currentFormInputsCategories : [],

	forms : {},
	formSelectedId: false,
	kycIDApproved : false,
	customerForms : false,

	readyCategories : false,
	pendingKycIDApproved : true,
	customerPendingForms : false,
	pendingInputsCategory : true,
	pendingCustomerFormInfo : true,
	readyPending(){
		return (this.readyCategories && this.customerPendingForms && !this.pendingCustomerFormInfo && !this.pendingInputsCategory);
	}
};

let CHANGE_EVENT = 'change';

let CashierStore = assign({}, EventEmitter.prototype, {
	emitChange(){
		this.emit(CHANGE_EVENT);
	},

	removeChangeListener(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},

	addChangeListener(callback){
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Return login info
	 *
	 * @returns {{}}
	 */
	getLoginInfo(){
		return _loginInfo;
	},

	/**
	 * return current PayAccount
	 *
	 * @returns {{payAccountId: null, displayName: null, updateSuccess: number, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: function(*)}}
	 */
	getCurrentPayAccount: () =>{
		return _payAccount;
	},

	/**
	 * returns the information of the account to be accredited
	 *
	 * @return {{account: string, name: string, feePaymentMethod: string}}
	 */
	getPlayerAccount: () => {
		return _Player2Agent.transfer.fullnameTo && _Player2Agent.transfer.fullnameTo.length > 0 ? _Player2Agent : null;
	},

	/**
	 * Sets the player2agent information
	 * @param account: _Player2Agent
	 */
	setPlayerAccount: (account) => {
		_Player2Agent = account;
	},

	cleanPlayerAccount: () => {
		Object.assign(_Player2Agent.transfer, {
			fullnameTo: '',
			usernameFrom: '',
			usernameTo: ''
		});
	},

	/**
	 * return current PayAccount limit data
	 *
	 * @returns {{available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}|_payAccount.limitsData|{available, type, remaining, enabled, enabledOn, minAmount, maxAmount, availableWithdraw, remainingWithdraw, enabledWithdraw, enabledOnWithdraw, minAmountWithdraw, maxAmountWithdraw, depositLimits, withdrawLimits, limitsPassed}|{}|*}
	 */
	getCurrentPayAccountLimit: () =>{
		return _payAccount.limitsData;
	},

	/**
	 * Return last transaction cashier response
	 *
	 * @returns {{transactionId: number, journalId: number, amount: string, feeType: string, fee: number, userMessage: string, state: string, details: Array, cleanTransaction: function()}}
	 */
	getLastTransactionResponse: () =>{
		return _transactionResponse;
	},

	/**
	 * Return last data transaction cashier response
	 *
	 * @returns object
	 */
	getLastDataTransactionResponse: () =>{
		return _transactionResponse.data;
	},

	/**
	 * Get selected country
	 */
	getSelectedCountry: () =>{
		return _UI.selectedCountry;
	},

	/**
	 * Return country selected states
	 * @returns {{}|*}
	 */
	getCountryStates: () =>{
		return _UI.countryStates;
	},

	/**
	 * get payAccounts by processor
	 */
	getProcessorPayAccount: () =>{
		return (_payAccounts[_processor['processorId']]);
	},

	getProcessorId: () => {
		return _processor['processorId'];
	},
	/**
	 * get current language
	 *
	 * @returns {string}
	 */
	getLanguage: () =>{
		if(!_UI.language && _customer.lang){
			let culture = _customer.lang.split('-');
			_UI.language = culture[0].toUpperCase();
		}
		return (_UI.language) ? _UI.language : 'EN';
	},

	/**
	 * save data from cashier in local-storage
	 *
	 * @param name
	 * @param obj
	 */
	storeData(name, obj){
		if(typeof Storage !== "undefined"){
			localStorage.setItem(name, JSON.stringify(obj));
		}
	},

	/**
	 * Return current processor steps
	 */
	getCurrentProcessorSteps: () =>{
		return _UI.currentProcessorSteps;
	},

	/**
	 * return current step
	 */
	getCurrentStep: () =>{
		return _UI.currentStep;
	},

	/**
	 * get application object
	 *
	 * @returns {{sid: null, lang: string, referrer: string, remoteAddr: string, remoteHost: string, xForwardedFor: string, platform: string, redirectSite: string, userAgent: string, isMobile}}
	 */
	getApplication: () =>{
		if(!_application.platform){
			let platform = 'desktop';
			let userAgent = _application.userAgent;
			if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4))){
				platform = 'mobile';
			}
			_application.platform = platform;
		}
		if(_application.sid){
			_application.referrer = document.URL || location.href;
		}

		return _application;
	},

	/**
	 * get current view
	 *
	 * @returns {string}
	 */
	getCurrentView: () =>{
		return _UI.currentView;
	},

	/**
	 * get origin url path
	 *
	 * @returns {string}
	 */
	getOriginPath: () =>{
		return window.location.origin;
	},

	/**
	 * get customer
	 *
	 * @returns {{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: Array, load: (function(*))}}
	 */
	getCustomer: () =>{
		return _customer;
	},

	/**
	 * get company
	 *
	 * @returns {{companyId: number, companyName: string, phone: string, companyLabel: Array, load: (function(*))}}
	 */
	getCompany: () =>{
		return _company;
	},

	/**
	 * Return actual BTC rate
	 */
	getBTCRate: () =>{
		let rate = 0;
		if(_UI['currencies']['BTC']){
			rate = _UI['currencies']['BTC'].Rate;
		}
		return rate;
	},

	/**
	 * get current processor
	 *
	 * @returns {{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, rate: number, limits: Array, limitRules: Array, fees: {enableBP: number, enableCash: number, enableFree: number, cashType: string, structure: Array}, load: (function(*))}}
	 */
	getProcessor: () =>{
		return _processor;
	},

	/**
	 * get UI
	 *
	 * @returns {{language: string, currentView: string, currentStep: string, currentProcessorSteps: Array, processorId: number, payAccountId: number, countryInfo: Array, countries: {}, selectedCountry: string, countryStates: Array, currencies: {}}}
	 */
	getUI: () =>{
		return _UI;
	},

	/**
	 *
	 * @returns {number}
	 */
	getConnectionStatus: () =>{
		return _UI.connectionError;
	},

	/**
	 * get transaction
	 *
	 * @returns {{amount: string, fee: number, feeType: string, bonusId: number, secondFactorAuth: number, bitcoinAddress: string, checkTermsAndConditions: number, controlNumber: string, sendBy: string, timeFrameDay: null, timeFrameTime: null, dobMonth: string, dobDay: string, dobYear: string, ssn: string, expirationMonth: string, expirationYear: string, randomTuid: string, hash: string, isCodeValid: number, secondFactorMessage: string, secondFactorMaxAttempts: boolean, promoCode: string, cryptoAddress: string, currencyName: string, currencySymbol: string, BTCConversionAmount: string, cleanTransaction, (): void}}
	 */
	getTransaction: () =>{
		return _transaction;
	},

	/**
	 * get if state is withdraw
	 *
	 * @returns {int}
	 */
	getIsWithdraw: () =>{
		return (_UI.currentView == cashier.VIEW_WITHDRAW) ? 1 : 0;
	},

	/**
	 * return server time
	 *
	 * @returns {string}
	 */
	getServerTime: () =>{
		return _UI.serverTime;
	},

	/**
	 * get limits state
	 *
	 * @returns {boolean}
	 */
	getWaitLimits(){
		return _processor.waitLimits;
	},

	/**
	 * Wait limits during execute ws
	 */
	waitLimits(){
		_processor.waitLimits = true;
	},

	getWaitForValidation() {
		return _Player2Agent.waitForValidation;
	},

	waitForValidation() {
		_Player2Agent.waitForValidation = true;
	},

	/**
	 * Set current country selected in any input in user interface
	 *
	 * @param country
	 */
	setCurrentSelectedCountry(country){
		_UI.currentSelectedCountry = country
	},

	/**
	 * Get current selected country
	 *
	 * @returns {string}
	 */
	getCurrentSelectedCountry(){
		return _UI.currentSelectedCountry;
	},

	/**
	 * Get zip code from current country selected
	 */
	getZipCodeRegex(currentCountry){
		let zipCodeRgx = '';

		_UI.countries.filter(function(country){
			if(country.Small == currentCountry){
				if(country.ZipCodeRegex){
					zipCodeRgx = country.ZipCodeRegex;
				}
			}
		});

		return zipCodeRgx;
	},

	/**
	 * Get countries
	 *
	 * @returns {{}}
	 */
	getCountries(){
		return _UI.countries;
	},

	/**
	 * Get crypto currencies list
	 */
	getCryptoCurrencies(){
		return _CryptoTransfer.currencies
	},

	/**
	 * Activate flag for wait limits
	 */
	loadingLimits(){
		_CryptoTransfer.loadingLimits = true
	},

	/**
	 * Returns if the limits are loading
	 *
	 * @returns {boolean}
	 */
	getLoadingLimits(){
		return _CryptoTransfer.loadingLimits
	},

	/**
	 * Return current crypto currency  rate
	 *
	 * @returns {number}
	 */
	getCurrentCryptoRate(){
		return _CryptoTransfer.rate
	},

	/**
	 * Return current crypto currency  convertion rate
	 *
	 * @returns {number}
	 */
	getCurrentCryptoConvertionRate(){
		return _CryptoTransfer.conversionRate
	},

	/**
	 * Set crypto currency symbol selected
	 *
	 * @param symbol
	 */
	setCurrentCryptoSymbol(symbol){
		_CryptoTransfer.cryptoCurrencyISO = symbol
	},

	/**
	 * Get current crypto currency symbol
	 *
	 * @returns {string}
	 */
	getCurrentCryptoSymbol(){
		return _CryptoTransfer.cryptoCurrencyISO
	},

	/**
	 * Set current crypto currency name
	 *
	 * @param name
	 */
	setCurrentCryptoName(name){
		_CryptoTransfer.cryptoCurrencyName = name
	},

	/**
	 * Get current crypto currency name
	 *
	 * @returns {string}
	 */
	getCurrentCryptoName(){
		return _CryptoTransfer.cryptoCurrencyName
	},

	setCryptoAddress(cryptoAddress){
		_CryptoTransfer.cryptoAddress = cryptoAddress
	},

	getCryptoAddress(){
		return _CryptoTransfer.cryptoAddress
	},

	setCryptoPromoCode(promoCode){
		_CryptoTransfer.promoCode = promoCode
	},

	getCryptoPromoCode(){
		return _CryptoTransfer.promoCode
	},

	setCryptoAmount(cryptoAmount){
		_CryptoTransfer.cryptoAmount = cryptoAmount
	},

	getCryptoAmount(){
		return _CryptoTransfer.cryptoAmount
	},

	setCryptoCustomerAmount(customerAmount){
		_CryptoTransfer.customerAmount = customerAmount
	},

	getCryptoCustomerAmount(){
		return _CryptoTransfer.customerAmount
	},

	/**
	 * Get if current refund address is valid or not
	 *
	 * @returns {boolean}
	 */
	getValidAddress(){
		return _CryptoTransfer.validCurrentAddress
	},

	/**
	 * Get Docs on Files object
	 */
	getDocsFile(){
		return _DocsFile
	},

	/**
	 * New option selected
	 *
	 * @param option
	 */
	setDocsCurrentOption(option){
		_DocsFile.currentOptionSelected = option
	},

	/**
	 * Get response to upload file
	 *
	 * @returns {boolean}
	 */
	getDocsUploadResponse(){
		return _DocsFile.responseUpload
	},

	/**
	 * Reset response wait
	 */
	docsFileReset(){
		_DocsFile.step = 0;
		_DocsFile.currentStep = 1;
		_DocsFile.checkOption = false;
		_DocsFile.responseUpload = false;
		_DocsFile.customerPendingForms = true;
		_DocsFile.pendingInputsCategory = true;
		_DocsFile.pendingCustomerFormInfo = true;

		_DocsFile.forms = {};
		_DocsFile.formSelectedId = false;
		_DocsFile.currentFormInputsCategories = [];
	},

	/**
	 * Wait Ready Pending Info
	 */
	docFilesCustomerPendingFormsWait(){
		_DocsFile.customerPendingForms = false;
	},

	/**
	 * Check if customer info be pending
	 *
	 * @returns {boolean}
	 */
	docsFilePendingInputsCategory(){
		return _DocsFile.pendingInputsCategory
	},

	/**
	 * Wait Ready Inputs Category
	 */
	docsFileInputsCategoryWait(){
		_DocsFile.pendingInputsCategory = false;
	},

	/**
	 * Check if customer info be pending
	 *
	 * @returns {boolean}
	 */
	docsFilePendingCustomerFormInfo(){
		return _DocsFile.pendingCustomerFormInfo
	},

	/**
	 * Wait Ready Customer Form Info
	 */
	docFilesCustomerPendingFormInfoWait(){
		_DocsFile.pendingCustomerFormInfo = false;
	},

	/**
	 * Get formSelectedId
	 *
	 * @returns {boolean}
	 */
	docFilesGetFormSelectedId(){
		return _DocsFile.formSelectedId
	},

	/**
	 * Set formSelectedId
	 *
	 * @returns {boolean}
	 */
	docFilesSetFormSelectedId(id){
		_DocsFile.formSelectedId = id
	}
});

/**
 * register action
 */
CashierStore.dispatchToken = CashierDispatcher.register((payload) =>{
	let action = payload.action;
	let data = payload.data;

	if(!ConnectorServices.stop){
		try{
			switch(action){
				case actions.LOGIN_RESPONSE:
                    _application.sid = data.sid;
                    _application.vip = data.vip;
                    _UI.currentView = data.option;
                    _application.newbie = data.newbie;
                    _application.country = data.country;
                    _company.companyId = data.companyId;
                    _company.remoteCompany = data.remoteCompany;

                    if(typeof Storage !== "undefined"){
                        if(localStorage){
                        	let company = JSON.parse(localStorage.company);
                            let application = JSON.parse(localStorage.application);

                            _application.vip = application.vip;
                            _application.sid = application.sid;
                            _application.newbie = application.newbie;
                            _application.country = application.country;
                            _application.referrer = application.referrer;
                            _application.remoteAddr = application.remoteAddr;
                            _application.remoteHost = application.remoteHost;
                            _application.redirectSite = application.redirectSite;
                            _application.xForwardedFor = application.xForwardedFor;

                            _company.companyId = company.companyId;
                            _company.remoteCompany = company.remoteCompany;
                        }
                    }

                    ReactGA.set({'dimension1': _company.remoteCompany});
                    ReactGA.set({'dimension2': parseInt(_application.newbie) ? 'Newbie' : 'Returning'});
                    ReactGA.set({'dimension3': _application.vip});
                    ReactGA.set({'dimension4': _application.country});

                    if(_company.remoteCompany == 'AmericasCardroom'){
                        if(parseInt(_application.newbie) == 1){
                            $('head').append("<!-- Hotjar Tracking Code for Cashier ACR --><script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:998973,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>");
                        }else{
                            $('head').append("<!-- Hotjar Tracking Code for Cashier ACR --><script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:592695,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>");
                        }
                    }

					CashierStore.storeData("application", _application);
					CashierStore.storeData("ui", _UI);
					CashierStore.storeData("company", _company);
					CashierStore.emitChange();
					break;

				case actions.USER_MESSAGE:
					_UI.userMessage = data.message;
					CashierStore.emitChange();
					break;

				case actions.CUSTOMER_INFO_RESPONSE:
					_customer.load(data.response.customerInfo);
					CashierStore.emitChange();
					break;

				case actions.COMPANY_INFO_RESPONSE:
					_company.load(data.response.companyInformation);
					CashierStore.storeData("company", _company);
					CashierStore.emitChange();
					break;

				case actions.GET_PENDING_PAYOUT_RESPONSE:
					_customer.pendingPayouts = data.response.pendingPayout;
					CashierStore.emitChange();
					break;

				case actions.CUSTOMER_TRANSACTIONS_RESPONSE:
					_customer.lastTransactions = data.response.transactions;
					break;

				case actions.SET_EDITCC:
					_UI.ccEdit = data.editMode;
					CashierStore.emitChange();
					break;

				case actions.SWITCH_ACTION:
					if(_UI.currentView == cashier.VIEW_DEPOSIT){
						_UI.currentView = cashier.VIEW_WITHDRAW;
					}else{
						_UI.currentView = cashier.VIEW_DEPOSIT;
					}
					CashierStore.storeData("ui", _UI);
					break;

				case actions.CUSTOMER_TRANSACTIONS_PENDING_MTCN_RESPONSE:
					let p2pTransactions = [];
					if(data.response && data.response.P2PNames){
						let p2pNames = data.response.P2PNames;
						p2pNames.forEach((transaction) =>{
							p2pTransactions[transaction.caTransaction_Id] = transaction;
						});
					}else{
						p2pTransactions = cashier.NO_RESPONSE;
					}
					_customer.pendingP2PTransactions = p2pTransactions;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_STATUS_RESPONSE:
					CashierStore.emitChange();
					break;

				case actions.COUNTRIES_RESPONSE:
					_UI.countries = data.response.countries;
					CashierStore.setCurrentSelectedCountry(_UI.selectedCountry);
					break;

				case actions.CHANGE_APPLICATION_SELECTED_COUNTRY:
					if(!data.country){
						_UI.selectedCountry = _customer.personalInformation.country;
					}else{
						_UI.selectedCountry = data.country;
					}
					break;

				case actions.STATES_RESPONSE:
					let countryInfo = data.response.countryInfo;
					let states = data.response.states;
					if(states){
						_UI.countryStates[countryInfo.Small] = states;
					}else{
						_UI.countryStates[countryInfo.Small] = {};
					}
					_UI.countryInfo[countryInfo.Small] = countryInfo;
					CashierStore.emitChange();
					break;

				case actions.CONNECTION_ERRROR:
					_UI.connectionError = data.opt;
					break;

				case actions.GET_CURRENCY_RESPONSE:
					let currencyInfo = data.response.currencyInfo;
					if(currencyInfo && currencyInfo.Rate){
						_UI.currencies[currencyInfo.Iso] = currencyInfo;
					}
					CashierStore.emitChange();
					break;

				case actions.RESTART_TRANSACTION_RESPONSE:
					_transactionResponse.status = data.tStatus;
					_transactionResponse.userMessage = "Restart";
					break;

				case actions.PROCESSORS_RESPONSE:
					_customer.depositProcessors = data.response.processors.deposit;
					_customer.withdrawProcessors = data.response.processors.withdraw;

					let processor = [];

					let selectedProcessor = CashierStore.getUI();

					if(!CashierStore.getIsWithdraw() && _customer.depositProcessors.length > 0 && !selectedProcessor.processorId){
						processor = _customer.depositProcessors[0];
					}else if(_customer.withdrawProcessors.length > 0 && !selectedProcessor.processorId){
						processor = _customer.withdrawProcessors[0];
					}else if(selectedProcessor.processorId){
						_customer.depositProcessors.map((item) =>{
							if(item.caProcessor_Id == selectedProcessor.processorId){
								processor = item;
							}
						});
					}

					// set default processor
					_UI.processorId = processor.caProcessor_Id;
					_processor.load(processor.caProcessor_Id);
					break;

				case actions.CHANGE_TRANSACTION_FEE_AMOUNT:
					_transaction.fee = data.amount;
					break;

				case actions.CHANGE_TRANSACTION_FEETYPE:
					_transaction.feeType = data.feeType;
					break;

				case actions.PROCESSOR_FEES_CONFIGURATION_RESPONSE:
					_processor.fees.enableBP = data.response.processorFeesConfig.enableBPOption;
					if(_processor.fees.enableBP == 1){
						_transaction.feeType = "Betpoints";
					}
					_processor.fees.enableCash = data.response.processorFeesConfig.enableCashOption;
					if(_processor.fees.enableCash == 1 && _transaction.feeType == ""){
						_transaction.feeType = "Cash";
					}
					_processor.fees.enableFree = data.response.processorFeesConfig.enableFreeOption;
					if(_processor.fees.enableFree == 1 && _transaction.feeType == ""){
						_transaction.feeType = "Free";
					}
					_processor.fees.cashType = data.response.processorFeesConfig.cashOptionType;
					CashierStore.emitChange();
					break;

				case actions.SET_BITCOIN_ADDRESS:
					_transaction.bitcoinAddress = data.bitcoinaddress;
					break;

				case actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE:
					let firstPayAccount = 0;
					let payAccounts_processor = {};
					let payAccountTemp = Object.assign({}, _payAccount);
					if(data.response && data.response.payAccounts){
						if(data.response.payAccounts[0].processorIdRoot == _processor.processorId){
							data.response.payAccounts.forEach((payAccount) =>{
								payAccount.limitsData.available = Math.floor(payAccount.limitsData.available);
								payAccount.limitsData.availableWithdraw = Math.floor(payAccount.limitsData.availableWithdraw);
								payAccount.limitsData.maxAmount = Math.floor(payAccount.limitsData.maxAmount);
								payAccount.limitsData.maxAmountWithdraw = Math.floor(payAccount.limitsData.maxAmountWithdraw);
								payAccount.limitsData.minAmount = Math.ceil(payAccount.limitsData.minAmount);
								payAccount.limitsData.minAmountWithdraw = Math.ceil(payAccount.limitsData.minAmountWithdraw);
								payAccount.limitsData.remaining = Math.ceil(payAccount.limitsData.remaining);
								payAccount.limitsData.remainingWithdraw = Math.ceil(payAccount.limitsData.remainingWithdraw);
							});
							let payAccounts = data.response.payAccounts;
							if(payAccounts){
								payAccounts.map((item, key) =>{
									let payAccount = Object.assign({key: key}, payAccountTemp);
									payAccount.load(item);
									payAccounts_processor[payAccount.payAccountId] = payAccount;
									if(!firstPayAccount){
										firstPayAccount = payAccount.payAccountId;
									}
								});
								_payAccount = payAccounts_processor[firstPayAccount];
							}
						}
					}

					if(_payAccount.payAccountId === null){
						if(payAccounts_processor[firstPayAccount]){
							_payAccount = payAccounts_processor[firstPayAccount];
						}else{
							_payAccount.displayName = cashier.NO_RESPONSE;
						}
					}else{
						if(processors.settings[_processor.processorId][processors.REGISTER_ACCOUNTS_ALLOW]){
							let addPayAccountOption = Object.assign({}, _payAccount);
							addPayAccountOption.payAccountId = 0;
							if(_processor.processorClass == 1){
								addPayAccountOption.displayName = translate('REGISTER_NEW_ACCOUNT_CC', 'register');
							}else{
								addPayAccountOption.displayName = translate('REGISTER_NEW_ACCOUNT', 'register');
							}
							payAccounts_processor[addPayAccountOption.payAccountId] = addPayAccountOption;
						}
					}
					_payAccounts[_processor.processorId] = payAccounts_processor;
					CashierStore.emitChange();
					break;

				case actions.GET_PAY_ACCOUNT_LIMITS_RESPONSE:
					if(data.response && data.response.payAccount){
						let payAccountData = data.response.payAccount;
						if(payAccount && _payAccount.payAccountId){
							_payAccount.limitsData = payAccountData.limitsData;
							_payAccount.limitsData.available = Math.floor(payAccountData.limitsData.available);
							_payAccount.limitsData.availableWithdraw = Math.floor(payAccountData.limitsData.availableWithdraw);
							_payAccount.limitsData.maxAmount = Math.floor(payAccountData.limitsData.maxAmount);
							_payAccount.limitsData.maxAmountWithdraw = Math.floor(payAccountData.limitsData.maxAmountWithdraw);
							_payAccount.limitsData.minAmount = Math.ceil(payAccountData.limitsData.minAmount);
							_payAccount.limitsData.minAmountWithdraw = Math.ceil(payAccountData.limitsData.minAmountWithdraw);
						}
					}
					CashierStore.emitChange();
					break;

				case actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE:
					if(data.response){
						data.response.MinMaxLimits.currencyMax = Math.ceil(data.response.MinMaxLimits.currencyMax);
						data.response.MinMaxLimits.currencyMin = Math.ceil(data.response.MinMaxLimits.currencyMin);
						_processor.limits = data.response.MinMaxLimits;
					}

					_processor.waitLimits = false;
					CashierStore.emitChange();
					break;

				case actions.PROCESSORS_LIMIT_RULES_RESPONSE:
					_processor.limitRules = data.response.processorLimits;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_PAYACCOUNT:
					_payAccount = _payAccounts[data.processorID][data.payAccountID];
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_AMOUNT:
					_transaction.amount = data.amount;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_CVV:
					_payAccount.secure.password = data.cvv;
					break;

				case actions.PROCESSOR_FEES_RESPONSE:
					_processor.fees.structure = data.response.processorFees;
					break;

				case actions.CHANGE_TRANSACTION_FEE:
					_transaction.fee = data.fee;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_TERMS:
					_transaction.checkTermsAndConditions = data.checked;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_TIMEFRAME:
					let timeFrame = data.timeFrame;
					_transaction.timeFrameDay = timeFrame.timeFrameDay;
					_transaction.timeFrameTime = timeFrame.timeFrameTime;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_CONTROL_NUMBER:
					let controlNumber = data.controlNumber;
					_transaction.controlNumber = controlNumber;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_SEND_BY:
					let sendBy = data.sendBy;
					_transaction.sendBy = sendBy;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_PROMO_CODE:
					let promoCode = data.promoCode;
					_transaction.promoCode = promoCode;
					CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_CRYPTO_ADDRESS:
					let cryptoAddress = data.cryptoAddress;
					_transaction.cryptoAddress = cryptoAddress;
					//CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_CURRENCY_NAME:
					let currencyName = data.currencyName;
					_transaction.currencyName = currencyName;
					//CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_CURRENCY_SYM:
					let currencySymbol = data.currencySymbol;
					_transaction.currencySymbol = currencySymbol;
					//CashierStore.emitChange();
					break;

				case actions.CHANGE_TRANSACTION_BTC_CONVERTION_AMOUNT:
					let BTCConversionAmount = data.BTCConversionAmount;
					_transaction.BTCConversionAmount = BTCConversionAmount;
					//CashierStore.emitChange();
					break;

				case actions.PROCESS_RESPONSE:
				case actions.PROCESS_P2P_GET_NAME_RESPONSE:
				case actions.PROCESS_P2P_SUBMIT_RESPONSE:
				case actions.PROCESS_CC_RESPONSE:
					_transactionResponse.amount = _transaction.amount;
					_transactionResponse.fee = _transaction.fee;
					_transactionResponse.feeType = _transaction.feeType;
					if(data.response && data.response.transaction){
						_transactionResponse.data = data.response.transaction;
						_transactionResponse.journalId = data.response.transaction.caJournal_Id;
						_transactionResponse.transactionId = data.response.transaction.caTransaction_Id;
						_transactionResponse.status = Number(data.response.transaction.caTransactionStatus_Id);
						_transactionResponse.userMessage = data.response.transaction.userMessage;

						let processorClassId = _processor.processorClass;
						if(processorClassId == cashier.PROCESSOR_CLASS_ID_PERSON_2_PERSON){
							_transactionResponse.details = data.response.transaction;
						}

					}else if(data.state){
						_transactionResponse.state = data.state;
						_transactionResponse.status = 0;
						_transactionResponse.userMessage = data.userMessage;
					}

					if(_transactionResponse.userMessage == ""){
						_transactionResponse.userMessage = data.userMessage;
					}
					break;

				case actions.START_TRANSACTION:
					//do some work before start the transaction
					_transactionResponse.userMessage = '';
					_transaction.cleanTransaction();
					_payAccount.cleanPayAccount();
					_UI.ccEdit = 0;
					_payAccounts = [];
					break;

				case actions.SET_STEP:
					_UI.currentStep = data.step;
					CashierStore.emitChange();
					break;

				case actions.GET_CRYPTO_TRANSACTION_RESPONSE:
				case actions.GET_BITCOIN_TRANSACTION_RESPONSE:
				case actions.GET_CRYPTO_TRANSFER_TRANSACTION_RESPONSE:
					_transactionResponse.details = data.response;
					CashierStore.emitChange();
					break;

				case actions.SETS_PAYACCOUNT:
					_payAccount.load(data.payAccount);
					break;

				case actions.GET_CREDITCARD_TRANSACTION_RESPONSE:
					_transactionResponse.details = data.response;
					CashierStore.emitChange();
					break;

				case actions.SELECT_PROCESSOR:
					//do some work before start the transaction
					_transactionResponse.userMessage = '';
					_transaction.cleanTransaction();

					_UI.processorId = data.processorId;
					_UI.currentProcessorSteps = data.processorSteps;
					if(!_UI.currentStep){
						_UI.currentStep = data.currentStep;
					}
					_processor.load(data.processorId);
					CashierStore.emitChange();
					break;

				case actions.VALIDATE_PAYACCOUNT:
					break;

				case actions.PAYACCOUNTS_VALIDATE_SECURE_RESPONSE:
					_payAccount.updateSuccess = 0;
					if(data.response && data.response.updateSuccess){
						_payAccount.updateSuccess = data.response.updateSuccess;
					}
					CashierStore.emitChange();
					break;

				case actions.SET_TUID:
					_transaction.randomTuid = data.tuid;
					break;

				case actions.GET_PACIFIC_TIME_HOUR_RESPONSE:
					_UI.serverTime = data.response.currentHour;
					CashierStore.emitChange();
					break;

				case actions.SEND_TRANSACTION_TOKEN_RESPONSE:
					if(data.response && data.response.hash){
						_transaction.hash = data.response.hash;
					}else{
						_transaction.secondFactorMessage = data.userMessage;
					}
					CashierStore.emitChange();
					break;

				case actions.VERIFY_TRANSACTION_TOKEN_RESPONSE:
					if(data.response.reason == cashier.SECOND_FACTOR_MAX_ATTEMPTS_REACHED){
						_transaction.hash = "";
						_transaction.secondFactorMaxAttempts = true;
					}
					_transaction.isCodeValid = data.response.verified;
					_transaction.secondFactorMessage = data.response.reasonMessage;
					CashierStore.emitChange();
					break;

				case actions.START_SECOND_FACTOR:
					_transaction.secondFactorMaxAttempts = false;
					_transaction.secondFactorMessage = "";
					CashierStore.emitChange();
					break;

				case actions.PAYACCOUNTS_DISABLE_RESPONSE:
					_payAccount.cleanPayAccount();
					CashierStore.emitChange();
					break;

				case actions.UPDATE_PAYACCOUNT_INFO_RESPONSE:
					break;

				case actions.GET_CRYPTO_CURRENCIES_RESPONSE:
					_CryptoTransfer.currencies = data.response.result;
					CashierStore.emitChange();
					break;

				case actions.GET_CRYPTO_CURRENCY_LIMITS_RESPONSE:
					_processor.limits.currencyMin = data.response.result.Min;
					_processor.limits.currencyMax = data.response.result.Max;
					_CryptoTransfer.rate = data.response.result.Rate;
					_CryptoTransfer.minerFee = data.response.result.MinerFee;
					_CryptoTransfer.conversionRate = data.response.result.ConversionRate;
					_CryptoTransfer.currentLimits = data.response.result;
					_CryptoTransfer.loadingLimits = false;
					CashierStore.emitChange();
					break;

				case actions.VALIDATE_CRYPTO_ADDRESS:
					_CryptoTransfer.validCurrentAddress = data.response.result;
					CashierStore.emitChange();
					break;

				case actions.SET_PLAYER_ACCOUNT:
					Object.assign(_Player2Agent, data);
					CashierStore.emitChange();
					break;

				case actions.VALIDATE_ACCOUNT:
					if(!Array.isArray(data) && data.hasOwnProperty('response') && data.response.hasOwnProperty('transfer')) {
						Object.assign(_Player2Agent.transfer, data.response.transfer);
					}else{
						Object.assign(_Player2Agent.transfer, {
							fullnameTo: '',
							usernameFrom: '',
							usernameTo: ''
						});
					}
					_processor.waitLimits = false;
					CashierStore.emitChange();
					break;

				case actions.GET_TRANSFER_LINK:
					if(data && data.hasOwnProperty('response') && data.response.hasOwnProperty('transferLinkId'))
						_Player2Agent.transfer.link = data.response.transferLinkId
					CashierStore.emitChange();
					break;

				case actions.DOCS_FILES_GET_FORMS_CATEGORIES_RESPONSE:
					if(data.response.result){
						_DocsFile.categoriesList = data.response.result;
					}

					_DocsFile.readyCategories = true;
					CashierStore.emitChange();
					break;

				case actions.DOCS_FILES_GET_CUSTOMER_KYC_IS_APPROVE:
					if(data.response.result){
						_DocsFile.pendingKycIDApproved = false;
						if(data.response.result.hasOwnProperty('kycIDApproved')){
							_DocsFile.kycIDApproved = data.response.result.kycIDApproved;
						}
					}
					break;

				case actions.DOCS_FILES_GET_CUSTOMER_PENDING_FORMS_RESPONSE:
					_DocsFile.pendingRecovery = false;
					_DocsFile.pendingAdditionalInfo = false;

					if(data.response.result){
						for(let key in data.response.result){
							if(key == 4){
								_DocsFile.pendingAdditionalInfo = true
							}

							if(key == 5){
								_DocsFile.pendingRecovery = true
							}
						}
					}

					_DocsFile.customerPendingForms = true;
					break;

				case actions.DOCS_FILES_GET_CUSTOMER_FORMS_INFORMATION_RESPONSE:
					if(data.state == 'ok'){
						if(data.response.result){
							if(data.response.result.customerForms.length){
								let customerForms = {};
								customerForms[_DocsFile.currentOptionSelected] = data.response.result.customerForms;
								_DocsFile.customerForms = customerForms
							}else{
								_DocsFile.customerForms = [];
							}

							let form = {};
							form[_DocsFile.currentOptionSelected] = data.response.result.forms;
							_DocsFile.forms = form;
							_DocsFile.kycIDApproved = data.response.result.kycIDApproved;
						}

						_DocsFile.pendingCustomerFormInfo = false;
						CashierStore.emitChange();
					}
					break;

				case actions.DOCS_FILES_GET_FORMS_INPUTS_CATEGORIES_RESPONSE:
					if(data.response.result){
						let form = {};
						form = data.response.result;
						let categories = _DocsFile.currentFormInputsCategories;

						if(!categories[_DocsFile.currentOptionSelected]){
							categories[_DocsFile.currentOptionSelected] = [];
						}

						categories[_DocsFile.currentOptionSelected].push(form);
						_DocsFile.currentFormInputsCategories = categories;
					}

					_DocsFile.pendingInputsCategory = false;
					CashierStore.emitChange();
					break;

				case actions.DOCS_FILE_SAVE_RESPONSE:
					if(data.result){
						_DocsFile.responseUpload = 'success'
					}else{
						_DocsFile.responseUpload = 'error'
					}

					CashierStore.emitChange();
					break;
				default:
					console.log("Store No Action: " + action);
					break;
			}
		}catch(e){
			console.log(action);
			console.log(data);
			console.log(e.message);
		}
	}

	return true;
});

module.exports.CashierStore = CashierStore;