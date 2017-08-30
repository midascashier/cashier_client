import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { CashierStore } from '../../../stores/CashierStore'
import { ApplicationService } from '../../../services/ApplicationService'
import { CashierActions } from '../../../actions/CashierActions'
import { LoadingSpinnerSmall } from '../../../components/loading/LoadingSpinnerSmall'

let Register = React.createClass({

		/**
		 * React function to set component initial state
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
			let customer = CashierStore.getCustomer();

			let firstName = customer.personalInformation.firstName ? customer.personalInformation.firstName : "";
			let middleName = customer.personalInformation.middleName ? customer.personalInformation.middleName : "";
			let lastName = customer.personalInformation.lastName ? customer.personalInformation.lastName : "";
			let city = customer.personalInformation.city ? customer.personalInformation.city : "";
			let address1 = customer.personalInformation.addressOne ? customer.personalInformation.addressOne : "";
			let zip = customer.personalInformation.postalCode ? customer.personalInformation.postalCode : "";
			let email = customer.personalInformation.email ? customer.personalInformation.email : "";
			let phone = customer.personalInformation.phone ? customer.personalInformation.phone : "";
			let customerState = customer.personalInformation.state ? customer.personalInformation.state : states[0]['Small'];


			return {
				displaySaveButton: false,
				payAccount: {
					firstName: firstName,
					middleName: middleName,
					lastName: lastName,
					address1: address1,
					address2: "",
					city: city,
					country: country,
					state: "",
					zip: zip,
					phone: phone,
					email: email,
					dobDay: 1,
					dobMonth: 1,
					dobYear: 1940,
					dob: "",
					transactionType: 2,
					extra1: "Fedex"
				}
			}
		},

		/**
		 * Sets GenCk New Account
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

			//validate payAccount
			let displaySaveButton = true;
			Object.keys(payAccount).map(function(property){
				if(property != 'dob' && property != 'address2' && property != 'middleName'){
					displaySaveButton = displaySaveButton && !!(payAccount[property]);
				}
			});

			this.setState({
				payAccount,
				displaySaveButton
			});

		},

		/**
		 * Sends request to register new payAccount
		 *
		 * @param e
		 * @returns {boolean}
		 */
		addNewPayAccount(e){

			if (!ApplicationService.emptyInput(e)) {
				
				let actualState = this.state;

				actualState.payAccount.dobDay = ('0' + actualState.payAccount.dobDay).slice(-2);
				actualState.payAccount.dobMonth = ('0' + actualState.payAccount.dobMonth).slice(-2);
				actualState.payAccount.dob = this.state.payAccount.dobYear + "-" + actualState.payAccount.dobMonth + "-" + actualState.payAccount.dobDay;

				this.setState({
					actualState
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
			stateOptionNodes.push(UIService.renderOption({ label: translate('PROCESSING_OPTION_SELECT', 'Select option') }, ''));
			for(let i = 0; i < states.length; i++){
				stateOptionNodes.push(UIService.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
			}

			for(let i = 1; i < 32; i++){
				selectDays.push(UIService.renderOption({ label: i }, i));
			}

			for(let i = 1; i < 13; i++){
				i = ('0' + i).slice(-2);
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
								<Input type="text" id="firstName" ref="firstName" validate="isString" onChange={this.changeValue.bind(null, 'firstName', 0)} value={this.state.payAccount.firstName} require />
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_MIDDLE_NAME', 'Middle Name')}:</label>
							<div className="col-sm-8">
								<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'middleName', 0)} value={this.state.payAccount.middleName} />
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
								<Input type="text" id="lastName" ref="lastName" validate="isString" onChange={this.changeValue.bind(null, 'address2', 0)} value={this.state.payAccount.address2} />
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
								<select className="form-control" id="country" data-validation='isString'  value={this.state.payAccount.country} onChange={this.changeValue.bind(null, 'country',1)}>
									{countryOptionNodes}
								</select>
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-4 control-label">{translate('CK_STATE', 'State')}:</label>
							<div className="col-sm-8">
								{(() =>{
									if(!states.length){
										return <LoadingSpinnerSmall />;
									} else{
										return (
											<select className="form-control" data-validation='isString' id="countryState" value={this.state.payAccount.state} onChange={this.changeValue.bind(null, 'state',1)} disabled={!states.length}>
												{stateOptionNodes}
											</select>
										)
									}
								})()}
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
								<select className="form-control" data-validation='isNumber' id="dobMonth" ref="dobMonth" name="dobMonth" onChange={this.changeValue.bind(null,'dobMonth', 1)}>
									{selectMonths}
								</select>
							</div>
							<div className="col-sm-2">
								<select className="form-control" data-validation='isNumber' id="dobDay" ref="dobDay" name="dobDay" onChange={this.changeValue.bind(null,'dobDay', 1)}>
									{selectDays}
								</select>
							</div>
							<div className="col-sm-4">
								<select className="form-control" id="dobYear" data-validation='isNumber' ref="dobYear" name="dobYear" onChange={this.changeValue.bind(null,'dobYear', 1)}>
									{selectYears}
								</select>
							</div>
						</div>

						<div className="col-md-4 col-md-offset-4">
							<div className="row">
								<div className="col-sm-6">
									<button type='submit' className='btn btn-green' disabled={!this.state.displaySaveButton}>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button>
								</div>
								<div className="col-sm-6">
									<button type='button' onClick={this.cancel} className='btn btn-green'>{translate('PROCESSING_BUTTON_CANCEL', 'Save')}</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			)
		}
});

module.exports.Register = Register;