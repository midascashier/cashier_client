import React from 'react'
import { translate } from '../constants/Translate'
import { UIService } from '../services/UIService'

let AmountController = React.createClass({
	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.number,
		amount: React.PropTypes.node
	},

	/**
	 * Set transaction amount in the store
	 *
	 * @param event
	 */
	changeValue(event) {
		let amount = event.currentTarget.value;
		this.props.setAmount(amount);
	},

	render() {
		let limits = UIService.getProcessorLimitMinMax();
		return (
			<div id="amountController">
				<label>{translate('PROCESSING_AMOUNT', 'Amount')}:</label>
				<input className="form-control" type="number" id="amount" name="amount" onChange={this.changeValue}
							 value={this.props.amount}
							 min="0" required/>
				<span>{translate('PROCESSING_MIN', 'Min')}: {limits.minAmount}
					- {translate('PROCESSING_MAX', 'Max')}: {limits.maxAmount}</span><br/>
				{(() =>{
					if(!this.props.limitsCheck && this.props.amount != ""){
						return <span>LIMITS ERROR</span>
					}
				})()}
			</div>
		)
	}
});

module.exports.AmountController = AmountController;