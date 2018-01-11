import React from 'react'
import { translate } from '../../../constants/Translate'
import  cashier  from '../../../constants/Cashier'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'
import { FeeController } from '../../FeeController'
import { PayAccountDropDown } from '../../commonComponents/payaccount/PayAccountDropDown'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		timeFrameDayChange: React.PropTypes.func,
		timeFrameTimeChange: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		amount: React.PropTypes.string,
		timeFrameDay: React.PropTypes.string,
		timeFrameTime: React.PropTypes.node,
		payAccount: React.PropTypes.object
	},

	/**
	 * Pass props on to son
	 *
	 * @returns {*}
	 */
	getProps() {
		return this.props
	},

	render() {
		let selectHours = [];
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;
		let feeCheck = this.props.feeCheck;
		let timeFrameDay = this.props.timeFrameDay;
		let feeCashValue = this.props.feeCashValue;
		let serverTime = this.props.timeFrameTime;
		let isWithDraw = UIService.getIsWithDraw();
		let withdrawFee = "";
		let depositTimeToSend = "";
		let processingTitle = (!isWithDraw) ? translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P', "Please Enter the Sender's Information")
			: translate('PROCESSING_WITHDRAW_INFORMATION_TITLE_P2P', "Please Enter the Receiver's Information");
		let deleteButton = (!isWithDraw) ? translate('PROCESSING_BUTTON_DELETE_SENDER', 'Delete Sender') : translate('PROCESSING_BUTTON_DELETE_RECEIVER', 'Delete Receiver');

		if(timeFrameDay == "TOMORROW"){
			for(let i = 0; i < 24; i++){
				let hour = i + ":00";
				selectHours.push(UIService.renderOption({ label: hour }, i));
			}
		}else{
			if(!serverTime){
				selectHours.push(UIService.renderOption({ label: "Loading" }, "Loading"));
			}else{
				for(let i = serverTime; i < 24; i++){
					let hour = i + ":00";
					selectHours.push(UIService.renderOption({ label: hour }, i));
				}
			}
		}

		if(isWithDraw){
			withdrawFee = (
				<div className="form-group">
					<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
				</div>
			)
		}

		if(!isWithDraw){
			depositTimeToSend = (
				<div className="form-group">
					<div id="timeFrame">
						<label className="col-sm-4 control-label">{translate('P2P_TIME_FRAME', 'What time will you send these funds?')}</label>
						<div className="col-sm-4">
							<select className="form-control" value={this.props.timeFrameDay} onChange={this.props.timeFrameDayChange}>
								<option value="TODAY">{translate('P2P_TIME_FRAME_TODAY', 'Today')}</option>
								<option value="TOMORROW">{translate('P2P_TIME_FRAME_TOMORROW', 'Tomorrow')}</option>
							</select>
						</div>

						<div className="col-sm-4">
							<select className="form-control" value={this.props.timeFrameTime} onChange={this.props.timeFrameTimeChange}>
								{selectHours}
							</select>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div id="p2pAskInfo" className="box">
				<div className="row">
					<div className="title">{processingTitle}</div>
					<div className="infoCol">
						<div className="col-sm-12">
							<div className="form-horizontal">

								{(() =>{

									if(payAccountDisplayName == cashier.NO_RESPONSE || payAccountId == 0){
										return <Register/>
									}

									return (
										<div>
											<PayAccountDropDown
												info={payAccount}
												amount={this.props.amount}
												msgDeleteBtn={deleteButton}
												setAmount={this.props.setAmount}
											/>
											{depositTimeToSend}
											<div className="form-group">
												<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
											</div>
											{withdrawFee}
										</div>
									)
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
