import React from 'react'
import {CreditCard} from './BuyCrypto'
import {UIService} from '../../../services/UIService'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {ApplicationService} from '../../../services/ApplicationService'
import {LoadingSpinner} from '../../loading/LoadingSpinner'
import {translate} from '../../../constants/Translate'
import Cashier from '../../../constants/Cashier'
import errorMsgs from '../../../constants/limitsErrorMsgs'
import {Input} from '../Inputs'
import QRCode from 'qrcode.react'

let DepositBitCoin = React.createClass({

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
		TransactionService.getCryptoAddress(processorId, this.props.amount);
	},

	render(){

		let transaction = CashierStore.getLastTransactionResponse();
		let cryptoInfo = false;

		if(this.state.loading){
			return <LoadingSpinner/>
		}

		if(transaction.details && transaction.details.bitCoinTransaction){
			cryptoInfo = transaction.details.bitCoinTransaction;
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
						<div className="col-sm-offset-2 col-sm-6">
							<div className="buy-crypto-section buy-crypto-section1">
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
									<button type="submit" className="buy-crypto-btn btn btn-lg btn-green">
										{translate('BUY_CRYPTOS_BUTTON_GETADDRESS')}
									</button>
								</div>

							</div>
						</div>
					</form>
				</div>
			</div>
		);

		const response = (
			<div>response</div>
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
