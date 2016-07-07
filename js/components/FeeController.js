import React from 'react'
import { CashierActions } from './../actions/CashierActions'
import { CashierStore } from './../stores/CashierStore'
import { translate } from '../constants/Translate'

let FeeController = React.createClass({

	getInitialState() {
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			value: CashierStore.getTransaction().fee
		}
	},

	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

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
