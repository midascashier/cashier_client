import React from 'react'
import { translate } from '../constants/Translate'
import { UIService } from '../services/UIService'

let AmountController = React.createClass({
	propTypes: {
		transactionAmount: React.PropTypes.func,
		amount: React.PropTypes.number
	},

	/**
	 * Set transaction amount in the store
	 *
	 * @param event
	 */
	changeValue(event) {
		let amount = event.currentTarget.value;
		amount = Number(amount);
		if (amount !== ""){
			this.props.setAmount(amount);
		}
	},

	render() {
		let limits = UIService.getProcessorLimitMinMax();
		return (
			<div id="amountController" className="form-group">
				<label for="">{translate('PROCESSING_AMOUNT', 'Amount')}:</label>
				<input className="form-control" type="number" id="amount" name="amount" onChange={this.changeValue}
							 value={this.props.amount}/>
				<span>{translate('PROCESSING_MIN', 'Min')}: {limits.minAmount}
					- {translate('PROCESSING_MAX', 'Max')}: {limits.maxAmount}</span>
			</div>
		)
	}
});

module.exports.AmountController = AmountController;