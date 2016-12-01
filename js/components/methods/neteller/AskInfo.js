import React from 'react'
import { translate } from '../../../constants/Translate'
import  cashier  from '../../../constants/Cashier'
import { SelectPayAccount } from '../../SelectPayAccount'
import { Input } from '../../Inputs'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'
import { CustomerService } from '../../../services/CustomerService'
import { LoadingSpinner } from '../../loading/LoadingSpinner'

let AskInfo = React.createClass({

	propTypes: {
		netellerPassword: React.PropTypes.func,
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		password: React.PropTypes.string,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
	},

	render() {
		let netellerPassword = this.props.netellerPassword;
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let password = this.props.password;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;
		let isWithDraw = UIService.getIsWithDraw();
		let netellerForm = "";
		let withdrawFee = "";
		let deleteButton = translate('PROCESSING_BUTTON_DELETE_ACCOUNT', 'Delete Account');
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}

		let PayAccount = React.createClass({

				disablePayAccount() {
					CustomerService.getDisablePayAccount();
				},

				render(){
					return <div className="form-group" id="payAccount">
						<label className="col-sm-4 control-label">{translate('NETELLER_ACCOUNT', 'Neteller Account')}:</label>
						<div className="col-sm-5" id="selectPayAccount">
							<SelectPayAccount setAmount={setAmount} amount={amount}/>
						</div>
						<div className="col-sm-3">
							<button type='button' onClick={this.disablePayAccount}
											className='btn btn-xs btn-green'>
								{deleteButton}
							</button>
						</div>
					</div>
				}
			}
		);

		if (isWithDraw){
			withdrawFee = <div className="form-group">
				<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
			</div>;
		}

		return (
			<div id="netellerAskInfo" className="box">
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
											return <Register />
										}
										if(payAccountId == 0){
											return <div><PayAccount /><Register /></div>
										} else{

											if(isWithDraw){
												netellerForm = <div>
													<PayAccount />
													<div className="form-group">
														<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
													</div>
												</div>;
											}else{
												netellerForm = <div>
													<PayAccount />
													<div className="form-group">
														<label
															className="col-sm-4 control-label">{translate('NETELLER_SECURE', 'Secure ID')}:</label>
														<div className="col-sm-8">
															<Input type="password" value={password} onChange={netellerPassword} validate="password"
																		 require/>
														</div>
													</div>
													<div className="form-group">
														<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
													</div>
													{withdrawFee}
												</div>;
											}

											return (
												netellerForm
											)
										}

										if(!isWithDraw){
											return (
												<div className="form-group">
													<label
														className="col-sm-4 control-label">{translate('NETELLER_SECURE', 'Secure ID')}:</label>
													<div className="col-sm-8">
														<Input type="password" value={password} onChange={netellerPassword} validate="password"
																	 require/>
													</div>
												</div>
											)
										}

									}
								})()}

								{(() =>{
									if(!isWithDraw){
										return (
											<p>
												<em>{translate('BONUS_NEWS1')}<span>{translate('BONUS_NEWS2')}</span>{translate('BONUS_NEWS3')}<span>{translate('BONUS_NEWS4')}</span></em>
											</p>
										)
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
