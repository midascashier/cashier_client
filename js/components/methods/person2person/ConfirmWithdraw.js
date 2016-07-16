import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'

let P2PConfirmWithdraw = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{transaction, payAccount}|{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, cleanTransaction: (function())}), payAccount: (*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, cleanTransaction: (function())}), payAccount: (*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))})}}
	 */
	refreshLocalState() {
		return {
			transaction: CashierStore.getTransaction(),
			payAccount: CashierStore.getCurrentPayAccount()
		}
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
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function sends transaction info to cashier
	 *
	 */
	processTransaction(){
		TransactionService.process(null,'ticket');
	},

	/**
	 * Sends customer to previous step and start transaction
	 */
	editWithdraw(){
		UIService.startTransaction();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	render(){
		let originPath = UIService.getOriginPath();
		let transaction = this.state.transaction;
		let personalData = this.state.payAccount.personal;
		let secureData = this.state.payAccount.secure;
		let addressData = this.state.payAccount.address;
		let extraData = this.state.payAccount.extra;

		return (
			<div id="confirmP2PWithdraw" className="internal-content">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">

								<div className="col-sm-6 ">
									<div className="box">

										<div className="row">
											<div className="col-sm-12">
												<div className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>
												<div className="infoCol text-justify">
													<p>
														Ensure your address is correct.
														If you need to change your address, you can change it in the client.
														Then you may request your Money Transfer withdraw to the new address.
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
												<div className="title">{translate('METHOD_DETAILS_WITHDRAW', 'Withdraw Details')}</div>
												<div className="deposit-details">
													<div className="table-responsive">
														<table className="table table-striped">
															<tbody>
																<tr>
																	<td>{translate('TRANSACTION_AMOUNT', 'Amount')}</td>
																	<td><span>{transaction.amount}</span></td>
																</tr>
																<tr>
																	<td>{translate('TRANSACTION_FEE_AMOUNT', 'Fee')}</td>
																	<td><span>{transaction.fee}</span></td>
																</tr>
															</tbody>
														</table>
													</div>
													<p>
														<i className="fa fa-pencil green"></i>
														<a onClick={this.editWithdraw}>{translate('METHOD_EDIT_DETAILS_WITHDRAW', 'Edit the withdraw details')}</a>
													</p>
												</div>
												<div className="row">
													<div className="col-sm-6">
														<button type="button" onClick={this.processTransaction} className="btn btn-green">{translate('PROCESSING_BUTTON_COMPLETE_WITHDRAW', 'Complete Withdraw')}</button>
														<p>
															<a onClick={this.setFirstStep}>{translate('METHOD_USE_DIFFERENT', 'Use a different method.')}</a>
														</p>
													</div>
													<div className="col-sm-6">
														<img src={originPath + '/images/ssl.png'} alt="ssl"/>
													</div>
												</div>
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

module.exports.P2PConfirmWithdraw = P2PConfirmWithdraw;
