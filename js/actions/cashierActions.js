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
	}
}

module.exports.CashierActions = CashierActions;