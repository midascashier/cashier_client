import React from 'react'
import { translate } from '../../constants/Translate'
import { Link } from 'react-router'
import { UIService } from '../../services/UIService'
import { TransactionService } from '../../services/TransactionService'
import { CashierStore } from '../../stores/CashierStore'

let Steps = React.createClass({
	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState() {
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{step: (*|string), processorSteps: *}}
	 */
	refreshLocalState() {
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
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	setFirstStep() {
		UIService.setFirstStep();
	},

	render() {
		let stepTexts = {
			"selectMethod": UIService.getIsWithDraw() ? translate('STEPS_WITHDRAW_METHOD') : translate('STEPS_DEPOSIT_METHOD'),
			"askInfo": UIService.getIsWithDraw() ? translate('STEPS_HOW_MUCH_WITHDRAW') : translate('STEPS_HOW_MUCH_DEPOSIT'),
			"confirm": translate('STEPS_CONFIRMATION')
		};

		return (
			<div id="steps" className="steps">
				{(() =>{
					let stepDisplay = [];
					if(this.state.currentStep != 'ticket'){

						let currentPosition = this.state.currentProcessorSteps.indexOf(this.state.currentStep);

						for(let i = 0; i < this.state.currentProcessorSteps.length; i++){
							let stepName = this.state.currentProcessorSteps[i];

							let className = "step" + (i + 1);

							if(this.state.currentProcessorSteps.indexOf(this.state.currentStep) >= i){
								className += " active";
							} else{
								className += " normal";
							}

							let step;
							if(i == 0){
								step = (
									<Link key={i+1} to={this.state.currentView}>
										<div onClick={this.setFirstStep} className={className}>
											<p>
												<span>{i + 1}</span>
												{stepTexts[stepName]}
											</p>
										</div>
									</Link>
								);
							} else{
								step = (
									<div key={i+1} className={className}>
										<p>
											<span>{i + 1}</span>
											{stepTexts[stepName]}
										</p>
									</div>
								);
							}
							stepDisplay.push(step);
						}
					}
					return stepDisplay;
				})()}
			</div>
		)
	}
});

module.exports.Steps = Steps;
