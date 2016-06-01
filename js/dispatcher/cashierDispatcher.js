let Dispatcher = require('flux').Dispatcher;
let assign = require('object-assign');

let CashierDispatcher = assign (new Dispatcher(), {
	handleViewAction: function (action) {
		switch (action.action){
			default :{
					this.dispatch({actionType: action.action});
				break;
			}
		}
	}
});

module.exports = CashierDispatcher;