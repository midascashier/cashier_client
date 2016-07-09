import React from 'react'
import { Input } from '../../../Inputs'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'
import { translate } from '../../../../constants/Translate'

let P2PTicketPending = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{transaction}|{transaction: (*|{transactionId: number, journalId: number, status: number, userMessage: string, state: string, transaction: {journalId: null, transactionId: null, payAccountId: null, transactionStatusId: null, journalTransactionStatusId: null, statusName: null, processorId: null, processorIdSelected: null, processorClassId: null, processorName: null, processorDisplayName: null, dateTrans: null, dateTransModified: null, transUniqueId: null, transactionIdProcessor: null, currencyAmount: null, currencyFee: null, amount: null, fee: null, feeBP: null, currencyId: null, currencyCode: null, transactionTypeId: null, transType: null, errorCode: null, errorMessage: null, userMessage: null, journalNotes: null, descriptor: null}, p2pTransaction: {P2PNameId: null, P2PNameStatus_Id: null, payAccountId: null, submitPayAccountId: null, nameId: null, name: null, Country: null, State: null, SenderTimeFrame: null, ControlNumber: null, DateRequest: null, DateUpdate: null, PAFirstName: null, PAMiddleName: null, PALastName: null, PAPhone: null, PAEmail: null, PACity: null, PAState: null, PAStateName: null, PACountry: null, PACountryName: null, currencyAmount: number, amount: number, currencyFee: string, transactionStatusId: null, processorDisplayName: null, errorMessage: null, processorId: null}, bitCoinTransaction: {Address: null}, load: (function(*))})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{transaction: (*|{transactionId: number, journalId: number, status: number, userMessage: string, state: string, transaction: {journalId: null, transactionId: null, payAccountId: null, transactionStatusId: null, journalTransactionStatusId: null, statusName: null, processorId: null, processorIdSelected: null, processorClassId: null, processorName: null, processorDisplayName: null, dateTrans: null, dateTransModified: null, transUniqueId: null, transactionIdProcessor: null, currencyAmount: null, currencyFee: null, amount: null, fee: null, feeBP: null, currencyId: null, currencyCode: null, transactionTypeId: null, transType: null, errorCode: null, errorMessage: null, userMessage: null, journalNotes: null, descriptor: null}, p2pTransaction: {P2PNameId: null, P2PNameStatus_Id: null, payAccountId: null, submitPayAccountId: null, nameId: null, name: null, Country: null, State: null, SenderTimeFrame: null, ControlNumber: null, DateRequest: null, DateUpdate: null, PAFirstName: null, PAMiddleName: null, PALastName: null, PAPhone: null, PAEmail: null, PACity: null, PAState: null, PAStateName: null, PACountry: null, PACountryName: null, currencyAmount: number, amount: number, currencyFee: string, transactionStatusId: null, processorDisplayName: null, errorMessage: null, processorId: null}, bitCoinTransaction: {Address: null}, load: (function(*))})}}
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
													<li>{translate('P2P_NAME', 'Name')}: Test1</li>
													<li>{translate('P2P_COUNTRY', 'Country')}: XXX</li>
													<li>{translate('P2P_STATE', 'State')}: XXX</li>
													<li>{translate('P2P_CITY', 'City')}: XXX</li>
													<li>{translate('P2P_PHONE', 'Phone')}: 123-456-7891</li>
													<li>{translate('P2P_EMAIL', 'Email')}: test@gmail.com</li>
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
															<div className="col-sm-6">
																<ul>
																	<li>{translate('P2P_NAME', 'Name')}: Bob Jones</li>
																	<li>{translate('P2P_COUNTRY', 'Country')}: Costa Rica</li>
																	<li>{translate('P2P_CITY', 'City')}: La Guacima</li>
																</ul>
															</div>
															<div className="col-sm-6">
																<p><a href="#">Get New Receiver</a></p>
															</div>
														</div>
													</div>
													<p>
														<strong>Important Notice: Not following the instructions below will result in a rejected transaction.</strong>
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
														<Input type="text" className="form-control" id="controlNumber" readOnly/>
													</div>
												</div>
												<div className="form-group">
													<label for="" className="col-sm-4 control-label">{translate('P2P_AMOUNT_SEND', 'Funds Sent')}:</label>
													<div className="col-sm-8">
														<Input type="number" className="form-control" id="amount" readOnly/>
													</div>
												</div>
												<div className="form-group">
													<label for="" className="col-sm-4 control-label">{translate('P2P_FEE_SEND', 'Fee')}:</label>
													<div className="col-sm-8">
														<Input type="number" className="form-control" id="fee" readOnly/>
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
