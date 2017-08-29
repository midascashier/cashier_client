import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { ApplicationService } from '../../../services/ApplicationService'
import { EditMode } from './EditMode'

let VisaConfirm = React.createClass({

	/**
	 * React function to set component initial state
	 */

	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		let isEditEnabled;
		if(this.state != null){
			if(this.state.info.editMode == 1){
				isEditEnabled = 1;
			}else{
				isEditEnabled = 0;
			}
		}else{
			isEditEnabled = 0;
		}

		let payAccount = ApplicationService.clone(CashierStore.getCurrentPayAccount());

		return {
			info: {
				transaction: CashierStore.getTransaction(),
				payAccount: payAccount,
				editMode: isEditEnabled
			}
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		let payAccount = this.state.payAccount;
		this.setState({
			payAccount
		});
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	processTransaction(){
		TransactionService.processCC();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	/**
	 * send the customer to select the payAccount again
	 */
	startTransaction() {
		UIService.startTransaction();
		UIService.setCCEditMode(1);
	},

	/**
	 * change the billing info view
	 *
	 * @param option
	 */
	editBillingInfo(option){
		let actualState = this.state.info;
		actualState.editMode = option;
		if(option == 0){
			this._onChange();
		}else{
			this.setState({ info: actualState });
		}
	},

	/**
	 * Save billing info
	 */
	saveBillingInfo(e){
		e.preventDefault();
		let actualState = this.state.info;
		let value;
		let payAccountEdit = {};
		let CCInfo = this.state.info.payAccount.secure;

		for(let i = 0; i < e.target.length; i++){
			if(parseInt(e.target[i].getAttribute('data-isRequired')) == 1 && e.target[i].value.length <= 0){
				return false;
			}

			if(e.target[i].getAttribute('data-isValid') == "false"){
				e.target[i].focus();
				return false;
			}
		}

		actualState.editMode = 0;

		for(let input in this.refs){
			if(input == 'country' || input == 'state'){
				value = this.refs[input].value;
			}else{
				value = this.refs[input].props.value;
			}
			payAccountEdit[input] = value;
		}

		for(let secureInfo in CCInfo){
			payAccountEdit[secureInfo] = CCInfo[secureInfo];
		}

		payAccountEdit['payAccountId'] = this.state.info.payAccount['payAccountId'];

		TransactionService.updatePayAccount(payAccountEdit);
		this.setState({ info: actualState });
	},

	/**
	 * Edit inputs info
	 * 
	 * @param section
	 * @param propertyName
	 * @param isSelectComponent
     * @param value
     */
	changeValue(section, propertyName, isSelectComponent = 0, value){
		let actualState = this.state.info;
		if(isSelectComponent){
			value = value.target.value;
		}

		if(propertyName == 'country'){
			UIService.getCountryStates(value);
		}

		actualState.payAccount[section][propertyName] = value;
		this.setState({ info: actualState });
	},

	render(){
		let stateOptionNodes = [];
		let countryOptionNodes = [];
		let personalData = this.state.info.payAccount.personal;
		let secureData = this.state.info.payAccount.secure;
		let customer = CashierStore.getCustomer();
		let addressData = this.state.info.payAccount.address;
		let isEditMode = this.state.info.editMode;
		let countries = UIService.getCountries();
		let stateInfo = UIService.getState(addressData.country, addressData.state);
		let states = UIService.getCountryStates();

		let DOB;

		if(this.state.info.payAccount.extra.dobMonth && this.state.info.payAccount.extra.dobDay && this.state.info.payAccount.extra.dobYear){
			DOB = this.state.info.payAccount.extra.dob;
		}else{
			DOB = this.state.info.transaction.dobMonth + "-" + this.state.info.transaction.dobDay + "-" + this.state.info.transaction.dobYear;
		}

		let ssn;

		if(this.state.info.transaction.ssn){
			ssn = this.state.info.transaction.ssn;
		}else{
			ssn = this.state.info.payAccount.extra.ssn;
		}

		if(isEditMode){
			for(let i = 0; i < countries.length; i++){
				countryOptionNodes.push(UIService.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
			}

			if(states){
				for(let i = 0; i < states.length; i++){
					if(states[i]['Name']){
						stateOptionNodes.push(UIService.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
					}
				}
			}
		}

		return (
			<div id="visaConfirm" className="internal-content">
				<div className="row">

					<div className="col-sm-6">
						<div className="box">
							<div className="row">
								<div className="col-sm-12">
									<div className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>

									{(() =>{
										if(isEditMode){
											return (
												<EditMode/>
											)
										}
									})()}

									{(() =>{
										if(!isEditMode){
											return (
												<div className="infoCol">
													<div className="row">
														<div className="col-sm-12">
															<ul>
																<li>{personalData.firstName + ' ' + personalData.lastName}</li>
																<li>{addressData.address1}</li>
																<li>{stateInfo.Name}</li>
																<li>{addressData.countryName + ' ' + addressData.zip}</li>
															</ul>
															<p>
																<i className="fa fa-pencil green"></i>
																<a onClick={this.editBillingInfo.bind(null, 1)}>
																	{translate('PROCESSING_BILLING_INFO_EDIT', 'Edit the billing address')}
																</a>
															</p>
														</div>
													</div>
												</div>
											);
										}
									})()}
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="box">
							<div className="row">
								<div className="col-sm-12">
									<div className="title">{translate('METHOD_DETAILS_DEPOSIT', 'Deposit Details')}</div>
									<div className="table-responsive">
										<table className="table table-striped">
											<tbody>
											<tr>
												<td>{translate('CREDIT_CARD_HOLDER')}:</td>
												<td><span>{secureData.extra3}</span></td>
											</tr>
											<tr>
												<td>{translate('CREDIT_CARD_NUMBER')}:</td>
												<td><span>{secureData.account}</span></td>
											</tr>
											<tr>
												<td>{translate('CREDIT_CARD_CVV')}:</td>
												<td><span>***</span></td>
											</tr>
											<tr>
												<td>{translate('CREDIT_CARD_DOB')}:</td>
												<td><span>{DOB}</span></td>
											</tr>
											<tr>
												<td>{translate('CREDIT_CARD_SSN')}:</td>
												<td><span>{ssn}</span></td>
											</tr>
											<tr>
												<td>{translate('CREDIT_CARD_EXPIRATION')}:</td>
												<td><span>{secureData.extra1 + ' / ' + secureData.extra2}</span></td>
											</tr>
											<tr>
												<td>{translate('PROCESSING_AMOUNT')}:</td>
												<td><span>{ApplicationService.currency_format(this.state.info.transaction.amount)} {customer.currency}</span></td>
											</tr>
											</tbody>
										</table>
									</div>
									<p>
										<i className="fa fa-pencil green"></i>
										<a onClick={this.startTransaction}>{translate('EDIT_DEPOSIT_DETAILS')}</a>
									</p>
									<form className="form-horizontal infoCol">
										<button type="button" onClick={this.processTransaction}
														className="btn btn-green">{translate('PROCESSING_BUTTON_COMPLETE_DEPOSIT', 'Complete')}</button>
										<p><a onClick={this.setFirstStep}>{translate('ILL_DEPOSIT_DIFFERENT_WAY')}</a></p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
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

module.exports.VisaConfirm = VisaConfirm;