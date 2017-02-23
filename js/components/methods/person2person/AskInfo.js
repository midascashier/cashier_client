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
		let processingTitle = (!isWithDraw) ? translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P') : translate('PROCESSING_WITHDRAW_INFORMATION_TITLE_P2P');
		let selectType = (!isWithDraw) ? translate('P2P_SELECT_DEPOSIT') : translate('P2P_SELECT_WITHDRAW');
		let deleteButton = (!isWithDraw) ? translate('PROCESSING_BUTTON_DELETE_SENDER') : translate('PROCESSING_BUTTON_DELETE_RECEIVER');

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
						<label className="col-sm-4 control-label">{selectType}:</label>
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

		if(timeFrameDay == "TOMORROW"){
			for(let i = 0; i < 24; i++){
				let hour = i + ":00";
				selectHours.push(UIService.renderOption({ label: hour }, i));
			}
		} else{
			if(!serverTime){
				selectHours.push(UIService.renderOption({ label: "Loading" }, "Loading"));
			} else{
				for(let i = serverTime; i < 24; i++){
					let hour = i + ":00";
					selectHours.push(UIService.renderOption({ label: hour }, i));
				}
			}
		}

		if(isWithDraw){
			withdrawFee = <div className="form-group">
				<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
			</div>;
		}

		if(!isWithDraw){
			depositTimeToSend = <div className="form-group">
				<div id="timeFrame">
					<label
						className="col-sm-4 control-label">{translate('P2P_TIME_FRAME', 'What time will you send these funds?')}</label>
					<div className="col-sm-4">
						<select className="form-control"
										value={this.props.timeFrameDay}
										onChange={this.props.timeFrameDayChange}>
							<option value="TODAY">{translate('P2P_TIME_FRAME_TODAY', 'Today')}</option>
							<option
								value="TOMORROW">{translate('P2P_TIME_FRAME_TOMORROW', 'Tomorrow')}</option>
						</select>
					</div>
					<div className="col-sm-4">
						<select className="form-control" value={this.props.timeFrameTime}
										onChange={this.props.timeFrameTimeChange}>
							{selectHours}
						</select>
					</div>
				</div>
			</div>;
		}

			return (
				<div id="p2pAskInfo" className="box">
					<div className="row">
						<div className="title">{processingTitle}</div>
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
													<div>
														<PayAccountDropDown />
														{depositTimeToSend}
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
