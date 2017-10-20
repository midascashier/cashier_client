import React from 'react'
import { translate } from '../../../constants/Translate'
import { Input } from '../../Inputs'
import { Amount } from './amount'
import { UIService } from '../../../services/UIService'
import API from '../../../constants/Cashier'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		setAmount: React.PropTypes.func,
		changeValue: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		bitcoinAddress: React.PropTypes.string,
		transaction: React.PropTypes.object,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	componentWillMount() {
		this.getCurrencies();
		this.setState({
			currencies : false
		});
	},

	showCurrencies(){
		document.getElementById('shapeShiftModal').style.display = 'flex';
	},

	hideCurrencies(){
		document.getElementById('shapeShiftModal').style.display = 'none';
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

	currencyContent(currency) {

		currency = this.state.currencies[currency];
		let id = currency.name.toLowerCase().replace(' ', '');

		return (
			<div class='shapeShiftCurrency' id={id}>
				<img src={currency.image} alt={currency.name}/>
				<span id={id + 'Name'} className="currentName">{currency.name}</span>
				<input type='hidden' id={id + 'Symbol'} value={currency.symbol}/>
				<input type='hidden' id={id + 'Status'} value={currency.status}/>
				<input type='hidden' id={id + 'ImgSmall'} value={currency.imageSmall}/>
			</div>
		)
	},

	buildCurrenciesContainer() {

		let currency = [];
		let currencies = this.state.currencies;

		if(currencies){
			currency = Object.keys(currencies);
			currency = currency.filter(function (current) {
				return current != 'BTC'
			});
		}

		return(
			<div id='shapeShiftModal'>
				<div id='shapeShiftModal-content'>
					<div id='shapeShiftModal-header'>
						<input id='shapeShiftModal-currencySearch' type='text' placeholder={translate('CRYPTO_SEARCH_TXT')}/>
						<span id='shapeShiftModal-close' onclick={this.hideCurrencies}>&times;</span>
					</div>

					<div id='shapeShift-currencies'>
						{currency.map(this.currencyContent)}
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

		return (
			<div id="btcAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div id="cryptoTransfer-Btn" onClick={this.showCurrencies}>{translate('CRYPTO_SELECT_CURRENCY')}</div>
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
	}
});

module.exports.AskInfo = AskInfo;