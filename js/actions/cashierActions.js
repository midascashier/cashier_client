import {CashierDispatcher} from '../dispatcher/cashierDispatcher';

let CashierActions = {
	login: function(data){
		CashierDispatcher.handleServerAction({
			action:'LOGIN',
			data: data
		});
	},

	stompConnection: function(){
		CashierDispatcher.handleServerAction({
			action:'STOMPCONNECTION'
		});
	}

}

module.exports.CashierActions = CashierActions