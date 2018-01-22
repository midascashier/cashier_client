import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {SelectPayAccount} from '../../SelectPayAccount'
import {AmountController} from '../../AmountController'

let AskInfo = React.createClass({

	propTypes: {
		netellerPassword: React.PropTypes.func,
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		password: React.PropTypes.string,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
	},

	render(){
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
			<div id="debitCardsAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{proccesingTitle}</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group" id="payAccount">
											<label className="col-sm-4 control-label">{translate('DEBITCARD_INFO', 'Debit Card Information')}:</label>
											{(() =>{
												if(payAccountId != 0){
													return (
														<div className="col-sm-8" id="selectPayAccount">
															<SelectPayAccount setAmount={setAmount} amount={amount}/>
														</div>
													)
												}

												return (
													<div className="col-sm-8" id="payAccounts">
														<SelectPayAccount setAmount={setAmount} amount={amount}/>
													</div>
												)
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