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

	setFeeAmount: (amount) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEE_AMOUNT, data: { amount: amount }
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
	},

	setTransactionFee: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEE,
			data: { fee: data }
		});
	},

	setBitcoinAddress: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_BITCOIN_ADDRESS,
			data: { bitcoinaddress: data }
		});
	},

	setDOBSSN: (param, value) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_DOB_SSN,
			data: { param: param, value: value }
		});
	},

	startSecondFactorProcess: () =>{
		CashierDispatcher.dispatch({
			action: actions.START_SECOND_FACTOR,
		});
	},

	setTransactionRandomTuid: (tuid) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_TUID,
			data: { tuid: tuid }
		});
	}
};

module.exports.CashierActions = CashierActions;