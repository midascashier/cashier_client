import React from 'react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'

let BitCoinTicketPending = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{address}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{address: null}}
	 */
	refreshLocalState() {
		let transaction = UIService.getLastTransactionResponse();
		let address = "Loading...";
		if (transaction && transaction.details && transaction.details.bitCoinTransaction){
			address = transaction.details.bitCoinTransaction.Address;
		}
		return {
			address: address
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
		let address = this.state.address;
		return (
			<div id="BitCoinTicketInstructions">

				<div className="col-sm-12">
					<div className="rejected-message">
						<div className="title">Now send your BitCoin to us.</div>
					</div>
				</div>

				<div className="col-sm-12">
					<div className="modules">
						<div className="row">

							<div className="col-sm-4">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="title">1</div>
											<div className="infoCol">
												<div className="subtitle">Send exactly 1.1892967 BTC</div>
												<p>Otherwise, your transaction will not be successful</p>
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
													<div className="title">2</div>
													<div className="infoCol">
														<div className="subtitle">Send the BitCoin to the following address</div>
														<p>Please include any Miners Fee your BitCoin wallet charges.</p>
														<div className="form-inline">
															<input type="text" className="form-control" id="bitCoinAddress" value={address} readOnly/>
															<button type="submit" className="btn btn-green">Copy</button>
														</div>
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
											<div className="title">3</div>
											<div className="infoCol">
												<div className="subtitle">Prompty complete your transaction.</div>
												<p>This BTC transaction price is only valid for 15 minutes. After that, the transaction price will change, and you many receive a different amount that expected.</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<p>Your funds should be available within 30 minutes of making the transfer from your wallet.</p>
							</div>

						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports.BitCoinTicketPending = BitCoinTicketPending;
