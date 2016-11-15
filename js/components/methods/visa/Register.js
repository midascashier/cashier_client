import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { ExtraInfo } from './ExtraInfo'

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
		let currentTime = new Date();
		let country = CashierStore.getSelectedCountry();
		let states = UIService.getCountryStates();
		let customer = CashierStore.getCustomer();

		let firstName = customer.personalInformation.firstName ? customer.personalInformation.firstName : "";
		let	lastName = customer.personalInformation.lastName ? customer.personalInformation.lastName : "";
		let	city = customer.personalInformation.city ? customer.personalInformation.city : "";
		let	address1 = customer.personalInformation.addressOne ? customer.personalInformation.addressOne : "";
		let	zip = customer.personalInformation.postalCode ? customer.personalInformation.postalCode : "";
		let	email = customer.personalInformation.email ? customer.personalInformation.email : "";
		let	phone = customer.personalInformation.phone ? customer.personalInformation.phone : "";
		let	ssn = customer.personalInformation.ssn ? customer.personalInformation.ssn : "";


		return {
			displaySaveButton: true,
			payAccount: {
				extra3: "",
				account: "",
				password: "",
				extra1: currentTime.getMonth() + 1,
				extra2: currentTime.getFullYear(),
				country: country,
				state: states[0]['Small'],
				firstName: firstName,
				lastName: lastName,
				city: city,
				address1: address1,
				zip: zip,
				email: email,
				phone: phone,
				ssn: ssn,
				dobDay: "",
				dobMonth: "",
				dobYear: "",
				dob: ""
			}
		}
	},

	/**
	 * Set visa New Account Info
	 *
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		let actualState = this.state;

		let value = event;

		if(isSelectComponent){
			value = value.target.value;
		}

		if(propertyName == 'country'){
			UIService.getCountryStates(value);
		}

		actualState.payAccount[propertyName] = value;

		this.setState(
			actualState
		);

	},

	/**
	 * Sends request to register new payaccount
	 *
	 * @param e
	 * @returns {boolean}
	 */
	addNewPayAccount(e){
		let actualState = this.state;
		e.preventDefault();

		for(let i = 0; i < e.target.length; i++){
			if(parseInt(e.target[i].getAttribute('data-isRequired')) == 1 && e.target[i].value.length <= 0){
				e.target[i].style['border-color']='red';
				e.target[i].focus();
				return false;
			}

			if(e.target[i].getAttribute('data-isValid') == "false"){
				e.target[i].focus();
				return false;
			}
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

		actualState.payAccount.dobDay = ('0' + actualState.payAccount.dobDay).slice(-2);
		actualState.payAccount.dobMonth = ('0' + actualState.payAccount.dobMonth).slice(-2);

		actualState.payAccount.dob = actualState.payAccount.dobMonth + "-" + actualState.payAccount.dobDay + "-" + this.state.payAccount.dobYear;

		actualState.payAccount.extra1 = ('0' + actualState.payAccount.extra1).slice(-2);

		actualState.displaySaveButton = false;
		this.setState({
			actualState
		});
		TransactionService.registerPayAccount(this.state.payAccount);
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
		const payAccount = this.state.payAccount;
		payAccount.state = "";
		this.setState(
			payAccount
		);
	},

	render(){
		let selectMonths = [];
		let countries = UIService.getCountries();
		let states = UIService.getCountryStates();
		let selectYears = [];
		let countryOptionNodes = [];
		let now = new Date();

		for(let i = 1; i < 13; i++){
			selectMonths.push(UIService.renderOption({ label: i }, i));
		}

		for(let i = now.getFullYear(); i < now.getFullYear() + 15; i++){
			selectYears.push(UIService.renderOption({ label: i }, i));
		}

		for(let i = 0; i < countries.length; i++){
			countryOptionNodes.push(UIService.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
		}

		let stateOptionNodes = [];
		for(let i = 0; i < states.length; i++){
			stateOptionNodes.push(UIService.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
		}

		return (
			<div id="visaRegister">
				<form onSubmit={this.addNewPayAccount}>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="ccName" ref="ccName" validate="isString" onChange={this.changeValue.bind(null, 'extra3', 0)} value={this.state.payAccount.extra3} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_NUMBER', 'Card Number')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="creditCardNumber" ref="creditCardNumber" validate="isCreditNumber" onChange={this.changeValue.bind(null, 'account', 0)} value={this.state.payAccount.account} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
						<div className="col-sm-4">
							<select className="form-control" id="ccExpMonth" onChange={this.changeValue.bind(null, 'extra1',1)} value={this.state.payAccount.extra1}>
								{selectMonths}
							</select>
						</div>
						<div className="col-sm-4">
							<select className="form-control" id="ccExpYear" onChange={this.changeValue.bind(null, 'extra2',1)} value={this.state.payAccount.extra2}>
								{selectYears}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="cvv" ref="cvv" validate="isCVV" onChange={this.changeValue.bind(null, 'password', 0)} value={this.state.payAccount.password} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_FIRST_NAME', 'First Name')}:</label>
						<div className="col-sm-8">
							<Input type="text" name="firstName" id="firstName" ref="firstName" validate="isString" onChange={this.changeValue.bind(null, 'firstName', 0)} value={this.state.payAccount.firstName} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_LAST_NAME', 'Last Name')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'lastName', 0)} value={this.state.payAccount.lastName} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_COUNTRY', 'Country')}:</label>
						<div className="col-sm-8">
							<select className="form-control" id="country" value={this.state.payAccount.country} onChange={this.changeValue.bind(null, 'country',1)}>
								{countryOptionNodes}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_STATE', 'State')}:</label>
						<div className="col-sm-8">
							<select className="form-control" id="countryState" value={this.state.payAccount.state} onChange={this.changeValue.bind(null, 'state',1)} disabled={!states.length}>
								{stateOptionNodes}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CITY', 'City')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="city" ref="city" validate="isString" onChange={this.changeValue.bind(null, 'city', 0)} value={this.state.payAccount.city} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_ADDRESS', 'Address')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="address" ref="address" validate="isString" onChange={this.changeValue.bind(null, 'address1', 0)} value={this.state.payAccount.address1} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_ZIP', 'Postal Code')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="zip" ref="zip" validate="isNumber" onChange={this.changeValue.bind(null, 'zip', 0)} value={this.state.payAccount.zip} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_EMAIL', 'Email')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="email" ref="email" validate="isEmail" onChange={this.changeValue.bind(null, 'email', 0)} value={this.state.payAccount.email} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_PHONE', 'Phone')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="phone" ref="phone" validate="isNumber" onChange={this.changeValue.bind(null, 'phone', 0)} value={this.state.payAccount.phone} require/>
						</div>
					</div>

					<ExtraInfo changeValue={this.changeValue} ssn={this.state.payAccount.ssn} dobMonth={this.state.payAccount.dobMonth} dobDay={this.state.payAccount.dobDay} dobYear={this.state.payAccount.dobYear} require/>

					<div className="form-group">
						{this.state.displaySaveButton ? <button type='submit' className='btn btn-green'>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button> : null }
					</div>

				</form>
			</div>
		)
	}
});

module.exports.Register = Register;