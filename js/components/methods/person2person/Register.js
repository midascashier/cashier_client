import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { TransactionService } from '../../../services/TransactionService'
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
					country: 0,
					state: 0,
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
		changeValue(propertyName, selectComponent = 0, event){
			let value = event;
			if(selectComponent){
				value = value.target.value;
			}
			const payAccount = this.state.payAccount;
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

		render()
		{
			let UI = CashierStore.getUI();
			let customer = CashierStore.getCustomer();

			let countries = UI.countries;
			let states = UI.countryStates;
			let customerCountry = customer.personalInformation.countryName;
			let countryOptionNodes = [];
			let customerCountryID = this.state.payAccount.country;
			for(let i = 0; i < countries.length; i++){
				if (customerCountry == countries[i]['Name'] && !customerCountryID){
					customerCountryID=countries[i]['caLocCountry_Id'];
				}
				countryOptionNodes.push(this.renderOption({ label: countries[i]['Name']}, countries[i]['caLocCountry_Id']));
			}

			let stateOptionNodes = [];
			for(let i = 0; i < states.length; i++){
				stateOptionNodes.push(this.renderOption({ "label": states[i]['Name'] }, states[i]['caLocState_Id']));
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
										<select className="form-control" id="country" value={customerCountryID} onChange={this.changeValue.bind(this, 'country',1)}>
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