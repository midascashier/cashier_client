import React from 'react'
import { Amount } from './amount'
import { Input } from '../../Inputs'
import { CryptoCurrencies } from './CryptoCurrencies'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { translate } from '../../../constants/Translate'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'

let AskInfo = React.createClass({

	propTypes: {
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,
		cryptoAmount: React.PropTypes.node,
		customerAmount: React.PropTypes.node,

		setAmount: React.PropTypes.func,
		setLimits: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		getCurrencyRate: React.PropTypes.func,
		setCryptoAmount: React.PropTypes.func,
		setCustomerAmount: React.PropTypes.func,

		rate: React.PropTypes.number,
		limits: React.PropTypes.object
	},

	componentWillMount() {
		this.setState({
			load : false,
			currencies : false
		});

		this.getCurrencies();
		window.onclick = function (event) {
			if (event.target == document.getElementById('cryptoTransferModal')) {
				$('#cryptoTransferModal').css('display', 'none');
			}
		}
	},

	getCurrencies() {
		let url = Cashier.CRYPTO_API_URL + Cashier.CRYPTO_API_GET_COINS;
		fetch(url).then((response) => {
			return response.json()
		}).then((currencies) => {
			this.setState({
				load : true,
				currencies : currencies
			});
		}).catch(function(err) {
			console.error(err);
		});
	},

	currencyContent(currency) {
		currency = this.state.currencies[currency];
		return(
			<CryptoCurrencies
				currency={currency}
			  	rate={this.props.rate}
				limits={this.props.limits}
				setAmount={this.props.setAmount}
				setLimits={this.props.setLimits}
				setBTCAmount={this.props.setBTCAmount}
			 	getCurrencyRate={this.props.getCurrencyRate}
			/>
		)
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
						orderCurrencies.forEach(function(k, v) {
							if(v == current){
								this.splice(k, 1);
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
						{this.searchCurrency()}
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

	showCurrencies(){
		$('#cryptoTransferModal').css('display', 'flex');
	},

	hideCurrencies(){
		$('#cryptoTransferModal').css('display', 'none');
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

	render() {
		let isWithDraw = UIService.getIsWithDraw();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')
		}

		let cryptoContent = <LoadingSpinner/>;

		if(this.state.load){
			cryptoContent = (
				<div>
					<div id="cryptoTransfer-Btn" onClick={this.showCurrencies.bind(this)}>
						<span>{translate('CRYPTO_SELECT_CURRENCY')}</span>
						<div id="cryptoTransfer-Btn-content">
							<img id="imgSmall" src=""/>
							<span id="symbolName"></span>
						</div>
					</div>

					<div id="cryptoAskInform">
						<Amount
							amount={this.props.amount}
							btcAmount={this.props.btcAmount}
							cryptoAmount={this.props.cryptoAmount}
							customerAmount={this.props.customerAmount}

							setAmount={this.props.setAmount}
							setBTCAmount={this.props.setBTCAmount}
							setCryptoAmount={this.props.setCryptoAmount}
							setCustomerAmount={this.props.setCustomerAmount}
							getCurrencyRate={this.props.setCurrencyRate}

							rate={this.props.rate}
							limits={this.props.limits}
						/>

						<Input className="form-control" type="hidden" id="btcAmount" onChange={this.props.setBTCAmount} value={this.props.btcAmount}/>
						<Input className="form-control" placeholder={translate('CRYPTO_REFUND_ADDRESS')} type="text" id="cryptoAdress" name="cryptoAdress" min="0" required/>
					</div>
				</div>
			)
		}

		return (
			<div id="cryptoAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
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
	}
});

module.exports.AskInfo = AskInfo;