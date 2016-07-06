import React from 'react'
import {translate} from '../../../constants/Translate'
import {AmountController} from '../../AmountController'
import {UIService} from '../../../services/UIService'

let AskInfo = React.createClass({

	propTypes: {
		selectedProcessor: React.PropTypes.object
	},

	render() {
		let originPath = UIService.getOriginPath();
		let processingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P', "Please Enter the Sender's Information");
		let displayName = UIService.getProcessorDisplayName();

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
												<form>
													<div className="form-group">
														<label for="" className="control-label">First Name:</label>
														<input type="text" className="form-control" id="firstName" readOnly/>
													</div>
													<div className="form-group">
														<label for="" className="control-label">Last Name:</label>
														<input type="text" className="form-control" id="lastName" readOnly/>
													</div>

													<div className="form-group">
														<div className="row">
															<div className="col-sm-6">
																<div className="form-group">
																	<label for="" className="control-label">Country:</label>
																	<select className="form-control" id="country">
																		<option value="0">United State</option>
																	</select>
																</div>
															</div>
															<div className="col-sm-6">
																<label for="" className="control-label">State:</label>
																<select className="form-control" id="countryState">
																	<option value="0">Florida</option>
																</select>
															</div>
															<div className="col-sm-6">
																<label for="" className="control-label">City:</label>
																<input type="text" className="form-control" id="city" readOnly/>
															</div>
															<div className="col-sm-6">
																<label for="" className="control-label">Phone:</label>
																<input type="text" className="form-control" id="phone" readOnly/>
															</div>
														</div>
													</div>

													<div className="form-group">
														<label for="" className="control-label">Email:</label>
														<input type="email" className="form-control" id="email" readOnly/>
													</div>
													<div className="form-group">
														<div className="row">
															<div className="col-sm-6">
																<label for="" className="control-label">What time will you send these funds?</label>
															</div>
															<div className="col-sm-3">
																<div className="form-group">
																	<select className="form-control">
																		<option value="Today" selected="Today">Today</option>
																		<option value="Tomorrow">Tomorrow</option>
																	</select>
																</div>
															</div>
															<div className="col-sm-3">
																<div className="form-group">
																	<select className="form-control">
																		<option value="12:00">12:00</option>
																		<option value="13:00">13:00</option>
																		<option value="14:00">14:00</option>
																		<option value="15:00">15:00</option>
																		<option value="16:00">16:00</option>
																		<option value="17:00">17:00</option>
																	</select>
																</div>
															</div>

														</div>
													</div>
													<AmountController />
													<p><a href="#">Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></a></p>

												</form>
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
