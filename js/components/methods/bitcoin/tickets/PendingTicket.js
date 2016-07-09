import React from 'react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'
import { translate } from '../../../../constants/Translate'

let BitCoinTicketPending = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{address, amount, minutes}|{address: string, amount: number, minutes: number}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{address: string, amount: number, minutes: number}}
	 */
	refreshLocalState() {
		let transaction = UIService.getLastTransactionResponse();
		let address = "Loading...";
		if (transaction && transaction.details && transaction.details.bitCoinTransaction){
			address = transaction.details.bitCoinTransaction.Address;
		}
		return {
			address: address,
			amount: 1.1892967,
			minutes: 15
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

	/**
	 * copy to clipboard the BitCoin Address
	 */
	copyToClipboard() {
		let address = this.state.address;
		let clipBoard = document.createElement("input");
		clipBoard.setAttribute("value", address);
		document.body.appendChild(clipBoard);
		clipBoard.select();
		document.execCommand("copy");
		document.body.removeChild(clipBoard);
	},

	render() {

		let address = this.state.address;
		let amount = this.state.amount;
		let minutes = this.state.minutes;

		let btcAmount = translate('BITCOIN_INSTRUCTIONS_AMOUNT', '', {btcAmount: amount});
		let btcTimer = translate('BITCOIN_INSTRUCTIONS_TIME_INFO', '', {btcMinutes: minutes});

		return (
			<div id="BitCoinTicketInstructions">

				<div className="col-sm-12">
					<div className="rejected-message">
						<div className="title">{translate('BITCOIN_INSTRUCTIONS', 'Now send your BitCoin to us.')}</div>
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
												<div className="subtitle">{btcAmount}</div>
												<p>{translate('BITCOIN_INSTRUCTIONS_AMOUNT_INFO', 'Otherwise, your transaction will not be successful')}</p>
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
														<div className="subtitle">{translate('BITCOIN_INSTRUCTIONS_ADDRESS', 'Send the BitCoin to the following address')}</div>
														<p>{translate('BITCOIN_INSTRUCTIONS_ADDRESS_INFO', 'Please include any Miners Fee your BitCoin wallet charges.')}</p>
														<div>
															<input type="text" className="form-control" id="bitCoinAddress" value={address} readOnly/>
															<button type='button' onClick={this.copyToClipboard} disabled={!address} className='btn btn-green'>
																{translate('PROCESSING_BUTTON_COPY', 'Copy')}
															</button>
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
												<div className="subtitle">{translate('BITCOIN_INSTRUCTIONS_TIME', 'Prompty complete your transaction.')}</div>
												<p>{btcTimer}</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<p>{translate('BITCOIN_INSTRUCTIONS_INFO', '')}</p>
							</div>

						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports.BitCoinTicketPending = BitCoinTicketPending;
