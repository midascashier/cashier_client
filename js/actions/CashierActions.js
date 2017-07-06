import actions from '../constants/Actions'
let CashierDispatcher = require('../dispatcher/CashierDispatcher');

let CashierActions = {
	changePayAccount: (payAccountID, processorID) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_PAYACCOUNT,
			data: { payAccountID: payAccountID, processorID: processorID }
		});
	},

	setTransactionAmount: (amount) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_AMOUNT,
			data: { amount: amount }
		});
	},

	setCVV: (CVV) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_CVV,
			data: { cvv: CVV }
		});
	},

	setTransactionResponse:(tStatus) => {
		CashierDispatcher.dispatch({
			action: actions.RESTART_TRANSACTION_RESPONSE,
			data: { tStatus: tStatus }
		});
	},

	setFeeAmount: (amount) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEE_AMOUNT,
			data: { amount: amount }
		});
	},

	setTransactionTerms: (checked) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_TERMS,
			data: { checked: checked }
		});
	},

	setTransactionControlNumber: (controlNumber) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_CONTROL_NUMBER,
			data: { controlNumber: controlNumber }
		});
	},

	setTransactionSendBy: (sendBy) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_SEND_BY,
			data: { sendBy: sendBy }
		});
	},

	setTransactionTimeFrame: (timeFrame) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_TIMEFRAME,
			data: { timeFrame: timeFrame }
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

	switchAction: () =>{
		CashierDispatcher.dispatch({
			action: actions.SWITCH_ACTION
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

	showUserMessage: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.USER_MESSAGE,
			data: { message: data }
		});
	},

	connectionError: (data) => {
		CashierDispatcher.dispatch({
			action: actions.CONNECTION_ERRROR,
			data: { opt: data }
		});
	},

	setTransactionFee: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEE,
			data: { fee: data }
		});
	},

	setTransactionFeeType: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.CHANGE_TRANSACTION_FEETYPE,
			data: { feeType: data }
		});
	},

	setBitcoinAddress: (data) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_BITCOIN_ADDRESS,
			data: { bitcoinaddress: data }
		});
	},

	startSecondFactorProcess: () =>{
		CashierDispatcher.dispatch({
			action: actions.START_SECOND_FACTOR
		});
	},

	setsPayAccount: (data) => {
		CashierDispatcher.dispatch({
			action: actions.SETS_PAYACCOUNT,
			data: { payAccount: data}
		});
	},

	setTransactionRandomTuid: (tuid) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_TUID,
			data: { tuid: tuid }
		});
	},

	setCCEditMode: (editMode) =>{
		CashierDispatcher.dispatch({
			action: actions.SET_EDITCC,
			data: { editMode: editMode }
		});
	}
};

module.exports.CashierActions = CashierActions;