import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../../stores/CashierStore'
import {translate} from '../../../constants/Translate'
import {transactionService} from '../../../services/TransactionService'
import {controllerUIService} from '../../../services/ControllerService'

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
			transaction: CashierStore.getTransaction()
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
	completeDeposit(){
		transactionService.process({});
	},

	render(){
		let nextStep = controllerUIService.getNextStep();
		return (
			<div id="confirmBitCoinWithdraw" className="internal-content">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">

								<div className="col-sm-6 ">
									<div className="box">

										<div className="row">

											<div class="col-sm-12">
												<div class="title">{translate('PROCESSING_INFORMATION_TITLE', 'Double-check Your Billing Information')}</div>
												<div class="infoCol">
													<ul>
														<li>Owen Gaines</li>
														<li>1.5 KM South of Whiskey Bar</li>
														<li>Santa Ana</li>
														<li>Costa Rica 00000</li>
													</ul>
													<p><i class="fa fa-pencil green"></i><a href="#">{translate('PROCESSING_BILLING_INFO_EDIT', 'Edit the billing address')}</a></p>
												</div>
											</div>

										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="box">

										<div className="row">
											<div class="col-sm-12">
												<div class="title">{translate('METHOD_DETAILS_DEPOSIT', 'Deposit Details')}</div>
												<div class="deposit-details">
													<div class="table-responsive">
														<table class="table table-striped">
															<tbody>
															<tr>
																<td>{translate('CREDIT_CARD_HOLDER')}:</td>
																<td><span>Lycka</span></td>
															</tr>
															<tr>
																<td>{translate('CREDIT_CARD_NUMBER')}:</td>
																<td><span>12678429384792</span></td>
															</tr>
															<tr>
																<td>{translate('CREDIT_CARD_EXPIRATION')}:</td>
																<td><span>06/18</span></td>
															</tr>
															<tr>
																<td>{translate('CREDIT_CARD_CVV')}:</td>
																<td><span>756</span></td>
															</tr>
															<tr>
																<td>{translate('PROCESSING_AMOUNT')}:</td>
																<td><span>$500</span></td>
															</tr>
															</tbody></table>
													</div>
													<p><i class="fa fa-pencil green"></i><a href="#">Edit the deposit details</a></p>
												</div>
												<form class="form-horizontal infoCol">
													<div class="form-group">
														<label for="" class="col-sm-4 control-label">{translate('CREDIT_CARD_SSN')}:</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="" placeholder=""/>
														</div>
													</div>
													<div class="form-group">
														<label for="" class="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
														<div class="col-sm-8">
															<input type="date" class="form-control" id="" placeholder=""/>
														</div>
													</div>
													<Link to={nextStep}>
														<button type='button' onClick={this.completeDeposit} className='btn btn-green'>{translate('PROCESSING_BUTTON_COMPLETE_DEPOSIT', 'Complete')}</button>
													</Link>
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
