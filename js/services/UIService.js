import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import { TransactionService } from './TransactionService'
import RouterContainer from './RouterContainer'
import cashier from '../constants/Cashier'

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
		let route = "/" + this.customerAction + "/" + this.getProcessorName().toLowerCase() + '/';
		this.changeUIState(route);
	}

	/**
	 * here is where we redirect to process transaction
	 */
	processTransaction(){
		let route = '/'+UIService.getCurrentView()+'/'+UIService.getProcessorName().toLowerCase()+'/ticket/';
		this.changeUIState(route);
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
		if (status == cashier.TRANSACTION_STATUS_APPROVED){
			ticketResult = 'approved';
		}else if (status == cashier.TRANSACTION_STATUS_PENDING){
			ticketResult = 'pending';
		}else if (status == cashier.TRANSACTION_STATUS_DEFERRED){
			ticketResult = 'deferred';
		}

		this.changeUIState('/'+this.getCurrentView()+'/'+this.getProcessorName().toLowerCase()+'/ticket/'+ticketResult+'/');
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
	 * @returns {Array}
	 */
	getProcessorLimitMinMax(){
		let processor = CashierStore.getProcessor();
		let limits = [];
		limits.minAmount = Number(processor.limits.currencyMin);
		limits.maxAmount = Number(processor.limits.currencyMax);
		return limits;
	}

	/**
	 * Return last transaction cashier response
	 * 
	 * @returns {*|{transactionId: number, journalId: number, status: number, userMessage: string, state: string, transaction: {journalId: null, transactionId: null, payAccountId: null, transactionStatusId: null, journalTransactionStatusId: null, statusName: null, processorId: null, processorIdSelected: null, processorClassId: null, processorName: null, processorDisplayName: null, dateTrans: null, dateTransModified: null, transUniqueId: null, transactionIdProcessor: null, currencyAmount: null, currencyFee: null, amount: null, fee: null, feeBP: null, currencyId: null, currencyCode: null, transactionTypeId: null, transType: null, errorCode: null, errorMessage: null, userMessage: null, journalNotes: null, descriptor: null}, p2pTransaction: {P2PNameId: null, P2PNameStatus_Id: null, payAccountId: null, submitPayAccountId: null, nameId: null, name: null, Country: null, State: null, SenderTimeFrame: null, ControlNumber: null, DateRequest: null, DateUpdate: null, PAFirstName: null, PAMiddleName: null, PALastName: null, PAPhone: null, PAEmail: null, PACity: null, PAState: null, PAStateName: null, PACountry: null, PACountryName: null, currencyAmount: number, amount: number, currencyFee: string, transactionStatusId: null, processorDisplayName: null, errorMessage: null, processorId: null}, bitCoinTransaction: {Address: null}, load: (function(*))}}
	 */
	getLastTransactionResponse(){
		return CashierStore.getLastTransactionResponse();
	}

	/**
	 * Function to change current processor
	 */
	selectProcessor(processorID){
		CashierActions.selectProcessor(processorID);
		TransactionService.selectProcessor(processorID);
	};

	/**
	 * Do some actions after processors response
	 */
	customerProcessorsResponse(processor){
		let processorID = processor.response.processors[this.customerAction][0].caProcessor_Id;
		this.selectProcessor(processorID);
	}

}

export let UIService = new UiService();
