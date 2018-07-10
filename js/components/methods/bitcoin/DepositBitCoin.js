import React from 'react'
import {CreditCard} from '../../commonComponents/cryptos/BuyCrypto'
import {UIService} from '../../../services/UIService'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {ApplicationService} from '../../../services/ApplicationService'
import {LoadingSpinner} from '../../loading/LoadingSpinner'
import {translate} from '../../../constants/Translate'
import Cashier from '../../../constants/Cashier'
import errorMsgs from '../../../constants/limitsErrorMsgs'
import {Input} from '../../commonComponents/Inputs'
import QRCode from 'qrcode.react'

let DepositBitCoin = React.createClass({

	cronoStarted: false,

	propTypes: {
		setAmount: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	redirectOption: false,

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		CashierStore.setBuyCryptoUseBalance(false);
		ApplicationService.getCurrency("BTC");
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState(){
		let bitcoinAddress = "";
		if(this.state){
			if(this.state.info.bitcoinAddress != ""){
				bitcoinAddress = this.state.info.bitcoinAddress;
			}
		}

		let allowContinueToConfirm = false;
		if(this.state){
			if(this.state.info.allowContinueToConfirm){
				allowContinueToConfirm = true;
			}
		}

		return {
			loading: false,
			info: {
				selectedProcessor: CashierStore.getProcessor(),
				transaction: CashierStore.getTransaction(),
				bitcoinAddress: bitcoinAddress,
				allowContinueToConfirm: allowContinueToConfirm
			},
			customer: CashierStore.getCustomer(),
			imgLang: CashierStore.getLanguage()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * Set local state for bitcoin Address and if is allow to continue
	 *
	 * @param e
	 * @param state
	 */
	changeValue(e, state){
		let actualState = this.state.info;
		actualState.bitcoinAddress = e;
		actualState.allowContinueToConfirm = state;
		this.setState({
			info: actualState
		})
	},

	changeAmount(event){
		let amount = event.currentTarget.value;
		this.props.setAmount(amount);
	},

	changePromoCode(event){
		let promo = event.currentTarget.value;
		this.props.setPromoCode(promo);
	},

	/**
	 * return the processor list
	 *
	 * @returns {Array}
	 */
	getProcessors(){
		return this.state.customer.depositProcessors;
	},

	goToCryptoTransfer(){
		UIService.selectProcessor(830);
		TransactionService.startTransaction();
	},

	/**
	 * process transaction and deposit with customer balance
	 */
	getCryptoAddress(e){
		e.preventDefault();
		CashierStore.setBuyCryptoUseBalance(false);
		this.setState({loading: true});
		let processorSelected = CashierStore.getProcessor();
		let processorId = processorSelected.processorId;
		TransactionService.getCryptoAddress(processorId, this.props.amount, this.props.promoCode);
	},

	copyText(e){
		let button = e.target;
		let parent = button.parentElement;
		let element = parent.getElementsByClassName('copiedText')[0];
		let text = element.innerText;

		let clipBoard = document.createElement("input");
		clipBoard.setAttribute("value", text);
		document.body.appendChild(clipBoard);
		clipBoard.select();
		document.execCommand("copy");
		document.body.removeChild(clipBoard);

		let tooltip = button.getElementsByClassName('buy-crypto-tooltip')[0];
		tooltip.style.display = 'block';

		setTimeout(function(){
			let tooltips = document.getElementsByClassName('buy-crypto-tooltip');
			for(let i = 0; i < tooltips.length; i++){
				let tooltip = tooltips[i];
				tooltip.style.display = 'none';
			}
		}, 1500);
	},

	startCrono(){
		if(!this.cronoStarted){
			this.cronoStarted = true;
			let initialDate = new Date();
			let initialTime = initialDate.getTime() + 15 * 60000;
			let interval = setInterval(function(){
				let currentDate = new Date();
				let currentTime = currentDate.getTime();
				let date = new Date(initialTime - currentTime);
				let minutes = date.getMinutes();
				let seconds = date.getSeconds();
				let crono = document.getElementById('crono');
				crono.innerHTML = minutes + ':' + seconds;
				if(minutes == 0 && seconds == 0){
					clearInterval(interval);
				}
			}, 1000);
		}
	},

	render(){

		$('[data-toggle="tooltip"]').tooltip();

		let transaction = CashierStore.getLastTransactionResponse();
		let cryptoInfo = false;
		let rejectedTransaction = false;

		if(this.state.loading){
			return <LoadingSpinner/>
		}

		if(transaction.data && transaction.data.caTransactionStatus_Id == Cashier.TRANSACTION_STATUS_REJECTED){
			rejectedTransaction = transaction.data;
		}

		if(transaction.details && transaction.details.bitCoinTransaction){
			cryptoInfo = transaction.details.bitCoinTransaction;
			this.startCrono();
		}

		let btcAmount = this.props.btcAmount;
		let limits = UIService.getProcessorLimitMinMax();
		let customer = CashierStore.getCustomer();
		let limitsErrorMsg;
		let limitsOK = false;
		let amountFieldDisable = true;
		if(limits.minAmount && limits.maxAmount){
			amountFieldDisable = false;
		}
		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS || this.props.limitsCheck == Cashier.LOADING){
			limitsOK = true;
		}else{
			limitsErrorMsg = errorMsgs.limitsMsgs[this.props.limitsCheck];
		}

		const processors = this.getProcessors();
		const imgLang = this.state.imgLang;
		const isCryptoTransferActive = processors.find(processor => +processor.caProcessor_Id === 830);

		const redirectImgComponent = (
			<div className="col-sm-12" style={{textAlign: 'center'}}>
				<img
					style={{paddingTop: '5%', cursor: 'pointer'}}
					src={`/images/weHaveMoved/we-have-moved-${imgLang}.jpg`}
					onClick={this.goToCryptoTransfer}
				/>
			</div>
		);

		const formComponent = (
			<div className="buy-crypto-background">
				<div className="buy-crypto-content">
					<form onSubmit={this.getCryptoAddress}>
						<div className={((!rejectedTransaction) ? "col-sm-offset-4 col-sm-6" : "col-sm-6")}>
							<div className={((!rejectedTransaction) ? "buy-crypto-section" : "buy-crypto-section buy-crypto-section1")}>
								<div className="buy-crypto-form-element">
									<label className="buy-crypto-strongTitle">{translate('BUY_CRYPTOS_FUND_AMOUNT')}</label>
								</div>
								<div className="buy-crypto-form-element buy-crypto-form-number">
									<div className="row">
										<div className="col-sm-2">
											<div className="buy-crypto-icon-dollar"></div>
										</div>
										<div className="col-sm-10">
											<input
												className="form-control"
												type="number"
												autoComplete="off"
												disabled={amountFieldDisable}
												id="amount"
												name="amount"
												onChange={this.changeAmount}
												value={this.props.amount}
												min="0"
												required
											/>

											<span>{translate('PROCESSING_MIN', 'Min')}: {ApplicationService.currency_format(limits.minAmount)} {customer.currency}
												- {translate('PROCESSING_MAX', 'Max')}: {ApplicationService.currency_format(limits.maxAmount)} {customer.currency}</span><br/>
											{(() =>{
												if(!limitsOK && this.props.amount != ""){
													return (
														<div className="alert alert-danger" role="alert">
															<i className="fa fa-thumbs-o-down red"></i>
															<strong>{limitsErrorMsg}</strong>
														</div>
													)
												}
											})()}
										</div>
									</div>
								</div>

								<div className="buy-crypto-form-element buy-crypto-form-number buy-crypto-form-number2">
									<div className="row">
										<div className="col-sm-2">
											<div className="buy-crypto-icon-bitcoin"></div>
										</div>
										<div className="col-sm-10">
											<div className="buy-crypto-disabled-input"></div>
											<Input className="form-control" type="number" id="btcAmount" name="btcAmount" ref="btcAmount" validate="isNumber" onChange={this.props.setBTCAmount} value={btcAmount}/>
										</div>
									</div>
								</div>

								<div className="buy-crypto-form-element">
									<input type="text" value={this.props.promoCode} onChange={this.changePromoCode} placeholder={translate('BUY_CRYPTOS_PROMOCODE')} name="promoCode" id="promoCode" className="form-control buy-crypto-input-promo"/>
								</div>

								<div className="buy-crypto-form-element">
									<button type="submit" className="buy-crypto-btn btn btn-lg btn-green">
										{translate('BUY_CRYPTOS_BUTTON_GETADDRESS')}
									</button>
								</div>
							</div>
						</div>

						{(() =>{
							if(rejectedTransaction){
								return (
									<div className="col-sm-6">
										<div className="buy-crypto-section">
											<div className="buy-crypto-element-icon">
												<div className="fa fa-exclamation-circle fa"></div>
											</div>
											<div className="buy-crypto-form-element">
												<label className="buy-crypto-strongTitle">{translate('BUY_CRYPTOS_TRY_AGAIN')}</label>
												<div className="buy-crypto-text">{translate('BUY_CRYPTOS_ERROR_TEXT')}</div>
											</div>
											<div className="buy-crypto-form-element">
												<button type="submit" className="buy-crypto-btn btn btn-lg btn-green">
													{translate('BUY_CRYPTOS_TRY_AGAIN')}
												</button>
											</div>
										</div>
									</div>);
							}
						})()}

					</form>
				</div>
			</div>
		);

		const response = (
			<div className="buy-crypto-background">
				<div className="buy-crypto-content">
					<div className="col-sm-offset-1 col-sm-10">
						<div className="buy-crypto-section buy-crypto-section-large">
							<div>
								<div className="col-sm-3 buy-crypto-paddingtop">
									<div className="buy-crypto-qr">
										<QRCode value={cryptoInfo.Address}/>
									</div>
								</div>
								<div className="col-sm-9 buy-crypto-paddingtop">
									<div>
										<label className="buy-crypto-strongTitle">
											{translate('BUY_CRYPTOS_DEPOSIT_INFO')}
										</label>
										<div className="buy-crypto-newline">
											<span className="buy-crypto-subTitle">{translate('BUY_CRYPTOS_SEND_TO')}</span>
											<span className="buy-crypto-text-address copiedText">{cryptoInfo.Address}</span>
											<button type="button" className="buy-crypto-btn-copy" onClick={this.copyText} title={translate('BUY_CRYPTOS_BUTTON_COPY')}>
												<span className="buy-crypto-tooltip">{translate('BUY_CRYPTOS_TITLE_COPIED')}</span>
											</button>
										</div>
										<div className="buy-crypto-newline">
											<span className="buy-crypto-subTitle">{translate('BUY_CRYPTOS_AMOUNT')}</span>
											<span className="buy-crypto-subTitle copiedText">  {cryptoInfo.BitcoinAmount}</span> <span className="buy-crypto-subTitle">BTC</span>
											<button type="button" className="buy-crypto-btn-copy" onClick={this.copyText} title={translate('BUY_CRYPTOS_BUTTON_COPY')}>
												<span className="buy-crypto-tooltip">{translate('BUY_CRYPTOS_TITLE_COPIED')}</span>
											</button>
										</div>
										<div className="buy-crypto-newline">
											<div className="buy-crypto-form-element">
												<div>
													<label className="buy-crypto-strongTitle">{translate('BUY_CRYPTOS_TIME')}</label>
												</div>
												<div>
													<div className="buy-crypto-crono" id="crono">
														15:00
													</div>
													<div className="buy-crypto-hurry buy-crypto-newline" data-toggle="tooltip" title={translate('BUY_CRYPTOS_TOOLTIP_CRONO')}>
														{translate('BUY_CRYPTOS_HURRY')}
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
		);

		let showComponent = formComponent;

		if(cryptoInfo){
			showComponent = response;
		}

		return (
			<div id="bitCoin">
				{isCryptoTransferActive && this.redirectOption ? redirectImgComponent : showComponent}
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
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

module.exports.DepositBitCoin = DepositBitCoin;
