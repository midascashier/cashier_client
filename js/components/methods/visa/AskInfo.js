import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { TermsController } from '../../TermsController'
import { UIService } from '../../../services/UIService'
import { CustomerService } from '../../../services/CustomerService'
import { Register } from './Register.js'
import { ExtraInfo } from './ExtraInfo'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object,
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
		let payAccount = this.props.payAccount;
		let changeValue = this.props.changeValue;
		let payAccountId = payAccount.payAccountId;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let isWithDraw = UIService.getIsWithDraw();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		let information = translate('CREDIT_CARD_INFO', '');
		let ssn = this.props.ssn;
		let dobMonth = this.props.dobMonth;
		let dobDay = this.props.dobDay;
		let dobYear = this.props.dobYear;

		return (
			<div id="visaAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
							<div className="row">

								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group" id="payAccount">
											<label
												className="col-sm-4 control-label">{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
											{(() =>{
												if(payAccountId != 0){
													return (
														<div>
															<div className="col-sm-5" id="selectPayAccount">
																<SelectPayAccount setAmount={setAmount} amount={amount}/>
															</div>
															<div className="col-sm-3">
																<button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
																	{translate('PROCESSING_BUTTON_DELETE_CARD', 'Delete Card')}
																</button>
															</div>
														</div>
													)
												} else{
													return (
														<div className="col-sm-8" id="payAccounts">
															<SelectPayAccount setAmount={setAmount} amount={amount}/>
														</div>
													)
												}
											})()}
										</div>
										<div id="register">
											{(() =>{
												if(payAccountId == 0){
													return <Register />
												}
											})()}
										</div>

										{(() =>{
											if(payAccountId != 0){
												return (
													<div className="form-group">
														<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
													</div>
												)
											}
										})()}

										{(() =>{
											if((payAccount.extra.dob == null || payAccount.extra.ssn == null || payAccount.extra.dob == "" || payAccount.extra.ssn == "") && payAccountId != null && payAccountId != 0){
												return <ExtraInfo changeValue={changeValue} ssn={ssn} dobMonth={dobMonth} dobDay={dobDay}
																					dobYear={dobYear}/>
											}
										})()}

										{(() =>{
											if(payAccountId != 0){
												return <TermsController />
											}
										})()}

										{(() =>{
											if(!isWithDraw){
												return (
													<p><em>{translate('BONUS_NEWS1')}<span>{translate('BONUS_NEWS2')}</span>{translate('BONUS_NEWS3')}<span>{translate('BONUS_NEWS4')}</span></em></p>
												)
											}
										})()}

										<div className="col-sm-12">
											<p className="text-justify">{information}</p>
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

module.exports.AskInfo = AskInfo;