import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'
import { TransactionService } from '../../../services/TransactionService'
import { ApplicationService } from '../../../services/ApplicationService'
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
			return {
				displaySaveButton: true,
				payAccount: {
					extra3: "",
					account: "",
					password: "",
					extra1: currentTime.getMonth() + 1,
					extra2: currentTime.getFullYear(),
					country: CashierStore.getSelectedCountry(),
					state: CashierStore.getCountryStates()[0]['Small'],
					firstName: "",
					lastName: "",
					city: "",
					address1: "",
					zip: "",
					email: "",
					phone: "",
					ssn: "",
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
			const actualState = this.state;

			let value = event;

			if(isSelectComponent){
				value = value.target.value;
			}

			if(propertyName == 'country'){
				ApplicationService.getCountryStates(value);
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
			const actualState = this.state;
			e.preventDefault();

			for(let i = 0; i < e.target.length; i++){
				if(parseInt(e.target[i].getAttribute('data-isRequired')) == 0 && e.target[i].value.length <= 0){
					return false;
				}

				if(parseInt(e.target[i].getAttribute('data-isValid'))== 0){
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

			actualState.payAccount.dob = this.state.payAccount.dobMonth + "-" + this.state.payAccount.dobDay + "-" + this.state.payAccount.dobYear;

			TransactionService.registerPayAccount(this.state.payAccount);
			actualState.displaySaveButton = false;
			this.setState({
				actualState
			});
		},

		/**
		 * Return option element to a html select
		 *
		 * @param item
		 * @param key
		 * @returns {XML}
		 */
		renderOption(item, key){
			return (
				<option key={key} value={key}>{item.label}</option>
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

		render()
		{
			let selectMonths = [];
			let UI = CashierStore.getUI();
			let countries = UI.countries;
			let states = UI.countryStates;
			let selectYears = [];
			let countryOptionNodes = [];

			for(let i = 1; i < 13; i++){
				selectMonths.push(this.renderOption({ label: i }, i));
			}

			for(let i = 2016; i < 2030; i++){
				selectYears.push(this.renderOption({ label: i }, i));
			}

			for(let i = 0; i < countries.length; i++){
				countryOptionNodes.push(this.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
			}

			let stateOptionNodes = [];
			for(let i = 0; i < states.length; i++){
				stateOptionNodes.push(this.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
			}

			return (
				<form onSubmit={this.addNewPayAccount}>
					<div>

						<div className="form-group">
							<label for="" className="control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
							<Input type="text" id="ccName" ref="ccName" validate="isString" require
										 onChange={this.changeValue.bind(null, 'extra3', 0)}
										 value={this.state.payAccount.extra3}/>
						</div>

						<div className="form-group">
							<label for="" className="control-label">{translate('CREDIT_CARD_NUMBER', 'Card Number')}:</label>
							<Input type="text" id="creditCardNumber" ref="creditCardNumber" validate="isCreditNumber" require
										 onChange={this.changeValue.bind(null, 'account', 0)}
										 value={this.state.payAccount.account}/>
						</div>


						<div className="form-group">
							<label for=""
										 className="control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<select className="form-control" id="ccExpMonth"
														onChange={this.changeValue.bind(null, 'extra1',1)} value={this.state.payAccount.extra1}>
											{selectMonths}
										</select>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<select className="form-control" id="ccExpYear"
														onChange={this.changeValue.bind(null, 'extra2',1)} value={this.state.payAccount.extra2}>
											{selectYears}
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label for="" className="control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
							<Input type="text" id="cvv" ref="cvv" validate="isCVV" require
										 onChange={this.changeValue.bind(null, 'password', 0)}
										 value={this.state.payAccount.password}/>
						</div>

						<div>
							<div className="form-group">
								<label for="" className="control-label">First Name:</label>
								<Input type="text" name="firstName" id="firstName" ref="firstName" validate="isString" require
											 onChange={this.changeValue.bind(null, 'firstName', 0)} value={this.state.payAccount.firstName}/>
							</div>
							<div className="form-group">
								<label for="" className="control-label">Last Name:</label>
								<Input type="text" id="lastName" ref="lastName" validate="isString" require
											 onChange={this.changeValue.bind(null, 'lastName', 0)} value={this.state.payAccount.lastName}/>
							</div>
							<div className="form-group">
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label for="" className="control-label">{translate('CREDIT_COUNTRY', 'Country')}:</label>
											<select className="form-control" id="country" value={this.state.payAccount.country}
															onChange={this.changeValue.bind(null, 'country',1)}>
												{countryOptionNodes}
											</select>
										</div>
									</div>
									<div className="col-sm-6">
										<label for="" className="control-label">{translate('CREDIT_STATE', 'State')}:</label>
										<select className="form-control" id="countryState" value={this.state.payAccount.state}
														onChange={this.changeValue.bind(null, 'state',1)}>
											{stateOptionNodes}
										</select>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label for="" className="control-label">City / Town:</label>
								<Input type="text" id="city" ref="city" validate="isString" require
											 onChange={this.changeValue.bind(null, 'city', 0)} value={this.state.payAccount.city}/>
							</div>
							<div className="form-group">
								<label for="" className="control-label">Address:</label>
								<Input type="text" id="address" ref="address" validate="isString" require
											 onChange={this.changeValue.bind(null, 'address1', 0)} value={this.state.payAccount.address1}/>
							</div>
							<div className="form-group">
								<label for="" className="control-label">ZIP / Postal Code:</label>
								<Input type="text" id="zip" ref="zip" validate="isNumber" require
											 onChange={this.changeValue.bind(null, 'zip', 0)} value={this.state.payAccount.zip}/>
							</div>
							<div className="form-group">
								<label for="" className="control-label">Email Address:</label>
								<Input type="text" id="email" ref="email" validate="isEmail" require
											 onChange={this.changeValue.bind(null, 'email', 0)} value={this.state.payAccount.email}/>
							</div>
							<div className="form-group">
								<label for="" className="control-label">Phone:</label>
								<Input type="text" id="phone" ref="phone" validate="isNumber" require
											 onChange={this.changeValue.bind(null, 'phone', 0)} value={this.state.payAccount.phone}/>
							</div>

							<ExtraInfo changeValue={this.changeValue} ssn={this.state.payAccount.ssn}
												 dobMonth={this.state.payAccount.dobMonth}
												 dobDay={this.state.payAccount.dobDay} dobYear={this.state.payAccount.dobYear}/>
						</div>
						<div className="form-group">
							<div className="row">
								{this.state.displaySaveButton ?
									<button type='submit' className='btn btn-green'>Save</button> : null }
							</div>
						</div>
					</div>
				</form>
			)
		}
	})
	;

module.exports.Register = Register;