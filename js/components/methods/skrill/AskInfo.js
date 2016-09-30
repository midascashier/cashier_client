import React from 'react'
import {translate} from '../../../constants/Translate'
import {SelectPayAccount} from '../../SelectPayAccount'
import {Input} from '../../Inputs'
import {AmountController} from '../../AmountController'
import {UIService} from '../../../services/UIService'
import {Register} from './Register.js'
import {CustomerService} from '../../../services/CustomerService'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},


	render() {
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let payAccountId = this.props.payAccount.payAccountId;
		let isWithDraw = UIService.getIsWithDraw();
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}

		return (
			<div id="netellerAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{proccesingTitle}</div>
						<div className="infoCol scroll">
							<div className="row">

								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group" id="payAccount">
											<label className="col-sm-4 control-label">{translate('NETELLER_ACCOUNT', 'Neteller Account')}:</label>
											{(() =>{
												if(payAccountId != 0){
													return (
														<div className="col-sm-8" id="selectPayAccount">
															<SelectPayAccount setAmount={setAmount} amount={amount}/>
															<button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
																{translate('PROCESSING_BUTTON_DELETE_ACCOUNT', 'Delete Account')}
															</button>
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
											if(!isWithDraw){
												return (
													<p>{translate('BONUS_NEWS')}</p>
												)
											}
										})()}
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