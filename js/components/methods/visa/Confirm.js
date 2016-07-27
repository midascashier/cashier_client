import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { Input } from '../../Inputs'
import { Link } from 'react-router'

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
		return {
			info: {
				transaction: CashierStore.getTransaction(),
				payAccount: CashierStore.getCurrentPayAccount(),
				country: CashierStore.getSelectedCountry(),
				state: CashierStore.getCountryStates()[0]['Small'],
				editMode: 0
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

	render(){
		let personalData = this.state.info.payAccount.personal;
		let secureData = this.state.info.payAccount.secure;
		secureData.account = secureData.account.replace(/\d(?=\d{4})/g, "*");
		let addressData = this.state.info.payAccount.address;
		let extraData = this.state.info.payAccount.extra;
		let isEditMode = this.state.info.editMode;
		let UI = CashierStore.getUI();
		let countries = UI.countries;
		let states = UI.countryStates;
		let stateOptionNodes = [];
		let countryOptionNodes = [];

		for(let i = 0; i < countries.length; i++){
			countryOptionNodes.push(this.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
		}

		for(let i = 0; i < states.length; i++){
			stateOptionNodes.push(this.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
		}

		return (
			<div id="confirmVisa" className="internal-content">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">

								<div className="col-sm-6 ">
									<div className="box">

										<div className="row">

											<div className="col-sm-12">
												<div
													className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>
												<div className="infoCol">
													{(() =>{
														if(isEditMode){
															return (
																<div>
																	<form onSubmit={this.saveBillingInfo}>
																		<ul>
																			<li>
																				<label for="" className="control-label">First Name:</label>
																				<Input type="text" id="firstName" ref="firstName" validate="isString"
																							 value={personalData.firstName}/>
																			</li>
																			<li>
																				<label for="" className="control-label">Last Name:</label>
																				<Input type="text" id="lastName" ref="lastName" validate="isString"
																							 value={personalData.lastName}/>
																			</li>
																			<li>
																				<label for=""
																							 className="control-label">{translate('CREDIT_STATE', 'Country')}:</label>
																				<select className="form-control" id="country" value={this.state.info.country}>
																					{countryOptionNodes}
																				</select>
																			</li>
																			<li>
																				<label for=""
																							 className="control-label">{translate('CREDIT_STATE', 'State')}:</label>
																				<select className="form-control" id="countryState"
																								value={this.state.info.state}>
																					{stateOptionNodes}
																				</select>
																			</li>
																			<li>
																				<label for="" className="control-label">City / Town:</label>
																				<Input type="text" id="city" ref="city" validate="isString"
																							 value={addressData.city}/>
																			</li>
																			<li>
																				<label for="" className="control-label">Address:</label>
																				<Input type="text" id="address" ref="address" validate="isString"
																							 value={addressData.address1}/>
																			</li>
																			<li>
																				<label for="" className="control-label">ZIP / Postal Code:</label>
																				<Input type="text" id="zip" ref="zip" validate="isNumber"
																							 value={addressData.zip}/>
																			</li>
																			<li>
																				<label for="" className="control-label">Email Address:</label>
																				<Input type="text" id="email" ref="email" validate="isEmail" require
																							 value={personalData.email}/>
																			</li>
																			<li>
																				<label for="" className="control-label">Phone:</label>
																				<Input type="text" id="phone" ref="phone" validate="isNumber" require
																							 value={personalData.phone}/>
																			</li>
																		</ul>
																		<button onClick={this.saveBillingInfo} type='submit' className='btn btn-green'>
																			Save
																		</button>
																		<button onClick={this.editBillingInfo.bind(null, 0)} type='button'
																						className='btn btn-green'>Cancel
																		</button>
																	</form>
																</div>
															)
														} else{
															return (
																<div>
																	<ul>
																		<li>{personalData.firstName + ' ' + personalData.lastName}</li>
																		<li>{addressData.address1}</li>
																		<li>{addressData.state}</li>
																		<li>{addressData.country + ' ' + addressData.zip}</li>
																	</ul>

																	<p><i className="fa fa-pencil green"></i><a
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
												<div className="deposit-details">
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
													<p><i className="fa fa-pencil green"></i><Link to={`/deposit/visa/`}>Edit the deposit
														details</Link></p>
												</div>
												<form className="form-horizontal infoCol">
													<div className="form-group">
														<label for="" className="col-sm-4 control-label">{translate('CREDIT_CARD_SSN')}:</label>
														<div className="col-sm-8">
															<Input type="text" id="ssn" value={extraData.ssn} autoComplete="off" readOnly/>
														</div>
													</div>
													<div className="form-group">
														<label for="" className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
														<div className="col-sm-8">
															<Input type="date" id="dob" value={extraData.dob} readOnly/>
														</div>
													</div>
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
