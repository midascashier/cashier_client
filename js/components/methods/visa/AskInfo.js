import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { TermsController } from '../../TermsController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		allowContinue: React.PropTypes.number,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
	},

	render() {
		let setAmount = this.props.setAmount;
		let payAccountId = this.props.payAccount.payAccountId;
		let amount = this.props.amount;
		let allowContinue = this.props.allowContinue;
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
												<div className="form-group">
													<label for="">{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
													<SelectPayAccount />
												</div>

												{(() =>{
													if(payAccountId == 0){
														return <Register />
													}
												})()}


												{(() =>{
													if(payAccountId != 0){
														return <AmountController setAmount={setAmount} value={amount}/>
													}
												})()}

												{(() =>{
													if(!allowContinue && amount != "" && payAccountId != 0){
														return <span>LIMITS ERROR</span>
													}
												})()}

												{(() =>{
													if(!allowContinue && amount != "" && payAccountId != 0){
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
