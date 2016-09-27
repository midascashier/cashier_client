import React from 'react'
import { translate } from '../../../../constants/Translate'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'

let P2PTicketProcessing = React.createClass({

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
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	render() {
		let transactionDetails = this.state.transactionDetails;
		let controlNumber = this.state.controlNumber;
		let currencyAmount = this.state.currencyAmount;
		let fee = this.state.fee;
		return (
			<div id="P2PTicketProcessing">

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
															<p><a onClick={this.setFirstStep}>{translate('P2P_INSTRUCTIONS_GET_RECEIVER', "Get New Receiver")}</a></p>
														</div>
														<div className="row">
															{(() =>{
																if(transactionDetails.caProcessor_Id == 500){
																	return <ul>
																		<li>{translate('P2P_AGENCY_NAME', 'Agency_Name')}: Easypay - Phillgus</li>
																		<li>{translate('P2P_ADDRESS', 'ADDRESS')}: 150 mts Norte de la farmacia La Bomba, frente
																			al
																			hostel Cataluña, San Pedro de Montes de Oca
																		</li>
																		<li>{translate('P2P_NAME', 'Name')}: {transactionDetails.Name}</li>
																		<li>{translate('P2P_COUNTRY', 'Country')}: {transactionDetails.Country}</li>
																		<li>{translate('P2P_CITY', 'City')}: {transactionDetails.State}</li>
																	</ul>
																} else{
																	return <ul>
																		<li>{translate('P2P_NAME', 'Name')}: {transactionDetails.Name}</li>
																		<li>{translate('P2P_COUNTRY', 'Country')}: {transactionDetails.Country}</li>
																		<li>{translate('P2P_CITY', 'City')}: {transactionDetails.State}</li>
																	</ul>
																}
															})()}
														</div>
													</div>
													{(() =>{
														if(transactionDetails.caProcessor_Id == 500){
															return <p>
																<strong>Make your payment in one of the following establishments</strong><br />
																<img src="/images/ria.jpg"/>
															</p>
														}
													})()}
													<p>
														<strong>Make your payment</strong>
														<strong>Important Notice: Not following the instructions below will result in a rejected transaction details.</strong>
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
											<div className="infoCol">
												<div className="row">
													<ul>
														<li>{translate('P2P_CONTROL_NUMBER', 'Control #')}: {controlNumber}</li>
														<li>{translate('P2P_AMOUNT_SEND', 'Funds Sent')}: {currencyAmount}</li>
														<li>{translate('P2P_FEE_SEND', 'Fee')}: {fee}</li>
													</ul>
													<p><strong>{translate('P2P_INSTRUCTIONS_INFO_PROCESSING', 'Thank you for your deposit.')}</strong></p>
												</div>
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

module.exports.P2PTicketProcessing = P2PTicketProcessing;
