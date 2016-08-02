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
			let originPath = UIService.getOriginPath();
			let displayName = UIService.getProcessorDisplayName();
			let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
			let information = translate('CREDIT_CARD_INFO', '');
			let ssn = this.props.ssn;
			let dobMonth = this.props.dobMonth;
			let dobDay = this.props.dobDay;
			let dobYear = this.props.dobYear;

			return (
				<div id="askAmountVisa" className="box">
					<div className="row">
						<div className="col-sm-12">
							<div className="row">
								<div className="col-sm-12">
									<div className="title">{title}</div>
								</div>
								<div className="col-sm-12">
									<div className="infoCol">
										<div className="col-sm-12">
											<div className="row">
												<div className="col-sm-3">
													<div className="method active pull-left">
														<img className="img-responsive" src={originPath + '/images/processors/11001.png'}
																 alt={displayName}/>
													</div>
												</div>
												<div className="col-sm-9">
													<div className="form-group" id="payAccount">
														<label for="">{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
														{(() =>{
															if(payAccountId != 0){
																return (
																	<div>
																		<div className="col-sm-9">
																			<SelectPayAccount setAmount={setAmount} amount={amount} />
																		</div>
																		<div className="col-sm-3">
																			<button type='button' onClick={this.disablePayAccount}
																							className='btn btn-xs btn-green'>
																				Delete Card
																			</button>
																		</div>
																	</div>
																)
															} else{
																return (
																	<div>
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
															if((payAccount.extra.dob == null || payAccount.extra.ssn == null) && payAccountId != 0){
																return <ExtraInfo changeValue={changeValue} ssn={ssn}
																									dobMonth={dobMonth}
																									dobDay={dobDay}
																									dobYear={dobYear}/>
															}
														})()}
														<p>Good news! You have a 100% deposit bonus up to $1000</p>
													</div>
												</div>
											</div>
											{(() =>{
												if(payAccountId != 0){
													return <TermsController />
												}
											})()}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<p>{information}</p>
						</div>
					</div>
				</div>
			)
		}
	})
	;

module.exports.AskInfo = AskInfo;