import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {translate} from '../../../constants/Translate'
import {UIService} from '../../../services/UIService'
import {TransactionService} from '../../../services/TransactionService'
import {ApplicationService} from '../../../services/ApplicationService'

let P2PConfirmWithdraw = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{customer, transaction, payAccount}|{customer: (*|{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: {}, load: (function(*))}), transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, cleanTransaction: (function())}), payAccount: (*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{customer: (*|{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: {}, load: (function(*))}), transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, cleanTransaction: (function())}), payAccount: (*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))})}}
	 */
	refreshLocalState(){
		return {
			customer: CashierStore.getCustomer(),
			transaction: CashierStore.getTransaction(),
			payAccount: CashierStore.getCurrentPayAccount()
		}
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function sends transaction info to cashier
	 *
	 */
	processTransaction(){
		TransactionService.process(null, 'ticket');
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
	setFirstStep(){
		UIService.setFirstStep();
	},

	render(){
		let originPath = UIService.getOriginPath();
		let customer = this.state.customer;
		let transaction = this.state.transaction;
		let personalData = this.state.payAccount.personal;
		let addressData = this.state.payAccount.address;

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
													<p>{translate('P2P_INSTRUCTIONS_CORRECT_ADDRESS')}</p>
													<p><strong>Address on File:</strong></p>
													<div className="text-center">
														<p>
															{customer.personalInformation.firstName + ' ' + customer.personalInformation.lastName}
														</p>
														<p>
															{customer.personalInformation.addressOne + ' ' + customer.personalInformation.addressTwo}
														</p>
														<p>
															{customer.personalInformation.stateName + ', ' + customer.personalInformation.countryName}
														</p>
														<p>
															{customer.personalInformation.phone}
														</p>
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
												<div className="title">{translate('METHOD_DETAILS_WITHDRAW', 'Withdraw Details')}</div>
												<div className="table-responsive">
													<table className="table table-striped">
														<tbody>
														<tr>
															<td>{translate('TRANSACTION_AMOUNT', 'Amount')}</td>
															<td><span>{ApplicationService.currency_format(transaction.amount) + ' ' + customer.currency}</span></td>
														</tr>
														<tr>
															<td>{translate('TRANSACTION_FEE_AMOUNT', 'Fee')}</td>
															<td><span>{ApplicationService.currency_format(transaction.fee) + ' ' + customer.currency}</span></td>
														</tr>
														<tr>
															<td>{translate('P2P_RECEIVER', 'Receiver')}</td>
															<td><span>{personalData.firstName + ' ' + personalData.lastName}</span></td>
														</tr>
														<tr>
															<td>{translate('P2P_CITY', 'City')}</td>
															<td><span>{addressData.city}</span></td>
														</tr>
														<tr>
															<td>{translate('P2P_DESTINATION', 'Destination')}</td>
															<td><span>{addressData.stateName + ', ' + addressData.countryName}</span></td>
														</tr>
														<tr>
															<td>{translate('P2P_PHONE', 'Fee')}</td>
															<td><span>{personalData.phone}</span></td>
														</tr>
														</tbody>
													</table>
												</div>
												<p>
													<i className="fa fa-pencil green"></i>
													<a onClick={this.editWithdraw}>{translate('METHOD_EDIT_DETAILS_WITHDRAW', 'Edit the withdraw details')}</a>
												</p>

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
