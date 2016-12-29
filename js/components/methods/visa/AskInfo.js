import React from 'react'
import { translate } from '../../../constants/Translate'
import  cashier  from '../../../constants/Cashier'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { TermsController } from '../../TermsController'
import { UIService } from '../../../services/UIService'
import { CustomerService } from '../../../services/CustomerService'
import { ApplicationService } from '../../../services/ApplicationService'
import { TransactionService } from '../../../services/TransactionService'
import { Register } from './Register.js'
import { ExtraInfo } from './ExtraInfo'
import { LoadingSpinner } from '../../loading/LoadingSpinner'
import { Input } from '../../Inputs'

import { CashierStore } from '../../../stores/CashierStore'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		dobMonth: React.PropTypes.node,
		dobDay: React.PropTypes.node,
		dobYear: React.PropTypes.node,
		changeValue: React.PropTypes.func,
		payAccount: React.PropTypes.object
	},

	/**
	 * edit payAccount
	 */
	editPayAccount(value = 1){
		UIService.setCCEditMode(value);
	},

	/**
	 * Save CC info
	 */
	saveEditCC(){
		TransactionService.updatePayAccount();
		this.editPayAccount(0);
	},

	formEditPayAccount(e){
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

		this.saveEditCC();
	},

	render(){
		let setAmount = this.props.setAmount;
		let changeValue = this.props.changeValue;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let isWithDraw = UIService.getIsWithDraw();
		let isEditingCCInfo = UIService.getCCEditMode();
		let information = translate('CREDIT_CARD_INFO', '');
		let transaction = CashierStore.getTransaction();
		let ssn = transaction.ssn;
		let dobMonth = transaction.dobMonth;
		let dobDay = transaction.dobDay;
		let dobYear = transaction.dobYear;
		let extraInfo = "";
		let selectMonths = [];
		let selectYears = [];
		let now = new Date();
		let deleteButton = translate('PROCESSING_BUTTON_DELETE_CARD', 'Delete Card');
		let editButton = translate('PROCESSING_BUTTON_EDIT_CARD', 'Edit Card');
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		}
		if((payAccount.extra.dob == null || payAccount.extra.ssn == null || payAccount.extra.dob == "" || payAccount.extra.ssn == "" || isEditingCCInfo) && payAccount.address.country == cashier.USA_COUNTRY_CODE){
			extraInfo = <ExtraInfo changeValue={changeValue} ssn={ssn} dobMonth={dobMonth} dobDay={dobDay}
														 dobYear={dobYear}/>;
		}

		let PayAccountDropDown = React.createClass({
				propTypes: {
					editPayAccount: React.PropTypes.func,
					isEditingCCInfo: React.PropTypes.number
				},
				/**
				 * delete payAccount
				 */
				disablePayAccount(){
					CustomerService.getDisablePayAccount();
				},

				render(){
					let deleteButtonDisplay;
					let editButtonDisplay;
					let isEditingCCInfo = this.props.isEditingCCInfo;
					if(!transaction.ccName){
						transaction.ccName = payAccount.secure.extra3;
					}
					if(payAccountId != 0){
						deleteButtonDisplay = <button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
							{deleteButton}
						</button>;

						if(isEditingCCInfo == 0){
							editButtonDisplay =
								<button type='button' onClick={this.props.editPayAccount} className='btn btn-xs btn-green'>
									{editButton}
								</button>;
						}
					}

					return <div className="form-group" id="payAccount">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
						<div className="col-sm-4" id="selectPayAccount">
							<SelectPayAccount setAmount={setAmount} amount={amount}/>
						</div>
						<div className="col-sm-2">
							{deleteButtonDisplay}
						</div>
						<div className="col-sm-2">
							{editButtonDisplay}
						</div>
					</div>
				}
			}
		);

		for(let i = 1; i < 13; i++){
			selectMonths.push(UIService.renderOption({ label: i }, i));
		}

		for(let i = now.getFullYear(); i < now.getFullYear() + 15; i++){
			selectYears.push(UIService.renderOption({ label: i }, i));
		}

		return (
			<div id="visaAskInfo" className="box">
				<div className="row">
					<div className="title">{proccesingTitle}</div>
					<div className="infoCol scroll">
						<div className="row">
						<div className="col-sm-12">
							<div className="form-horizontal">
								{(() =>{
									if(!payAccountDisplayName){
										return <LoadingSpinner />;
									} else{
										if(payAccountDisplayName == cashier.NO_RESPONSE){
											return <div className="scroll"><Register /></div>
										}
										if(payAccountId == 0){
											return <div className="scroll"><PayAccountDropDown /><Register /></div>
										} else{
											if(isEditingCCInfo == 0){
												return (
													<div>
														<PayAccountDropDown editPayAccount={this.editPayAccount} isEditingCCInfo={isEditingCCInfo}/>
														<div className="form-group">
															<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
														</div>
														{extraInfo}
														<TermsController />
													</div>
												)
											} else{
												return (
													<div>
														<PayAccountDropDown />
														<form onSubmit={this.formEditPayAccount}>
															<div className="form-group">
																<label
																	className="col-sm-4 control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
																<div className="col-sm-8">
																	<Input type="text" id="ccName" ref="ccName" validate="isString"
																				 onChange={this.props.changeValue.bind(null, 'ccName', 'transaction', 0)}
																				 value={transaction.ccName}/>
																</div>
															</div>


															<div className="form-group">
																<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
																<div className="col-sm-8">
																	<Input type="text" id="cvv" ref="cvv" validate="isCVV"
																				 value={transaction.password}
																				 onChange={this.props.changeValue.bind(null, 'password', 'transaction', 0)}/>
																</div>
															</div>
															<div className="form-group">
																<label
																	className="col-sm-4 control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
																<div className="col-sm-4">
																	<select className="form-control" id="ccExpMonth" data-validation='isNumber'
																					onChange={this.props.changeValue.bind(null, 'expirationMonth', 'transaction', 1)}
																					value={transaction.expirationMonth}>
																		{selectMonths}
																	</select>
																</div>
																<div className="col-sm-4">
																	<select className="form-control" id="ccExpYear" data-validation='isNumber'
																					onChange={this.props.changeValue.bind(null, 'expirationYear', 'transaction', 1)}
																					value={transaction.expirationYear}>
																		{selectYears}
																	</select>
																</div>
															</div>
															{extraInfo}
															<div className="form-group">
																<div className="col-sm-4">
																</div>
																<div className="col-sm-2">
																	<button type='submit' className='btn btn-green'>
																		{translate('PROCESSING_BUTTON_SAVE', 'Save')}
																	</button>
																</div>
																<div className="col-sm-2">
																	<button type='button' className='btn btn-green'
																					onClick={this.editPayAccount.bind(null, 0)}>
																		{translate('PROCESSING_BUTTON_CANCEL', 'Cancel')}
																	</button>
																</div>
															</div>
															<TermsController />
														</form>
													</div>
												)
											}
										}

									}
								})()}

								{(() =>{
									if(payAccountId != 0 && payAccountDisplayName != cashier.NO_RESPONSE){
										return <div className="col-sm-12">
											<p><em>{translate('BONUS_NEWS1')}<span>{translate('BONUS_NEWS2')}</span>{translate('BONUS_NEWS3')}<span>{translate('BONUS_NEWS4')}</span></em>
											</p>
											<p className="text-justify">{information}</p>
										</div>
									}
								})()}

							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.AskInfo = AskInfo;