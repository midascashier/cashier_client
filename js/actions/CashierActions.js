import actions from '../constants/Actions'
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

let CashierActions = {
	changePayAccount: (payAccountID, processorID) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_PAYACCOUNT, data: { payAccountID: payAccountID, processorID: processorID }
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

	setTransactionControlNumber: (controlNumber) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_CONTROL_NUMBER, data: { controlNumber: controlNumber }
		});
	},

	setTransactionTimeFrame: (timeFrame) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_TIMEFRAME, data: { timeFrame: timeFrame }
		});
	},

	selectProcessor: (processorId, processorSteps, currentStep) =>{
		CashierDispatcher.dispatch({
			action: actions.SELECT_PROCESSOR,
			data: { processorId: processorId, processorSteps: processorSteps, currentStep: currentStep }
		});
	},

	startTransaction: () =>{
		CashierDispatcher.dispatch({
			action: actions.START_TRANSACTION
		});
	},

	setCurrentStep: (step) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_STEP,
			data: { step: step }
		});
	},

	responses: (action, data) =>{
		CashierDispatcher.dispatch({
			action: action,
			data: data
		});
	},

	setSelectedCountry: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_APPLICATION_SELECTED_COUNTRY,
			data: { country: data }
		});
	}

};

module.exports.CashierActions = CashierActions;