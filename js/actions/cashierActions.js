import cashierActions from '../constants/cashierActions'
import {CashierDispatcher} from '../dispatcher/cashierDispatcher';

let CashierActions = {
	login: function(data){
		CashierDispatcher.handleServerAction({
			action: cashierActions.LOGIN,
			data: data
		});
	},

	stompConnection: function(){
		CashierDispatcher.handleServerAction({
			action: cashierActions.STOMP_CONNECTION
		});
	}

}

module.exports.CashierActions = CashierActions