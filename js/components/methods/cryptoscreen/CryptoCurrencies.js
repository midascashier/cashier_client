import React from 'react'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {ApplicationService} from '../../../services/ApplicationService'
import {CashierStore} from '../../../stores/CashierStore'

let CryptoCurrencies = React.createClass({

	propTypes: {
		rate: React.PropTypes.number,
		limits: React.PropTypes.object,
		setLimits: React.PropTypes.func,
		currency: React.PropTypes.string,
		getCurrencyRate: React.PropTypes.func,
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
	 *
	 * @returns {{currencyLimits: {currencyMin: number, currencyMax: number, currencyCode: string}|_processor.limitCurrency|{currency}|limitCurrency|*}}
	 */
	refreshLocalState(){
		let processor = CashierStore.getProcessor();
		let limitCurrency = processor.limitCurrency;
		let currentCurrency = '';
		return {
			currencyLimits: limitCurrency,
			currentCurrency: currentCurrency
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

	hideCurrencies(){
		$('#cryptoTransferModal').css('display', 'none');
	},

	renderLimits(){
		let symbolSelect = this.state.currentCurrency;
		let currency = this.props.currency;

		if(this.state.currencyLimits && this.state.currencyLimits[currency.symbol]){
			clearInterval(this.intervalLimits);
			currency = this.props.currency;

			let spinCoin = "<div class='lds-circle'></div>";
			$('#cryptoLimits span').html(spinCoin);

			let img = $('#' + symbolSelect + ' img').attr('src');
			let symbolName = $('#' + symbolSelect + 'Name').text();
			let symbolValue = $('#' + symbolSelect + 'Symbol').val();

			if(symbolSelect == 'monero'){
				this.moneroActions();
			}

			//DOM update
			$('#FAQs').removeAttr('style');
			$('#imgSmall').attr('src', img);
			$('#symbolName').text(symbolName);
			$('#currencyName').val(symbolName);
			$('#symbolValue').text(symbolValue);
			$('#AskInform').removeAttr('style');
			$('#Important').removeAttr('style');
			$('#AuthComponent').removeAttr('style');
			$('#cryptoAskInform').css('display', 'block');
			$('#cryptoTransfer-Btn-content').css('display', 'block');

			$('#cryptoTransfer-Btn').css({
				'color': '#fff',
				'border': 'none',
				'background-color': '#fff'
			});

			let round = 5;
			let finalMin = null;
			let finalMax = null;
			let isCusMin = false;
			let isCusMax = false;

			let currencyLimits = this.state.currencyLimits[currency.symbol];
			let limitMin = 0;
			let limitMax = 0;
			let caLimitMin = currencyLimits.currencyMin;
			let caLimitMax = currencyLimits.currencyMax;

			limitMin = currencyLimits.rate * caLimitMin;
			limitMax = currencyLimits.rate * caLimitMax;

			let caLimitMinBTC = this.props.amountToBTCCalculate(caLimitMin);

			let min = null;
			if(caLimitMinBTC > limitMin){
				min = caLimitMinBTC;
				isCusMin = true;
			}else{
				min = limitMin;
				isCusMin = false;
			}

			min = parseFloat(min).toPrecision(3);
			let minAmount = this.props.btcToAmountCalculate(min);
			let final = parseInt(minAmount) + round;
			finalMin = (isCusMin) ? caLimitMin : final;

			//Max Limits
			let caLimitMaxBTC = this.props.amountToBTCCalculate(caLimitMax);

			let max = null;
			if(caLimitMaxBTC > limitMax){
				max = limitMax;
				isCusMax = false;
			}else{
				max = caLimitMaxBTC;
				isCusMax = true;
			}

			max = parseFloat(max).toPrecision(3);
			let maxAmount = this.props.btcToAmountCalculate(max);
			final = parseInt(maxAmount) + round;
			finalMax = (isCusMax) ? caLimitMax : final;

			if((!finalMin || finalMin == typeof "undefined") || (!finalMax || finalMax == typeof "undefined") || finalMax < finalMin){
				finalMin = caLimitMin;
				finalMax = caLimitMax;
			}

			let currency = this.props.limits.currencyCode;
			let maxLimitCont = translate('PROCESSING_MIN', 'Min') + ApplicationService.currency_format(finalMin) + ' ' + currency + ' - ';
			let minLimitCont = translate('PROCESSING_MAX', 'Max') + ApplicationService.currency_format(finalMax) + ' ' + currency;
			let limitContent = maxLimitCont + ' ' + minLimitCont;
			let limitsCont = "<span>" + limitContent + "</span>";

			this.props.setLimits({
				minAmount: finalMin,
				maxAmount: finalMax,
				currencyCode: currency
			});
			$('#cryptoLimits').html(limitsCont);
		}
	},

	/**
	 * @param event
	 */
	currencyActions(event){

		let spinCoin = "<div class='lds-circle'></div>";
		$('#cryptoLimits span').html(spinCoin);

		let symbolSelect = event.currentTarget.id;
		let img = $('#' + symbolSelect + ' img').attr('src');
		let symbolName = $('#' + symbolSelect + 'Name').text();
		let symbolValue = $('#' + symbolSelect + 'Symbol').val();

		if(symbolSelect == 'monero'){
			this.moneroActions();
		}

		this.props.setCryptoCurrencyName(symbolName);
		this.props.setCryptoCurrencyISO(symbolValue);
		this.props.getCurrencyRate(symbolValue);

		this.setState({
			currentCurrency: symbolSelect
		});

		this.hideCurrencies();
		this.intervalLimits = setInterval(
			this.renderLimits,
			1000);
	},

	moneroActions(){
		$('#moneroMsgModal').css({
			'display': 'flex'
		});
	},

	render(){
		let currency = this.props.currency;
		let id = (currency.status == 'available') ? currency.name.toLowerCase().split(' ').join('') : '';
		let unavailable = (currency.status != 'available') ? ' unavailableCurrency' : '';
		let unavailableTXT = (currency.status != 'available') ? <span className="unavailableName">{translate('CRYPTO_UNAVAILABLE_TXT', 'Temporarily disabled')}</span> : '';

		return (
			<div id={id} className={'cryptoTransferCurrency' + unavailable} onClick={this.currencyActions.bind(this)}>
				<img src={currency.image} alt={currency.name}/>
				{unavailableTXT}
				<span id={id + 'Name'} className="currentName">{currency.name}</span>
				<input type='hidden' id={id + 'Symbol'} value={currency.symbol}/>
				<input type='hidden' id={id + 'Status'} value={currency.status}/>
				<input type='hidden' id={id + 'ImgSmall'} value={currency.imageSmall}/>
			</div>
		);
	}
});

module.exports.CryptoCurrencies = CryptoCurrencies;