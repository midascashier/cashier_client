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
			changeValue: React.PropTypes.func
		},

		disablePayAccount()
		{
			CustomerService.getDisablePayAccount();
		}
		,

		render()
		{
			let setAmount = this.props.setAmount;
			let payAccount = this.props.payAccount;
			let changeValue = this.props.changeValue;
			let payAccountId = payAccount.payAccountId;
			let amount = this.props.amount;
			let limitsCheck = this.props.limitsCheck;
			let isWithDraw = UIService.getIsWithDraw();
			let originPath = UIService.getOriginPath();
			let displayName = UIService.getProcessorDisplayName();
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
							<div className="infoCol">
									<div className="row">
										<div className="col-sm-3">
											<div className="method active pull-left">
												<img className="img-responsive" src={originPath + '/images/processors/11001.png'} alt={displayName}/>
											</div>
										</div>
										<div className="col-sm-9">
											<div className="form-group" id="payAccount">
												<label>{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
												{(() =>{
													if(payAccountId != 0){
														return (
															<div id="selectPayAccount">
																<SelectPayAccount setAmount={setAmount} amount={amount}/>
																<button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
																	{translate('PROCESSING_BUTTON_DELETE_CARD', 'Delete Card')}
																</button>
															</div>
														)
													} else{
														return (
															<div id="payAccounts">
																<SelectPayAccount setAmount={setAmount} amount={amount}/>
															</div>
														)
													}
												})()}

												{(() =>{
													if(payAccountId == 0){
														return <Register />
													}
												})()}
											</div>
											<div className="form-group">
												{(() =>{
													if(payAccountId != 0){
														return <AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
													}
												})()}

												{(() =>{
													if((payAccount.extra.dob == null || payAccount.extra.ssn == null) && payAccountId != null){
														return <ExtraInfo changeValue={changeValue} ssn={ssn}
																							dobMonth={dobMonth}
																							dobDay={dobDay}
																							dobYear={dobYear}/>
													}
												})()}

											</div>

											{(() =>{
												if(payAccountId != 0){
													return <TermsController />
												}
											})()}

											{(() =>{
												if(!isWithDraw){
													return (
														<p><em>Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></em></p>
													)
												}
											})()}


										</div>
										<div className="col-sm-12">
											<p>{information}</p>
										</div>
									</div>

							</div>
						</div>
					</div>
				</div>
			)
		}
	})
	;

module.exports.AskInfo = AskInfo;