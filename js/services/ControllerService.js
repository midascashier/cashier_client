import {CashierStore} from '../stores/CashierStore'
import {CashierActions} from '../actions/CashierActions'
import RouterContainer from './RouterContainer'

class ControllerUIService {

	loginSuccess() {
		this.setCurrentStep(1);
		let nextPath = "/" + this.getCurrentView() + "/";
		RouterContainer.get().props.history.push(nextPath);
	}

	getNextStep() {
		if (this.getCurrentStep()==1) {
			let getNextStep = "/";
			getNextStep += this.getCurrentView() + "/" + this.processorDisplayName()+"/";
			return getNextStep;
		}
	}

	getOriginPath() {
		return CashierStore.getOriginPath();
	}

	getCurrentView() {
		return CashierStore.getCurrentView();
	}

	setCurrentStep(step) {
		CashierActions.setCurrentStep(step);
	}

	getCurrentStep() {
		return CashierStore.getCurrentStep();
	}

	getIsWithDraw() {
		return CashierStore.getIsWithdraw();
	}

	processorDisplayName(){
		let processor =  CashierStore.getProcessor();
		return processor.displayName;
	}

}

export let controllerUIService = new ControllerUIService();
