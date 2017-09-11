import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { ApplicationService } from '../../../services/ApplicationService'

import { CashierStore } from '../../../stores/CashierStore'

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
		let country = CashierStore.getSelectedCountry();
		let states = UIService.getCountryStates();

		let customer = CashierStore.getCustomer();

		let firstName = customer.personalInformation.firstName ? customer.personalInformation.firstName : "";
		let lastName = customer.personalInformation.lastName ? customer.personalInformation.lastName : "";
		let city = customer.personalInformation.city ? customer.personalInformation.city : "";
		let email = customer.personalInformation.email ? customer.personalInformation.email : "";
		let phone = customer.personalInformation.phone ? customer.personalInformation.phone : "";
		let customerState = customer.personalInformation.state ? customer.personalInformation.state : states[0]['Small'];

		return {
			displaySaveButton: true,
			payAccount: {
				firstName: firstName,
				lastName: lastName,
				country: country,
				state: customerState,
				city: city,
				phone: phone,
				email: email
			}
		}
	},

	/**
	 * Sets p2pNewAccount
	 *
	 * @param propertyName
	 * @param isSelectComponent
	 * @param event
     */
	changeValue(propertyName, isSelectComponent = 0, event){
		let payAccount = this.state.payAccount;

		let value = event;

		if(isSelectComponent){
			value = value.target.value;
		}

		if(propertyName == 'country'){
			UIService.getCountryStates(value);
		}

		payAccount[propertyName] = value;

		this.setState(
			payAccount
		);

	},

	/**
	 * Sends request to register new payaccount
	 *
	 * @param e
	 * @returns {boolean}
	 */
	addNewPayAccount(e){

		if (!ApplicationService.emptyInput(e)) {

			this.setState({
				displaySaveButton: false
			});

			TransactionService.registerPayAccount(this.state.payAccount);
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
		let payAccount = this.state.payAccount;
		this.setState(
			payAccount
		);
	},

	render(){
		let countries = UIService.getCountries();
		let states = UIService.getCountryStates();

		let countryOptionNodes = [];
		for(let i = 0; i < countries.length; i++){
			countryOptionNodes.push(UIService.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
		}

		let stateOptionNodes = [];
		for(let i = 0; i < states.length; i++){
			stateOptionNodes.push(UIService.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
		}

		return (
			<form onSubmit={this.addNewPayAccount}>
				<div id="p2pRegister">

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('P2P_FIRST_NAME', 'First Name')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="firstName" ref="firstName" validate="isString"
										 onChange={this.changeValue.bind(null, 'firstName', 0)} value={this.state.payAccount.firstName}
										 require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('P2P_LAST_NAME', 'Last Name')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="lastName" ref="lastName" validate="isString"
										 onChange={this.changeValue.bind(null, 'lastName', 0)} value={this.state.payAccount.lastName}
										 require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('P2P_COUNTRY', 'Country')}:</label>
						<div className="col-sm-8">
							<select className="form-control" data-validation='isString' id="country"
											value={this.state.payAccount.country} onChange={this.changeValue.bind(null, 'country', 1)}>
								{countryOptionNodes}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('P2P_STATE', 'State')}:</label>
						<div className="col-sm-8">
							<select className="form-control" data-validation='isString' id="countryState"
											value={this.state.payAccount.state} onChange={this.changeValue.bind(null, 'state', 1)}
											disabled={!states.length}>
								{stateOptionNodes}
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('P2P_CITY', 'City')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="city" ref="city" validate="isString"
										 onChange={this.changeValue.bind(null, 'city', 0)} value={this.state.payAccount.city} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('P2P_PHONE', 'Phone')}:</label>
						<div className="col-sm-8">
							<Input type="text" id="phone" ref="phone" validate="isNumber"
										 onChange={this.changeValue.bind(null, 'phone', 0)} value={this.state.payAccount.phone} require/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('P2P_EMAIL', 'Email')}:</label>
						<div className="col-sm-8">
							<Input type="email" id="email" ref="email" validate="isEmail"
										 onChange={this.changeValue.bind(null, 'email', 0)} value={this.state.payAccount.email} require/>
						</div>
					</div>

					<div className="col-md-4 col-md-offset-4">
						<div className="row">
							<div className="col-sm-6">
								{this.state.displaySaveButton ? <button type='submit' className='btn btn-green'>
									{translate('PROCESSING_BUTTON_SAVE', 'Save')}
								</button> : null }
							</div>
							<div className="col-sm-6">
								{this.state.displaySaveButton ? <button type='button' onClick={this.cancel} className='btn btn-green'>
									{translate('PROCESSING_BUTTON_CANCEL', 'Save')}
								</button> : null }
							</div>
						</div>
					</div>

				</div>
			</form>
		)
	}
});

module.exports.Register = Register;