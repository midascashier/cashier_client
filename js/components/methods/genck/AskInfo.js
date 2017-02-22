import React from 'react'
import { translate } from '../../../constants/Translate'
import  cashier  from '../../../constants/Cashier'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'
import { CustomerService } from '../../../services/CustomerService'
import { FeeController } from '../../FeeController'
import { LoadingSpinner } from '../../loading/LoadingSpinner'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		amount: React.PropTypes.string
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},

	render() {
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;
		let feeCheck = this.props.feeCheck;
		let feeCashValue = this.props.feeCashValue;
		let isWithDraw = UIService.getIsWithDraw();
		let withdrawFee = "";
		let deleteButton = (!isWithDraw) ? translate('PROCESSING_BUTTON_DELETE_SENDER') : translate('PROCESSING_BUTTON_DELETE_RECEIVER');
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
						<label className="col-sm-4 control-label">{translate('SELECT_ACCOUNT', 'Account')}:</label>
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
			withdrawFee = <div className="form-group">
				<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
			</div>;
		}

		return (
			<div id="genckAskInfo" className="box">
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
											return (
												<div>
													<PayAccountDropDown />
													<div className="form-group">
														<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
													</div>
													{withdrawFee}
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
