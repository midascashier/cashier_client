import React from 'react'
import { CashierActions } from './../actions/CashierActions'
import { CashierStore } from './../stores/CashierStore'
import { translate } from '../constants/Translate'

let FeeController = React.createClass({

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
			value: CashierStore.getTransaction().fee
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

	/**
	 * Set fee amount in the store
	 *
	 * @param event
	 */
	changeValue(event) {
		let amount = event.currentTarget.value;
		amount = amount.replace(/[^0-9\-]/g, '');
		this.setState({ value: amount });
		if(amount){
			if(amount != this.state.value){
				CashierActions.setTransactionFee(amount);
			}
		}
	},

	render() {
		return (
			<div>
				{translate('PROCESSING_FEE', 'Fee')}:
				<input className="form-control" type="number" id="feeController" name="feeController"
							 onChange={this.changeValue} value={this.state.value}/>
			</div>
		)
	}
});

module.exports.FeeController = FeeController;
