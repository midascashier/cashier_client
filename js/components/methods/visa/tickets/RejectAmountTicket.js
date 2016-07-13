import React from 'react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'

let VisaRejectAmountTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{transaction, transactionResponse}|{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())}), transactionResponse: (*|{transactionId: number, journalId: number, status: number, userMessage: string, state: string, details: Array})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())}), transactionResponse: (*|{transactionId: number, journalId: number, status: number, userMessage: string, state: string, details: Array})}}
	 */
	refreshLocalState() {
		let transaction = UIService.getTransactionInformation();
		let transactionResponse = UIService.getLastTransactionResponse();
		return {
			transaction: transaction,
			transactionResponse: transactionResponse
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
		return (
			<div className="internal-content" id="visaRejectAmountTicket">
				<div className="row">
					<div className="col-sm-12">
						<div className="rejected-message">
							<div className="title">Quick fix...</div>
							<p>Your credit card told us $500 puts you over the credit limit.</p>
							<p>What smaller amount would you like to deposit?</p>
							<div className="form-group">

								<span>Enter a Smaller Deposit Amount:</span>
								<input type="number" name="quantity" defaultValue="0" readOnly/>
								<small>Min: $10 - Max: Check your credit card limit.</small>
								<button type="button" className="btn btn-green">Complete this deposit</button>
								<p><a href="#">No thanks.  I'll deposit a different way.</a></p>

							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaRejectAmountTicket = VisaRejectAmountTicket;