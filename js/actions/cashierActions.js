import actions from '../constants/actions'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher';

let CashierActions = {
	login: function(data){
		CashierDispatcher.handleServerAction({
			action: actions.LOGIN,
			data: data
		});
	},

	stompConnection: function(){
		CashierDispatcher.handleServerAction({
			action: actions.STOMP_CONNECTION
		});
	}

}

module.exports.CashierActions = CashierActions