/**
 * Created by armandoc on 6/25/2018.
 */

import React from 'react'
import {ExtraInfo} from '../../methods/visa/ExtraInfo'
import cashier from '../../../constants/Cashier'
import {Input} from '../Inputs'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {CashierActions} from '../../../actions/CashierActions'
import {TransactionService} from '../../../services/TransactionService'
import {ApplicationService} from '../../../services/ApplicationService'
import {LoadingSpinner} from '../../loading/LoadingSpinner'

let CreditCardRegister = React.createClass({

	propTypes: {
		returnFromRegisterNewCC: React.PropTypes.func
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState() {
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 */
	refreshLocalState() {
		let states = UIService.getCountryStates();
		let customer = CashierStore.getCustomer();
		let country = CashierStore.getSelectedCountry();

		let ssn = customer.personalInformation.ssn ? customer.personalInformation.ssn : "";
		let city = customer.personalInformation.city ? customer.personalInformation.city : "";
		let email = customer.personalInformation.email ? customer.personalInformation.email : "";
		let phone = customer.personalInformation.phone ? customer.personalInformation.phone : "";
		let zip = customer.personalInformation.postalCode ? customer.personalInformation.postalCode : "";
		let lastName = customer.personalInformation.lastName ? customer.personalInformation.lastName : "";
		let firstName = customer.personalInformation.firstName ? customer.personalInformation.firstName : "";
		let address1 = customer.personalInformation.addressOne ? customer.personalInformation.addressOne : "";
		let customerState = customer.personalInformation.state ? customer.personalInformation.state : states[0]['Small'];

		return {
			cardsLength: CashierStore.getCustomerPayAccounts().length,
			loading: false,
			displaySaveButton: true,
			addedPayAccount: false,
			payAccount: {
				dob: '',
				ssn: ssn,
				zip: zip,
				city: city,
				extra1: '',
				extra2: '',
				extra3: '',
				dobDay: '',
				account: '',
				dobYear: '',
				dobMonth: '',
				password: '',
				email: email,
				phone: phone,
				country: country,
				address1: address1,
				lastName: lastName,
				state: customerState,
				firstName: firstName,
				processorId: cashier.PROCESSOR_ID_VISA
			}
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {

		if(this.state.addedPayAccount){
			this.props.returnFromRegisterNewCC();
			return true;
		}

		let displaySave = false;
		let UI = CashierStore.getUI();
		let payAccount = this.state.payAccount;

		if(UI.userMessage){
			displaySave = true;
		}
		if(!displaySave && this.state.displaySaveButton){
			displaySave = true;
		}

		this.setState({
			payAccount,
			displaySaveButton: displaySave,
			loading: false,
			addedPayAccount: CashierStore.addedPayAccountInBitCoin()
		});

	},

	/**
	 * Set visa New Account Info
	 *
	 * @param propertyName
	 * @param property
	 * @param isSelectComponent
	 * @param event
	 */
	changeValue(propertyName, property = null, isSelectComponent = 0, event){
		let value = event;
		let actualState = this.state;

		if(isSelectComponent){
			value.target.style['border-color'] = '';
			value = value.target.value;
		}
		if(propertyName == 'country'){
			UIService.getCountryStates(value);
			UIService.setCurrentSelectedCountry(value);
		}
		if(propertyName == 'extra3'){
			CashierActions.showUserMessage('');
		}

		actualState.payAccount[propertyName] = value;

		this.setState(
			actualState
		);
	},

	/**
	 * checks if first and last name are part of cardHolder
	 */
	checkCardHolderName(){
		let lastName = this.state.payAccount.lastName.toUpperCase();
		let cardHolder = this.state.payAccount.extra3.toUpperCase();
		let firstName = this.state.payAccount.firstName.toUpperCase();

		if(cardHolder.indexOf(firstName) >= 0 && cardHolder.indexOf(lastName) >= 0){
			return true
		}

		CashierActions.showUserMessage(translate('CARDHOLDER_NAME', 'ERROR'));

		return false;
	},

	/**
	 * Sends request to register new pay account
	 *
	 * @param e
	 * @returns {boolean}
	 */
	addNewPayAccount(e){

		if(!ApplicationService.emptyInput(e)){
			let actualState = this.state;

			if(!this.checkCardHolderName()){
				return false;
			}
			if(!this.state.dobDay){
				actualState.payAccount.dobDay = e.target.querySelector('[name="dobDay"]').value;
			}
			if(!this.dobMonth){
				actualState.payAccount.dobMonth = e.target.querySelector('[name="dobMonth"]').value;
			}
			if(!this.dobYear){
				actualState.payAccount.dobYear = e.target.querySelector('[name="dobYear"]').value;
			}

			actualState.displaySaveButton = false;
			actualState.loading = true;
			actualState.payAccount.extra1 = ('0' + actualState.payAccount.extra1).slice(-2);
			actualState.payAccount.dobDay = ('0' + actualState.payAccount.dobDay).slice(-2);
			actualState.payAccount.dobMonth = ('0' + actualState.payAccount.dobMonth).slice(-2);
			actualState.payAccount.dob = actualState.payAccount.dobYear + "-" + actualState.payAccount.dobMonth + "-" + this.state.payAccount.dobDay;

			this.setState({
				actualState
			});

			TransactionService.registerPayAccountBitcoin(this.state.payAccount);
		}
	},

	validateCredirCardNumber(e){
		let selectedProcessorId = parseInt(e.target.value);
		let payAccount = this.state.payAccount;
		payAccount.processorId = selectedProcessorId;
		this.setState({payAccount: payAccount});
	},

	render(){

		let cvvValidation = "isCVV";
		let zipValidation = "isString";
		let ccValidation = "isCreditNumber";
		let ccDate = UIService.getCCDate();
		let countriesInfo = UIService.getCountriesInfo();

		let processorId = this.state.payAccount.processorId;
		if(processorId == cashier.PROCESSOR_ID_VISA){
			ccValidation = "isVisa";
		}else if(processorId == cashier.PROCESSOR_ID_MC){
			ccValidation = "isMC";
		}else if(processorId == cashier.PROCESSOR_ID_AMEX){
			cvvValidation = "isCVV4";
		}else if(processorId == cashier.PROCESSOR_ID_JCB){
			cvvValidation = "isCVV";
		}

		let country = this.state.payAccount.country;
		if(country == cashier.USA_COUNTRY_CODE || country == cashier.CAN_COUNTRY_CODE){
			zipValidation = 'rgxValidate';
		}

		let noCards = (0 == this.state.cardsLength);

		if(this.state.loading){
			return <LoadingSpinner/>
		}

		return (
			<div className="buy-crypto-background">
				<div className="buy-crypto-content buy-crypto-newcc">
					<form onSubmit={this.addNewPayAccount}>
						<div className={((noCards) ? "col-sm-8" : "col-sm-offset-2 col-sm-8")}>
							<div className="buy-crypto-section buy-crypto-section-large">

								<div className="row">
									<div className="col-sm-6 buy-crypto-col">
										<div className="form-group buy-crypto-form-element">
											<div className="buy-crypto-main-title">{translate('BUY_CRYPTOS_TITLE_CARD', 'About your card:')}</div>
										</div>
									</div>
									<div className="col-sm-6 buy-crypto-col">
										<div className="form-group buy-crypto-form-element">
											<div className="buy-crypto-main-title">{translate('BUY_CRYPTOS_TITLE_CARD2', 'About you:')}</div>
										</div>
									</div>
								</div>

								<div className="row">

									<div className="col-sm-6 buy-crypto-col">
										<div className="form-group buy-crypto-form-element">
											<select
												id="ccType"
												name="ccType"
												onChange={this.validateCredirCardNumber}
												className="buy-crypto-select">
												<option key={cashier.PROCESSOR_ID_VISA} value={cashier.PROCESSOR_ID_VISA}>Visa</option>
											</select>
										</div>
										<div className="form-group buy-crypto-form-element">
											<Input
												type="text"
												id="ccName"
												ref="ccName"
												validate="isText"
												placeholder={translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}
												title={translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}
												onChange={this.changeValue.bind(null, 'extra3', '', 0)} value={this.state.payAccount.extra3}
												require
											/>
										</div>
										<div className="form-group buy-crypto-form-element">
											<Input
												type="text"
												id="creditCardNumber"
												ref="creditCardNumber"
												placeholder={translate('CREDIT_CARD_NUMBER', 'Card Number')}
												title={translate('CREDIT_CARD_NUMBER', 'Card Number')}
												className="buy-crypto-input"
												validate={ccValidation}
												value={this.state.payAccount.account}
												onChange={this.changeValue.bind(null, 'account', '', 0)}
												require
											/>
										</div>
										<div className="form-group buy-crypto-form-element buy-crypto-fullname">
											<label>{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}</label>
											<div className="row">
												<div className="col-sm-4">
													<select
														data-isRequired
														id="ccExpMonth"
														validate='isNumber'
														className="buy-crypto-select"
														data-validation="isNumber"
														value={this.state.payAccount.extra1}
														onChange={this.changeValue.bind(null, 'extra1', '', 1)}
													>
														{ccDate.selectMonths}
													</select>
												</div>
												<div className="col-sm-8">
													<select
														id="ccExpYear"
														data-isRequired
														validate='isNumber'
														className="buy-crypto-select"
														data-validation="isNumber"
														value={this.state.payAccount.extra2}
														onChange={this.changeValue.bind(null, 'extra2', '', 1)}
													>
														{ccDate.selectYears}
													</select>
												</div>
											</div>
										</div>

										<div className="form-group buy-crypto-form-element buy-crypto-cvv">
											<Input
												id="cvv"
												ref="cvv"
												type="text"
												validate={cvvValidation}
												value={this.state.payAccount.password}
												placeholder={translate('CREDIT_CARD_CVV', 'CVV')}
												title={translate('CREDIT_CARD_CVV', 'CVV')}
												onChange={this.changeValue.bind(null, 'password', '', 0)}
												require
											/>
										</div>

									</div>

									<div className="col-sm-6 buy-crypto-col">
										<div className="form-group buy-crypto-form-element buy-crypto-fullname">
											<div className="row">
												<div className="col-sm-6">
													<Input
														type="text"
														id="firstName"
														ref="firstName"
														name="firstName"
														validate="isText"
														placeholder={translate('CREDIT_CARD_FIRST_NAME', 'First Name')}
														title={translate('CREDIT_CARD_FIRST_NAME', 'First Name')}
														value={this.state.payAccount.firstName}
														onChange={this.changeValue.bind(null, 'firstName', '', 0)}
														require
													/>
												</div>
												<div className="col-sm-6">
													<Input
														type="text"
														id="lastName"
														ref="lastName"
														validate="isText"
														placeholder={translate('CREDIT_CARD_LAST_NAME', 'Last Name')}
														title={translate('CREDIT_CARD_LAST_NAME', 'Last Name')}
														value={this.state.payAccount.lastName}
														onChange={this.changeValue.bind(null, 'lastName', '', 0)}
														require
													/>
												</div>
											</div>
										</div>

										<div className="form-group buy-crypto-form-element buy-crypto-fullname">
											<div className="row">
												<div className="col-sm-6">
													<select
														id="country"
														className="buy-crypto-select"
														data-validation='isString'
														placeholder={translate('CREDIT_CARD_COUNTRY', 'Country')}
														title={translate('CREDIT_CARD_COUNTRY', 'Country')}
														value={this.state.payAccount.country}
														onChange={this.changeValue.bind(null, 'country', '', 1)}
													>
														{countriesInfo.countries}
													</select>
												</div>
												<div className="col-sm-6">
													<select
														id="countryState"
														className="buy-crypto-select"
														placeholder={translate('CREDIT_CARD_STATE', 'State')}
														title={translate('CREDIT_CARD_STATE', 'State')}
														data-validation='isString'
														value={this.state.payAccount.state}
														disabled={!countriesInfo.states.length}
														onChange={this.changeValue.bind(null, 'state', '', 1)}
													>
														{countriesInfo.states}
													</select>
												</div>
											</div>
										</div>

										<div className="form-group buy-crypto-form-element buy-crypto-fullname">
											<div className="row">
												<div className="col-sm-6">
													<Input
														id="city"
														ref="city"
														type="text"
														validate="isString"
														placeholder={translate('CREDIT_CARD_CITY', 'City')}
														title={translate('CREDIT_CARD_CITY', 'City')}
														value={this.state.payAccount.city}
														onChange={this.changeValue.bind(null, 'city', '', 0)}
														require
													/>
												</div>
												<div className="col-sm-6">
													<Input
														id="zip"
														ref="zip"
														type="text"
														placeholder={translate('CREDIT_CARD_ZIP', 'Postal Code')}
														title={translate('CREDIT_CARD_ZIP', 'Postal Code')}
														validate={zipValidation}
														value={this.state.payAccount.zip}
														onChange={this.changeValue.bind(null, 'zip', '', 0)}
														require
													/>
												</div>
											</div>
										</div>

										<div className="form-group buy-crypto-form-element">
											<Input
												type="text"
												id="address"
												ref="address"
												validate="isString"
												placeholder={translate('CREDIT_CARD_ADDRESS', 'Address')}
												title={translate('CREDIT_CARD_ADDRESS', 'Address')}
												value={this.state.payAccount.address1}
												onChange={this.changeValue.bind(null, 'address1', '', 0)}
												require
											/>
										</div>

										<div className="form-group buy-crypto-form-element">
											<Input
												id="email"
												ref="email"
												type="text"
												validate="isEmail"
												placeholder={translate('CREDIT_CARD_EMAIL', 'Email')}
												title={translate('CREDIT_CARD_EMAIL', 'Email')}
												value={this.state.payAccount.email}
												onChange={this.changeValue.bind(null, 'email', '', 0)}
												require
											/>
										</div>

										<div className="form-group buy-crypto-form-element">
											<Input
												id="phone"
												ref="phone"
												type="text"
												validate="isNumber"
												placeholder={translate('CREDIT_CARD_PHONE', 'Phone')}
												title={translate('CREDIT_CARD_PHONE', 'Phone')}
												value={this.state.payAccount.phone}
												onChange={this.changeValue.bind(null, 'phone', '', 0)}
												require
											/>
										</div>

										<div className="buy-crypto-form-element buy-crypto-extrainfo">
											<ExtraInfo
												changeValue={this.changeValue}
												ssn={this.state.payAccount.ssn}
												dobDay={this.state.payAccount.dobDay}
												dobYear={this.state.payAccount.dobYear}
												dobMonth={this.state.payAccount.dobMonth}
											/>
										</div>

									</div>

								</div>

								<div className="row">
									<div className="col-sm-6 buy-crypto-col">
										<div className="buy-crypto-form-element">
											<button type='button' onClick={this.props.returnFromRegisterNewCC} className="btn btn-default">
												{translate('BUY_CRYPTOS_BUTTON_RETURN', 'Return')}
											</button>
										</div>
									</div>
									<div className="col-sm-6 buy-crypto-col">
										<div className="buy-crypto-form-element">
											{this.state.displaySaveButton ?
												<button type="submit" className="btn btn-green">
													{translate('BUY_CRYPTOS_BUTTON_SAVECC', 'Save card')}
												</button>
												: null}
										</div>
									</div>
								</div>

							</div>

						</div>

						<div className="col-sm-4" hidden={!noCards}>
							<div className="buy-crypto-section">
								<div className="form-group buy-crypto-form-element">
									<div className="buy-crypto-main-title">{translate('BUY_CRYPTOS_ADDCC_LEYEND')}</div>
									<div className="form-group buy-crypto-text">
										{translate('BUY_CRYPTOS_ADDCC_TEXT')}
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
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
	}
});

module.exports.CreditCardRegister = CreditCardRegister;