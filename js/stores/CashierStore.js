let EventEmitter = require('events').EventEmitter;
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

import assign from 'object-assign'
import actions from '../constants/Actions'
import cashier from '../constants/Cashier'

/**
 * UI
 *
 * @type {{language: string, currentView: string, currentStep: string, currentProcessorSteps: Array, processorId: number, payAccountId: number, countryInfo: null, countries: {}, selectedCountry: string, countryStates: {}, currencies: {}}}
 * @private
 */
let _UI = {
	language: '',
	currentView: '',
	currentStep: '',
	currentProcessorSteps: [],
	processorId: 0,
	payAccountId: 0,
	countryInfo: null,
	countries: {},
	selectedCountry: '',
	countryStates: {},
	currencies: {}
};

/**
 *
 * @type {{sid: null, tuid: null, lang: string, platform: string, remoteAddr: string, remoteHost: string, userAgent: string, remoteAddress: string, referrer: (string|*), xForwardedFor: string}}
 * @private
 */
let _application = {
	sid: null,
	tuid: null,
	lang: "en",
	platform: '',
	remoteAddr: "127.0.0.1",
	remoteHost: "localhost",
	userAgent: navigator.userAgent,
	remoteAddress: '127.0.0.1',
	referrer: document.referrer || location.referrer,
	xForwardedFor: '127.0.0.1'
};

/**
 * Customer Data
 *
 * @type {{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: Array, load: (function(*))}}
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
	load(data){
		this.companyId = data.companyId;
		this.customerId = data.customerId;
		this.username = data.username;
		this.password = data.password;
		this.currency = data.currency;
		this.currencySymbol = data.currencySymbol;
		this.balance = Math.round(data.balance*100)/100;
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
	}
};

/**
 * company information
 *
 * @type {{companyId: number, companyName: string, phone: string, companyLabel: Array, load: (function(*))}}
 * @private
 */
let _company = {
	companyId: 0, companyName: '', phone: '', companyLabel: [],
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

let _bonuses = {
	bonus: []
};

/**
 * Stores the information of the selected processor
 *
 * @type {{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, rate: number, limits: Array, limitRules: Array, fees: {enableBP: number, enableCash: number, enableFree: number, cashType: string, structure: Array}, load: (function(*))}}
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
	limitRules: [],
	fees: {
		enableBP: 0,
		enableCash: 0,
		enableFree: 0,
		cashType: "",
		structure: []
	},
	load(processorId){
		var processor = [];
		if(_UI.currentView == cashier.VIEW_DEPOSIT && _customer.depositProcessors.length > 0){
			_customer.depositProcessors.map((item) =>{
				if(processorId == item.caProcessor_Id){
					processor = item;
				}
			});
		} else if(_customer.withdrawProcessors.length > 0){
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
	secure: { account: null, password: null, extra1: null, extra2: null, extra3: null },
	extra: { ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null },
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
 * @type {{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, controlNumber: null, timeFrameDay: null, timeFrameTime: null, cleanTransaction: (function())}}
 * @private
 */
let _transaction = {
	amount: "",
	fee: 0,
	feeType: '',
	bonusId: 0,
	bitcoinAddress: '',
	checkTermsAndConditions: 0,
	controlNumber: '',
	timeFrameDay: null,
	timeFrameTime: null,
	dobMonth: 1,
	dobDay: 1,
	dobYear: 1970,
	ssn: '',
	cleanTransaction(){
		this.amount = "";
		this.fee = 0;
		this.bitcoinAddress = "";
		this.feeType = "";
		this.bonusId = 0;
		this.checkTermsAndConditions = 0;
		this.timeFrameDay = null;
		this.timeFrameTime = null;
	}
};

/**
 * Stores transaction result
 *
 * @type {{transactionId: number, journalId: number, amount: string, feeType: string, fee: number, userMessage: string, state: string, details: Array, cleanTransaction: (function())}}
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
	details: [], //specific details for different type of transactions (BTC, CC, P2P, etc)
	cleanTransaction(){
		this.transactionId = 0;
		this.journalId = 0;
		this.amount = "";
		this.fee = 0;
		this.feeType = "";
		this.status = 0;
		this.userMessage = "";
		this.state = "";
		this.details = [];
	}
};

let CHANGE_EVENT = 'change';

let CashierStore = assign({}, EventEmitter.prototype, {
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * return current PayAccount
	 *
	 * @returns {{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}}
	 */
	getCurrentPayAccount: () =>{
		return _payAccount;
	},

	/**
	 * Return last transaction cashier response
	 *
	 * @returns {{transactionId: number, journalId: number, amount: string, feeType: string, fee: number, userMessage: string, state: string, details: Array, cleanTransaction: (function())}}
	 */
	getLastTransactionResponse: () =>{
		return _transactionResponse;
	},

	/**
	 * Get selected country
	 */
	getSelectedCountry(){
		return _UI.selectedCountry;
	},

	/**
	 * Return country selected states
	 * @returns {{}|*}
	 */
	getCountryStates(){
		return _UI.countryStates;
	},

	/**
	 * get payAccounts by processor
	 */
	getProcessorPayAccount: () =>{
		return (_payAccounts[_processor['processorId']]);
	},

	/**
	 * get current language
	 *
	 * @returns {string}
	 */
	getLanguage: () =>{
		if(!_UI.language && _customer.lang){
			var culture = _customer.lang.split('-');
			_UI.language = culture[0].toUpperCase();
		}
		return (_UI.language) ? _UI.language : 'EN';
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
	 * @returns {{sid: null, tuid: null, lang: string, platform: string, remoteAddr: string, remoteHost: string, userAgent: string, remoteAddress: string, referrer: string, xForwardedFor: string}}
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
		return _processor.rate;
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
	 * @returns {{language: string, currentView: string, processorId: number, payAccountId: number, countryInfo: null, countries: {}, countryStates: {}}}
	 */
	getUI: () =>{
		return _UI;
	},

	/**
	 * get transaction
	 *
	 * @returns {{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, cleanTransaction: (function())}}
	 */
	getTransaction: ()=>{
		return _transaction;
	},

	/**
	 * get if state is withdraw
	 *
	 * @returns {int}
	 */
	getIsWithdraw: () =>{
		return (_UI.currentView == cashier.VIEW_WITHDRAW) ? 1 : 0;
	}

});

/**
 * register action
 */
CashierStore.dispatchToken = CashierDispatcher.register((payload) =>{
	let action = payload.action;
	let data = payload.data;

	switch(action){
		case actions.LOGIN_RESPONSE:
			_customer.ioBB = data.application.ioBB;
			_customer.atDeviceId = data.application.atDeviceId;
			_customer.username = data.application.username;
			_customer.password = data.application.password;
			_UI.currentView = data.application.option;
			_application.sid = data.response.sid;
			CashierStore.emitChange();
			break;

		case actions.CUSTOMER_INFO_RESPONSE:
			_customer.load(data.response.customerInfo);
			CashierStore.emitChange();
			break;

		case actions.COMPANY_INFO_RESPONSE:
			_company.load(data.response.companyInformation);
			CashierStore.emitChange();
			break;

		case actions.CUSTOMER_TRANSACTIONS_RESPONSE:
			_customer.lastTransactions = data.response.transactions;
			CashierStore.emitChange();
			break;

		case actions.COUNTRIES_RESPONSE:
			_UI.countries = data.response.countries;
			break;

		case actions.GET_CURRENCY_RESPONSE:
			let currencyInfo = data.response.currencyInfo;
			if(currencyInfo && currencyInfo.Rate){
				_processor.rate = currencyInfo.Rate;
			} else if(currencyInfo){
				_UI.currencies = currencyInfo;
				_processor.rate = currencyInfo[0].Rate;
			}
			CashierStore.emitChange();
			break;

		case actions.STATES_RESPONSE:
			_UI.countryStates = data.response.states;
			_UI.countryInfo = data.response.countryInfo;
			CashierStore.emitChange();
			break;

		case actions.PROCESSORS_RESPONSE:
			_customer.depositProcessors = data.response.processors.deposit;
			_customer.withdrawProcessors = data.response.processors.withdraw;

			let processor = [];
			if(!CashierStore.getIsWithdraw() && _customer.depositProcessors.length > 0){
				processor = _customer.depositProcessors[0];
			} else if(_customer.withdrawProcessors.length > 0){
				processor = _customer.withdrawProcessors[0];
			}

			// set default processor
			_UI.processorId = processor.caProcessor_Id;
			_processor.load(processor.caProcessor_Id);
			break;

		case actions.CHANGE_APPLICATION_SELECTED_COUNTRY:
			if(!data.country){
				_UI.selectedCountry = _customer.personalInformation.country;
			} else{
				_UI.selectedCountry = data.country;
			}
			break;

		case actions.CHANGE_TRANSACTION_FEE_AMOUNT:
			_transaction.fee = data.amount;
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
				data.response.payAccounts.forEach((payAccount)=>{
					payAccount.limitsData.available = Math.floor(payAccount.limitsData.available);
					payAccount.limitsData.availableWithdraw = Math.floor(payAccount.limitsData.availableWithdraw);
					payAccount.limitsData.maxAmount = Math.floor(payAccount.limitsData.maxAmount);
					payAccount.limitsData.maxAmountWithdraw = Math.floor(payAccount.limitsData.maxAmountWithdraw);
					payAccount.limitsData.minAmount = Math.ceil(payAccount.limitsData.minAmount);
					payAccount.limitsData.minAmountWithdraw = Math.ceil(payAccount.limitsData.minAmountWithdraw);
				});
				let payAccounts = data.response.payAccounts;
				if(payAccounts){
					payAccounts.map((item, key) =>{
						let payAccount = Object.assign({ key: key }, payAccountTemp);
						payAccount.load(item);
						payAccounts_processor[payAccount.payAccountId] = payAccount;
						if(!firstPayAccount){
							firstPayAccount = payAccount.payAccountId;
						}
					});
					_payAccount = payAccounts_processor[firstPayAccount];
				}
			}
			let addPayAccountOption = Object.assign({}, _payAccount);
			addPayAccountOption.payAccountId = 0;
			addPayAccountOption.displayName = "Register new account";
			payAccounts_processor[addPayAccountOption.payAccountId] = addPayAccountOption;
			if(_payAccount.payAccountId === null){
				_payAccount = payAccounts_processor[firstPayAccount];
			}
			_payAccounts[_processor.processorId] = payAccounts_processor;
			CashierStore.emitChange();
			break;

		case actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE:
			data.response.processorMinMaxLimits.currencyMax = Math.ceil(data.response.processorMinMaxLimits.currencyMax);
			data.response.processorMinMaxLimits.currencyMin = Math.ceil(data.response.processorMinMaxLimits.currencyMin);
			_processor.limits = data.response.processorMinMaxLimits;
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

		case actions.PROCESS_RESPONSE:
		case actions.PROCESS_P2P_GET_NAME_RESPONSE:
		case actions.PROCESS_P2P_SUBMIT_RESPONSE:
		case actions.PROCESS_CC_RESPONSE:
			_transactionResponse.amount = _transaction.amount;
			_transactionResponse.fee = _transaction.fee;
			_transactionResponse.feeType = _transaction.feeType;
			if(data.response && data.response.transaction){
				_transactionResponse.journalId = data.response.transaction.caJournal_Id;
				_transactionResponse.transactionId = data.response.transaction.caTransaction_Id;
				_transactionResponse.status = Number(data.response.transaction.caTransactionStatus_Id);
				_transactionResponse.userMessage = data.response.transaction.userMessage;

				let processorClassId = _processor.processorClass;
				if(processorClassId == cashier.PROCESSOR_CLASS_ID_PERSON_2_PERSON){
					_transactionResponse.details = data.response.transaction;
				}

			} else if(data.state){
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
			_transaction.cleanTransaction();
			break;

		case actions.SET_STEP:
			_UI.currentStep = data.step;
			CashierStore.emitChange();
			break;

		case actions.GET_BITCOIN_TRANSACTION_RESPONSE:
			_transactionResponse.details = data.response;
			CashierStore.emitChange();
			break;

		case actions.GET_CREDITCARD_TRANSACTION_RESPONSE:
			_transactionResponse.details = data.response;
			CashierStore.emitChange();
			break;

		case actions.SELECT_PROCESSOR:
			_UI.processorId = data.processorId;
			_UI.currentProcessorSteps = data.processorSteps;
			_UI.currentStep = data.currentStep;
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

		case actions.SET_DOB_SSN:
			_transaction[data.param] = data.value;
			CashierStore.emitChange();
			break;

		default:
			console.log("Store No Action: " + action);
			break;
	}
	return true;
});

module.exports.CashierStore = CashierStore;