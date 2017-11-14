import React from 'react'
import QRCode from 'qrcode.react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'
import { translate } from '../../../../constants/Translate'

let BitCoinTicketPending = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{address, amount, minutes}|{address: string, amount: string, minutes: number}}
	 */
	getInitialState(){
		return Object.assign(this.refreshLocalState(), { timer: '15:00' });
	},

	/**
	 * build the state
	 *
	 * @returns {{address: string, amount: string, minutes: number}}
	 */
	refreshLocalState() {
		let address = "Loading...";
		let btcAmount = "Loading...";
		let rateExpiration = 15;

		let transaction = UIService.getLastTransactionResponse();
		if(transaction && transaction.details && transaction.details.bitCoinTransaction){
			address = transaction.details.bitCoinTransaction.Address;
			btcAmount = transaction.details.bitCoinTransaction.BitcoinAmount;
			rateExpiration = parseInt(transaction.details.bitCoinTransaction.RateExpiration);
		}

		let expirationTime = new Date();
		expirationTime.setMinutes(expirationTime.getMinutes() + rateExpiration);
		return {
			address: address,
			amount: btcAmount,
			minutes: rateExpiration,
			expirationTime: expirationTime
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

	/**
	 * timer to reprocess transaction
	 */
	timerTick(){
		if(this.isMounted()){

			let now = new Date();
			let timeDifference = (this.state.expirationTime.getTime() - now.getTime()) / 1000;
			let minutes = Math.floor(timeDifference / 60);
			let seconds = Math.round(timeDifference - minutes * 60);

			if(minutes <= 0 && seconds <= 0){
				clearInterval(this.interval);
			}

			minutes = (minutes >= 10) ? minutes : '0' + minutes;
			seconds = (seconds >= 10) ? seconds : '0' + seconds;
			let score = minutes + ":" + seconds;
			this.setState({ timer: score });
		}
	},

	render() {

		let address = this.state.address;
		let amount = this.state.amount;
		let timer = this.state.timer;

		let btcAmount = translate('BITCOIN_INSTRUCTIONS_AMOUNT', '', { btcAmount: amount });

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
											<div className="title">#1</div>
											<div className="infoCol">
												<div className="subtitle">{btcAmount}</div>
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
													<div className="title">#2</div>
													
													<div className="infoCol">
														<div className="subtitle">{translate('BITCOIN_INSTRUCTIONS_ADDRESS', 'Send the BitCoin to the following address')}</div>
														<p>{translate('BITCOIN_INSTRUCTIONS_ADDRESS_INFO', 'Please include any Miners Fee your BitCoin wallet charges.')}</p>
														
														<div className="row">
															<div id="btcAddress" className="form-group">
																<div className="col-sm-12">
																	<input type="text" className="form-control" id="bitCoinAddress" value={address}
																				 readOnly/>
																</div>
																<div className="col-sm-12 mod-center">
																	<button type='button' onClick={this.copyToClipboard} disabled={!address}
																					className='btn btn-green'>
																		{translate('PROCESSING_BUTTON_COPY', 'Copy')}
																	</button>
																</div>
															</div>
														</div>
														
														<div id="QRCode">
															{(() =>{
																if(address){
																	return (
																		<div className="img-responsive center-block">
																			<QRCode value={address}/>
																		</div>
																	)
																}
															})()}
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
											<div className="title">#3</div>
											<div className="infoCol">
												<div
													className="subtitle">{translate('BITCOIN_INSTRUCTIONS_TIME', 'Prompty complete your transaction.')}</div>
												<p>{translate('BITCOIN_INSTRUCTIONS_TIME_INFO1', 'instruction')} <b><font
													color="red">{timer}</font></b> {translate('BITCOIN_INSTRUCTIONS_TIME_INFO2', 'instruction')}
												</p>
											</div>
										</div>
									</div>
								</div>
								<p><strong>{translate('BITCOIN_INSTRUCTIONS_INFO', '')}</strong></p>
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

module.exports.BitCoinTicketPending = BitCoinTicketPending;
