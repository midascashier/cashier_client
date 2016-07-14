import React from 'react'
import { UIService } from '../../../../services/UIService'
import { TransactionService } from '../../../../services/TransactionService'
import { CashierStore } from '../../../../stores/CashierStore'

let VisaRejectAmountTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{transaction}|{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())})}}
	 */
	refreshLocalState() {
		let transaction = UIService.getTransactionInformation();
		return {
			transaction: transaction
		}
	},

	/**
	 * component is ready
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	},

	/**
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * reprocesses a credit card transaction that just failed.
	 */
	reProcessTransaction(){
		TransactionService.processCC();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
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
								<button type="button" className="btn btn-green" onClick={this.reProcessTransaction}>Complete this deposit</button>
								<p><a onClick={this.setFirstStep}>No thanks.  I'll deposit a different way.</a></p>

							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaRejectAmountTicket = VisaRejectAmountTicket;