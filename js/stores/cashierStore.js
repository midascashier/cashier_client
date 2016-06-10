/**
 * Created by jocampo on 5/27/2016.
 */
let EventEmitter = require('events').EventEmitter
import assign from 'object-assign'
import actions from '../constants/actions'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher'
import {stompConnection} from '../services/customerService'

let _customer = {
  companyId: 0,
	customerId: 0,
	username: '',
	password: '',
  currency: '',
  currencySymbol: '',
	balance: '',
  balanceBP: '',
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

let _company = {
	companyId: 0,
	companyName: '',
	companyLabel: []
};

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
	processorId: 0,
	displayName: '',
	bonus: [],
	fees: []
};

/**
 * PayAccount Object Data
 *
 * @type {{Object}}
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

let _UI = {
	language: '',
	currentView: '',
	currentStep: '',
	processorId: 0,
	payAccountId: 0,
  countryInfo: null,
  countries: [],
  countryStates: []
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
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * get current language
	 *
	 * @returns {string}
   */
	getLanguage: function(){
		return (_UI.language) ? _UI.language : 'EN';
	},

	/**
		 * get application object
	   *
		 * @returns {string}
		 */
		getApplication: function(){
			return (_application);
		},

	/**
	 * set current step
	 *
	 * @param step
   */
	setCurrentStep: function (step) {
		_UI.currentStep = step;
	},

	/**
	 * get current step
	 *
	 * @returns {string}
   */
	getCurrentStep: function () {
		return _UI.currentStep;
	},

	/**
	 * get origin url path
	 *
	 * @returns {string}
   */
	getOriginPath: function(){
		return window.location.origin;
	}

});


/**
 * register action
 */
CashierDispatcher.register(function(payload){
  let action = payload.actionType;
  let data = payload.data;

  //register error
  if(data && data.state === 'error'){
    console.log(data);
    return false;
  }

  switch(action){
    case actions.LOGIN:
    {
      _application.ioBB = data.ioBB;
      _application.atDeviceId = data.atDeviceId;
      _customer.username = data.username;
      _customer.password = data.password;
			stompConnection(data);
      break;
    }
		case actions.LOGIN_RESPONSE:
		{
			_application.sid = data.response.sid;
			break;
		}
  }
  return true;
  }
);

module.exports.CashierStore = CashierStore;