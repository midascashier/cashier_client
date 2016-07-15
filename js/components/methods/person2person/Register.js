import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
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
			return {
				displaySaveButton: true,
				payAccount: {
					firstName: "",
					lastName: "",
					country: CashierStore.getSelectedCountry(),
					state: CashierStore.getCountryStates()[0]['Small'],
					city: "",
					phone: "",
					email: ""
				}
			}
		},

		/**
		 * Sets netellerNewAccount
		 *
		 * @param event
		 */
		changeValue(propertyName, isSelectComponent = 0, event){
			const payAccount = this.state.payAccount;

			let value = event;

			if(isSelectComponent){
				value = value.target.value;
			}

			if(propertyName == 'country'){
				ApplicationService.getCountryStates(value);
			}

			payAccount[propertyName] = value;

			this.setState(
				payAccount
			);

		},

		addNewPayAccount(e){
			e.preventDefault();
			TransactionService.registerPayAccount(this.state.payAccount);
			this.setState({
				displaySaveButton: false
			});
		},

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
			let UI = CashierStore.getUI();
			let countries = UI.countries;
			let states = UI.countryStates;

			let countryOptionNodes = [];
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
							<label for="" className="control-label">{translate('P2P_FIRST_NAME', 'First Name')}:</label>
							<Input type="text" id="firstName" onChange={this.changeValue.bind(this, 'firstName', 0)}
										 value={this.state.payAccount.firstName}/>
						</div>
						<div className="form-group">
							<label for="" className="control-label">{translate('P2P_LAST_NAME', 'Last Name')}:</label>
							<Input type="text" id="lastName" onChange={this.changeValue.bind(this, 'lastName', 0)}
										 value={this.state.payAccount.lastName}/>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label for="" className="control-label">{translate('P2P_COUNTRY', 'Country')}:</label>
										<select className="form-control" id="country" value={this.state.payAccount.country}
														onChange={this.changeValue.bind(this, 'country',1)}>
											{countryOptionNodes}
										</select>
									</div>
								</div>
								<div className="col-sm-6">
									<label for="" className="control-label">{translate('P2P_STATE', 'State')}:</label>
									<select className="form-control" id="countryState" onChange={this.changeValue.bind(this, 'state',1)}>
										{stateOptionNodes}
									</select>
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-sm-6">
									<label for="" className="control-label">{translate('P2P_CITY', 'City')}:</label>
									<Input type="text" id="city" onChange={this.changeValue.bind(this, 'city', 0)}
												 value={this.state.payAccount.city}/>
								</div>
								<div className="col-sm-6">
									<label for="" className="control-label">{translate('P2P_PHONE', 'Phone')}:</label>
									<Input type="text" id="phone" onChange={this.changeValue.bind(this, 'phone', 0)}
												 value={this.state.payAccount.phone}/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label for="" className="control-label">{translate('P2P_EMAIL', 'Email')}:</label>
							<Input type="email" id="email" onChange={this.changeValue.bind(this, 'email', 0)}
										 value={this.state.payAccount.email}/>
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