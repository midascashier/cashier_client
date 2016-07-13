import React from 'react'
import { Input } from '../../../Inputs'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'
import { translate } from '../../../../constants/Translate'

let P2PTicketPending = React.createClass({

	/**
	 * initialize the state
	 * 
	 * @returns {*|{transaction}|{transaction: (*|{transactionId: number, journalId: number, status: number, userMessage: string, state: string, details: Array})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{transaction: (*|{transactionId: number, journalId: number, status: number, userMessage: string, state: string, details: Array})}}
	 */
	refreshLocalState() {
		let transaction = UIService.getLastTransactionResponse();
		return {
			transaction: transaction
		}
	},

	/**
	 * component is ready
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {
		let transaction = this.state.transaction;
		let details = transaction.details;
		return (
			<div id="P2PTicketPending">

				<div className="col-sm-12">
					<div className="rejected-message">
						<div className="title">{translate('P2P_INSTRUCTIONS', 'Now send your funds.')}</div>
					</div>
				</div>

				<div className="col-sm-12">
					<div className="modules">
						<div className="row">

							<div className="col-sm-4">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="title">{translate('P2P_INSTRUCTIONS_SENDER', "Sender's Information")}</div>
											<div className="infoCol">
												<ul>
													<li>{translate('P2P_NAME', 'Name')}: {details.PAFirstName + ' ' + details.PALastName}</li>
													<li>{translate('P2P_COUNTRY', 'Country')}: {details.PACountryName}</li>
													<li>{translate('P2P_STATE', 'State')}: {details.PAStateName}</li>
													<li>{translate('P2P_CITY', 'City')}: {details.PACity}</li>
													<li>{translate('P2P_PHONE', 'Phone')}: {details.PAPhone}</li>
													<li>{translate('P2P_EMAIL', 'Email')}: {details.PAEmail}</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-4">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="row">
												<div className="col-sm-12">
													<div className="title">{translate('P2P_INSTRUCTIONS_RECEIVER', "Receiver's Information")}</div>
													<div className="infoCol">
														<div className="row">
															<p><a href="#">Get New Receiver</a></p>
														</div>
														<div className="row">
															<ul>
																<li>{translate('P2P_NAME', 'Name')}: {details.Name}</li>
																<li>{translate('P2P_COUNTRY', 'Country')}: {details.Country}</li>
																<li>{translate('P2P_CITY', 'City')}: {details.State}</li>
															</ul>
														</div>
													</div>
													<p>
														<strong>Important Notice: Not following the instructions below will result in a rejected details.</strong>
													</p>
													<ul>
														<li>This receiver's information is only valid for the next 48 hours.</li>
														<li>The minimum deposit is $50, and the maximum is $400</li>
														<li>Your transaction must be sent in USD and received in USD.</li>
													</ul>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-4">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="title">{translate('P2P_INSTRUCTIONS_PENDING_MTCN', 'Pending Control Number')}</div>

											<form className="form-horizontal infoCol">
												<div className="form-group">
													<label for="" className="col-sm-4 control-label">{translate('P2P_CONTROL_NUMBER', 'Control #')}:</label>
													<div className="col-sm-8">
														<Input type="text" className="form-control" id="controlNumber" value={details.ControlNumber}/>
													</div>
												</div>
												<div className="form-group">
													<label for="" className="col-sm-4 control-label">{translate('P2P_AMOUNT_SEND', 'Funds Sent')}:</label>
													<div className="col-sm-8">
														<Input type="number" className="form-control" id="amount" value={details.Amount}/>
													</div>
												</div>
												<div className="form-group">
													<label for="" className="col-sm-4 control-label">{translate('P2P_FEE_SEND', 'Fee')}:</label>
													<div className="col-sm-8">
														<Input type="number" className="form-control" id="fee" value={details.Fee}/>
													</div>
												</div>
												<button type="button" className="btn btn-green">{translate('PROCESSING_BUTTON_SUBMIT', 'Submit')}</button>
												<p>{translate('P2P_INSTRUCTIONS_INFO', '')}</p>
											</form>

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

module.exports.P2PTicketPending = P2PTicketPending;
