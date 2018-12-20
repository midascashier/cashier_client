import React from 'react'
import QRCode from 'qrcode.react'
import {UIService} from '../../../../services/UIService'
import {CashierStore} from '../../../../stores/CashierStore'
import {translate} from '../../../../constants/Translate'
import {TransactionService} from '../../../../services/TransactionService'

let CryptoScreenTicketPending = React.createClass({

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
	 * @returns {{address: string, cryptoName: string, cryptoAmount: string, CryptoCurrencyISO: string}}
	 */
	refreshLocalState(){
		let address = "Loading...";
		let cryptoName = "Loading...";
		let cryptoAmount = "Loading...";
		let CryptoCurrencyISO = "Loading...";
		let extraInfo = null;
		let extraInfoName = null;

		let transaction = UIService.getLastTransactionResponse();
		if(transaction && transaction.details && transaction.details.cryptoTransaction){
			address = transaction.details.cryptoTransaction.Address;
			cryptoName = transaction.details.cryptoTransaction.CurrencyName;
			cryptoAmount = transaction.details.cryptoTransaction.CurrencyAmount;
			CryptoCurrencyISO = transaction.details.cryptoTransaction.CurrencyCode;
			extraInfo = transaction.details.cryptoTransaction.ExtraInfo;
			extraInfoName = this.getExtraInfoName(CryptoCurrencyISO);
		}else{
			if(transaction.transactionId){
				TransactionService.getCryptoTransaction(transaction.transactionId);
			}
		}

		return {
			address: address,
			cryptoName: cryptoName,
			cryptoAmount: cryptoAmount,
			CryptoCurrencyISO: CryptoCurrencyISO,
			extraInfo: extraInfo,
			extraInfoName: extraInfoName
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
	 * copy to clipboard the Crypto Address or the extra info
	 */
	copyToClipboard: function(action){
		let clipBoard = document.createElement("input");
		if(action == 1){
			let address = this.state.address;
			clipBoard.setAttribute("value", address);
		}else{
			let extraInfo = this.state.extraInfo;
			clipBoard.setAttribute("value", extraInfo);
		}
		document.body.appendChild(clipBoard);
		clipBoard.select();
		document.execCommand("copy");
		document.body.removeChild(clipBoard);
	},

	/*
	 * Returns the extra info name label of the crypto
	 */
	getExtraInfoName(currencyCode){
		let cryptoCurrrencies = CashierStore.getCryptoCurrencies();
		let cryptoCurrenciesAvailable = cryptoCurrrencies.available;

		let cryptoCurrency = cryptoCurrenciesAvailable.filter(cryptoCurrency => (cryptoCurrency.symbol).toUpperCase() == currencyCode.toUpperCase());
		if(cryptoCurrency.length > 0){
			return (cryptoCurrency[0]).extraInfoName;
		}else{
			return null;
		}
	},

	render(){
		let address = this.state.address;
		let cryptoAmount = this.state.cryptoAmount;
		let cryptoSymbol = this.state.CryptoCurrencyISO;
		let cryptoName = UIService.getCurrentCryptoName();
		let extraInfo = this.state.extraInfo;
		let extraInfoName = this.state.extraInfoName;
		let amount = translate('CRYPTO_INSTRUCTIONS_AMOUNT', 'Send crypto Amount from your wallet', {cryptoAmount: cryptoAmount, cryptoCurrency: cryptoName});
		let cryptoInstructions = translate('CRYPTO_INSTRUCTIONS', 'Now send your crypto currency to us.', {cryptoCurrency: cryptoName});
		let addressInstructions = translate('CRYPTO_INSTRUCTIONS_ADDRESS', 'Send the crypto currency to the following address', {cryptoCurrency: cryptoName});
		let addressInfoInstructions = translate('CRYPTO_INSTRUCTIONS_ADDRESS_INFO', 'Please include any Miners Fee your crypto currency wallet charges.', {cryptoCurrency: cryptoName});

		let tags = {
			'cryptoName': cryptoName,
			'cryptoSymbol': cryptoSymbol
		};

		return (
			<div id="CryptoScreenAddressTicketInstructions">

				<div className="col-sm-12">
					<div className="rejected-message">
						<div className="title">{cryptoInstructions}</div>
					</div>
				</div>

				<div className="col-sm-12">
					<div className="modules">
						<div className="row">

							<div className="col-sm-5">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="title">#1</div>
											<div className="infoCol">
												<div className="subtitle">{amount}</div>
												<p><strong>{translate('IMPORTANT')}</strong>{translate('WARNING_MINER_DEPOSIT_CC', '', tags)}</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-5">
								<div className="box">
									<div className="row">
										<div className="col-sm-12">
											<div className="row">
												<div className="col-sm-12">
													<div className="title">#2</div>
													<div className="infoCol">
														<div className="subtitle">{addressInstructions}</div>
														<p>{addressInfoInstructions}</p>

														<div className="row">
															<div id="cryptoAddress" className="form-group">
																<div className="col-sm-12">
																	<input type="text" className="form-control" id="cryptoAddress" value={address} readOnly/>
																</div>
																<div className="col-sm-12 mod-center">
																	<button type='button' onClick={() => this.copyToClipboard(1)} disabled={!address} className='btn btn-green'>
																		{translate('PROCESSING_BUTTON_COPY', 'Copy')}
																	</button>
																</div>
															</div>
														</div>
													</div>

													<div className="infoCol">
														{(() => {
															if(extraInfo){
																return (
																	<div>
																		<p>{extraInfoName}</p>

																		<div className="row">
																			<div id="extraInfo" className="form-group">
																				<div className="col-sm-12">
																					<input type="text" className="form-control" id="extraInfo" value={extraInfo} readOnly/>
																				</div>
																				<div className="col-sm-12 mod-center">
																					<button type='button' onClick={() => this.copyToClipboard(2)} disabled={!extraInfo} className='btn btn-green' id='copyButtonExtraAddress'>
																						{translate('PROCESSING_BUTTON_COPY', 'Copy')}
																					</button>
																				</div>
																			</div>
																		</div>
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

							<div className="col-sm-2">
								<div id="QRCode">
									{(() => {
										if(address){
											return (
												<div className="mod-center img-responsive center-block">
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
		)
	},

	/**
	 * component is ready
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.CryptoScreenTicketPending = CryptoScreenTicketPending;