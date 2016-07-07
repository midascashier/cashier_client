import { CashierStore } from '../stores/CashierStore'
import RouterContainer from './RouterContainer'

class ControllerUIService {

	/**
	 * Redirect to first screen after login success
	 */
	loginSuccess(){
		let nextPath = "/" + this.getCurrentView() + "/";
		RouterContainer.get().props.history.push(nextPath);
	}

	/**
	 * redirect to a specific route
	 */
	changeUIState(route){
		RouterContainer.get().props.history.push(route);
	}

	/**
	 * return if steps header should appear
	 *
	 * @returns {number}
	 */
	getShowStepsHeader(){
		return this.showStepsHeader;
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

}

export let controllerUIService = new ControllerUIService();
