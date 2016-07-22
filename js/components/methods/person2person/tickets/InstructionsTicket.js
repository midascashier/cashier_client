import React from 'react'
import { translate } from '../../../../constants/Translate'
import { ApplicationService } from '../../../../services/ApplicationService'
import { Input } from '../../../Inputs'
import { UIService } from '../../../../services/UIService'
import { TransactionService } from '../../../../services/TransactionService'
import { CashierStore } from '../../../../stores/CashierStore'

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
		let transactionResponse = UIService.getLastTransactionResponse();
		let transaction = UIService.getTransactionInformation();
		let controlNumber = transaction.controlNumber;
		let currencyAmount = Number(transaction.amount);
		let fee = Number(transaction.fee);

		return {
			transactionDetails: transactionResponse.details,
			controlNumber: controlNumber,
			currencyAmount: currencyAmount,
			fee: fee,
			enableSubmit: false
		}
	},

	/**
	 * component is ready
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	},

	/**
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function sends submit transaction to cashier
	 *
	 */
	submitTransaction(){
		TransactionService.processSubmit();
	},

	/**
	 *
	 * @param attribute
	 * @param value
	 */
	changeValue(attribute, value) {

		if(attribute == 'controlNumber'){
			let enableSubmit = ApplicationService.validateInfo(value,"isControlNumber");
			this.setState({enableReprocess: enableSubmit, controlNumber: value});
			TransactionService.setControlNumber(value);
		}

		if(attribute == 'amount'){
			this.setState({currencyAmount: value});
			TransactionService.setAmount(value);
		}

		if(attribute == 'fee'){
			this.setState({fee: value});
			TransactionService.setFeeAmount(value);
		}

		return true;
	},

	render() {
		let transactionDetails = this.state.transactionDetails;
		let controlNumber = this.state.controlNumber;
		let currencyAmount = this.state.currencyAmount;
		let fee = this.state.fee;

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
													<li>{translate('P2P_NAME', 'Name')}: {transactionDetails.PAFirstName + ' ' + transactionDetails.PALastName}</li>
													<li>{translate('P2P_COUNTRY', 'Country')}: {transactionDetails.PACountryName}</li>
													<li>{translate('P2P_STATE', 'State')}: {transactionDetails.PAStateName}</li>
													<li>{translate('P2P_CITY', 'City')}: {transactionDetails.PACity}</li>
													<li>{translate('P2P_PHONE', 'Phone')}: {transactionDetails.PAPhone}</li>
													<li>{translate('P2P_EMAIL', 'Email')}: {transactionDetails.PAEmail}</li>
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
															<p><a>{translate('P2P_INSTRUCTIONS_GET_RECEIVER', "Get New Receiver")}</a></p>
														</div>
														<div className="row">
															<ul>
																<li>{translate('P2P_NAME', 'Name')}: {transactionDetails.Name}</li>
																<li>{translate('P2P_COUNTRY', 'Country')}: {transactionDetails.Country}</li>
																<li>{translate('P2P_CITY', 'City')}: {transactionDetails.State}</li>
															</ul>
														</div>
													</div>
													<p>
														<strong>Important Notice: Not following the instructions below will result in a rejected transactionDetails.</strong>
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
														<Input type="text" className="form-control" id="controlNumber" value={controlNumber} onChange={this.changeValue.bind(this, 'controlNumber')}/>
													</div>
												</div>
												<div className="form-group">
													<label for="" className="col-sm-4 control-label">{translate('P2P_AMOUNT_SEND', 'Funds Sent')}:</label>
													<div className="col-sm-8">
														<Input type="number" className="form-control" id="amount" value={currencyAmount} onChange={this.changeValue.bind(this, 'amount')}/>
													</div>
												</div>
												<div className="form-group">
													<label for="" className="col-sm-4 control-label">{translate('P2P_FEE_SEND', 'Fee')}:</label>
													<div className="col-sm-8">
														<Input type="number" className="form-control" id="fee" value={fee} onChange={this.changeValue.bind(this, 'fee')}/>
													</div>
												</div>
												<button type="button" className="btn btn-green" disabled={!this.state.enableReprocess} onClick={this.submitTransaction}>
													{translate('PROCESSING_BUTTON_SUBMIT', 'Submit')}
												</button>
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
