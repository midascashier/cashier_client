import React from 'react'
import { Link } from 'react-router'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { transactionService } from '../../../services/TransactionService'
import { controllerUIService } from '../../../services/ControllerService'

let VisaConfirm = React.createClass({

	/**
	 * React function to set component initial state
	 */

	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
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
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			transaction: CashierStore.getTransaction(),
			payAccount: CashierStore.getCurrentPayAccount()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	processTransaction(){
		transactionService.process();
	},

	render(){
		let personalData = this.state.payAccount.personal;
		let secureData = this.state.payAccount.secure;
		let addressData = this.state.payAccount.address;
		let extraData = this.state.payAccount.extra;

		return (
			<div id="confirmBitCoinWithdraw" className="internal-content">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">

								<div className="col-sm-6 ">
									<div className="box">

										<div className="row">

											<div className="col-sm-12">
												<div
													className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>
												<div className="infoCol">
													<ul>
														<li>{personalData.firstName + ' ' + personalData.lastName}</li>
														<li>{addressData.address1}</li>
														<li>{addressData.state}</li>
														<li>{addressData.country + ' ' + addressData.zip}</li>
													</ul>
													<p><i className="fa fa-pencil green"></i><a
														href="#">{translate('PROCESSING_BILLING_INFO_EDIT', 'Edit the billing address')}</a></p>
												</div>
											</div>

										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="box">

										<div className="row">
											<div className="col-sm-12">
												<div className="title">{translate('METHOD_DETAILS_DEPOSIT', 'Deposit Details')}</div>
												<div className="deposit-details">
													<div className="table-responsive">
														<table className="table table-striped">
															<tbody>
															<tr>
																<td>{translate('CREDIT_CARD_HOLDER')}:</td>
																<td><span>{secureData.extra3}</span></td>
															</tr>
															<tr>
																<td>{translate('CREDIT_CARD_NUMBER')}:</td>
																<td><span>{secureData.account}</span></td>
															</tr>
															<tr>
																<td>{translate('CREDIT_CARD_EXPIRATION')}:</td>
																<td><span>{secureData.extra1 + ' / ' + secureData.extra2}</span></td>
															</tr>
															<tr>
																<td>{translate('CREDIT_CARD_CVV')}:</td>
																<td><span>{secureData.password}</span></td>
															</tr>
															<tr>
																<td>{translate('PROCESSING_AMOUNT')}:</td>
																<td><span>{this.state.transaction.amount}</span></td>
															</tr>
															</tbody>
														</table>
													</div>
													<p><i className="fa fa-pencil green"></i><a href="#">Edit the deposit details</a></p>
												</div>
												<form className="form-horizontal infoCol">
													<div className="form-group">
														<label for="" className="col-sm-4 control-label">{translate('CREDIT_CARD_SSN')}:</label>
														<div className="col-sm-8">
															<input type="text" className="form-control" id="ssn" defaultValue={extraData.ssn}
																		 autoComplete="off" readOnly/>
														</div>
													</div>
													<div className="form-group">
														<label for="" className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
														<div className="col-sm-8">
															<input type="date" className="form-control" id="dob" value={extraData.dob} readOnly/>
														</div>
													</div>
														<button type="submit" onClick={this.processTransaction}
																		className="btn btn-green">{translate('PROCESSING_BUTTON_COMPLETE_DEPOSIT', 'Complete')}</button>
													<p>
														<a href="#">Use a different method</a>
													</p>
												</form>
											</div>
										</div>

									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaConfirm = VisaConfirm;
