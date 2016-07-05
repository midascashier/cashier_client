import actions from '../constants/Actions'
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

let CashierActions = {
	login: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.LOGIN, data: data
		});
	},

	login_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.LOGIN_RESPONSE, data: data
		});
	},

	customerInfo_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CUSTOMER_INFO_RESPONSE, data: data
		});
	},

	getCustomerProcessors_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.PROCESSORS_RESPONSE, data: data
		});
	},

	getCustomerTransactions: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CUSTOMER_TRANSACTIONS, data: data
		});
	},

	getCustomerTransactions_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CUSTOMER_TRANSACTIONS_RESPONSE, data: data
		});
	},

	companyInfo_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.COMPANY_INFO_RESPONSE, data: data
		});
	},

	countries_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.COUNTRIES_RESPONSE, data: data
		});
	},

	states_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.STATES_RESPONSE, data: data
		});
	},

	getCustomerPreviousPayAccount_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE, data: data
		});
	},

	getDisablePayAccount_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.PAYACCOUNTS_DISABLE_RESPONSE, data: data
		});
	},

	getProcessorLimitRules_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.PROCESSORS_LIMIT_RULES_RESPONSE, data: data
		});
	},

	getProcessorMinMaxLimits_response: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE, data: data
		});
	},

	changeCurrentProcessor: (data) => {
		CashierDispatcher.dispatch({
			action: actions.CHANGE_PROCESSOR, data: data
		});
	},

	changePayAccount: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_PAYACCOUNT, data: data
		});
	},

	setTransactionAmount: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_AMOUNT, data: data
		});
	},

	setTransactionFee: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEE, data: data
		});
	},

	setTransactionTerms: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_TERMS, data: data
		});
	},

	processResponse: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.PROCESS_RESPONSE, data: data
		});
	},

	setCurrentStep: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_CURRENT_STEP, data: data
		});
	},

	startTransaction: () =>{
		CashierDispatcher.dispatch({
			action: actions.START_TRANSACTION
		});
	}
};

module.exports.CashierActions = CashierActions;
