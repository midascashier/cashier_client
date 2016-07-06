import actions from '../constants/Actions'
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

let CashierActions = {
	changePayAccount: (payAccountID, processorID) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_PAYACCOUNT, data: {payAccountID: payAccountID, processorID: processorID}
		});
	},

	setTransactionAmount: (amount) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_AMOUNT, data: { amount: amount }
		});
	},

	setTransactionFee: (fee) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEE, data: { fee: fee }
		});
	},

	setTransactionTerms: (checked) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_TERMS, data: { checked: checked }
		});
	},

	selectProcessor: (processorId) =>{
		CashierDispatcher.dispatch({
			action: actions.SELECT_PROCESSOR, data: { processorId: processorId }
		});
	},

	startTransaction: () =>{
		CashierDispatcher.dispatch({
			action: actions.START_TRANSACTION
		});
	},

	responses: (action, data) =>{
		CashierDispatcher.dispatch({
			action: action,
			data: data
		});
	}

};

module.exports.CashierActions = CashierActions;