import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import { TransactionService } from './TransactionService'
import RouterContainer from './RouterContainer'

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
	 * get last transaction information
	 *
	 * @returns {*}
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
	CustomerProcessorsResponse(processor) {
		let processorID = processor.response.processors[this.customerAction][0].caProcessor_Id;
		this.selectProcessor(processorID);
	}

}

export let UIService = new UiService();
