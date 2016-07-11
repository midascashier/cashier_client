import React from 'react'
import { translate } from '../../constants/Translate'
import { Link } from 'react-router'
import { UIService } from '../../services/UIService'
import { TransactionService } from '../../services/TransactionService'
import  ProcessorSettings from '../../constants/Processors'
import { CashierStore } from '../../stores/CashierStore'

let Steps = React.createClass({
	/**
	 * React function to set component inital state
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
			currentProcessor: TransactionService.getCurrentProcessor()
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

	render() {
		let step1 = "step1";
		let step2 = "step2";
		let step3 = "step3";
		let currentView = "/" + UIService.getCurrentView() + "/";

		switch(this.props.step){
			case 1:
				step1 += " active";
				step2 += " normal";
				step3 += " normal";
				break;
			case 2:
				step1 += " normal";
				step2 += " active";
				step3 += " inactive";
				break;
			case 3:
				step1 += " normal";
				step2 += " inactive";
				step3 += " active";
				break;
			default:
				break
		}

		let steps_method = translate('STEPS_DEPOSIT_METHOD');
		let steps_how_much = translate('STEPS_HOW_MUCH_DEPOSIT');
		let proccesorNumSteps =ProcessorSettings.DEPOSIT_SETTING_NUM_OF_STEPS;
		if(UIService.getIsWithDraw()){
			steps_method = translate('STEPS_WITHDRAW_METHOD');
			steps_how_much = translate('STEPS_HOW_MUCH_WITHDRAW');
			proccesorNumSteps = ProcessorSettings.WITHDRAW_SETTING_NUM_OF_STEPS
		}

		let headerNumSteps= 0;
		let stepsNumber = ProcessorSettings.settings[this.state.currentProcessor.processorId];
		if (stepsNumber){
			headerNumSteps = stepsNumber[proccesorNumSteps];
		}

		return (
			<div id="steps" className="steps">
				<Link to={currentView}>
					<div className={step1}>
						<p>
							<span>1</span>
							{steps_method}
						</p>
					</div>
				</Link>
				<div className={step2}>
					<p>
						<span>2</span>
						{steps_how_much}
					</p>

				</div>
				{(() =>{
					if(headerNumSteps > 2){
						let thirdStep = <div key="1" className={step3}><p><span>3</span>{translate('STEPS_BILLING_INFO')}</p></div>;
						let thirdStep2 = <div key="2" className={step3} hidden='hidden'><p>
							<span>3</span>{translate('STEPS_INSTRUCTIONS')}</p></div>;
						return ([thirdStep, thirdStep2]);
					}
				})()}
			</div>
		)
	}
});

module.exports.Steps = Steps;
