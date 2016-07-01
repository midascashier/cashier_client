import React from 'react'
import {translate} from '../constants/Translate'
import {CashierActions} from './../actions/CashierActions'
import {CashierStore} from './../stores/CashierStore'
import {controllerUIService} from '../services/ControllerService'

let AmountController = React.createClass({

	getInitialState() {
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			value: CashierStore.getTransaction().amount,
			limits: controllerUIService.getProcessorLimitMinMax()
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
		this.setState({value: amount});
		if(amount >=0){
			if(amount != this.state.value){
				CashierActions.setTransactionAmount(amount);
			}
		}
	},

	render() {
		return (
			<div id="amountController" className="form-group">
				<label for="">{translate('PROCESSING_AMOUNT', 'Amount')}:</label>
				<input className="form-control" type="number" id="amount" name="amount" onChange={this.changeValue} value={this.state.value}/>
				<span>{translate('PROCESSING_MIN', 'Min')}: {this.state.limits.minAmount} - {translate('PROCESSING_MAX', 'Max')}: {this.state.limits.maxAmount}</span>
			</div>
		)
	}
});

module.exports.AmountController = AmountController;
