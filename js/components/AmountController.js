import React from 'react'
import { translate } from '../constants/Translate'
import { CashierActions } from './../actions/CashierActions'
import { CashierStore } from './../stores/CashierStore'
import { UIService } from '../services/UIService'

let AmountController = React.createClass({

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
			value: CashierStore.getTransaction().amount,
			limits: UIService.getProcessorLimitMinMax()
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
	 * Set transaction amount in the store
	 *
	 * @param event
	 */
	changeValue(event) {
		let amount = event.currentTarget.value;
		amount = amount.replace(/[^0-9\-]/g, '');
		this.setState({ value: amount });
		if(amount >= 0){
			if(amount != this.state.value){
				CashierActions.setTransactionAmount(amount);
			}
		}
	},

	render() {
		return (
			<div id="amountController" className="form-group">
				<label for="">{translate('PROCESSING_AMOUNT', 'Amount')}:</label>
				<input className="form-control" type="number" id="amount" name="amount" onChange={this.changeValue}
							 value={this.state.value}/>
				<span>{translate('PROCESSING_MIN', 'Min')}: {this.state.limits.minAmount} - {translate('PROCESSING_MAX', 'Max')}: {this.state.limits.maxAmount}</span>
			</div>
		)
	}
});

module.exports.AmountController = AmountController;
