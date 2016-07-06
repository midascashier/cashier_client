import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import { UIService } from '../../../services/UIService'
import { TransactionService } from '../../../services/TransactionService'
import { CashierActions } from '../../../actions/CashierActions'

let ConfirmWithdraw = React.createClass({

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		return this.refreshLocalState();
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
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			transaction: CashierStore.getTransaction()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	/**
	 * this function sends transaction info to cashier
	 *
	 */
	processTransaction(){
		TransactionService.process();
		UIService.changeUIState('/'+UIService.getCurrentView()+'/'+UIService.getProcessorName().toLowerCase()+'/ticket/');
	},

	render(){
		let originPath = UIService.getOriginPath();
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
												<div className="title">Double-check Your Billing Information</div>
												<div className="infoCol text-justify">
													<p>In order to activate your debit card, the first payout sent to the card will have the $25
														activation fee deducted from the payout
														amount. Once loaded, these funds will be immediately available for your use, minus the $2
														load fee. (i.e. $23)</p>
													<p>The courier service is for free. Whenever you request a payout the funds will be
														transferred to your card. You can withdraw funds,
														purchase online or at a physical store. It is accepted internationally.</p>
													<p>Please keep in mind that you should not accumulate more than $10,000 in your card account
														balance at any time.</p>
													<p>Please be aware your card must always have at least $10 at all times or else it will be
														closed by the bank in a two month period.
														In addition to that, if the card hits $0 balance at any moment the bank will charge a $1
														fee.</p>
												</div>
											</div>

										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="box">

										<div className="row">
											<div className="col-sm-12">
												<div className="title">Withdraw Details</div>
												<div className="deposit-details">
													<div className="table-responsive">
														<table className="table table-striped">
															<tbody>
															<tr>
																<td>{translate('TRANSACTION_AMOUNT', 'Amount')}</td>
																<td><span>{this.state.transaction.amount}</span></td>
															</tr>
															<tr>
																<td>{translate('TRANSACTION_FEE_AMOUNT', 'Fee')}</td>
																<td><span>{this.state.transaction.fee}</span></td>
															</tr>
															</tbody>
														</table>
													</div>
													<p>
														<i className="fa fa-pencil green"></i>
														<a href="#">Edit the withdraw details</a>
													</p>
												</div>
												<div className="row">
													<div className="col-sm-6">
															<button type="submit" onClick={this.processTransaction}
																			className="btn btn-green">{translate('PROCESSING_BUTTON_COMPLETE_WITHDRAW', 'Complete Withdraw')}</button>
														<p>
															<a href="#">Use a different method.</a>
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
	}
});

module.exports.ConfirmWithdraw = ConfirmWithdraw;
