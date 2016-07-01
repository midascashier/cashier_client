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
		let getNextStep = "/" + this.getCurrentView() + "/" + this.getProcessorDisplayName() + "/";
		if(this.getCurrentStep() == 1){
			this.showStepsHeader=1;
			return getNextStep;
		}

		if(this.getProcessorId() == 333){
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

		if(this.getProcessorId() == 814){
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
