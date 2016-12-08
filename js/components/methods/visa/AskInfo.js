import React from 'react'
import { translate } from '../../../constants/Translate'
import  cashier  from '../../../constants/Cashier'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { TermsController } from '../../TermsController'
import { UIService } from '../../../services/UIService'
import { CustomerService } from '../../../services/CustomerService'
import { Register } from './Register.js'
import { ExtraInfo } from './ExtraInfo'
import { LoadingSpinner } from '../../loading/LoadingSpinner'
import { Input } from '../../Inputs'

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

	disablePayAccount(){
		CustomerService.getDisablePayAccount();
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
		let ssn = this.props.ssn;
		let cvv;
		if (typeof payAccount.password == 'undefined' || payAccount.secure.password == payAccount.password){
			cvv = payAccount.secure.password;
		}else{
			if(payAccount.secure.password != payAccount.password){
				cvv = payAccount.password;
			} else{
				cvv = '';
			}
		}
		let dobMonth = this.props.dobMonth;
		let dobDay = this.props.dobDay;
		let dobYear = this.props.dobYear;
		let extraInfo = "";
		let deleteButton = translate('PROCESSING_BUTTON_DELETE_CARD', 'Delete Card');
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		}

		if((payAccount.extra.dob == null || payAccount.extra.ssn == null || payAccount.extra.dob == "" || payAccount.extra.ssn == "") && payAccount.address.country == cashier.USA_COUNTRY_CODE){
			extraInfo = <ExtraInfo changeValue={changeValue} ssn={ssn} dobMonth={dobMonth} dobDay={dobDay}
														 dobYear={dobYear}/>;
		}

		let PayAccountDropDown = React.createClass({

				disablePayAccount() {
					CustomerService.getDisablePayAccount();
				},

				render(){
					let deleteButtonDisplay = "";

					if(payAccountId != 0){
						deleteButtonDisplay = <button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
							{deleteButton}
						</button>;
					}

					return <div className="form-group" id="payAccount">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
						<div className="col-sm-5" id="selectPayAccount">
							<SelectPayAccount setAmount={setAmount} amount={amount}/>
						</div>
						<div className="col-sm-3">
							{deleteButtonDisplay}
						</div>
					</div>
				}
			}
		);

		return (
			<div id="visaAskInfo" className="box">
				<div className="row">
					<div className="title">{proccesingTitle}</div>
					<div className="infoCol">
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
														<PayAccountDropDown />
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
														<div className="form-group">
															<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
															<div className="col-sm-8">
																<Input type="text" id="cvv" ref="cvv" validate="isCVV" value={cvv} onChange={this.props.changeValue.bind(null, 'password', 'payAccount', 0)}/>
															</div>
														</div>

														<div className="form-group">
															<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
														</div>
														{extraInfo}
														<TermsController />
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
		)
	}
});

module.exports.AskInfo = AskInfo;