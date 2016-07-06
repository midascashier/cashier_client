import actions from '../constants/Actions'
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

let CashierActions = {
	login: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.LOGIN, data: data
		});
	},

	getCustomerTransactions: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CUSTOMER_TRANSACTIONS, data: data
		});
	},

	changePayAccount: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_PAYACCOUNT, data: data
		});
	},

	setTransactionAmount: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_AMOUNT, data: data
		});
	},

	setTransactionFee: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEE, data: data
		});
	},

	setTransactionTerms: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_TERMS, data: data
		});
	},

	selectProcessor: (processorId) =>{
		CashierDispatcher.dispatch({
			action: actions.SELECT_PROCESSOR, data:{processorId: processorId}
		});
	},

	startTransaction: () =>{
		CashierDispatcher.dispatch({
			action: actions.START_TRANSACTION
		});
	},

	process: () =>{
		CashierDispatcher.dispatch({
			action: actions.PROCESS
		});
	},

	responses: (action, data) => {
		CashierDispatcher.dispatch({
			action: action,
			data: data
		});
	}


};

module.exports.CashierActions = CashierActions;
