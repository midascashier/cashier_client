import React from 'react'
import { Input } from '../../../Inputs'
import { LoadingSpinner } from '../../../loading/LoadingSpinner'
import { translate } from '../../../../constants/Translate'
import { UIService } from '../../../../services/UIService'
import { TransactionService } from '../../../../services/TransactionService'
import { CashierStore } from '../../../../stores/CashierStore'

let VisaRejectCardTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{transaction}|{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, descriptor: string, cleanTransaction: (function())})}}
	 */
	refreshLocalState() {
		let transaction = UIService.getTransactionInformation();
		let payAccount = UIService.getPayAccountInformation();
		return {
			transaction: transaction,
			payAccount: payAccount
		}
	},

	/**
	 * component is ready
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
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * reprocesses a credit card transaction that just failed.
	 */
	reProcessTransaction(){
		TransactionService.processCC();
	},

	/**
	 *
	 * @param e
	 * @returns {boolean}
	 */
	updateCreditCardSecure(e){
		e.preventDefault();
		for(let input in this.refs){
			if(this.refs[input].props.require && this.refs[input].props.value.length <= 0){
				return false;
			}
			if(!this.refs[input].state.isValid){
				return false;
			}
		}

		const payAccount = this.state.payAccount;
		payAccount.updateSuccess = 0;
		this.setState({displaySaveButton: false, payAccount: payAccount});
		TransactionService.updateCreditCardSecure();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
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

	/**
	 * Set visa New Account Info
	 *
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		const payAccount = this.state.payAccount;
		let value = event;
		payAccount.secure[propertyName] = value;
		this.setState({payAccount: payAccount});
	},

	render() {

		let payAccount = this.state.payAccount;
		let secureData = payAccount.secure;
		let selectMonths = [];
		let selectYears = [];
		let now = new Date();

		for(let i = 1; i < 13; i++){
			selectMonths.push(this.renderOption({label: i}, i));
		}

		for(let i = now.getFullYear(); i < now.getFullYear() + 15; i++){
			selectYears.push(this.renderOption({label: i}, i));
		}

		return (
			<div id="visaRejectCardTicket">
				<div className="row">
					<div className="col-sm-12">
						<div className="rejected-message">
							<div className="title">{translate('CREDIT_CARD_QUICK_FIX', 'Quick fix...')}</div>
							<p>
								{translate('CREDIT_CARD_QUICK_FIX_INFO')}
							</p>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">

								<div className="col-sm-12">
									<div className="row">

										<div className="col-sm-6">
											<div className="box">
												<div className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>
												<div className="infoCol">
													{(!payAccount.updateSuccess) ? <LoadingSpinner /> : null}

														<div id="formEditCC">
															<div className="form-group">
																<label className="control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
																<Input type="text" id="ccName" ref="ccName" validate="isString" require
																			 onChange={this.changeValue.bind(null, 'extra3', 0)}
																			 value={secureData.extra3}/>
															</div>

															<div className="form-group">
																<label className="control-label">{translate('CREDIT_CARD_NUMBER', 'Card Number')}:</label>
																<Input type="text" id="creditCardNumber" ref="creditCardNumber" validate="isCreditNumber" require
																			 onChange={this.changeValue.bind(null, 'account', 0)}
																			 value={secureData.account}/>
															</div>

															<div className="form-group">
																<label className="control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
																<div className="row">
																	<div className="col-sm-6">
																		<div className="form-group">
																			<select className="form-control" id="ccExpMonth" onChange={this.changeValue.bind(null, 'extra1',1)} value={secureData.extra1}>
																				{selectMonths}
																			</select>
																		</div>
																	</div>
																	<div className="col-sm-6">
																		<div className="form-group">
																			<select className="form-control" id="ccExpYear" onChange={this.changeValue.bind(null, 'extra2',1)} value={secureData.extra2}>
																				{selectYears}
																			</select>
																		</div>
																	</div>
																</div>
															</div>

															<div className="form-group">
																<label className="control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
																<Input type="text" id="cvv" ref="cvv" validate="isCVV" require
																			 onChange={this.changeValue.bind(null, 'password', 0)}
																			 value={secureData.password}/>
															</div>

															<div className="form-group">
																<div className="row">
																	{(() =>{
																		if(payAccount.updateSuccess){
																			return <button type='button' className='btn btn-green' onClick={this.updateCreditCardSecure}>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button>;
																		}else{
																			return <button type='button' className='btn btn-green'>{translate('PROCESSING_BUTTON_EDIT', 'Edit')}</button>
																		}
																	})()}
																</div>
															</div>
														</div>

												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-sm-12">
									<button type="button" className="btn btn-green" onClick={this.reProcessTransaction}>{translate('PROCESSING_BUTTON_REPROCESS_FIX', 'Try again')}</button>
									<p><a onClick={this.setFirstStep}>No thanks.  I'll deposit a different way.</a></p>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaRejectCardTicket = VisaRejectCardTicket;

