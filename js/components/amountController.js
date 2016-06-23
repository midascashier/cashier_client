import React from 'react'
import {CashierActions} from './../actions/cashierActions'
import {CashierStore} from './../stores/CashierStore'

let AmountController = React.createClass({

	getInitialState() {
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			value: CashierStore.getTransaction().amount
		}
	},

	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	changeValue(event) {
		let amount = event.currentTarget.value;
		amount = amount.replace(/[^0-9\-]/g,'');
		this.setState({value: amount});
		if (amount){
			if (amount != this.state.value) {
				CashierActions.setTransactionAmount(amount);
			}
		}
	},

	render() {
		return (
			<div>
				<input
					type="number"
					name="amountController"
					onChange={this.changeValue}
					value={this.state.value}
				/>
			</div>
		)
	}
});

module.exports.AmountController=AmountController;