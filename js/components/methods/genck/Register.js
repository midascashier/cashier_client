import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { CashierStore } from '../../../stores/CashierStore'
import { ApplicationService } from '../../../services/ApplicationService'
import { CashierActions } from '../../../actions/CashierActions'

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
					middleName: "",
					lastName: "",
					address1: "",
					address2: "",
					city: "",
					country: country,
					state: states[0]['Small'],
					zip: "",
					phone: "",
					email: "",
					dobDay: 1,
					dobMonth: 1,
					dobYear: 1940,
					dob: "",
					transactionType: 2
				}
			}
		},

		/**
		 * Sets netellerNewAccount
		 *
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
			let actualState = this.state;
			e.preventDefault();

			for(let i = 0; i < e.target.length; i++){
				if(e.target[i].type != 'submit' && e.target[i].type != 'button' && e.target[i].type != 'checkbox'){
					if(parseInt(e.target[i].getAttribute('data-isRequired')) == 1 && e.target[i].value.length <= 0){
						e.target[i].style['border-color'] = 'red';
						e.target[i].focus();
						return false;
					}

					if(!ApplicationService.validateInfo(e.target[i].value, e.target[i].getAttribute('data-validation'))){
						e.target[i].style['border-color'] = 'red';
						e.target[i].focus();
						return false;
					}
				}
			}

			/*this.setState({
				displaySaveButton: false
			});*/
			actualState.payAccount.dobDay = ('0' + actualState.payAccount.dobDay).slice(-2);
			actualState.payAccount.dobMonth = ('0' + actualState.payAccount.dobMonth).slice(-2);

			actualState.payAccount.dob = this.state.payAccount.dobYear + "-" + actualState.payAccount.dobMonth + "-" + actualState.payAccount.dobDay;
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
		}
	},


	render(){
			let countries = UIService.getCountries();
			let states = UIService.getCountryStates();
			let selectMonths = [];
			let selectYears = [];
			let selectDays = [];

			let countryOptionNodes = [];
			for(let i = 0; i < countries.length; i++){
				countryOptionNodes.push(UIService.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
			}

			let stateOptionNodes = [];
			for(let i = 0; i < states.length; i++){
				stateOptionNodes.push(UIService.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
			}


			for(let i = 1; i < 32; i++){
				selectDays.push(UIService.renderOption({ label: i }, i));
			}

			for(let i = 1; i < 13; i++){
				selectMonths.push(UIService.renderOption({ label: i }, i));
			}

			for(let i = 1940; i < 2016; i++){
				selectYears.push(UIService.renderOption({ label: i }, i));
			}


			return (
				<form onSubmit={this.addNewPayAccount}>
					<div id="ckRegister">

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_FIRST_NAME', 'First Name')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="firstName" ref="firstName" validate="isString" onChange={this.changeValue.bind(null, 'firstName', 0)} value={this.state.payAccount.firstName} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_MIDDLE_NAME', 'Middle Name')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'middleName', 0)} value={this.state.payAccount.middleName} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_LAST_NAME', 'Last Name')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'lastName', 0)} value={this.state.payAccount.lastName} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_ADDRESS1', 'Address1')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'address1', 0)} value={this.state.payAccount.address1} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_ADDRESS2', 'Address2')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'address2', 0)} value={this.state.payAccount.address2} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_CITY', 'City')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="city" ref="city" validate="isString" onChange={this.changeValue.bind(null, 'city', 0)} value={this.state.payAccount.city} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_COUNTRY', 'Country')}:</label>
							<div className="col-sm-8">
								<select className="form-control" id="country" value={this.state.payAccount.country} onChange={this.changeValue.bind(null, 'country',1)}>
									{countryOptionNodes}
								</select>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_STATE', 'State')}:</label>
							<div className="col-sm-8">
								<select className="form-control" id="countryState" onChange={this.changeValue.bind(null, 'state',1)} disabled={!states.length}>
									{stateOptionNodes}
								</select>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_ZIP', 'ZIP')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'zip', 0)} value={this.state.payAccount.zip} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_CONTACT_PHONE', 'Phone')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="phone" ref="phone" validate="isNumber" onChange={this.changeValue.bind(null, 'phone', 0)} value={this.state.payAccount.phone} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_EMAIL', 'Email')}:</label>
							<div className="col-sm-8">
								<Input type="email" id="email" ref="email" validate="isEmail" onChange={this.changeValue.bind(null, 'email', 0)} value={this.state.payAccount.email} require/>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
							<div className="col-sm-2">
								<select className="form-control" id="dobMonth" ref="dobMonth" name="dobMonth" onChange={this.changeValue.bind(null,'dobMonth', 1)}>
									{selectMonths}
								</select>
							</div>
							<div className="col-sm-2">
								<select className="form-control" id="dobDay" ref="dobDay" name="dobDay" onChange={this.changeValue.bind(null,'dobDay', 1)}>
									{selectDays}
								</select>
							</div>
							<div className="col-sm-4">
								<select className="form-control" id="dobYear" ref="dobYear" name="dobYear" onChange={this.changeValue.bind(null,'dobYear', 1)}>
									{selectYears}
								</select>
							</div>
						</div>


						<div className="form-group">
							<div className="form-group">
								<div className="col-sm-4"></div>
								<div className="col-sm-2">
									{this.state.displaySaveButton ? <button type='submit'
																													className='btn btn-green'>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button> : null }
								</div>
								<div className="col-sm-2">
									{this.state.displaySaveButton ? <button type='button' onClick={this.cancel}
																													className='btn btn-green'>{translate('PROCESSING_BUTTON_CANCEL', 'Save')}</button> : null }
								</div>
							</div>
						</div>

					</div>
				</form>
			)
		}
});

module.exports.Register = Register;