import React from 'react'
import { Input } from '../../Inputs'
import {translate} from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import {AmountController} from '../../AmountController'
import {UIService} from '../../../services/UIService'

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
		let payAccounts = UIService.getProcessorPayAccount();

		let isWithDraw = UIService.getIsWithDraw();
		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let processingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P', "Please Enter the Sender's Information");
		let selectType = (!isWithDraw)?translate('P2P_SELECT_DEPOSIT'):translate('P2P_SELECT_WITHDRAW');

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
													<img className="img-responsive" src={originPath + '/images/processors/16.png'} title={displayName} />
												</div>
											</div>

											<div className="col-sm-9">
												{(() =>{
													if(!(payAccounts instanceof Object)){
														return (
															<div>
																<div className="form-group">
																	<label for="" className="control-label">{translate('P2P_FIRST_NAME', 'First Name')}:</label>
																	<Input type="text" id="firstName" readOnly/>
																</div>
																<div className="form-group">
																	<label for="" className="control-label">{translate('P2P_LAST_NAME', 'Last Name')}:</label>
																	<Input type="text" id="lastName" readOnly/>
																</div>

																<div className="form-group">
																	<div className="row">
																		<div className="col-sm-6">
																			<div className="form-group">
																				<label for="" className="control-label">{translate('P2P_COUNTRY', 'Country')}:</label>
																				<select className="form-control" id="country">
																					<option value="0">United State</option>
																				</select>
																			</div>
																		</div>
																		<div className="col-sm-6">
																			<label for="" className="control-label">{translate('P2P_STATE', 'State')}:</label>
																			<select className="form-control" id="countryState">
																				<option value="0">Florida</option>
																			</select>
																		</div>
																	</div>
																</div>

																<div className="form-group">
																	<div className="row">
																		<div className="col-sm-6">
																			<label for="" className="control-label">{translate('P2P_CITY', 'City')}:</label>
																			<Input type="text" id="city" readOnly/>
																		</div>
																		<div className="col-sm-6">
																			<label for="" className="control-label">{translate('P2P_PHONE', 'Phone')}:</label>
																			<Input type="text" id="phone" readOnly/>
																		</div>
																	</div>
																</div>

																<div className="form-group">
																	<label for="" className="control-label">{translate('P2P_EMAIL', 'Email')}:</label>
																	<Input type="email" id="email" readOnly/>
																</div>
																<div className="form-group">
																	<div className="row">
																		<div>
																			<label for="" className="control-label">{translate('P2P_TIME_FRAME', 'What time will you send these funds?')}</label>
																		</div>
																		<div className="col-sm-6">
																			<div className="form-group">
																				<select className="form-control" value={this.props.timeFrameDay} onChange={this.props.timeFrameDayChange}>
																					<option value="TODAY">{translate('P2P_TIME_FRAME_TODAY', 'Today')}</option>
																					<option value="TOMORROW">{translate('P2P_TIME_FRAME_TOMORROW', 'Tomorrow')}</option>
																				</select>
																			</div>
																		</div>
																		<div className="col-sm-6">
																			<div className="form-group">
																				<select className="form-control" value={this.props.timeFrameTime} onChange={this.props.timeFrameTimeChange}>
																					<option value="12">12:00</option>
																					<option value="13">13:00</option>
																					<option value="14">14:00</option>
																					<option value="15">15:00</option>
																					<option value="16">16:00</option>
																					<option value="17">17:00</option>
																				</select>
																			</div>
																		</div>

																	</div>
																</div>
															</div>
														)
													}else{
														return (
															<div>
																<div className="form-group">
																	<label for="">{selectType}:</label>
																	<SelectPayAccount />
																</div>

																<div className="form-group">
																	<div className="row">
																		<div>
																			<label for="" className="control-label">{translate('P2P_TIME_FRAME', 'What time will you send these funds?')}</label>
																		</div>
																		<div className="col-sm-6">
																			<div className="form-group">
																				<select className="form-control" value={this.props.timeFrameDay} onChange={this.props.timeFrameDayChange}>
																					<option value="TODAY">{translate('P2P_TIME_FRAME_TODAY', 'Today')}</option>
																					<option value="TOMORROW">{translate('P2P_TIME_FRAME_TOMORROW', 'Tomorrow')}</option>
																				</select>
																			</div>
																		</div>
																		<div className="col-sm-6">
																			<div className="form-group">
																				<select className="form-control" value={this.props.timeFrameTime} onChange={this.props.timeFrameTimeChange}>
																					<option value="12">12:00</option>
																					<option value="13">13:00</option>
																					<option value="14">14:00</option>
																					<option value="15">15:00</option>
																					<option value="16">16:00</option>
																					<option value="17">17:00</option>
																				</select>
																			</div>
																		</div>

																	</div>
																</div>
															</div>
														)
													}
												})()}

												<AmountController setAmount={setAmount} value={amount}/>
												{(() =>{
													if(!allowContinue && amount != ""){
														return <span>LIMITS ERROR</span>
													}
												})()}

												<p><a href="#">Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></a></p>
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
