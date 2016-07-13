let EventEmitter = require('events').EventEmitter;
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

import assign from 'object-assign'
import actions from '../constants/Actions'
import cashier from '../constants/Cashier'

/**
 * IU
 *
 * @type {{language: string, currentView: string, currentStep: string, currentProcessorSteps: Array, processorId: number, payAccountId: number, countryInfo: null, countries: {}, countryStates: {}}}
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
	countryStates: {}
};

/**
 *
 * @type {{sys_access_pass: string, sid: null, tuid: null, format: string, lang: string, platform: string, remoteAddr: string, remoteHost: string, userAgent: string, remoteAddress: string, referrer: string, xForwardedFor: string}}
 * @private
 */
let _application = {
	sys_access_pass: "1",
	sid: null,
	tuid: null,
	format: "json",
	lang: "en",
	platform: "desktop",
	remoteAddr: "127.0.0.1",
	remoteHost: "localhost",
	userAgent: navigator.userAgent,
	remoteAddress: '127.0.0.1',
	referrer: 'test',
	xForwardedFor: '127.0.0.1'
};

/**
 * Customer Data
 *
 * @type {{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: {}, load: (function(*))}}
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
	lastTransactions: {},
	load(data){
		this.companyId = data.companyId;
		this.customerId = data.customerId;
		this.username = data.username;
		this.password = data.password;
		this.currency = data.currency;
		this.currencySymbol = data.currencySymbol;
		this.balance = data.balance;
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
 * @type {{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, fees: Array, limits: Array, limitRules: Array, load: (function(*))}}
 * @private
 */
let _processor = {
	processorClass: 0,
	processorId: 0,
	Name: '',
	displayName: '',
	bonus: [],
	fees: [],
	limits: [],
	limitRules: [],
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
 * @type {{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}}
 * @private
 */
let _payAccount = {
	payAccountId: null,
	displayName: null,
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
 * @type {{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, timeFrameDay: null, timeFrameTime: null, cleanTransaction: (function())}}
 * @private
 */
let _transaction = {
	amount: "",
	fee: 0,
	feeType: '',
	bonusId: 0,
	checkTermsAndConditions: 0,
	timeFrameDay: null,
	timeFrameTime: null,
	cleanTransaction(){
		this.amount = "";
		this.fee = 0;
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
 * @type {{transactionId: number, journalId: number, status: number, userMessage: string, state: string, details: Array}}
 * @private
 */
let _transactionResponse = {
	transactionId: 0,
	journalId: 0,
	status: 0,
	userMessage: "",
	state: "",
	details: [] //specific details for different type of transactions (BTC, CC, P2P, etc)
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
	 * return current Payaccount
	 *
	 * @returns {{payAccountId: null, customerId: null, processorClassId: null, processorId: null, processorSkinId: null, processorIdRoot: null, processorRootName: null, typesSupported: null, displayName: null, isActive: null, isAllowed: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, bank: {id: null, alias: null, name: null, address: null, city: null, state: null, stateName: null, country: null, countryName: null, zip: null, phone: null, transferNumber: null, accountNumber: null, accountType: null, swift: null, iban: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limits: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}}
	 */
	getCurrentPayAccount: () =>{
		return _payAccount;
	},

	/**
	 * Return last transaction cashier response
	 *
	 * @returns {{transactionId: number, journalId: number, status: number, userMessage: string, state: string, details: Array}}
	 */
	getLastTransactionResponse: () =>{
		return _transactionResponse;
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
	 * @returns {{sys_access_pass: string, sid: null, tuid: null, format: string, lang: string, platform: string, remoteAddr: string, remoteHost: string, userAgent: string, remoteAddress: string, referrer: string, xForwardedFor: string, atDeviceId: string, ioBB: string}}
	 */
	getApplication: () =>{
		return (_application);
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
	 * @returns {{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: {}, load: (function(*))}}
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
	 * get current processor
	 *
	 * @returns {{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, fees: Array, limits: Array, limitRules: Array, load: (function(*))}}
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
			break;

		case actions.COUNTRIES_RESPONSE:
			_UI.countries = data.response.countries;
			break;

		case actions.STATES_RESPONSE:
			_UI.countryStates = data.response.states;
			_UI.countryInfo = data.response.countryInfo;
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

		case actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE:
			if(data.response && data.response.payAccounts){
				data.response.payAccounts.forEach((payAccount)=>{
					payAccount.limitsData.available = Math.ceil(payAccount.limitsData.available);
					payAccount.limitsData.availableWithdraw = Math.ceil(payAccount.limitsData.availableWithdraw);
					payAccount.limitsData.maxAmount = Math.ceil(payAccount.limitsData.maxAmount);
					payAccount.limitsData.maxAmountWithdraw = Math.ceil(payAccount.limitsData.maxAmountWithdraw);
					payAccount.limitsData.minAmount = Math.ceil(payAccount.limitsData.minAmount);
					payAccount.limitsData.minAmountWithdraw = Math.ceil(payAccount.limitsData.minAmountWithdraw);
				});
				let payAccounts = data.response.payAccounts;
				if(payAccounts){
					let firstPayAccount = 0;
					let payAccounts_processor = {};
					let payAccountTemp = Object.assign({}, _payAccount);
					payAccounts.map((item, key) =>{
						let payAccount = Object.assign({key: key}, payAccountTemp);
						payAccount.load(item);
						payAccounts_processor[payAccount.payAccountId] = payAccount;
						if(!firstPayAccount){
							firstPayAccount = payAccount.payAccountId;
						}
					});
					_payAccount = payAccounts_processor[firstPayAccount];
					_payAccounts[_processor.processorId] = payAccounts_processor;
				}
			}
			CashierStore.emitChange();
			break;

		case actions.PAYACCOUNTS_DISABLE_RESPONSE:
			let currentPayAccountId = _UI.payAccountId;
			if(currentPayAccountId){
				_payAccounts.splice(currentPayAccountId, 1);
			}
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

		case actions.PROCESS_RESPONSE:
		case actions.PROCESS_P2P_GET_NAME_RESPONSE:
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

		default:
			console.log("Store No Action");
			break;
	}
	return true;
});

module.exports.CashierStore = CashierStore;