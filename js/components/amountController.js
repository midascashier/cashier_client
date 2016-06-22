import React from 'react'
import {CashierActions} from './../actions/cashierActions'
import {CashierStore} from './../stores/CashierStore'

let AmountController = React.createClass({

	getInitialState: function() {
		return this.refreshLocalState();
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			value: CashierStore.getTransaction().amount
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
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
					type={this.props.type || 'text'}
					name={this.props.name}
					onChange={this.changeValue}
					value={this.state.value}
				/>
			</div>
		);
	}
});

module.exports.AmountController=AmountController;