import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
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
			let country = CashierStore.getSelectedCountry();
			let states = UIService.getCountryStates();
			return {
				displaySaveButton: true,
				payAccount: {
					firstName: "",
					lastName: "",
					country: country,
					state: states[0]['Small'],
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
			e.preventDefault();
			for(let input in this.refs){
				if(this.refs[input].props.require && this.refs[input].props.value.length <= 0){
					return false;
				}
				if(!this.refs[input].state.isValid){
					return false;
				}
			}
			TransactionService.registerPayAccount(this.state.payAccount);
			this.setState({
				displaySaveButton: false
			});
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
							<label for="" className="control-label">{translate('P2P_FIRST_NAME', 'First Name')}:</label>
							<Input type="text" id="firstName" ref="firstName" validate="isString" require
										 onChange={this.changeValue.bind(null, 'firstName', 0)}
										 value={this.state.payAccount.firstName}/>
						</div>
						<div className="form-group">
							<label for="" className="control-label">{translate('P2P_LAST_NAME', 'Last Name')}:</label>
							<Input type="text" id="lastName" ref="lastName" validate="isString" require
										 onChange={this.changeValue.bind(null, 'lastName', 0)}
										 value={this.state.payAccount.lastName}/>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label for="" className="control-label">{translate('P2P_COUNTRY', 'Country')}:</label>
										<select className="form-control" id="country" value={this.state.payAccount.country}
														onChange={this.changeValue.bind(null, 'country',1)}>
											{countryOptionNodes}
										</select>
									</div>
								</div>
								<div className="col-sm-6">
									<label for="" className="control-label">{translate('P2P_STATE', 'State')}:</label>
									<select className="form-control" id="countryState" onChange={this.changeValue.bind(null, 'state',1)} disabled={!states.length}>
										{stateOptionNodes}
									</select>
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="row">
								<div className="col-sm-6">
									<label for="" className="control-label">{translate('P2P_CITY', 'City')}:</label>
									<Input type="text" id="city" ref="city" validate="isString" require
												 onChange={this.changeValue.bind(null, 'city', 0)}
												 value={this.state.payAccount.city}/>
								</div>
								<div className="col-sm-6">
									<label for="" className="control-label">{translate('P2P_PHONE', 'Phone')}:</label>
									<Input type="text" id="phone" ref="phone" validate="isNumber" require
												 onChange={this.changeValue.bind(null, 'phone', 0)}
												 value={this.state.payAccount.phone}/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label for="" className="control-label">{translate('P2P_EMAIL', 'Email')}:</label>
							<Input type="email" id="email" ref="email" validate="isEmail" require
										 onChange={this.changeValue.bind(null, 'email', 0)}
										 value={this.state.payAccount.email}/>
						</div>
						<div className="form-group">
							<div className="row">
								{this.state.displaySaveButton ? <button type='submit' className='btn btn-green'>Save</button> : null }
							</div>
						</div>
					</div>
				</form>
			)
		}
});

module.exports.Register = Register;