import React from 'react'
import {Steps} from './headerComponents/Steps'
import {Info} from './headerComponents/Info'
import {CashierStore} from './../stores/CashierStore'
import {CashierActions} from './../actions/CashierActions'


let Header = React.createClass({
	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState(){
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
	 * this function sets and return object with local states
	 *
	 * @returns {{step: (*|string), processorSteps: *}}
	 */
	refreshLocalState() {
		return {
			step: CashierStore.getCurrentStep(),
			processorSteps: CashierStore.getProcessorSteps()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		if (this.isMounted() === true) {
			this.setState(this.refreshLocalState());
		}
	},

	/**
	 * this function returns customer selected option
	 *
	 * @returns {*}
	 */
	customerAction(){
		if (!this.props.isWithDraw) {
			return "deposit";
		}
		else {
			return "withdraw";
		}
	},

	render() {
		let step = this.state.step;
		let steps = this.state.processorSteps;
		let customerAction = this.customerAction();
		return (
			<div id="header">
				{(() => {
					if (step < 3) {
						return <Steps step={step} steps={steps} customerAction={customerAction} linkToDepositStep={this.linkToDepositStep}/>
					}
				})()}
				<Info />
			</div>
		)
	}
});

module.exports.Header = Header;