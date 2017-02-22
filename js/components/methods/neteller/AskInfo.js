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
import { FeeController } from '../../FeeController'

let AskInfo = React.createClass({

	propTypes: {
		netellerPassword: React.PropTypes.func,
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		password: React.PropTypes.string,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
	},

	render() {
		let netellerPassword = this.props.netellerPassword;
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let feeCheck = this.props.feeCheck;
		let feeCashValue = this.props.feeCashValue;
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
						<label className="col-sm-4 control-label">{translate('NETELLER_ACCOUNT', 'Neteller Account')}:</label>
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

		if(isWithDraw){
			netellerForm = <div>
				<PayAccountDropDown />
				<div className="form-group">
					<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
				</div>
			</div>;

			withdrawFee = <div className="form-group">
				<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
			</div>;

		} else{
			netellerForm = <div>
				<PayAccountDropDown />
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
											return <div className="scroll"><PayAccountDropDown /><Register /></div>
										} else{
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
