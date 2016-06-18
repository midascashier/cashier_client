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

/**
 * Customer Data
 *
 * @type {{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, load: (function(*))}}
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
	companyId: 0,
	companyName: '',
  phone: '',
	companyLabel: [],
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

let _processor = {
  processorClass: 0,
	processorId: 0,
	displayName: '',
	bonus: [],
	fees: [],
  limits: [],
  limitRules: [],
	load(data){
    var processor = [];
    if(_UI.customerAction == cashier.VIEW_DEPOSIT && _customer.depositProcessors.length > 0){
      _customer.depositProcessors.map((item) => {
        if(data.processorId == item.caProcessor_Id){
          processor = item;
        }
      });
    }else if(_customer.withdrawProcessors.length > 0){
      _customer.withdrawProcessors.map((item) => {
        if(data.processorId == item.caProcessor_Id){
          processor = item;
        }
      });
    }
    //set values
    this.processorClass = processor.caProcessorClass_Id;
    this.processorId = processor.caProcessor_Id;
    this.displayName = processor.DisplayName;
  }
};

/**
 * PayAccount Data
 *
 * @type {{payAccountId: null, customerId: null, processorClassId: null, processorId: null, processorSkinId: null, processorIdRoot: null, processorRootName: null, typesSupported: null, displayName: null, isActive: null, isAllowed: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, bank: {id: null, alias: null, name: null, address: null, city: null, state: null, stateName: null, country: null, countryName: null, zip: null, phone: null, transferNumber: null, accountNumber: null, accountType: null, swift: null, iban: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limits: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}}
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
  load(data){
    this.payAccountId = data.payAccountId;
    this.customerId = data.customerId;
    this.processorClassId = data.processorClassId;
    this.processorId = data.processorId;
    this.processorSkinId = data.processorSkinId;
    this.processorIdRoot = data.processorIdRoot;
    this.processorRootName = data.processorNameRoot;
    this.typesSupported = data.typesSupported;
    this.displayName = data.processorDisplayName;
    this.isActive = data.isActive;
    this.isAllowed = data.isAllowed;
    this.address = data.addressData;
    this.bank = data.bankData;
    this.extra = data.extraData;
    this.personal = data.personalData;
    this.secure = data.secureData;
    this.limits = data.limitsData;
  }
};

/**
 * PayAccount list
 *
 * @type {Array}
 * @private
 */
let _payAccounts = [];

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
   * @returns {{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, load: (function(*))}}
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
  },

  /**
   * get if state is withdraw
   *
   * @returns {int}
   */
  getIsWithdraw: () => {
    return (_UI.customerAction == cashier.VIEW_WITHDRAW) ? 1 : 0;
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
				_UI.currentStep=1;
        console.log('sid: ' + _application.sid);
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
      case actions.CUSTOMER_TRANSACTIONS:
        _customer.lastTransactions = {};
        customerService.getCustomerTransactions();
        break;
      case actions.CUSTOMER_TRANSACTIONS_RESPONSE:
        _customer.lastTransactions = data.response.transactions;
        console.log(_customer.lastTransactions);
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

        var processor = [];
        if(!CashierStore.getIsWithdraw() && _customer.depositProcessors.length > 0){
          processor = _customer.depositProcessors[0];
        }else if(_customer.withdrawProcessors.length > 0){
          processor = _customer.withdrawProcessors[0];
        }
        // set default processor
				_UI.processorId=processor.caProcessor_Id;
        _processor.load({processorId: processor.caProcessor_Id});
        break;
      case actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE:
        var payAccounts = data.response.payAccounts;
        if(payAccounts){
          var payAccountCopy = Object.assign({}, _payAccount);
          payAccounts.map((item) => {
            var payAccount = payAccountCopy;
            payAccount.load(item);
            _payAccounts[payAccount.payAccountId] = payAccount;
          })
        }
        break;
      case actions.PAYACCOUNTS_DISABLE_RESPONSE:
        var currentPayAccountId = CashierStore.getUI().payAccountId;
        if(currentPayAccountId){
          _payAccounts.splice(currentPayAccountId, 1);
        }
        CashierStore.emitChange();
        break;
			case actions.CHANGE_PROCESSOR:
        _UI.processorId=data.processorId;
				_processor.load(data);
        customerService.getProcessorLimitRules();
        customerService.getCustomerProcessorsMinMax();
        customerService.getCustomerPreviousPayAccount();
        CashierStore.emitChange();
				break;
      case actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE:
        _processor.limits = data.response.processorMinMaxLimits;
				CashierStore.emitChange();
        break;
      case actions.PROCESSORS_LIMIT_RULES_RESPONSE:
        _processor.limitRules = data.response.processorLimits;
				CashierStore.emitChange();
        break;
			case actions.ASKINFO:
				_UI.currentStep=2;
				CashierStore.emitChange();
				break;
			default:
				console.log("Store No Action");
				break;
		}
		return true;
	}
);

module.exports.CashierStore = CashierStore;