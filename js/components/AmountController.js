import React from 'react'
import { translate } from '../constants/Translate'
import  errorMsgs  from '../constants/ErrorMsgs'
import Cashier from '../constants/Cashier'
import { UIService } from '../services/UIService'
import { CashierStore } from '../stores/CashierStore'

let AmountController = React.createClass({
	propTypes: {
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
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
		let customer = CashierStore.getCustomer();
		let limitsErrorMsg;
		let limitsOK = false;
		let amountFieldDisable = true;
		if(limits.minAmount && limits.maxAmount){
			amountFieldDisable = false;
		}
		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS || this.props.limitsCheck == Cashier.LOADING){
			limitsOK = true;
		} else{
			limitsErrorMsg = errorMsgs.limitsMsgs[this.props.limitsCheck];
		}

		let action;
		let isWithDraw = UIService.getIsWithDraw();
		if (isWithDraw){
			action = translate('WITHDRAW');
		}
		else{
			action = translate('DEPOSIT');
		}

		return (
			<div id="amountController">
				<label className="col-sm-4 control-label">{action} {translate('PROCESSING_AMOUNT', 'Amount')}:</label>
				<div className="col-sm-8">
					<input className="form-control" type="number" autoComplete="off" disabled={amountFieldDisable} id="amount"
								 name="amount" onChange={this.changeValue} value={this.props.amount} min="0" required/>
					<span>{translate('PROCESSING_MIN', 'Min')}: {limits.minAmount} {customer.currency}
						- {translate('PROCESSING_MAX', 'Max')}: {limits.maxAmount} {customer.currency}</span><br/>
					{(() =>{
						if(!limitsOK && this.props.amount != ""){
							return (
								<div className="alert alert-danger" role="alert">
									<i className="fa fa-thumbs-o-down red"></i>
									<strong>{limitsErrorMsg}</strong>
								</div>
							)
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.AmountController = AmountController;