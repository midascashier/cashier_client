import React from 'react'
import { translate } from '../../../constants/Translate'
import { FeeController } from '../../FeeController'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Input } from '../../Inputs'
import { SelectPayAccount } from '../../SelectPayAccount'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		changeValue: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		payAccount: React.PropTypes.node
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState() {
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 */
	refreshLocalState() {
		return {
			payAccount: {
				account: ""
			}
		}
	},

	render() {
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let changeValue = this.props.changeValue;
		let amount = this.props.amount;
		let isWithDraw = UIService.getIsWithDraw();
		let feeCashValue = this.props.feeCashValue;
		let feeCheck = this.props.feeCheck;
		let account = this.props.account;

		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}
		return (
			<div id="skrillAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{proccesingTitle}</div>
						<div className="infoCol scroll">
							<div className="row">

								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group" id="payAccount">
											<label
												className="col-sm-4 control-label">{translate('ECOPAYZ_ACCOUNT', 'ECOPAYZ Account')}:</label>
											<div className="col-sm-8" id="selectPayAccount">
												{(() =>{
													if(!isWithDraw){
														return <Input className="form-control" type="text" id="ecoAccount" name="ecoAccount"
																					validate="isNumber" onChange={changeValue.bind(null, 'account', 0)}
																					value={account} require/>
													} else{
														return <SelectPayAccount setAmount={setAmount} amount={amount}/>
													}
												})()}
											</div>
										</div>

										<div className="form-group">


											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>

										{(() =>{
											if(!isWithDraw){
												return (
													<p><em>{translate('BONUS_NEWS1')}<span>{translate('BONUS_NEWS2')}</span>{translate('BONUS_NEWS3')}<span>{translate('BONUS_NEWS4')}</span></em></p>
												)
											} else{
												return <div className="form-group">
													<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
												</div>
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