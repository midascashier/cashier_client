import React from 'react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'

let AstroPayApprovedTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{address}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{balance: string, email: string, currencyAmount: string, descriptor: string}}
	 */
	refreshLocalState() {
		let customer = UIService.getCustomerInformation();
		let transaction = UIService.getTransactionInformation();
		let transactionResponse = UIService.getLastTransactionResponse();
		let descriptor = "Loading...";
		if (transactionResponse && transactionResponse.details && transactionResponse.details.creditCardTransaction){
			descriptor = transactionResponse.details.creditCardTransaction.Descriptor;
		}
		return {
			email: customer.personalInformation.email,
			currency: customer.currency,
			balance: customer.balance,
			currencyAmount: transaction.amount,
			descriptor: descriptor
		}
	},

	/**
	 * component is ready
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {
		let originPath = UIService.getOriginPath();
		let currencyAmount = this.state.currencyAmount;
		let currency = this.state.currency;
		let email = this.state.email;
		let balance = this.state.balance;

		return (
			<div className="internal-content" id="astroPayApprovedTicket">
				<div className="row">
					<div className="col-sm-6">
						<div className="box">
							<a href="" target="_blank">
								<img className="img-responsive banner" src={originPath + '/images/ad.jpg'} alt=""/>
							</a>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="success-message">
							<i className="fa fa-check-circle-o green"></i>
							<div className="title">Your {currencyAmount + ' ' + currency} deposit was successful.</div>
							<p>Your balance is now {balance + ' ' + currency}</p>
							<p>An email has been sent to {email} with the transaction details.</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.AstroPayApprovedTicket = AstroPayApprovedTicket;

