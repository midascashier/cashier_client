import {CashierStore} from '../stores/CashierStore'
import {CashierActions} from '../actions/CashierActions'
import RouterContainer from './RouterContainer'

class ControllerUIService {

	loginSuccess(){
		this.setCurrentStep(1);
		let nextPath = "/" + this.getCurrentView() + "/";
		RouterContainer.get().props.history.push(nextPath);
	}

	getNextStep(){
		let getNextStep = "/";
		if(this.getCurrentStep() == 1){
			getNextStep += this.getCurrentView() + "/" + this.processorDisplayName() + "/";
		}
		if(this.getCurrentStep() == 2){
			let nextAction = "ticket/";
			getNextStep += this.getCurrentView() + "/" + this.processorDisplayName() + "/" + nextAction;
		}
		return getNextStep;
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

	processorDisplayName(){
		let processor = CashierStore.getProcessor();
		return processor.displayName.toLowerCase();
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

	ticketRedirect(transactionStatusId){
		let getNextStep = "/" + this.getCurrentView() + "/" + this.processorDisplayName() + "/";
		this.setCurrentStep(3);
		switch(transactionStatusId){
			case 1:
				break;
			default:
				getNextStep += "ticket/rejected";
				RouterContainer.get().props.history.push(getNextStep);
				break;
		}
	}

}

export let controllerUIService = new ControllerUIService();
