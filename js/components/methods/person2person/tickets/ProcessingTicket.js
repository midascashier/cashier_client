import React from 'react'
import Cashier from '../../../../constants/Cashier'
import {UIService} from '../../../../services/UIService'
import {translate} from '../../../../constants/Translate'
import {CashierStore} from '../../../../stores/CashierStore'

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
	refreshLocalState(){
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
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	render(){
		let fee = this.state.fee;
		let controlNumber = this.state.controlNumber;
		let currencyAmount = this.state.currencyAmount;
		let transactionDetails = this.state.transactionDetails;
		let importantContent = translate('P2P_IMPORTANCE_NOTICE');
		let makeContent = translate('P2P_INSTRUCTIONS_ONLY_VALID');

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
													<div className="infoCol scroll">
														<p><a onClick={this.setFirstStep}>{translate('P2P_INSTRUCTIONS_GET_RECEIVER', "Get New Receiver")}</a></p>

														{(() =>{
															if(transactionDetails.caProcessor_Id == Cashier.PROCESSOR_ID_RIA_PROCESSOR){
																return (
																	<ul>
																		<li>{translate('P2P_AGENCY_NAME', 'Agency Name')}: {(transactionDetails.Agency) ? transactionDetails.Agency : 'EasyPay-Phillgus'}</li>
																		<li>{translate('P2P_NAME', 'Name')}: {transactionDetails.Name}</li>
																		<li>{translate('P2P_COUNTRY', 'Country')}: {transactionDetails.Country}</li>
																		<li>{translate('P2P_CITY', 'City')}: {transactionDetails.State}</li>
																	</ul>
																)
															}

															return (
																<ul>
																	<li>{translate('P2P_NAME', 'Name')}: {transactionDetails.Name}</li>
																	<li>{translate('P2P_COUNTRY', 'Country')}: {transactionDetails.Country}</li>
																	<li>{translate('P2P_CITY', 'City')}: {transactionDetails.State}</li>
																</ul>
															)
														})()}

														{(() =>{
															if(transactionDetails.caProcessor_Id == Cashier.PROCESSOR_ID_RIA_PROCESSOR){
																return <p>
																	<strong>{translate('P2P_MAKE_PAYMENT', 'Make your payment in one of the following establishments')}</strong><br />
																	<img src="/images/ria.jpg"/>
																</p>
															}
														})()}

														<p dangerouslySetInnerHTML={{__html: importantContent}}/>
														<ul dangeroudlySetInnerHTML={{__html: makeContent}}/>
													</div>

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
	}
});

module.exports.P2PTicketProcessing = P2PTicketProcessing;
