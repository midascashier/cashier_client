import React from 'react'
import { UIService } from '../../../services/UIService'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'
import { TransactionService } from '../../../services/TransactionService'

let CryptoScreemConfirmWithdraw = React.createClass({

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			transaction: CashierStore.getTransaction(),
			payAccount: CashierStore.getCurrentPayAccount()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function sends transaction info to cashier
	 *
	 */
	processTransaction(){
		let transaction = this.state.transaction;

		let dynamicParams = {
			amount: transaction.amount,
			payAccountId: transaction.payAccountId,
			promoCode: transaction.promoCode,
			cryptoAddress: transaction.cryptoAddress,
			currencyName: transaction.currencyName,
			currencySymbol: transaction.currencySymbol,
			BTCConversionAmount: transaction.BTCConversionAmount
		};

		TransactionService.processCryptoTransfer(dynamicParams, 'ticket');
	},

	/**
	 * Sends customer to previous step and start transaction
	 */
	editWithdraw(){
		UIService.startTransaction();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	render(){
		let originPath = UIService.getOriginPath();
		let transaction = this.state.transaction;
		let limits = UIService.getProcessorLimitMinMax();
		return (
			<div id="confirmBitCoinWithdraw" className="internal-content">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="row">

								<div className="col-sm-6 ">
									<div className="box">

										<div className="row">
											<div className="col-sm-12">
												<div
													className="title">{translate('PROCESSING_BILLING_INFO_TITLE', 'Double-check Your Billing Information')}</div>
												<div className="infoCol text-justify">
													<p>
														Crypto Transfer withdraws will be process inside 24 hours, but are typically processed within an
														hour.
													</p>
												</div>
											</div>

										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="box">

										<div className="row">
											<div className="col-sm-12">
												<div className="title">{translate('METHOD_DETAILS_WITHDRAW', 'Withdraw Details')}</div>
												<div className="table-responsive">
													<table className="table table-striped">
														<tbody>
															<tr>
																<td>{translate('TRANSACTION_AMOUNT', 'Amount')}</td>
																<td><span>{transaction.amount + ' ' + limits.currencyCode}</span></td>
															</tr>
															<tr>
																<td>{translate('CRYPTO_DEPOSIT_ADDRESS', 'Address')}</td>
																<td><span>{transaction.cryptoAddress}</span></td>
															</tr>
														</tbody>
													</table>
												</div>
												<p>
													<i className="fa fa-pencil green"></i>
													<a onClick={this.editWithdraw}>{translate('METHOD_EDIT_DETAILS_WITHDRAW', 'Edit the withdraw details')}</a>
												</p>
												<div className="row">
													<div className="col-sm-6">
														<button type="button" onClick={this.processTransaction} className="btn btn-green">
															{translate('PROCESSING_BUTTON_COMPLETE_WITHDRAW', 'Complete Withdraw')}
														</button>
														<p>
															<a onClick={this.setFirstStep}>{translate('METHOD_USE_DIFFERENT', 'Use a different method.')}</a>
														</p>
													</div>
													<div className="col-sm-6">
														<img src={originPath + '/images/ssl.png'} alt="ssl"/>
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
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
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

module.exports.CryptoScreemConfirmWithdraw = CryptoScreemConfirmWithdraw;