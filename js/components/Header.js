import React from 'react'
import {Steps} from './headerComponents/Steps'
import {Info} from './headerComponents/Info'
import {CashierStore} from './../stores/CashierStore'

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
			step: CashierStore.getCurrentStep(), processorSteps: CashierStore.getProcessorSteps(), isWithDraw: CashierStore.getIsWithdraw(), UI: CashierStore.getUI()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	render() {
		let step = this.state.step;
		let steps = this.state.processorSteps;
		let isWithDraw = this.state.isWithDraw;
		let currentView = this.state.UI.currentView;

		return (
			<div id="header">
				{(() =>{
					if(step < 3){
						return <Steps isWithDraw={isWithDraw} step={step} steps={steps} customerAction={currentView}/>
					}
				})()}
				<Info />
			</div>
		)
	}
});

module.exports.Header = Header;