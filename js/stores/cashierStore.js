/**
 * Created by jocampo on 5/27/2016.
 */
import {EventEmitter} from './events';
let assign = require('object-assign');

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
	countryStates: []
};

let _bonuses = {
	bonus: []
};

let _processors = {
	processors: []
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

let CashierStore = assign({}, EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	}
});

module.exports = CashierStore;