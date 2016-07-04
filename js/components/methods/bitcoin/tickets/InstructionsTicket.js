import React from 'react'

let BitCoinTicketInstructions = React.createClass({
	render() {
		return (
			<div id="BitCoinTicketInstructions">

				<div className="col-sm-12">
					<div className="rejected-message">
						<div className="title">Now send your Bitcoin to us.</div>
					</div>
				</div>

				<div className="col-sm-12">
					<div className="modules">
						<div className="row">

							<div className="col-sm-4">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="title">#1</div>
											<div className="infoCol">
												<strong>Send exactly 1.1892967 BTC.</strong>
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
											<div className="title">#2</div>
											<div className="infoCol">
												<strong>Send the Bitcoin to the following address</strong>
												<p>Please include any Miners Fee your Bitcoin wallet charges</p>
												<div className="form-group">
													<input className="form-control" type="text" id="btcAddress" name="btcAddress" value="31uEbMgunupShBVTewXjtqbBv5MndwfXhb" readOnly/>
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
											<div className="title">#3</div>
											<div className="infoCol">
												<strong>Prompty completed your transaction</strong>
												<p>This BTC transaction price is only valid for 15 minutes. After that, the transaction price will change, and you many receive a different amount that expected.</p>
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

module.exports.BitCoinTicketInstructions = BitCoinTicketInstructions;
