import actions from '../constants/actions'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher';

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

	changeMethod:(data) => {
		CashierDispatcher.handleServerAction({
			action: actions.CHANGE_PROCESSOR,
			data: data
		});
	}
	
};

module.exports.CashierActions = CashierActions;