/**
 * Created by jocampo on 5/27/2016.
 */
let EventEmitter = require('events').EventEmitter
import assign from 'object-assign'
import actions from '../constants/actions'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher'
import {CashierStomp} from '../stomp/cashierStomp'

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
	platform: '',
	acuityTec: '',
	iOvation: '',
	remoteHost: '',
	remoteAddress: '',
	referrer: '',
	xForwardedFor: '',
	userAgent: '',
	countries: [],
	sid: '',
	countryStates: []
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
	payAccountId: 0
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
let stomp ="";


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
 * this function send the request to stomp
 * @param action
 * @param data
 */
function sendRequest(data, headers, rabbitQueue) {
	stomp.send(data, "",rabbitQueue);
}

CashierDispatcher.register(function(payload){
		let action = payload.actionType;
		let data = payload.data;
		switch (action){
			case actions.STOMP_CONNECTION: {
				stomp = new CashierStomp();
				stomp.connection();
				break;
			}
			case actions.LOGIN: {
				let rabbitQueue="customer";
				sendRequest(rabbitQueue,'',data);
				break;
			}
			case cashierActions.LOGIN_RESPONSE:{
				_application.sid = data.response.sid;
			}
		}
		return true;
	}
);

module.exports.CashierStore = CashierStore;