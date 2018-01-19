import React from 'react'
import {FAQ} from './FAQ'
import {Amount} from './Amount'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'

let AskInfo = React.createClass({

	propTypes: {
		rate: React.PropTypes.number,
		limits: React.PropTypes.object,
		getSymbol: React.PropTypes.func,
		setLimits: React.PropTypes.func,
		promoCode: React.PropTypes.node,
		setPromoCode: React.PropTypes.func,
		cryptoAmount: React.PropTypes.node,
		cryptoAddress: React.PropTypes.node,
		limitsCheck: React.PropTypes.string,
		conversionRate:React.PropTypes.node,
		customerAmount: React.PropTypes.node,
		getCurrencyRate: React.PropTypes.func,
		setCryptoAmount: React.PropTypes.func,
		setCryptoAddress: React.PropTypes.func,
		setAmountRateBTC: React.PropTypes.func,
		setCustomerAmount: React.PropTypes.func,
		cryptoAddressError: React.PropTypes.node,
		amountToBTCCalculate: React.PropTypes.func,
		btcToAmountCalculate: React.PropTypes.func,
		setCryptoCurrencyISO: React.PropTypes.func,
		setCryptoCurrencyName: React.PropTypes.func
	},

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState(){
		return {
			currencies : UIService.getCryptoCurrencies()
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
	 *
	 */
	componentWillMount(){
		UIService.loadCryptoCurrencies();
		window.onclick = function (event) {
			if(event.target == document.getElementById('cryptoTransferModal')){
				$('#cryptoTransferModal').css('display', 'none');
			}

			if(event.target == document.getElementById('moneroMsgModal')){
				$('#moneroMsgModal').css('display', 'none');
			}
		};
	},

	currencyActions(event){
		UIService.loadingLimits();
		let symbolSelect = event.currentTarget.id;
		let img = $('#' + symbolSelect + ' img').attr('src');
		let symbolName = $('#' + symbolSelect + 'Name').text();
		let symbolValue = $('#' + symbolSelect + 'Symbol').val();
		UIService.loadCurrencyLimits(symbolValue);

		if(symbolSelect == 'monero'){
			this.moneroActions();
		}

		this.props.setCryptoCurrencyName(symbolName);
		this.props.setCryptoCurrencyISO(symbolValue);

		//DOM update
		$('#FAQs').removeAttr('style');
		$('#imgSmall').attr('src', img);
		$('#symbolName').text(symbolName);
		$('#currencyName').val(symbolName);
		$('#symbolValue').text(symbolValue);
		$('#AskInform').removeAttr('style');
		$('#Important').removeAttr('style');
		$('#cryptoAskInform').css('display', 'block');
		$('#cryptoTransfer-Btn-content').css('display', 'block');

		$('#cryptoTransfer-Btn').css({
			'color' : '#fff',
			'border' : 'none',
			'background-color' : '#fff'
		});
		
		this.hideCurrencies();
	},

	moneroActions(){
		$('#moneroMsgModal').css({
			'display' : 'flex'
		});
	},

	hideCurrencies(){
		$('#cryptoTransferModal').css('display', 'none');
	},

	/**
	 * Generate content with important information for the current available currency
	 *
	 * @param currency
	 * @returns {XML}
     */
	currencyAvailableContent(currency) {
		let id = (currency.status == 'available') ? currency.name.toLowerCase().split(' ').join('') : '';
		return(
			<div id={id} className={'cryptoTransferCurrency'} onClick={this.currencyActions.bind(this)}>
				<img src={currency.image} alt={currency.name}/>
				<span id={id + 'Name'} className="currentName">{currency.name}</span>
				<input type='hidden' id={id + 'Symbol'} value={currency.symbol}/>
				<input type='hidden' id={id + 'Status'} value={currency.status}/>
				<input type='hidden' id={id + 'ImgSmall'} value={currency.imageSmall}/>
			</div>
		)
	},

	/**
	 * Generate content with important information for the current unavailable currency
	 *
	 * @param currency
	 * @returns {XML}
	 */
	currencyUnavailableContent(currency) {
		let id = (currency.status == 'available') ? currency.name.toLowerCase().split(' ').join('') : '';
		return(
			<div id={id} className={'cryptoTransferCurrency unavailableCurrency'} onClick={this.currencyActions.bind(this)}>
				<img src={currency.image} alt={currency.name}/>
				<span className="unavailableName">{translate('CRYPTO_UNAVAILABLE_TXT', 'Temporarily disabled')}</span>
				<span id={id + 'Name'} className="currentName">{currency.name}</span>
				<input type='hidden' id={id + 'Symbol'} value={currency.symbol}/>
				<input type='hidden' id={id + 'Status'} value={currency.status}/>
				<input type='hidden' id={id + 'ImgSmall'} value={currency.imageSmall}/>
			</div>
		)
	},

	/**
	 * Build currencies container with all currencies available to crypto transfer
	 *
	 * @returns {XML}
     */
	buildCurrenciesContainer(){
		if(this.state.currencies){
			let availableCurrencies = this.state.currencies.available;
			let unavailableCurrencies = this.state.currencies.unavailable;

			return(
				<div id='cryptoTransferModal'>
					<div id='cryptoTransferModal-content'>
						<div id='cryptoTransferModal-header'>
							<input id='cryptoTransferModal-currencySearch' type='text' placeholder={translate('CRYPTO_SEARCH_TXT', 'Search currency name')} onInput={this.searchCurrency.bind(this)}/>
							<span id='cryptoTransferModal-close' onClick={this.hideCurrencies.bind(this)}>&times;</span>
						</div>

						<div id='cryptoTransfer-currencies'>
							{availableCurrencies.map(this.currencyAvailableContent)}
							{unavailableCurrencies.map(this.currencyUnavailableContent)}
						</div>
					</div>
				</div>
			)
		}

		return <span/>
	},

	/**
	 * Find any currency with a name similar to the entry search
	 *
	 * @param event
     */
	searchCurrency(event) {
		let txtSearch = event.target.value.toLowerCase();
		if(txtSearch == '') {
			$('.cryptoTransferCurrency').show();
		}else{
			$('.cryptoTransferCurrency').show().not('[id ^= "' + txtSearch + '"]').hide().filter('[id = "' + txtSearch + '"]').show();
		}
	},

	/**
	 * Change crypto address value
	 *
	 * @param event
     */
	changeCryptoAddress(event){
		let cryptoAddress = event.target.value;
		this.props.setCryptoAddress(cryptoAddress);
	},

	/**
	 * Chance value to promo code input
	 *
	 * @param event
     */
	changePromoCode(event){
		let promoCode = event.target.value;
		this.props.setPromoCode(promoCode);
	},

	showCurrencies(){
		$('#cryptoTransferModal').css('display', 'flex');
	},

	hideCurrencies(){
		$('#cryptoTransferModal').css('display', 'none');
	},

	hideMoneroMSG(){
		$('#moneroMsgModal').css('display', 'none');
	},

	render(){
		let isWithDraw = UIService.getIsWithDraw();
		let promoCodeTXT = translate('TRANSACTION_PROMO_CODE', 'Promo code');
		let helpMSG = (isWithDraw) ? translate('CRYPTO_DEPOSIT_HELP', 'Enter the e-wallet address to deposit this transaction.')
			: translate('CRYPTO_REFUND_HELP');
		let addressMSG = (isWithDraw) ? translate('CRYPTO_DEPOSIT_ADDRESS', 'Address') : translate('CRYPTO_REFUND_ADDRESS', 'Refund address');
		let moneroMSG = translate('CRYPTO_MONERO_MESSAGE', 'If you enter a Monero refund address, DO NOT use an address from an exchange or shared wallet that requires a payment ID. Only use a refund address from a wallet you control, which doesn\'t require a payment ID.');
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please enter the Information');

		if(isWithDraw){
			title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please enter the Information')
		}

		let cryptoContent = <LoadingSpinner/>;

		if(this.state.currencies){
			cryptoContent = (
				<div>
					<div id="cryptoTransfer-Btn" onClick={this.showCurrencies.bind(this)}>
						<span>{translate('CRYPTO_SELECT_CURRENCY', 'Select your crypto currency')}</span>
						<div id="cryptoTransfer-Btn-content">
							<img id="imgSmall" src=""/>
							<span id="symbolName"></span>
							<span id="symbolValue"></span>
						</div>
					</div>

					<p id="refundErrorMsg">{helpMSG}</p>

					{(() =>{
						$('#helpAddress').mouseenter(function () {
							$('#refundErrorMsg').css({
								'display': 'block'
							})
						}).mouseleave(function () {
							$('#refundErrorMsg').css({
								'display': 'none'
							})
						});
					})()}

					<div id="cryptoAskInform">
						<Amount
							rate={this.props.rate}
							limits={this.props.limits}
							getSymbol={this.props.getSymbol}
							limitsCheck={this.props.limitsCheck}
							cryptoAmount={this.props.cryptoAmount}
							setLimits={this.props.setCurrencyLimits}
							conversionRate={this.props.conversionRate}
							customerAmount={this.props.customerAmount}
							setCryptoAmount={this.props.setCryptoAmount}
							getCurrencyRate={this.props.getCurrencyRate}
							setAmountRateBTC={this.props.setAmountRateBTC}
							setCustomerAmount={this.props.setCustomerAmount}
						/>

						{(() =>{
							if(this.props.cryptoAddressError){
								return (
									<div className="alert alert-danger" role="alert">
										<strong>{translate('CRYPTO_REFUND_ERROR_MSG', 'Invalid refund address format')}</strong>
									</div>
								)
							}
						})()}

						{(() =>{
							let symbol = this.props.getSymbol();
							let needAddress = UIService.refundAddressRequired(symbol);
							if(needAddress){
								return(
									<div id="cryptoAddressContainer">
										<input
											type="text"
											id="cryptoAddress"
											name="cryptoAddress"
											className="form-control"
											value={this.props.cryptoAddress}
											onInput={this.changeCryptoAddress.bind(this)}
											placeholder={addressMSG}
											min="0"
											required
										/>
										<span id="helpAddress">?</span>
									</div>
								)	
							}
						})()}

						{(() =>{
							if(!isWithDraw){
								return (
									<div>
										<input type="text" className="form-control" placeholder={promoCodeTXT} onInput={this.changePromoCode} value={this.props.promoCode}/>
										<FAQ/>
									</div>
								);
							}
						})()}
					</div>

					<div id='moneroMsgModal'>
						<div id='moneroMsgModal-content'>
							<div id='moneroMsgModal-header'>
								<span id='moneroMsgModal-close' onClick={this.hideMoneroMSG.bind(this)}>&times;</span>
							</div>
							<p>{moneroMSG}</p>
						</div>
					</div>
				</div>
			)
		}

		return(
			<div id="cryptoAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="cryptoScroll">
							<div className="row">
								<div className="col-sm-12">
									{cryptoContent}
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.buildCurrenciesContainer()}
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

module.exports.AskInfo = AskInfo;