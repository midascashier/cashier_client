import React from 'react'
import { UIService } from '../../../../services/UIService'
import { TransactionService } from '../../../../services/TransactionService'
import { CashierStore } from '../../../../stores/CashierStore'
import { VisaRejectBankTicket } from './RejectBankTicket'
import { VisaRejectAmountTicket } from './RejectAmountTicket'
import { VisaRejectCardTicket } from './RejectCardTicket'

let VisaRejectedTicket = React.createClass({

	/**
	 * initialize the state
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 */
	refreshLocalState() {
		let transactionResponse = UIService.getLastTransactionResponse();
		let details = [];
		if (transactionResponse && transactionResponse.details && transactionResponse.details.creditCardTransaction){
			details = transactionResponse.details.creditCardTransaction;
		}
		return {
			transactionDetails: details
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

	/**
	 * reprocesses a credit card transaction that just failed.
	 */
	reProcessTransaction(){
		TransactionService.processCC();
	},

	render() {
		let transactionDetails = this.state.transactionDetails;
		return (
			<div id="visaRejectedTicket">
				{(() =>{
					if(transactionDetails && transactionDetails.PendingReprocess == 1){
						let layout = transactionDetails.Layout;
						switch(layout){
							case 'card':
								return <VisaRejectBankTicket/>;
								break;
							case 'amount':
								return <VisaRejectAmountTicket/>;
								break;
							case 'invalid-card':
								return <VisaRejectCardTicket/>;
								break;
							default:
								return <h3>{transactionDetails.UserMassage}</h3>
						}
					}else{
						return (
							<div className="col-sm-12">
								<div className="modules">
									<div className="row">
										<div className="col-sm-12">
											<div className="alert alert-danger" role="alert">
												<i className="fa fa-ban red"></i>
												<strong>Transaction Rejected</strong>
												<p><strong>Unfortunately</strong>, we were unable to process your deposit for $ at this time. Perhaps
													our Customer Support team can help. Call us at 877-314-4195 or Live Chat. Or, you could try a
													different deposit method.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					}
				})()}
			</div>
		)
	}
});

module.exports.VisaRejectedTicket = VisaRejectedTicket;
