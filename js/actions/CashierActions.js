import actions from '../constants/Actions'
import {CashierDispatcher} from '../dispatcher/CashierDispatcher';

let CashierActions = {
	login: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.LOGIN,
			data: data
		});
	},

	login_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.LOGIN_RESPONSE,
			data: data
		});
	},

	customerInfo_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CUSTOMER_INFO_RESPONSE,
			data: data
		});
	},

	getCustomerProcessors_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.PROCESSORS_RESPONSE,
			data: data
		});
	},

	getCustomerTransactions: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CUSTOMER_TRANSACTIONS,
			data: data
		});
	},

	getCustomerTransactions_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CUSTOMER_TRANSACTIONS_RESPONSE,
			data: data
		});
	},

	companyInfo_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.COMPANY_INFO_RESPONSE,
			data: data
		});
	},

	countries_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.COUNTRIES_RESPONSE,
			data: data
		});
	},

	states_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.STATES_RESPONSE,
			data: data
		});
	},

	getCustomerPreviousPayAccount_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE,
			data: data
		});
	},

	getDisablePayAccount_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.PAYACCOUNTS_DISABLE_RESPONSE,
			data: data
		});
	},

	getProcessorLimitRules_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.PROCESSORS_LIMIT_RULES_RESPONSE,
			data: data
		});
	},

	getProcessorMinMaxLimits_response: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE,
			data: data
		});
	},

	changeMethod: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CHANGE_PROCESSOR,
			data: data
		});
	},

	changePayAccount: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CHANGE_PAYACCOUNT,
			data: data
		});
	},

	setTransactionAmount: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CHANGE_TRANSACTION_AMOUNT,
			data: data
		});
	},

	process: (data) => {
		if (data) {
			CashierDispatcher.handleServerAction({
				action: actions.PROCESS,
				data: data
			});
		}
		else {
			CashierDispatcher.handleServerAction({
				action: actions.PROCESS
			});
		}

	},

	processResponse: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.PROCESS_RESPONSE,
			data: data
		});
	},

	changeCurrentStep: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CHANGE_CURRENT_STEP,
			data: data
		});
	},

	changeCurrentView: (data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CHANGE_CURRENT_VIEW,
			data: data
		});
	}

};

module.exports.CashierActions = CashierActions;
