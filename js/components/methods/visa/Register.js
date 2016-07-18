import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { TransactionService } from '../../../services/TransactionService'
import { BillingInformationForm } from './BillingInformationForm'
import { CashierStore } from '../../../stores/CashierStore'
import { ApplicationService } from '../../../services/ApplicationService'

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
					phone: ""
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
			let selectMonths = [];
			for(let i = 1; i < 13; i++){
				selectMonths.push(this.renderOption({ label: i }, i));
			}

			let selectYears = [];
			for(let i = 2016; i < 2030; i++){
				selectYears.push(this.renderOption({ label: i }, i));
			}

			return (
				<form onSubmit={this.addNewPayAccount}>
					<div>

						<div className="form-group">
							<label for="" className="control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
							<Input type="text" id="ccName" onChange={this.changeValue.bind(null, 'extra3', 0)}
										 value={this.state.payAccount.extra3}/>
						</div>

						<div className="form-group">
							<label for="" className="control-label">{translate('CREDIT_CARD_NUMBER', 'Card Number')}:</label>
							<Input type="text" id="creditCardNumber" onChange={this.changeValue.bind(null, 'account', 0)}
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
							<Input type="text" id="cvv" onChange={this.changeValue.bind(null, 'password', 0)}
										 value={this.state.payAccount.password}/>
						</div>

						<BillingInformationForm renderOption={this.renderOption} changeValue ={this.changeValue}
																		selectedState={this.state.payAccount.state} selectedCountry={this.state.payAccount.country}
																		firstName={this.state.payAccount.firstName} lastName={this.state.payAccount.lastName}
																		city={this.state.payAccount.city} zip={this.state.payAccount.zip}
																		address1={this.state.payAccount.address1}	email={this.state.payAccount.email}
																		phone={this.state.payAccount.phone}
						/>


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