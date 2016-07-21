import React from 'react'
import { CashierStore } from './../stores/CashierStore'
import { translate } from '../constants/Translate'

let FeeController = React.createClass({

	propTypes: {
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number
	},

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
			processor: CashierStore.getProcessor()
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
	 * Return option element to a html select
	 *
	 * @param item
	 * @param key
	 * @returns {XML}
	 */
	renderOption(item, key){
		return (
			<option key={key} value={key}>{item.label}</option>
		)
	},

	render() {
		let fees = this.state.processor.fees;
		let customer = CashierStore.getCustomer();
		let options = [];
		if(fees.enableFree == 1){ options.push(this.renderOption({ label: "Free" }, "Free")) }
		if(fees.enableBP == 1){ options.push(this.renderOption({ label: "Betpoints" }, "Betpoints")) }
		if(fees.enableCash == 1){ options.push(this.renderOption({ label: "Cash" }, "Cash")) }
		return (
			<div>
				{(() =>{
					if(fees.enableBP == 1 || fees.enableFree == 1 || fees.enableCash == 1){
						return (
							<div>
								<label for="" className="control-label">{translate('PROCESSING_FEE', 'Fee')}:</label>
								<select className="form-control">{options}</select>
								Fee: {this.props.feeCashValue} - Balance: {Math.round(customer.balance * 100) / 100}
							</div>)
					}
				})()}
				{(() =>{
					if(this.props.feeCheck && this.props.amount != ""){
						return <span>You don't have enough balance to cover the required fees</span>
					}
				})()}
			</div>
		)
	}
});

module.exports.FeeController = FeeController;
