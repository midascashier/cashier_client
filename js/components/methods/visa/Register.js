import React from 'react'
import {Input} from '../../Inputs'
import {ExtraInfo} from './ExtraInfo'
import cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {CashierActions} from '../../../actions/CashierActions'
import {TransactionService} from '../../../services/TransactionService'
import {ApplicationService} from '../../../services/ApplicationService'

let Register = React.createClass({

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

		return{
			displaySaveButton: true,
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
				firstName: firstName
			}
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
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
			displaySaveButton: displaySave
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
		let rgx = [];
		rgx['zip'] = UIService.getZipCodeRegex();

		if (!ApplicationService.emptyInput(e, rgx)) {
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
			actualState.payAccount.extra1 = ('0' + actualState.payAccount.extra1).slice(-2);
			actualState.payAccount.dobDay = ('0' + actualState.payAccount.dobDay).slice(-2);
			actualState.payAccount.dobMonth = ('0' + actualState.payAccount.dobMonth).slice(-2);
			actualState.payAccount.dob = actualState.payAccount.dobYear + "-" + actualState.payAccount.dobMonth + "-" + this.state.payAccount.dobDay;

			this.setState({
				actualState
			});

			TransactionService.registerPayAccount(this.state.payAccount);
		}
	},

	/**
	 * Cancel button
	 */
	cancel() {
		let payAccounts = CashierStore.getProcessorPayAccount();
		if(Object.keys(payAccounts).length > 0){
			let processorID = CashierStore.getProcessor();
			let previousPayAccount = 0;
			for(let payAccount in payAccounts){
				if(previousPayAccount == 0){
					previousPayAccount = payAccount;
				}
			}
			CashierActions.changePayAccount(previousPayAccount, processorID.processorId);
		}else{
			UIService.changeUIState('/' + UIService.getCurrentView() + '/');
		}
	},

	render(){
		let cvvValidation = "isCVV";
		let zipValidation = "isNumber";
		let ccValidation = "isCreditNumber";
		let ccDate = UIService.getCCDate();
		let processor = CashierStore.getProcessor();
		let countriesInfo = UIService.getCountriesInfo();

		if(processor.processorId == cashier.PROCESSOR_ID_VISA){
			ccValidation = "isVisa";
		}else{
			if(processor.processorId == cashier.PROCESSOR_ID_MC){
				ccValidation = "isMC";
			}else{
				if (processor.processorId == cashier.PROCESSOR_ID_AMEX){
					cvvValidation = "isCVV4";
				}
			}
		}

		let country = this.state.payAccount.country;
		if(country == cashier.USA_COUNTRY_CODE || country == cashier.CAN_COUNTRY_CODE){
			zipValidation = 'rgxValidate';
		}

		return(
			<div id="visaRegister">
				<form onSubmit={this.addNewPayAccount}>
					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
						<div className="col-sm-8">
							<Input
								type="text"
								id="ccName"
								ref="ccName"
								validate="isText"
								onChange={this.changeValue.bind(null, 'extra3', '', 0)} value={this.state.payAccount.extra3}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_NUMBER', 'Card Number')}:</label>
						<div className="col-sm-8">
							<Input
								type="text"
								id="creditCardNumber"
								ref="creditCardNumber"
								validate={ccValidation}
								value={this.state.payAccount.account}
								onChange={this.changeValue.bind(null, 'account', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
						<div className="col-sm-4">
							<select
								data-isRequired
								id="ccExpMonth"
								validate='isNumber'
								className="form-control"
								data-validation="isNumber"
								value={this.state.payAccount.extra1}
								onChange={this.changeValue.bind(null, 'extra1', '', 1)}
							>
								{ccDate.selectMonths}
							</select>
						</div>
						<div className="col-sm-4">
							<select
								id="ccExpYear"
								data-isRequired
								validate='isNumber'
								className="form-control"
								data-validation="isNumber"
								value={this.state.payAccount.extra2}
								onChange={this.changeValue.bind(null, 'extra2', '', 1)}
							>
								{ccDate.selectYears}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
						<div className="col-sm-4">
							<Input
								id="cvv"
								ref="cvv"
								type="text"
								validate={cvvValidation}
								value={this.state.payAccount.password}
								onChange={this.changeValue.bind(null, 'password', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_FIRST_NAME', 'First Name')}:</label>
						<div className="col-sm-8">
							<Input
								type="text"
								id="firstName"
								ref="firstName"
								name="firstName"
								validate="isText"
								value={this.state.payAccount.firstName}
								onChange={this.changeValue.bind(null, 'firstName', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_LAST_NAME', 'Last Name')}:</label>
						<div className="col-sm-8">
							<Input
								type="text"
								id="lastName"
								ref="lastName"
								validate="isText"
								value={this.state.payAccount.lastName}
								onChange={this.changeValue.bind(null, 'lastName', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_COUNTRY', 'Country')}:</label>
						<div className="col-sm-8">
							<select
								id="country"
								className="form-control"
								data-validation='isString'
								value={this.state.payAccount.country}
								onChange={this.changeValue.bind(null, 'country', '', 1)}
							>
								{countriesInfo.countries}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_STATE', 'State')}:</label>
						<div className="col-sm-8">
							<select
								id="countryState"
								className="form-control"
								data-validation='isString'
								value={this.state.payAccount.state}
								disabled={!countriesInfo.states.length}
								onChange={this.changeValue.bind(null, 'state', '', 1)}
							>
								{countriesInfo.states}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CITY', 'City')}:</label>
						<div className="col-sm-8">
							<Input
								id="city"
								ref="city"
								type="text"
								validate="isString"
								value={this.state.payAccount.city}
								onChange={this.changeValue.bind(null, 'city', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_ADDRESS', 'Address')}:</label>
						<div className="col-sm-8">
							<Input
								type="text"
								id="address"
								ref="address"
								validate="isString"
								value={this.state.payAccount.address1}
								onChange={this.changeValue.bind(null, 'address1', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_ZIP', 'Postal Code')}:</label>
						<div className="col-sm-8">
							<Input
								id="zip"
								ref="zip"
								type="text"
								validate={zipValidation}
								value={this.state.payAccount.zip}
								onChange={this.changeValue.bind(null, 'zip', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_EMAIL', 'Email')}:</label>
						<div className="col-sm-8">
							<Input
								id="email"
								ref="email"
								type="text"
								validate="isEmail"
								value={this.state.payAccount.email}
								onChange={this.changeValue.bind(null, 'email', '', 0)}
								require
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_PHONE', 'Phone')}:</label>
						<div className="col-sm-8">
							<Input
								id="phone"
								ref="phone"
								type="text"
								validate="isNumber"
								value={this.state.payAccount.phone}
								onChange={this.changeValue.bind(null, 'phone', '', 0)}
								require
							/>
						</div>
					</div>

					<ExtraInfo
						changeValue={this.changeValue}
						ssn={this.state.payAccount.ssn}
						dobDay={this.state.payAccount.dobDay}
						dobYear={this.state.payAccount.dobYear}
						dobMonth={this.state.payAccount.dobMonth}
					/>

					<div className="col-md-4 col-md-offset-4">
						<div className="row">
							<div className="col-sm-6">
								{this.state.displaySaveButton ?
									<button type='submit' className='btn btn-green'>
										{translate('PROCESSING_BUTTON_SAVE', 'Save')}
									</button>
								: null}
							</div>
							<div className="col-sm-6">
								<button type='button' onClick={this.cancel} className='btn btn-green'>
									{translate('PROCESSING_BUTTON_CANCEL', 'Save')}
								</button>
							</div>
						</div>
					</div>
				</form>
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

module.exports.Register = Register;