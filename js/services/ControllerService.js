import { CashierStore } from '../stores/CashierStore'
import { CashierActions } from '../actions/CashierActions'
import Cashier from '../constants/Cashier'
import RouterContainer from './RouterContainer'

class ControllerUIService {

	/**
	 * Redirect to first screen after login success
	 */
	loginSuccess(){
		this.setCurrentStep(1);
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
	 * redirect to next steps depends of the processor and customer option
	 *
	 * @returns {string}
	 */
	getNextStep(){
		let getNextStep = "/" + this.getCurrentView() + "/" + this.getProcessorDisplayName() + "/";
		if(this.getCurrentStep() == 1){
			this.showStepsHeader = 1;
			return getNextStep;
		}

		if(this.getProcessorId() == Cashier.PROCESSOR_ID_NETELLER){
			if(this.getIsWithDraw()){

			} else{
				if(this.getCurrentStep() == 2){
					let nextAction = "ticket/";
					this.showStepsHeader = 1;
					getNextStep += nextAction;
					this.setCurrentStep(3);
				}

				if(this.getCurrentStep() == 3){
					let nextAction = "ticket/rejected";
					this.showStepsHeader = 0;
					getNextStep += nextAction;
				}
			}
		}

		if(this.getProcessorId() == Cashier.PROCESSOR_ID_BITCOIN){
			if(this.getIsWithDraw()){
				if(this.getCurrentStep() == 3){
					this.setCurrentStep(4);
					let nextAction = "ticket/";
					getNextStep += nextAction;
				}

				if(this.getCurrentStep() == 2){
					let nextAction = "confirm/";
					getNextStep += nextAction;
				}

				if(this.getCurrentStep() == 4){
					let nextAction = "approved";
					this.showStepsHeader = 0;
					getNextStep += nextAction;
				}
			} else{
				if(this.getCurrentStep() == 2){
					let nextAction = "ticket/";
					getNextStep += nextAction;
				}
				if(this.getCurrentStep() == 3){
					let transactionResponse = CashierStore.getLastTransactionResponse();
					if(transactionResponse.status || transactionResponse.userMessage){
						if(transactionResponse.status == Cashier.TRANSACTION_STATUS_PENDING){
							let nextAction = "ticket/instructions";
							getNextStep += nextAction;
						} else{
							let nextAction = "ticket/rejected";
							getNextStep += nextAction;
						}
					} else{
						getNextStep += "ticket/";
					}
				}
			}
		}

		if(this.getProcessorId() == Cashier.PROCESSOR_ID_VISA){
			if(this.getCurrentStep() == 2){
				let nextAction = "confirm/";
				getNextStep += nextAction;
			} else if(this.getCurrentStep() == 3){
				let transactionResponse = CashierStore.getLastTransactionResponse();
				if(transactionResponse.status || transactionResponse.userMessage){
					if(transactionResponse.status == Cashier.TRANSACTION_STATUS_APPROVED){
						let nextAction = "ticket/approved";
						getNextStep += nextAction;
					} else{
						let nextAction = "ticket/rejected";
						getNextStep += nextAction;
					}
				} else{
					getNextStep += "ticket/";
				}
			} else{
				getNextStep = "";
			}
		}

		return getNextStep;
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
	 * set current step
	 *
	 * @param step
	 */
	setCurrentStep(step){
		CashierActions.setCurrentStep(step);
	}

	/**
	 * return current step
	 *
	 * @returns {*|string}
	 */
	getCurrentStep(){
		return CashierStore.getCurrentStep();
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
	 * redirect to ticket after process response
	 *
	 */
	ticketRedirect(){
		let nextStep = this.getNextStep();
		if(nextStep){
			RouterContainer.get().props.history.push(nextStep);
		}
	}

}

export let controllerUIService = new ControllerUIService();
