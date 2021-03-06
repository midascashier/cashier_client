import React from 'react'
import Cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {ApplicationService} from '../../../services/ApplicationService'

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

		let limitMin = null;
		let limitMax = null;
		let limits = UIService.getProcessorLimitMinMax();
		let caLimitMin = limits.minAmount;
		let caLimitMax = limits.maxAmount;
		let url = Cashier.CRYPTO_API_URL + Cashier.CRYPTO_API_GET_MARKET + symbolValue + '_BTC';

		this.hideCurrencies();

		fetch(url, {method: 'GET'}).then((response) => {
			return response.json();
		}).then((market) => {

			if(market.rate){
				limitMin = market.rate * market.minimum;
				limitMax = market.rate * market.maxLimit;

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

				let limits = {
					minAmount: finalMin,
					maxAmount: finalMax,
					currencyCode: currency
				};

				this.props.setLimits(limits);
				$('#cryptoLimits').html(limitsCont);
			}

		}).catch((err) => {

			let finalMin = caLimitMin;
			let finalMax = caLimitMax;

			let currency = this.props.limits.currencyCode;
			let maxLimitCont = translate('PROCESSING_MIN', 'Min') + ApplicationService.currency_format(finalMin) + ' ' + currency + ' - ';
			let minLimitCont = translate('PROCESSING_MAX', 'Max') + ApplicationService.currency_format(finalMax) + ' ' + currency;
			let limitContent = maxLimitCont + ' ' + minLimitCont;
			let limitsCont = "<span>" + limitContent + "</span>";

			let limits = {
				minAmount: finalMin,
				maxAmount: finalMax,
				currencyCode: currency
			};

			this.props.setLimits(limits);
			$('#cryptoLimits').html(limitsCont);
			console.error(err);
		});
	},

	moneroActions(){
		$('#moneroMsgModal').css({
			'display': 'flex'
		});
	},

	hideCurrencies(){
		$('#cryptoTransferModal').css('display', 'none');
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