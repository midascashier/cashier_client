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
  
  company_response: (data) => {
    CashierDispatcher.handleServerAction({
      action: actions.COMPANY_INFO_RESPONSE,
      data: data
    });
  },

  countries_response: function(data){
    CashierDispatcher.handleServerAction({
      action: actions.COUNTRIES_RESPONSE,
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
	}
	
};

module.exports.CashierActions = CashierActions;