/**
 * Created by jocampo on 5/27/2016.
 */
let EventEmitter = require('events').EventEmitter
import assign from 'object-assign'
import actions from '../constants/actions'
import cashier from '../constants/cashier'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher'
import {customerService} from '../services/customerService'

/**
 * Customer Data
 *
 * @type {{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array}}
 * @private
 */
let _customer = {
	companyId: 0,
	customerId: 0,
	username: '',
	password: '',
	currency: '',
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
	pendingP2PTransactions: []
};

/**
 * company information
 *
 * @type {{companyId: number, companyName: string, phone: string, companyLabel: Array}}
 * @private
 */
let _company = {
	companyId: 0,
	companyName: '',
  phone: '',
	companyLabel: []
};

/**
 *
 * @type {{sys_access_pass: string, sid: null, tuid: null, format: string, lang: string, platform: string, remoteAddr: string, remoteHost: string, userAgent: string, remoteAddress: string, referrer: string, xForwardedFor: string, atDeviceId: string, ioBB: string}}
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
	remoteAddress: '',
	referrer: '',
	xForwardedFor: '',
	atDeviceId: '',
	ioBB: ''
};

let _bonuses = {
	bonus: []
};

let _processor = {
  processorClass: 0,
	processorId: 0,
	displayName: '',
	bonus: [],
	fees: []
};

/**
 * PayAccount Data
 *
 * @type {{payAccountId: null, customerId: null, processorClassId: null, processorId: null, processorSkinId: null, processorIdRoot: null, processorRootName: null, typesSupported: null, displayName: null, isActive: null, isAllowed: null, type: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, bank: {id: null, alias: null, name: null, address: null, city: null, state: null, stateName: null, country: null, countryName: null, zip: null, phone: null, transferNumber: null, accountNumber: null, accountType: null, swift: null, iban: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limits: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}}}
 * @private
 */
let _payAccount = {
	payAccountId: null,
	customerId: null,
	processorClassId: null,
	processorId: null,
	processorSkinId: null,
	processorIdRoot: null,
	processorRootName: null,
	typesSupported: null,
	displayName: null,
	isActive: null,
	isAllowed: null,
	type: null,
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
	secure: {
		account: null,
		password: null,
		extra1: null,
		extra2: null,
		extra3: null
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
	bank: {
		id: null,
		alias: null,
		name: null,
		address: null,
		city: null,
		state: null,
		stateName: null,
		country: null,
		countryName: null,
		zip: null,
		phone: null,
		transferNumber: null,
		accountNumber: null,
		accountType: null,
		swift: null,
		iban: null
	},
	extra: {
		ssn: null,
		dob: null,
		dobDay: null,
		dobMonth: null,
		dobYear: null
	},
	limits: {
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
	load: (data)=> {

	}
};

/**
 * PayAccount list
 *
 * @type {{payAccounts: Array}}
 * @private
 */
let _payAccounts = {
	payAccounts: []
};

/**
 * UI
 *
 * @type {{language: string, currentView: string, currentStep: string, processorId: number, payAccountId: number, countryInfo: null, countries: {}, countryStates: {}}}
 * @private
 */
let _UI = {
	language: '',
	currentView: '',
	currentStep: '',
	customerAction: '',
	processorId: 0,
	payAccountId: 0,
	countryInfo: null,
	countries: {},
	countryStates: {}
};

let _transaction = {
	amount: 0,
	fee: 0,
	feeType: '',
	bonusId: 0
};

let _transactionResponse = {
	transactionId: 0,
	status: ''
};

let CHANGE_EVENT = 'change';

let CashierStore = assign({}, EventEmitter.prototype, {
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},
	/**
	 * get customer SID
	 *
	 */
	getCustomerSID:() => {
		return (_application.sid);
	},

	/**
	 * get current language
	 *
	 * @returns {string}
	 */
	getLanguage: () => {
    if(!_UI.language && _customer.lang){
      var culture = _customer.lang.split('-');
      _UI.language = culture[0].toUpperCase();
    }
		return (_UI.language) ? _UI.language : 'EN';
	},

	/**
	 * get application object
	 *
	 * @returns {{sys_access_pass: string, sid: null, tuid: null, format: string, lang: string, platform: string, remoteAddr: string, remoteHost: string, userAgent: string, remoteAddress: string, referrer: string, xForwardedFor: string, atDeviceId: string, ioBB: string}}
	 */
	getApplication: () => {
		return (_application);
	},

	/**
	 * set current step
	 *
	 * @param step
	 */
	setCurrentStep: (step) => {
		_UI.currentStep = step;
	},

	/**
	 * get current step
	 *
	 * @returns {string}
	 */
	getCurrentStep: () => {
		return _UI.currentStep;
	},

	/**
	 * get customer action deposit/withdraw
	 *
	 * @returns {string}
	 */
	getCustomerAction: () => {
		return _UI.customerAction;
	},

	/**
	 * get origin url path
	 *
	 * @returns {string}
	 */
	getOriginPath: () => {
		return window.location.origin;
	},

  /**
   * get customer
   *
   * @returns {{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array}}
   */
	getCustomer: () => {
		return (_customer);
	},

  /**
   * get company
   *
   * @returns {{companyId: number, companyName: string, phone: string, companyLabel: Array}}
   */
  getCompany: () => {
    return (_company);
  },

  /**
   * get deposit processors
   *
   * @returns {Array}
   */
  getDepositProcessors: () => {
    return (_customer.depositProcessors);
  },

  /**
   * get withdraw processors
   *
   * @returns {Array}
   */
  getWithdrawProcessors: () => {
    return (_customer.withdrawProcessors);
  },

  /**
   * get current processor
   * 
   * @returns {{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}}
   */
  getProcessor: () => {
    return _processor;
  },

  /**
   * get UI
   *
   * @returns {{language: string, currentView: string, currentStep: string, processorId: number, payAccountId: number, countryInfo: null, countries: {}, countryStates: {}}}
   */
  getUI: () => {
    return (_UI);
  }

});

/**
 * register action
 */
CashierDispatcher.register((payload) => {
		let action = payload.actionType;
		let data = payload.data;

		//register error
		if (data && data.state === 'error') {
			console.log(data);
			return false;
		}

		switch (action) {
			case actions.LOGIN:
				_application.ioBB = data.ioBB;
				_application.atDeviceId = data.atDeviceId;
				_customer.username = data.username;
				_customer.password = data.password;
				_UI.customerAction = data.option;
				customerService.stompConnection(data);
				break;
			case actions.LOGIN_RESPONSE:
				_application.sid = data.response.sid;
				CashierStore.emitChange();
				break;
			case actions.CUSTOMER_INFO_RESPONSE:
				_customer.companyId = data.response.customerInfo.companyId;
				_customer.customerId = data.response.customerInfo.customerId;
				_customer.username = data.response.customerInfo.username;
				_customer.password = data.response.customerInfo.password;
				_customer.currency = data.response.customerInfo.currency;
				_customer.currencySymbol = data.response.customerInfo.currencySymbol;
				_customer.balance = data.response.customerInfo.balance;
				_customer.balanceBP = data.response.customerInfo.balanceBP;
        _customer.lang = data.response.customerInfo.lang;
				_customer.personalInformation.level = data.response.customerInfo.vip;
				_customer.personalInformation.firstName = data.response.customerInfo.firstName;
				_customer.personalInformation.middleName = data.response.customerInfo.middleName;
				_customer.personalInformation.lastName = data.response.customerInfo.lastName;
				_customer.personalInformation.secondLastName = data.response.customerInfo.secondLastName;
				_customer.personalInformation.dateOfBirth = data.response.customerInfo.dateOfBirth;
				_customer.personalInformation.ssn = data.response.customerInfo.ssn;
				_customer.personalInformation.email = data.response.customerInfo.email;
				_customer.personalInformation.mobile = data.response.customerInfo.mobile;
				_customer.personalInformation.phone = data.response.customerInfo.phone;
				_customer.personalInformation.fax = data.response.customerInfo.fax;
				_customer.personalInformation.personalId = data.response.customerInfo.personalId;
				_customer.personalInformation.addressOne = data.response.customerInfo.addressOne;
				_customer.personalInformation.addressTwo = data.response.customerInfo.addressTwo;
				_customer.personalInformation.country = data.response.customerInfo.country;
				_customer.personalInformation.countryName = data.response.customerInfo.countryName;
				_customer.personalInformation.countryPhoneCode = data.response.customerInfo.countryPhoneCode;
				_customer.personalInformation.state = data.response.customerInfo.state;
				_customer.personalInformation.stateName = data.response.customerInfo.stateName;
				_customer.personalInformation.city = data.response.customerInfo.city;
				_customer.personalInformation.postalCode = data.response.customerInfo.postalCode;
				CashierStore.emitChange();
				break;
      case actions.COMPANY_INFO:
        customerService.stompConnection(data);
        break;
      case actions.COMPANY_INFO_RESPONSE:
        _company.companyId = data.response.companyInformation.companyId;
        _company.companyName = data.response.companyInformation.name;
        _company.phone = data.response.companyInformation.servicePhone;
        //company labels
        if(data.response.companyInformation.labels){
          data.response.companyInformation.labels.map((item, i) =>{
            _company.companyLabel[item.Code] = item.Value;
          })
        }
        CashierStore.emitChange();
        break;
			case actions.COUNTRIES_RESPONSE:
				_UI.countries = data.response.countries;
				break;
			case actions.STATES_RESPONSE:
				_UI.countryStates = data.response.states;
				_UI.countryInfo = data.response.countryInfo;
				break;
      case actions.PROCESSORS:
        customerService.stompConnection(data);
        break;
      case actions.PROCESSORS_RESPONSE:
        _customer.depositProcessors = data.response.processors.deposit;
        _customer.withdrawProcessors = data.response.processors.withdraw;

        var processor = [];
        if(_UI.customerAction == cashier.VIEW_DEPOSIT && _customer.depositProcessors.length > 0){
          processor = _customer.depositProcessors[0];
        }else if(_customer.withdrawProcessors.length > 0){
          processor = _customer.withdrawProcessors[0];
        }
        // set processor
        _processor.processorClass = processor.caProcessorClass_Id;
        _processor.processorId = processor.caProcessor_Id;
        _processor.displayName = processor.DisplayName;

        break;
      case actions.PAYACCOUNTS_BY_PROCESSOR:
        customerService.stompConnection(data);
        break;
      case actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE:
        var payAccounts = data.response.payAccounts;
        if(payAccounts){
          payAccounts.map((item, i) => {
            _payAccounts[i] = item;
          })
        }
        break;
			default:
				console.log("Store No Action");
				break;
		}
		return true;
	}
);

module.exports.CashierStore = CashierStore;