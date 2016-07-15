import React from 'react'
import { UIService } from '../../../../services/UIService'
import { TransactionService } from '../../../../services/TransactionService'
import { CashierStore } from '../../../../stores/CashierStore'

let VisaRejectCardTicket = React.createClass({

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
			<div id="visaRejectCardTicket">
				<div className="row">
					<div className="col-sm-12">
						<div className="rejected-message">
							<div className="title">Quick fix...</div>
							<p>Your credit card was not recognized because of incorrect information.  Please double-check the information below and make sure it's all correct.</p>
							<p>After that, we can get you to the poker tables with your stack of chips.  Say when...</p>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">
								<div className="col-sm-6 ">
									<div className="box">
										<div className="row">
											<div className="col-sm-12">
												<div className="row">
													<div className="col-sm-12">
														<div className="title">Double-check Your Billing Information</div>
														<div className="infoCol">
															<ul>
																<li>Owen Gaines</li>
																<li>1.5 KM South of Whiskey Bar</li>
																<li>Santa Ana</li>
																<li>Costa Rica 00000</li>
															</ul>
															<p><i className="fa fa-pencil green"></i><a href="#">Edit the billing address</a></p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="box">
										<div className="row">
											<div className="col-sm-12">
												<div className="row">
													<div className="col-sm-12">
														<div className="title">Double-check Your Billing Information</div>
														<div className="card-info">
															<div className="table-responsive">
																<table className="table table-striped">
																	<tbody>
																	<tr>
																		<td>Card Holder's Name:</td>
																		<td><span>Lycka</span></td>
																	</tr>
																	<tr>
																		<td>Credit Card Number:</td>
																		<td><span>12678429384792</span></td>
																	</tr>
																	<tr>
																		<td>Expiration Date:</td>
																		<td><span>06/18</span></td>
																	</tr>
																	<tr>
																		<td>CVV:</td>
																		<td><span>756</span></td>
																	</tr>
																	<tr>
																		<td>Amount:</td>
																		<td><span>$500</span></td>
																	</tr>
																	</tbody></table>
															</div>
															<p><i className="fa fa-pencil green"></i><a href="#">Edit the deposit details</a></p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-12">
									<button type="button" className="btn btn-green" onClick={this.reProcessTransaction}>I fixed it. Try again.</button>
									<p><a onClick={this.setFirstStep}>No thanks.  I'll deposit a different way.</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaRejectCardTicket = VisaRejectCardTicket;

