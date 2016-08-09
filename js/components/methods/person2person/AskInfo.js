import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'
import { CustomerService } from '../../../services/CustomerService'
import { FeeController } from '../../FeeController'

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
		timeFrameTime: React.PropTypes.number
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},

	render() {
		let selectHours = [];
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let payAccountId = this.props.payAccount.payAccountId;
		let feeCheck = this.props.feeCheck;
		let timeFrameDay = this.props.timeFrameDay;
		let feeCashValue = this.props.feeCashValue;
		let serverTime = UIService.getServerTime();
		let isWithDraw = UIService.getIsWithDraw();
		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let processingTitle = (!isWithDraw) ? translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P') : translate('PROCESSING_WITHDRAW_INFORMATION_TITLE_P2P');
		let selectType = (!isWithDraw) ? translate('P2P_SELECT_DEPOSIT') : translate('P2P_SELECT_WITHDRAW');
		let deleteButton = (!isWithDraw) ? translate('PROCESSING_BUTTON_DELETE_SENDER') : translate('PROCESSING_BUTTON_DELETE_RECEIVER');

		if(timeFrameDay == "TOMORROW"){
			for(let i = 0; i < 24; i++){
				let hour = i + ":00";
				selectHours.push(UIService.renderOption({ label: hour }, i));
			}
		} else{
			if(!serverTime){
				UIService.getP2pHours();
				selectHours.push(UIService.renderOption({ label: "Loading" }, "Loading"));
			} else{
				let hour = serverTime.split(":");
				for(let i = hour[0]; i < 24; i++){
					let hour = i + ":00";
					selectHours.push(UIService.renderOption({ label: hour }, i));
				}
			}
		}

		return (
			<div id="p2pAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{processingTitle}</div>
						<div className="infoCol">
							<div className="row">
								<div className="col-sm-3">
									<div className="method active pull-left">
										<img className="img-responsive" src={originPath + '/images/processors/16.png'}
												 title={displayName}/>
									</div>
								</div>
								<div className="col-sm-9">
									<div className="form-group" id="payAccount">
										<label className="control-label">{selectType}:</label>
										{(() =>{
											if(payAccountId != 0){
												return (
													<div id="selectPayAccount">
														<SelectPayAccount setAmount={setAmount} amount={amount}/>
														<button type='button' onClick={this.disablePayAccount} className='btn btn-xs btn-green'>
															{deleteButton}
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
											if(payAccountId != 0 && !isWithDraw){
												return (
													<div id="timeFrame">
														<label
															className="control-label">{translate('P2P_TIME_FRAME', 'What time will you send these funds?')}</label>
														<div className="col-sm-6">
															<div className="form-group">
																<select className="form-control"
																				value={this.props.timeFrameDay}
																				onChange={this.props.timeFrameDayChange}>
																	<option value="TODAY">{translate('P2P_TIME_FRAME_TODAY', 'Today')}</option>
																	<option value="TOMORROW">{translate('P2P_TIME_FRAME_TOMORROW', 'Tomorrow')}</option>
																</select>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-group">
																<select className="form-control"
																				value={this.props.timeFrameTime}
																				onChange={this.props.timeFrameTimeChange}>
																	{selectHours}
																</select>
															</div>
														</div>
													</div>
												)
											}
										})()}

										{(() =>{
											if(payAccountId != 0){
												return <AmountController setAmount={setAmount} amount={amount}
																								 limitsCheck={limitsCheck}/>
											}
										})()}

										{(() =>{
											if(isWithDraw && payAccountId != 0){
												return <FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>;
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
