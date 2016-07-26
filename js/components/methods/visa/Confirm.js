import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { Input } from '../../Inputs'
import { Link } from 'react-router'

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
			info: {
				transaction: CashierStore.getTransaction(),
				payAccount: CashierStore.getCurrentPayAccount()
			}
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	processTransaction(){
		TransactionService.processCC();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	editBillingInfo(){

	},


		render(){
		let personalData = this.state.info.payAccount.personal;
		let secureData = this.state.info.payAccount.secure;
		secureData.account = secureData.account.replace(/\d(?=\d{4})/g, "*");
		let addressData = this.state.info.payAccount.address;
		let extraData = this.state.info.payAccount.extra;

		return (
			<div id="confirmVisa" className="internal-content">
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
													{(() =>{
															return (<ul>
																<li>{personalData.firstName + ' ' + personalData.lastName}</li>
																<li>{addressData.address1}</li>
																<li>{addressData.state}</li>
																<li>{addressData.country + ' ' + addressData.zip}</li>
															</ul>);
													})()}
													<p><i className="fa fa-pencil green"></i><a
														onClick={this.editBillingInfo()}>{translate('PROCESSING_BILLING_INFO_EDIT', 'Edit the billing address')}</a>
													</p>
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
																<td>{translate('PROCESSING_AMOUNT')}:</td>
																<td><span>{this.state.info.transaction.amount}</span></td>
															</tr>
															</tbody>
														</table>
													</div>
													<p><i className="fa fa-pencil green"></i><Link to={`/deposit/visa/`}>Edit the deposit
														details</Link></p>
												</div>
												<form className="form-horizontal infoCol">
													<div className="form-group">
														<label for="" className="col-sm-4 control-label">{translate('CREDIT_CARD_SSN')}:</label>
														<div className="col-sm-8">
															<Input type="text" id="ssn" value={extraData.ssn} autoComplete="off" readOnly/>
														</div>
													</div>
													<div className="form-group">
														<label for="" className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
														<div className="col-sm-8">
															<Input type="date" id="dob" value={extraData.dob} readOnly/>
														</div>
													</div>
													<button type="button" onClick={this.processTransaction}
																	className="btn btn-green">{translate('PROCESSING_BUTTON_COMPLETE_DEPOSIT', 'Complete')}</button>
													<p><a onClick={this.setFirstStep}>No thanks. I'll deposit a different way.</a></p>
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
