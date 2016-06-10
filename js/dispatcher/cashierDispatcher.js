let Dispatcher = require('flux').Dispatcher;
import assign from 'object-assign';

let CashierDispatcher = assign(new Dispatcher(), {
	handleServerAction: function (action) {
		switch (action.action) {
			default :
				this.dispatch({actionType: action.action, data: action.data});
				break;

		}
	}
});

module.exports.CashierDispatcher = CashierDispatcher;