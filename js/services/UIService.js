import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import { TransactionService } from './TransactionService'
import RouterContainer from './RouterContainer'
import cashier from '../constants/Cashier'
import  ProcessorSettings from '../constants/Processors'

class UiService {

	constructor(){
		this.customerAction = "deposit";
	};

	/**
	 * Do some other actions after login response
	 */
	loginResponse(){
		if(CashierStore.getIsWithdraw()){
			this.customerAction = "withdraw";
		}
		this.loginSuccess(this.customerAction);
	};

	/**
	 * Redirect to first screen after login success
	 */
	loginSuccess(){
		let nextPath = "/" + this.getCurrentView() + "/";
		this.changeUIState(nextPath);
	}

	/**
	 * here is where we redirect to start transaction
	 */
	startTransaction(){
		let processorSteps = CashierStore.getCurrentProcessorSteps();
		CashierActions.setCurrentStep(processorSteps[1]);
		let route = "/" + this.customerAction + "/" + this.getProcessorName().toLowerCase() + '/';
		this.changeUIState(route);
	}

	/**
	 * here is where we redirect to process transaction
	 */
	processTransaction(nextStep){
		CashierActions.setCurrentStep(nextStep);
		let route = '/' + UIService.getCurrentView() + '/' + UIService.getProcessorName().toLowerCase() + '/ticket/';
		this.changeUIState(route);
	}

	/**
	 * Redirects to confirm route
	 */
	confirmTransaction(){
		CashierActions.setCurrentStep("confirm");
		UIService.changeUIState('/' + UIService.getCurrentView() + '/' + UIService.getProcessorName().toLowerCase() + "/confirm/");
	}

	/**
	 * redirect to a specific route
	 */
	changeUIState(route){
		RouterContainer.get().props.history.push(route);
	}

	/**
	 * Redirect depends of the transaction response
	 */
	processResponse(data){
		let status = 0;
		if(data && data.response && data.response.transaction){
			status = Number(data.response.transaction.caTransactionStatus_Id);
		}

		let ticketResult = 'rejected';
		if(status == cashier.TRANSACTION_STATUS_APPROVED){
			ticketResult = 'approved';
		} else if(status == cashier.TRANSACTION_STATUS_PENDING){
			ticketResult = 'pending';
		} else if(status == cashier.TRANSACTION_STATUS_PROCESSING){
			ticketResult = 'processing';
		} else if(status == cashier.TRANSACTION_STATUS_DEFERRED){
			ticketResult = 'deferred';
		}

		this.changeUIState('/' + this.getCurrentView() + '/' + this.getProcessorName().toLowerCase() + '/ticket/' + ticketResult + '/');
	}

	/**
	 * Redirect depends of the cc transaction response
	 */
	creditCardTransactionResponse(data){

		let layout = 'rejected';
		let transactionDetails = data.response;
		if (transactionDetails && transactionDetails.creditCardTransaction){
			let creditCardTransaction = transactionDetails.creditCardTransaction;
			if(creditCardTransaction && creditCardTransaction.PendingReprocess == 1){
				layout = creditCardTransaction.Layout;
			}
		}

		let ticketResult = 'rejected';
		if(layout == 'card'){
			ticketResult += '/blockByBank';
		} else if(layout == 'amount'){
			ticketResult += '/invalidAmount';
		} else if(layout == 'invalid-card'){
			ticketResult += '/invalidCard';
		}

		this.changeUIState('/' + this.getCurrentView() + '/' + this.getProcessorName().toLowerCase() + '/ticket/' + ticketResult + '/');
	}

	/**
	 * return the origin path
	 *
	 * @returns {*|string}
	 */
	getOriginPath(){
		return CashierStore.getOriginPath();
	}

	/**
	 * get transaction information
	 *
	 * @returns {*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())}}
	 */
	getTransactionInformation(){
		return CashierStore.getTransaction();
	}

	/**
	 * get last customer information
	 *
	 * @returns {*|{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, load: (function(*))}}
	 */
	getCustomerInformation(){
		return CashierStore.getCustomer();
	}

	/**
	 * get company information
	 *
	 * @returns {*|{companyId: number, companyName: string, phone: string, companyLabel: Array, load: (function(*))}}
	 */
	getCompanyInformation(){
		return CashierStore.getCompany();
	}

	/**
	 * return current view
	 *
	 * @returns {*|string}
	 */
	getCurrentView(){
		return CashierStore.getCurrentView();
	}

	/**
	 * get if is withdraw
	 *
	 * @returns {*|int}
	 */
	getIsWithDraw(){
		return CashierStore.getIsWithdraw();
	}

	/**
	 * get current process name
	 *
	 * @returns {string}
	 */
	getProcessorDisplayName(){
		let processor = CashierStore.getProcessor();
		return processor.displayName.toLowerCase();
	}

	/**
	 * get current process name
	 *
	 * @returns {string}
	 */
	getProcessorName(){
		let processor = CashierStore.getProcessor();
		return processor.Name.toLowerCase();
	}

	/**
	 * get current processor id
	 *
	 * @returns {number}
	 */
	getProcessorId(){
		let processor = CashierStore.getProcessor();
		return processor.processorId;
	}

	/**
	 * get the processor currency amount
	 *
	 * @returns {{minAmount: number, maxAmount: number, currencyCode}}
	 */
	getProcessorLimitMinMax(){
		let processor = CashierStore.getProcessor();
		let minAmount = Number(processor.limits.currencyMin);
		let maxAmount = Number(processor.limits.currencyMax);
		let currencyCode = processor.limits.currencyCode;
		return {minAmount: minAmount, maxAmount: maxAmount, currencyCode: currencyCode};
	}

	/**
	 * get the payAccount currency amount
	 *
	 * @returns {Array}
	 */
	getPayAccountLimits(){
		let payAccount = CashierStore.getCurrentPayAccount();
		let limits = [];

		limits.payAccountId = payAccount.payAccountId;
		limits.currencyCode = payAccount.limitsData.currencyCode;
		limits.available = Number(payAccount.limitsData.available);
		limits.availableWithdraw = Number(payAccount.limitsData.availableWithdraw);
		limits.maxAmount = Number(payAccount.limitsData.maxAmount);
		limits.maxAmountWithdraw = Number(payAccount.limitsData.maxAmountWithdraw);
		limits.minAmount = Number(payAccount.limitsData.minAmount);
		limits.minAmountWithdraw = Number(payAccount.limitsData.minAmountWithdraw);

		return limits;
	}

	/**
	 * get the processor/payAccount limits to display
	 *
	 * @param currentAmount [temporally amount]
	 * @returns {{minPayAccount: string, maxPayAccount: string, payAccountId: (*|null|number), remaining: string, currencyCode: *}}
	 */
	getDisplayLimits(currentAmount = 0){
		let transaction = this.getTransactionInformation();
		let processorLimits = this.getProcessorLimitMinMax();
		let payAccountLimits = this.getPayAccountLimits();


		let amount = (currentAmount > 0) ?currentAmount : transaction.amount;
		let fee = (transaction.fee > 0) ?transaction.fee : 0;
		let totalAmount = Number(amount) + Number(fee);
		let currencyCode = processorLimits.currencyCode;

		let remaining = (processorLimits.maxAmount - totalAmount) + " " + currencyCode;
		let minPayAccount = processorLimits.minAmount + " " + currencyCode;
		let maxPayAccount = processorLimits.maxAmount + " " + currencyCode;

		if(payAccountLimits.payAccountId > 0){
			minPayAccount = payAccountLimits.minAmount + " " + currencyCode;
			maxPayAccount = payAccountLimits.maxAmount + " " + currencyCode;
			remaining = (payAccountLimits.maxAmount - totalAmount)  + " " + currencyCode;
		}

		return {minPayAccount: minPayAccount, maxPayAccount: maxPayAccount, payAccountId: payAccountLimits.payAccountId, remaining: remaining, currencyCode: currencyCode}
	}

	/**
	 * Return last transaction cashier response
	 * 
	 * @returns {*|{transactionId: number, journalId: number, amount: string, feeType: string, fee: number, userMessage: string, state: string, details: Array, cleanTransaction: (function())}}
	 */
	getLastTransactionResponse(){
		return CashierStore.getLastTransactionResponse();
	}

	/**
	 * get payAccounts by processor
	 * 
	 * @returns {*}
	 */
	getProcessorPayAccount(){
		return CashierStore.getProcessorPayAccount();
	}

	/**
	 * Function to change current processor
	 */
	selectProcessor(processorID){
		let stepOption = ProcessorSettings.DEPOSIT_STEPS;
		if (this.getIsWithDraw()){
			stepOption = ProcessorSettings.WITHDRAW_STEPS;
		}
		let stepsSetting = ProcessorSettings.settings[processorID][stepOption];
		if(!stepsSetting){
			stepsSetting = ProcessorSettings.settings[0][stepOption];
		}
		let processorSteps = stepsSetting;
		CashierActions.selectProcessor(processorID, processorSteps, processorSteps[0]);
		TransactionService.selectProcessor(processorID);
	};

	/**
	 * Do some actions after processors response
	 */
	customerProcessorsResponse(processor){
		let processorID = processor.response.processors[this.customerAction][0].caProcessor_Id;
		this.selectProcessor(processorID);
	};

	/**
	 * Return current step
	 */
	getCurrentStep() {
		return CashierStore.getCurrentStep();
	};

	/**
	 * Return Processor Steps
	 */
	getCurrentProcessorSteps(){
		return CashierStore.getCurrentProcessorSteps();
	};

	/**
	 * Set first step as current
	 */
	setFirstStep(){

		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let firstStep=this.getCurrentProcessorSteps();
		CashierActions.setCurrentStep(firstStep[0]);
		let route = "/" + this.customerAction + "/";
		this.changeUIState(route);
	};

}

export let UIService = new UiService();
