/**
 * Created by jocampo on 5/27/2016.
 */
let EventEmitter = require('events').EventEmitter
import assign from 'object-assign'
import actions from '../constants/actions'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher'
import {stompConnection} from '../services/customerService'

let _customer = {
	customerId: 0,
	username: '',
	password: '',
	balance: '',
	personalInformation: []
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
  acuityTec: '',
  iOvation: ''
};

let _bonuses = {
	bonus: []
};

let _processors = {
  deposit: [],
  withdraw: []
};

let _payAccounts = {
	payAccounts: []
};

let _processor = {
	processorId: 0,
	displayName: '',
	bonus: [],
	fees: []
};

let _payAccount = {
	payAccountId: 0,
	displayName: '',
	personal: [],
	secure: [],
	address: [],
	bank: [],
	extra: [],
	limits: []

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
			stompConnection(data);
      break;
    }
		case actions.LOGIN_RESPONSE:
		{
			_application.sid=data.response.sid;
			break;
		}
  }
  return true;
  }
);

module.exports.CashierStore = CashierStore;