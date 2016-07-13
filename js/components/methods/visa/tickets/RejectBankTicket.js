import React from 'react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'

let VisaRejectBankTicket = React.createClass({

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
			<div className="internal-content" id="visaRejectBankTicket">
				<div className="row">
					<div className="col-sm-12">
						<div className="rejected-message">
							<div className="title">Quick fix...</div>
							<p>Your credit card account is not setup to accept international transactions. You can call them and ask them to allow international transactions.</p>
							<p>After that, we can get you to the poker tables with your stack of chips.  We'll give you a few minutes to take care of it: 3:32</p>
							<button type="button" className="btn btn-green">I took care of it. Try again</button>
							<p><a href="#">No thanks.  I'll deposit a different way.</a></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaRejectBankTicket = VisaRejectBankTicket;

