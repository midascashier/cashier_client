import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		timeFrameDayChange: React.PropTypes.func,
		timeFrameTimeChange: React.PropTypes.func,
		allowContinue: React.PropTypes.number,
		amount: React.PropTypes.string,
		timeFrameDay: React.PropTypes.string,
		timeFrameTime: React.PropTypes.number
	},

	render() {
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let allowContinue = this.props.allowContinue;
		let payAccountId = this.props.payAccount.payAccountId;

		let isWithDraw = UIService.getIsWithDraw();
		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let processingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P', "Please Enter the Sender's Information");
		let selectType = (!isWithDraw) ? translate('P2P_SELECT_DEPOSIT') : translate('P2P_SELECT_WITHDRAW');

		return (
			<div id="askAmountVisa" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<div className="title">{processingTitle}</div>
							</div>
							<div className="col-sm-12">
								<div className="infoCol">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-3">
												<div className="method active pull-left">
													<img className="img-responsive" src={originPath + '/images/processors/16.png'}
															 title={displayName}/>
												</div>
											</div>
											<div className="col-sm-9">
												<div>
													<div className="form-group">
														<label for="">{selectType}:</label>
														<SelectPayAccount />
													</div>
													<div className="form-group">
														{(() =>{
															if(payAccountId == 0){
																return <Register />
															}
																else{
																return <div className="row">
																	<div>
																		<label for=""
																					 className="control-label">{translate('P2P_TIME_FRAME', 'What time will you send these funds?')}</label>
																	</div>
																	<div className="col-sm-6">
																		<div className="form-group">
																			<select className="form-control" value={this.props.timeFrameDay}
																							onChange={this.props.timeFrameDayChange}>
																				<option value="TODAY">{translate('P2P_TIME_FRAME_TODAY', 'Today')}</option>
																				<option
																					value="TOMORROW">{translate('P2P_TIME_FRAME_TOMORROW', 'Tomorrow')}</option>
																			</select>
																		</div>
																	</div>
																	<div className="col-sm-6">
																		<div className="form-group">
																			<select className="form-control" value={this.props.timeFrameTime}
																							onChange={this.props.timeFrameTimeChange}>
																				<option value="12">12:00</option>
																				<option value="13">13:00</option>
																				<option value="14">14:00</option>
																				<option value="15">15:00</option>
																				<option value="16">16:00</option>
																				<option value="17">17:00</option>
																			</select>
																		</div>
																	</div>
																	<AmountController setAmount={setAmount} value={amount}/>
																</div>

															}
														})()}
													</div>
												</div>
												{(() =>{
													if(!allowContinue && amount != "" && payAccountId != 0){
														return <span>LIMITS ERROR</span>
													}
												})()}

												<p>Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></p>
											</div>
										</div>
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
