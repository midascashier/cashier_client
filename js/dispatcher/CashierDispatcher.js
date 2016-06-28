let Dispatcher = require('flux').Dispatcher;
import assign from 'object-assign';

let _callbacks = [];

let CashierDispatcher = assign(new Dispatcher(), {
	handleServerAction(action) {
		switch (action.action) {
			default :
				this.dispatch({actionType: action.action, data: action.data});
				break;
		}
	}
});

module.exports.CashierDispatcher = CashierDispatcher;
