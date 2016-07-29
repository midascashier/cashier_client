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
		limitsCheck: React.PropTypes.number,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},

	render() {
		let setAmount = this.props.setAmount;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		let information = translate('CREDIT_CARD_INFO', '');

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
																		<SelectPayAccount />
																	</div>
																	<div className="col-sm-3">
																		<button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
																			Delete Card
																		</button>
																	</div>
																</div>
															)
														}else{
															return (
																<div>
																	<SelectPayAccount />
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
														if(payAccount.extra.dob != "" && payAccount.extra.ssn != "" && payAccountId != 0){
															return <div>DOB AND SSN COMPONENT</div>
														}
													})()}

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
});

module.exports.AskInfo = AskInfo;