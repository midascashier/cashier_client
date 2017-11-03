import React from 'react'
import QRCode from 'qrcode.react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'
import { translate } from '../../../../constants/Translate'
import { TransactionService } from '../../../../services/TransactionService'

let CryptoTransferTicketPending = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{address, amount, minutes}|{address: string, amount: string, minutes: number}}
	 */
	getInitialState(){
		return Object.assign(this.refreshLocalState());
	},

	/**
	 * build the state
	 *
	 * @returns {{address: string, amount: string, minutes: number}}
	 */
	refreshLocalState() {
		let address = "Loading...";
		let cryptoName = "Loading...";
		let cryptoAmount = "Loading...";
		let CryptoCurrencyISO = "Loading...";

		let transaction = UIService.getLastTransactionResponse();
		TransactionService.cryptoTransferTransaction(transaction.transactionId);

		if(transaction && transaction.details && transaction.details.cryptoTransferTransaction){
			address = transaction.details.cryptoTransferTransaction.AddressFrom;
			cryptoName = transaction.details.cryptoTransferTransaction.CryptoCurrencyName;
			cryptoAmount = transaction.details.cryptoTransferTransaction.CryptoCurrencyAmount;
			CryptoCurrencyISO = transaction.details.cryptoTransferTransaction.CryptoCurrencyISO;
		}

		return {
			address : address,
			cryptoName : cryptoName,
			cryptoAmount : cryptoAmount,
			CryptoCurrencyISO : CryptoCurrencyISO
		}
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
	 * copy to clipboard the Crypto Address Address
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
		let amount = this.state.cryptoAmount;

		let btcAmount = translate('BITCOIN_INSTRUCTIONS_AMOUNT', '', { btcAmount: amount });

		return (
			<div id="CryptoAddressTicketInstructions">

				<div className="col-sm-12">
					<div className="rejected-message">
						<div className="title">{translate('BITCOIN_INSTRUCTIONS', 'Now send your BitCoin to us.')}</div>
					</div>
				</div>

				<div className="col-sm-12">
					<div className="modules">
						<div className="row">

							<div className="col-sm-6">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="title">#1</div>
											<div className="infoCol">
												<div className="subtitle">{btcAmount}</div>
												<p>{translate('BITCOIN_INSTRUCTIONS_AMOUNT_INFO', 'Otherwise, your transaction will not be successful')}</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="row">
												<div className="col-sm-12">
													<div className="title">#2</div>
													<div className="infoCol">
														<div className="subtitle">{translate('BITCOIN_INSTRUCTIONS_ADDRESS', 'Send the BitCoin to the following address')}</div>
														<p>{translate('BITCOIN_INSTRUCTIONS_ADDRESS_INFO', 'Please include any Miners Fee your BitCoin wallet charges.')}</p>

														<div className="row">
															<div id="btcAddress" className="form-group">
																<div className="col-sm-12">
																	<input type="text" className="form-control" id="bitCoinAddress" value={address} readOnly/>
																</div>
																<div className="col-sm-12 mod-center">
																	<button type='button' onClick={this.copyToClipboard} disabled={!address}
																					className='btn btn-green'>
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
		this.interval = setInterval(this.timerTick, 500);
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.CryptoTransferTicketPending = CryptoTransferTicketPending;
