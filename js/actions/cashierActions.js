import actions from '../constants/actions'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher';

let CashierActions = {
  
	login: function(data){
		CashierDispatcher.handleServerAction({
			action: actions.LOGIN,
			data: data
		});
	},

	login_response: function(data){
		CashierDispatcher.handleServerAction({
			action: actions.LOGIN_RESPONSE,
			data: data
		});
	},

	customerInfo_response: function(data){
		CashierDispatcher.handleServerAction({
			action: actions.CUSTOMER_INFO_RESPONSE,
			data: data
		});
	},

  getCustomerProcessors_response: function(data){
    CashierDispatcher.handleServerAction({
      action: actions.PROCESSORS_RESPONSE,
      data: data
    });
  },

  countries_response: function(data){
    CashierDispatcher.handleServerAction({
      action: actions.COUNTRIES_RESPONSE,
      data: data
    });
  }

};

module.exports.CashierActions = CashierActions;