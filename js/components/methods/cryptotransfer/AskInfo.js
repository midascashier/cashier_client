import React from 'react'
import { translate } from '../../../constants/Translate'
import { Input } from '../../Inputs'
import { Amount } from './amount'
import { UIService } from '../../../services/UIService'
import API from '../../../constants/Cashier'

let AskInfo = React.createClass({

	propTypes: {
		rate: React.PropTypes.number,
		limitsCheck: React.PropTypes.string
	},

	componentWillMount() {
		this.setState({
			currencies : false
		});

		this.getCurrencies();
	},

	getCurrencies() {
		let url = API.CRYPTO_API_URL + API.CRYPTO_API_GET_COINS;
		fetch(url).then((response) => {
			return response.json()
		}).then((currencies) => {
			this.setState({currencies : currencies});
		}).catch(function(err) {
			console.error(err);
		});
	},

	initialMethods() {
		this.hideCurrencies();
		this.searchCurrency();
		this.selectedCurrency(this);
	},

	currencyContent(currency) {
		currency = this.state.currencies[currency];
		let id = currency.name.toLowerCase().replace(' ', '');
		let unavailable = (currency.status != 'available') ? ' unavailableCurrency' : '';

		return (
			<div id={id} className={'cryptoTransferCurrency' + unavailable}>
				<img src={currency.image} alt={currency.name}/>
				<span id={id + 'Name'} className="currentName">{currency.name}</span>
				<input type='hidden' id={id + 'Symbol'} value={currency.symbol}/>
				<input type='hidden' id={id + 'Status'} value={currency.status}/>
				<input type='hidden' id={id + 'ImgSmall'} value={currency.imageSmall}/>
			</div>
		);
	},

	buildCurrenciesContainer() {

		let currency = [];
		let orderCurrencies = [];
		let availableCurrencies = [];
		let unavailableCurrencies = [];
		let currencies = this.state.currencies;

		orderCurrencies[0] = 'BCH';
		orderCurrencies[1] = 'ETH';
		orderCurrencies[2] = 'LTC';
		orderCurrencies[3] = 'XMR';
		orderCurrencies[4] = 'DASH';

		if(currencies){
			currency = Object.keys(currencies);
			availableCurrencies = currency.filter(function (current) {
				return (current != 'BTC' && currencies[current].status == 'available');
			});

			unavailableCurrencies = currency.filter(function (current) {
				if(current != 'BTC' && currencies[current].status != 'available'){
					if(orderCurrencies.includes(current)){
						$.forEach(orderCurrencies, function(k, v) {
							if(v == current){
								orderCurrencies.splice(k, 1);
							}
						});
					}

					return true;
				}

				return false;
			});

			availableCurrencies.forEach(function (current, k) {
				orderCurrencies.forEach(function (v) {
					if(current == v){
						availableCurrencies.splice(k, 1);
					}
				});
			});

			availableCurrencies = orderCurrencies.concat(availableCurrencies);
		}

		return(
			<div id='cryptoTransferModal'>
				<div id='cryptoTransferModal-content'>
					<div id='cryptoTransferModal-header'>
						<input id='cryptoTransferModal-currencySearch' type='text' placeholder={translate('CRYPTO_SEARCH_TXT')}/>
						<span id='cryptoTransferModal-close' onClick={this.hideCurrencies.bind(this)}>&times;</span>
					</div>

					<div id='cryptoTransfer-currencies'>
						{availableCurrencies.map(this.currencyContent)}
						{unavailableCurrencies.map(this.currencyContent)}
					</div>
				</div>
			</div>
		)
	},

	render() {

		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let btcAmount = this.props.btcAmount;
		let limitsCheck = this.props.limitsCheck;

		let isWithDraw = UIService.getIsWithDraw();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')
		}

		this.initialMethods();

		return (
			<div id="btcAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div id="cryptoTransfer-Btn" onClick={this.showCurrencies.bind(this)}>
										<span>{translate('CRYPTO_SELECT_CURRENCY')}</span>
										<div id="cryptoTransfer-Btn-content">
											<img id="imgSmall" src=""/>
											<span id="symbolName"></span>
										</div>
									</div>

									<div id="cryptoAskInform">
										<Amount setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										<Input className="form-control" placeholder={translate('CRYPTO_AMOUNT_TXT')} type="number" id="btcAmount" name="btcAmount" ref="btcAmount" validate="isNumber" onChange={this.props.setBTCAmount} value={btcAmount}/>
										<Input className="form-control" placeholder={translate('CRYPTO_REFUND_ADDRESS')} type="text" id="btcAmount" name="btcAmount" ref="btcAmount" onChange={this.props.setBTCAmount} value={btcAmount}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.buildCurrenciesContainer()}
			</div>
		)
	},

	showCurrencies(){
		$('#cryptoTransferModal').css('display', 'flex');
	},

	hideCurrencies(){
		$('#cryptoTransferModal').css('display', 'none');

		window.onclick = function (event) {
			if (event.target == document.getElementById('cryptoTransferModal')) {
				$('#cryptoTransferModal').css('display', 'none');
			}
		}
	},

	searchCurrency() {
		$('#cryptoTransferModal-currencySearch').on('input', function () {
			let txtSearch = $(this).val().toLowerCase();
			if(txtSearch == '') {
				$('.cryptoTransferCurrency').show();
			}else{
				$('.cryptoTransferCurrency').show().not('[id ^= "' + txtSearch + '"]').hide().filter('[id = "' + txtSearch + '"]').show();
			}
		});
	},

	selectedCurrency(self) {
		$('.cryptoTransferCurrency').click(function () {
			let symbolSelect = $(this).attr('id');
			self.currencyActions(symbolSelect);
		});
	},

	currencyActions(symbolSelect) {
		let img = $('#' + symbolSelect + ' img').attr('src');
		let symbolName = $('#' + symbolSelect + 'Name').text();
		let symbolValue = $('#' + symbolSelect + 'Symbol').val();
		this.getCurrencyRate(symbolValue);

		//DOM update
		$('#FAQs').removeAttr('style');
		$('#imgSmall').attr('src', img);
		$('#symbolName').text(symbolName);
		$('#currencyName').val(symbolName);
		$('#AskInform').removeAttr('style');
		$('#Important').removeAttr('style');
		$('#currencySymbol').val(symbolValue);
		$('#AuthComponent').removeAttr('style');
		$('#cryptoAskInform').css('display', 'block');
		$('#cryptoTransfer-Btn-content').css('display', 'block');

		$('#cryptoTransfer-Btn').css({
			'color' : '#fff',
			'border' : 'none',
			'background-color' : '#fff'
		});

		this.hideCurrencies();
	},

	getCurrencyRate(symbolValue) {
		let url = API.CRYPTO_API_URL + API.CRYPTO_API_GET_RATE + symbolValue + '_BTC';
		fetch(url, { method: 'GET'}).then((response) => {
			return response.json();
		}).then((rate) => {
			this.props.rate = rate.rate;
		}).catch((error) => {

		});
	},

	calculateLimits() {
		var spinCoin = "<div class='lds-circle'><div></div></div>";
		$('#trans_limits p').html(spinCoin);
	}
});

module.exports.AskInfo = AskInfo;