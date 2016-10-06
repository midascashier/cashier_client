import React from 'react'
import { Input } from '../../../Inputs'
import { translate } from '../../../../constants/Translate'
import { UIService } from '../../../../services/UIService'
import { TransactionService } from '../../../../services/TransactionService'
import { CashierStore } from '../../../../stores/CashierStore'

let VisaRejectCardTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{payAccount, currency, currencyAmount}|{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{payAccount: (*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}), currency: string, currencyAmount: string}}
	 */
	refreshLocalState() {
		let transaction = UIService.getTransactionInformation();
		let payAccount = UIService.getPayAccountInformation();
		let customer = UIService.getCustomerInformation();
		return {
			payAccount: payAccount,
			currency: customer.currency,
			currencyAmount: transaction.amount
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
	 *
	 * @param e
	 * @returns {boolean}
	 */
	updateCreditCardSecure(e){
		e.preventDefault();
		for(let input in this.refs){
			if(this.refs[input].props.require && this.refs[input].props.value.length <= 0){
				return false;
			}
			if(!this.refs[input].state.isValid){
				return false;
			}
		}

		const payAccount = this.state.payAccount;
		payAccount.updateSuccess = 0;
		this.setState({displaySaveButton: false, payAccount: payAccount});
		TransactionService.updateCreditCardSecure();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	/**
	 * Set visa New Account Info
	 *
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		const payAccount = this.state.payAccount;
		let value = event;
		if(isSelectComponent){
			value = value.target.value;
		}
		payAccount.secure[propertyName] = value;
		this.setState({payAccount: payAccount});
	},

	render() {

		let payAccount = this.state.payAccount;
		let updateSuccess = payAccount.updateSuccess;

		let secureData = payAccount.secure;
		let extra1 = secureData.extra1;
		let extra2 = secureData.extra2;
		let extra3 = secureData.extra3;
		let account = secureData.account.replace(/\d(?=\d{4})/g, "*");
		let password = secureData.password;

		let selectMonths = [];
		let selectYears = [];
		let now = new Date();

		for(let i = 1; i < 13; i++){
			selectMonths.push(UIService.renderOption({label: i}, i));
		}

		for(let i = now.getFullYear(); i < now.getFullYear() + 15; i++){
			selectYears.push(UIService.renderOption({label: i}, i));
		}

		return (
			<div id="visaRejectCardTicket">
				<div className="row">
					<div className="col-sm-12">
						<div className="rejected-message">
							<div className="title">{translate('CREDIT_CARD_QUICK_FIX', 'Quick fix...')}</div>
							<p>
								{translate('CREDIT_CARD_QUICK_FIX_INFO')}
							</p>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">

								<div className="col-sm-12">
									<div className="row">

										<div className="col-md-6 col-md-offset-3">
											<div className="box">
												<div className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>
												<div className="infoCol">

													{(() =>{
														if(updateSuccess != 1){
															return <div className="loader"></div>;
														}
													})()}

													<div id="formEditCC">
														<div className="form-group">
															<label className="control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
															<Input type="text" id="ccName" ref="ccName" validate="isString" require
																		 onChange={this.changeValue.bind(null, 'extra3', 0)}
																		 value={extra3}/>
														</div>

														<div className="form-group">
															<label className="control-label">{translate('CREDIT_CARD_NUMBER', 'Card Number')}:</label>
															<Input type="text" id="creditCardNumber" ref="creditCardNumber" validate="isCreditNumber" minlength="16" maxlength="16" require
																		 onChange={this.changeValue.bind(null, 'account', 0)}
																		 value={account}/>
														</div>

														<div className="form-group">
															<label className="control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
															<div className="form-inline">

																<div className="form-group">
																	<select className="form-control" id="ccExpMonth" onChange={this.changeValue.bind(null, 'extra1',1)} value={extra1}>
																		{selectMonths}
																	</select>
																</div>

																<div className="form-group">
																	<select className="form-control" id="ccExpYear" onChange={this.changeValue.bind(null, 'extra2',1)} value={extra2}>
																		{selectYears}
																	</select>
																</div>

															</div>
														</div>

														<div className="form-group">
															<label className="control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
															<Input type="text" id="cvv" ref="cvv" validate="isCVV" minlength="3" maxlength="4" require
																		 onChange={this.changeValue.bind(null, 'password', 0)}
																		 value={password}/>
														</div>

														{(() =>{
															if(updateSuccess == 1){
																return <button type='button' className='btn btn-green' onClick={this.updateCreditCardSecure}>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button>;
															}
														})()}
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>

								<button type="button" className="btn btn-green" onClick={this.reProcessTransaction}>{translate('PROCESSING_BUTTON_REPROCESS_FIX', 'Try again')}</button>
								<p><a onClick={this.setFirstStep}>No thanks.  I'll deposit a different way.</a></p>

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaRejectCardTicket = VisaRejectCardTicket;

