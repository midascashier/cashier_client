import React from 'react'
import { UIService } from '../../../../services/UIService'

let BitCoinTicketPending = React.createClass({
	render() {
		
		let transaction = UIService.getLastTransactionResponse();
		let btcAddress = transaction.bitCoinTransaction.Address;

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
															<input type="text" className="form-control" id="bitCoinAddress" value={btcAddress} readOnly/>
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
