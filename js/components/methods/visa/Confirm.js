import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { Input } from '../../Inputs'

let VisaConfirm = React.createClass({

	/**
	 * React function to set component initial state
	 */

	getInitialState(){
		return this.refreshLocalState();
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
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		let isEditEnabled;
		if(this.state != null){
			if(this.state.info.editMode == 1){
				isEditEnabled = 1;
			} else{
				isEditEnabled = 0;
			}
		} else{
			isEditEnabled = 0;
		}

		return {
			info: {
				transaction: CashierStore.getTransaction(),
				payAccount: CashierStore.getCurrentPayAccount(),
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
		this.setState(this.refreshLocalState());
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
	},

	/**
	 * change the billing info view
	 *
	 * @param option
	 */
	editBillingInfo(option){
		let actualState = this.state.info;
		actualState.editMode = option;
		this.setState({ info: actualState });
	},

	/**
	 * Save billing info
	 */
	saveBillingInfo(e){
		e.preventDefault();
		let actualState = this.state.info;

		for(let i = 0; i < e.target.length; i++){
			if(parseInt(e.target[i].getAttribute('data-isRequired')) == 1 && e.target[i].value.length <= 0){
				return false;
			}

			if(e.target[i].getAttribute('data-isValid') == "false"){
				return false;
			}
		}


		actualState.editMode = 0;
		let value;
		let payAccountEdit = {};
		for(let input in this.refs){
			if(input == 'country' || input == 'state'){
				value = this.refs[input].value;
			} else{
				value = this.refs[input].props.value;
			}
			payAccountEdit[input] = value;
		}

		let CCInfo = this.state.info.payAccount.secure;
		for(let secureInfo in CCInfo){
			payAccountEdit[secureInfo] = CCInfo[secureInfo];
		}
		payAccountEdit['payAccountId'] = this.state.info.payAccount['payAccountId'];

		TransactionService.registerPayAccount(payAccountEdit);
		this.setState({ info: actualState });
	},

	/**
	 * Edit inputs info
	 *
	 * @param event
	 */
	changeValue(section, propertyName, isSelectComponent = 0, value){
		const actualState = this.state.info;

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
		let personalData = this.state.info.payAccount.personal;
		let secureData = this.state.info.payAccount.secure;
		let CCMask = secureData.account.replace(/\d(?=\d{4})/g, "*");
		let addressData = this.state.info.payAccount.address;
		let isEditMode = this.state.info.editMode;

		let states = UIService.getCountryStates();
		let countries = UIService.getCountries();
		let country = UIService.getCountry(addressData.country);
		let state = UIService.getState(addressData.country, addressData.state);
		let stateOptionNodes = [];
		let countryOptionNodes = [];

		if(isEditMode){
			for(let i = 0; i < countries.length; i++){
				countryOptionNodes.push(UIService.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
			}

			if (states){
				for(let i = 0; i < states.length; i++){
					stateOptionNodes.push(UIService.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
				}
			}
		}

		return (
			<div id="visaConfirm" className="internal-content">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">
								<div className="col-sm-6">
									<div className="box">
										<div className="row">
											<div className="col-sm-12">
												<div className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>
												<div className="infoCol">
													{(() =>{
														if(isEditMode){
															return (
																<form onSubmit={this.saveBillingInfo}>
																	<ul>
																		<li>
																			<label className="control-label">First Name:</label>
																			<Input type="text" id="firstName" ref="firstName" validate="isString" require
																						 onChange={this.changeValue.bind(null, 'personal','firstName', 0)}
																						 value={personalData.firstName}/>
																		</li>
																		<li>
																			<label className="control-label">Last Name:</label>
																			<Input type="text" id="lastName" ref="lastName" validate="isString"
																						 onChange={this.changeValue.bind(null, 'personal','lastName', 0)}
																						 value={personalData.lastName}/>
																		</li>
																		<li>
																			<label className="control-label">{translate('CREDIT_COUNTRY', 'Country')}:</label>
																			<select className="form-control" id="country" ref="country"
																							value={country.Small}
																							onChange={this.changeValue.bind(null, 'address','country',1)}>
																				{countryOptionNodes}
																			</select>
																		</li>
																		<li>
																			<label className="control-label">{translate('CREDIT_STATE', 'State')}:</label>
																			<select className="form-control" id="countryState"
																							ref="state" value={state.Small} disabled={!states.length}
																							onChange={this.changeValue.bind(null, 'address','state',1)}>
																				{stateOptionNodes}
																			</select>
																		</li>
																		<li>
																			<label className="control-label">City / Town:</label>
																			<Input type="text" id="city" ref="city" validate="isString"
																						 onChange={this.changeValue.bind(null, 'address','city', 0)}
																						 value={addressData.city}/>
																		</li>
																		<li>
																			<label className="control-label">Address:</label>
																			<Input type="text" id="address" ref="address1" validate="isString"
																						 onChange={this.changeValue.bind(null, 'address','address1', 0)}
																						 value={addressData.address1}/>
																		</li>
																		<li>
																			<label className="control-label">ZIP / Postal Code:</label>
																			<Input type="text" id="zip" ref="zip" validate="isNumber"
																						 onChange={this.changeValue.bind(null, 'address','zip', 0)}
																						 value={addressData.zip}/>
																		</li>
																		<li>
																			<label className="control-label">Email Address:</label>
																			<Input type="text" id="email" ref="email" validate="isEmail" require
																						 onChange={this.changeValue.bind(null, 'personal','email', 0)}
																						 value={personalData.email}/>
																		</li>
																		<li>
																			<label className="control-label">Phone:</label>
																			<Input type="text" id="phone" ref="phone" validate="isNumber" require
																						 onChange={this.changeValue.bind(null, 'personal','phone', 0)}
																						 value={personalData.phone}/>
																		</li>
																	</ul>
																	<button type='submit' className='btn btn-green'>
																		{translate('PROCESSING_BUTTON_SAVE', 'Save')}
																	</button>
																	<button onClick={this.editBillingInfo.bind(null, 0)} type='button' className='btn btn-green'>
																		{translate('PROCESSING_BUTTON_CANCEL', 'Cancel')}
																	</button>
																</form>
															)
														} else{
															return (
																<div>
																	<ul>
																		<li>{personalData.firstName + ' ' + personalData.lastName}</li>
																		<li>{addressData.address1}</li>
																		<li>{state.Name}</li>
																		<li>{country.Name + ' ' + addressData.zip}</li>
																	</ul>
																	<p>
																		<i className="fa fa-pencil green"></i><a
																		onClick={this.editBillingInfo.bind(null, 1)}>{translate('PROCESSING_BILLING_INFO_EDIT', 'Edit the billing address')}</a>
																	</p>
																</div>
															);
														}
													})()}
												</div>
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
																<td><span>{CCMask}</span></td>
															</tr>
															<tr>
																<td>{translate('CREDIT_CARD_EXPIRATION')}:</td>
																<td><span>{secureData.extra1 + ' / ' + secureData.extra2}</span></td>
															</tr>
															<tr>
																<td>{translate('PROCESSING_AMOUNT')}:</td>
																<td><span>{this.state.info.transaction.amount}</span></td>
															</tr>
														</tbody>
													</table>
												</div>
												<p>
													<i className="fa fa-pencil green"></i>
													<a onClick={this.startTransaction}>Edit the deposit details</a>
												</p>
												<form className="form-horizontal infoCol">
													<button type="button" onClick={this.processTransaction}
																	className="btn btn-green">{translate('PROCESSING_BUTTON_COMPLETE_DEPOSIT', 'Complete')}</button>
													<p><a onClick={this.setFirstStep}>No thanks. I'll deposit a different way.</a></p>
												</form>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaConfirm = VisaConfirm;