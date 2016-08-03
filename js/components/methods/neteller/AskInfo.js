import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { Input } from '../../Inputs'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'
import { CustomerService } from '../../../services/CustomerService'

let AskInfo = React.createClass({

	propTypes: {
		netellerPassword: React.PropTypes.func,
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		password: React.PropTypes.string,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},


	render() {
		let netellerPassword = this.props.netellerPassword;
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let password = this.props.password;
		let payAccountId = this.props.payAccount.payAccountId;
		let isWithDraw = UIService.getIsWithDraw();
		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}

		return (
			<div id="netellerAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{proccesingTitle}</div>
						<div className="infoCol">
							<div className="row">
								<div className="col-sm-3">
									<div className="method active pull-left">
										<img className="img-responsive" src={originPath + '/images/processors/333.png'} alt={displayName}/>
									</div>
								</div>
								<div className="col-sm-9">
									<div className="form-group" id="payAccount">
										<label for="">{translate('NETELLER_ACCOUNT', 'Neteller Account')}:</label>
										{(() =>{
											if(payAccountId != 0){
												return (
													<div id="selectPayAccount">
														<SelectPayAccount setAmount={setAmount} amount={amount}/>
														<button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
															{translate('PROCESSING_BUTTON_DELETE_ACCOUNT', 'Delete Account')}
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
											if(!isWithDraw && payAccountId != 0){
												return <div className="form-group">
													<label for="">{translate('NETELLER_SECURE', 'Secure ID')}:</label>
													<Input onChange={netellerPassword} value={password} type="password"/>
												</div>
											}
										})()}

										{(() =>{
											if(payAccountId != 0){
												return <AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
											}
										})()}
									</div>

									{(() =>{
										if(!isWithDraw){
											return (
												<p><em>Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></em></p>
											)
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
