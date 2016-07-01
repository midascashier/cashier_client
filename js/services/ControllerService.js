import {CashierStore} from '../stores/CashierStore'
import {CashierActions} from '../actions/CashierActions'
import Cashier from '../constants/Cashier'
import RouterContainer from './RouterContainer'

class ControllerUIService {

	loginSuccess(){
		this.setCurrentStep(1);
		let nextPath = "/" + this.getCurrentView() + "/";
		RouterContainer.get().props.history.push(nextPath);
	}

	getNextStep(){
		let getNextStep = "/" + this.getCurrentView() + "/" + this.getProcessorDisplayName() + "/";
		if(this.getCurrentStep() == 1){
			this.showStepsHeader=1;
			return getNextStep;
		}

		if(this.getProcessorId() == Cashier.PROCESSOR_ID_NETELLER){
			if(this.getCurrentStep() == 2){
				let nextAction = "ticket/";
				this.showStepsHeader=1;
				getNextStep += nextAction;
			}

			if(this.getCurrentStep() == 3){
				let nextAction = "ticket/rejected";
				this.showStepsHeader=0;
				getNextStep += nextAction;
			}
		}

		if(this.getProcessorId() == Cashier.PROCESSOR_ID_BITCOIN){
			if(this.getCurrentStep() == 2 && this.getIsWithDraw()){
				let nextAction = "confirm/";
				getNextStep += nextAction;
			}

			if(this.getCurrentStep() == 2 && !this.getIsWithDraw()){
				let nextAction = "ticket/instructions";
				getNextStep += nextAction;
			}

			if(this.getCurrentStep() == 3 && !this.getIsWithDraw()){
					getNextStep = "";
			}
		}

		if(this.getProcessorId() == Cashier.PROCESSOR_ID_VISA){
			if(this.getCurrentStep() == 2){
				let nextAction = "confirm/";
				getNextStep += nextAction;
			}

			if(this.getCurrentStep() == 3){3
				let transactionResponse = this.getLastTransactionResponse();
				if(transactionResponse.status == Cashier.TRANSACTION_STATUS_APPROVED){
					getNextStep = "ticket/approved";
				}else{
					getNextStep = "ticket/rejected";
				}
			}
		}

		return getNextStep;
	}

	getShowStepsHeader(){
		return this.showStepsHeader;
	}

	getOriginPath(){
		return CashierStore.getOriginPath();
	}

	getCurrentView(){
		return CashierStore.getCurrentView();
	}

	setCurrentStep(step){
		CashierActions.setCurrentStep(step);
	}

	getCurrentStep(){
		return CashierStore.getCurrentStep();
	}

	getIsWithDraw(){
		return CashierStore.getIsWithdraw();
	}

	getProcessorDisplayName(){
		let processor = CashierStore.getProcessor();
		return processor.displayName.toLowerCase();
	}

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

	getLastTransactionResponse(){
		return CashierStore.getLastTransactionResponse();
	}

	ticketRedirect(transactionStatusId){
		this.setCurrentStep(3);
		switch(transactionStatusId){
			case 1:
				break;
			default:
				let nextStep = this.getNextStep();
				if (nextStep){
					RouterContainer.get().props.history.push(nextStep);
				}
				break;
		}
	}

}

export let controllerUIService = new ControllerUIService();
