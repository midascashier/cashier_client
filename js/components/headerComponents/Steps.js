import React from 'react'
import {translate} from '../../constants/Translate'
import {Link} from 'react-router'
import {UIService} from '../../services/UIService'
import {TransactionService} from '../../services/TransactionService'
import {CashierStore} from '../../stores/CashierStore'

let Steps = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{step: (*|string), processorSteps: *}}
	 */
	refreshLocalState(){
		return {
			currentProcessor: TransactionService.getCurrentProcessor(),
			currentProcessorSteps: UIService.getCurrentProcessorSteps(),
			currentStep: UIService.getCurrentStep(),
			currentView: "/" + UIService.getCurrentView() + "/"
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	render(){
		let stepTexts = {
			"selectMethod": UIService.getIsWithDraw() ? translate('STEPS_WITHDRAW_METHOD', 'Withdraw Method') : translate('STEPS_DEPOSIT_METHOD', 'Deposit Method'),
			"askInfo": UIService.getIsWithDraw() ? translate('STEPS_HOW_MUCH_WITHDRAW', 'How Much?') : translate('STEPS_HOW_MUCH_DEPOSIT', 'How Much?'),
			"confirm": translate('STEPS_CONFIRMATION', 'Confirmation'),
			"instructions": translate('STEPS_INSTRUCTIONS', 'Instructions')
		};

		let processorSteps = this.state.currentProcessorSteps;
		let stepsNumber = processorSteps.length;
		let stepsClass = (stepsNumber == 2) ? 'two-steps' : 'steps';
		let currentView = this.state.currentView;
		let currentStep = this.state.currentStep;
		let currentPosition = processorSteps.indexOf(currentStep);

		return (
			<div id="steps" className={stepsClass}>
				{(() => {
					let stepDisplay = [];

					for(let i = 0; i < stepsNumber; i++){
						let stepName = processorSteps[i];
						let className = "step" + (i + 1);

						if(currentPosition >= i || currentPosition == -1){
							className += " active";
						}else{
							switch(i){
								case 1:
									if(stepsNumber == 2){
										className += " inactive";
									}else{
										className += " inactive";
									}
									break;

								case 2:
									if(currentPosition == 1){
										className += " inactive";
									}else{
										className += " normal";
									}
									break;

								default:
									className += " inactive";
							}
						}

						let step;
						if(i == 0){
							step = (
								<Link key={i + 1} to={currentView}>
									<div onClick={this.setFirstStep} className={className}>
										<p>
											<span>{i + 1}</span>
											{stepTexts[stepName]}
										</p>
									</div>
								</Link>
							);
						}else{
							step = (
								<div key={i + 1} className={className}>
									<p>
										<span>{i + 1}</span>
										{stepTexts[stepName]}
									</p>
								</div>
							);
						}
						stepDisplay.push(step);
					}
					return stepDisplay;
				})()}
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.Steps = Steps;
