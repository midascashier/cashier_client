/**
 * Created by armandoc on 6/22/2018.
 */
import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {CustomerService} from '../../../services/CustomerService'
import {CreditCardRegister} from './CreditCardRegister'
import {ApplicationService} from '../../../services/ApplicationService'
import {TransactionService} from '../../../services/TransactionService'
import {Input} from '../../commonComponents/Inputs'
import {translate} from '../../../constants/Translate'
import {LoadingSpinner} from '../../loading/LoadingSpinner'

let CreditCard = React.createClass({

	getInitialState(){

		this.setState({cards: null});

		CustomerService.getCustomerPayAccounts();

		let coinDirect = CashierStore.getCoinDirectData();

		let currencyCode = coinDirect.currencyCode;

		if(currencyCode !== ''){
			TransactionService.getCryptoRate(currencyCode, 'USD');
		}

		coinDirect.message = '';
		this.setState({coinDirectData: coinDirect});

		return this.parameters();
	},

	parameters(){

		let registerCC = false;
		let payAccountId = 0;
		let amount = '';

		if(this.state !== null){
			registerCC = this.state.showRegisterCC;
			payAccountId = this.state.buyCryptos.payAccountId;
			amount = this.state.buyCryptos.amount;
		}

		return {
			loading: false,
			cards: CashierStore.getCustomerPayAccounts(),
			buyCryptos: {
				payAccountId: payAccountId,
				amount: amount,
				cryptoCurrencyCode: this.props.cryptoCurrency
			},
			coinDirectData: CashierStore.getCoinDirectData(),
			showRegisterCC: registerCC
		}
	},

	validCC(event){
		let value = parseInt(event.target.value);
		this.state.buyCryptos.payAccountId = value;
		let status = (value == 0);
		this.setState({showRegisterCC: status});
	},

	returnFromRegisterNewCC(){
		this.getInitialState();
		this.setState({showRegisterCC: false});
	},

	_onChange(){
		this.setState(this.parameters);
	},

	rate(value){
		let ratedAmount = "" + (value / this.state.coinDirectData.rate);
		let str = ratedAmount.substr(0, 7);
		$("#ratedAmount").val(str);
	},

	buyCryptos(e){

		if(!ApplicationService.emptyInput(e)){

			let buyCryptosInfo = {
				payAccountId: e.target.querySelector('[name="payAccountId"]').value,
				amount: e.target.querySelector('[name="amount"]').value,
				cryptoCurrencyCode: this.state.coinDirectData.currencyCode
			};

			let min = this.state.coinDirectData.buyLimits.minAmount;
			let max = this.state.coinDirectData.buyLimits.maxAmount;

			this.setState({buyCryptos: buyCryptosInfo});

			if(min <= buyCryptosInfo.amount && buyCryptosInfo.amount <= max){
				this.setState({loading: true});
				TransactionService.buyCryptos(buyCryptosInfo);
			}
		}
	},

	render() {

		let currentAmount = parseInt(this.state.buyCryptos.amount) || 0;
		let minAmount = parseInt(this.state.coinDirectData.buyLimits.minAmount);
		let maxAmount = parseInt(this.state.coinDirectData.buyLimits.maxAmount);

		let options = [];

		let selectedCardNumber = '';

		let cards = this.state.cards;

		if(typeof cards == 'undefined' || !cards || this.state.loading){
			return <LoadingSpinner/>
		}

		if(0 < cards.length){

			let selected = false;

			for(let i in cards){

				let card = cards[i];
				let cardNumber = 'VI-' + card.Last4;
				let payAccountId = card.caPayAccount_Id;

				if(payAccountId == this.state.buyCryptos.payAccountId){
					options.push(<option selected="selected" key={payAccountId} value={payAccountId}>{cardNumber}</option>);
					selectedCardNumber = card.Last4;
				}else if(!selected){
					options.push(<option selected="selected" key={payAccountId} value={payAccountId}>{cardNumber}</option>);
					selectedCardNumber = card.Last4;
					selected = true;
				}else{
					options.push(<option key={payAccountId} value={payAccountId}>{cardNumber}</option>);
				}
			}
			options.push(<option key={"0"} value={"0"}>{"Add new cc"}</option>);
		}

		const componentDeposit = (
			<div className="buy-crypto-background">
				<div className="buy-crypto-content">

					<div className="buy-crypto-messages">
						<div className="alert">
							{translate('BUY_CRYPTOS_CURRENT_BALANCE')} : ({this.state.coinDirectData.currencyCode}) {this.state.coinDirectData.customerBalance}
						</div>
					</div>

					<form onSubmit={this.buyCryptos}>
						<div className="col-sm-6">
							<div className="buy-crypto-section buy-crypto-section1">
								<div className="buy-crypto-form-element buy-crypto-select-payAccount">
									<label>{translate('BUY_CRYPTOS_SELECTCC')}</label>
									<select
										onChange={this.validCC}
										name="payAccountId"
										id="payAccountId"
										data-isRequired
										className="buy-crypto-select">
										{options}
									</select>
								</div>

								<div className="buy-crypto-form-element buy-crypto-card">
									<span className="buy-crypto-card-number">XXXX XXXX XXXX {selectedCardNumber}</span>
								</div>

							</div>
						</div>
						<div className="col-sm-6">
							<div className="buy-crypto-section">
								<div className="buy-crypto-form-element">
									<label>{translate('BUY_CRYPTOS_LEYEND')}</label>
								</div>
								<div className="buy-crypto-form-element buy-crypto-form-number">
									<div className="row">
										<div className="col-sm-2">
											<div className="buy-crypto-icon-dollar"></div>
										</div>
										<div className="col-sm-10">
											<Input
												type="number"
												id="amount"
												name="amount"
												validate="isNumber"
												onChange={this.rate}
												require
												tabindex="2"
											/>
											<span className="buy-crypto-min">
												<div className={((minAmount > currentAmount && currentAmount > 0) ? "red" : "")}>
												Min:${this.state.coinDirectData.buyLimits.minAmount}
												</div>
											</span>
											<span className="buy-crypto-max">
												<div className={((currentAmount > maxAmount) ? "red" : "")}>
												Max:${this.state.coinDirectData.buyLimits.minAmount}
												</div>
											</span>
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
											<input type="text" value="" disabled="disabled" id="ratedAmount"/>
										</div>
									</div>
								</div>

								<div className="buy-crypto-form-element">
									<button type="submit" className="buy-crypto-btn btn btn-lg btn-success">
										{translate('BUY_CRYPTOS_BUTTON_BUY')}
									</button>
								</div>

							</div>
						</div>
					</form>
				</div>
			</div>
		);

		const componentRegisterCC = (
			<CreditCardRegister returnFromRegisterNewCC={this.returnFromRegisterNewCC}/>
		);

		return (!this.state.showRegisterCC && options.length > 0 ? componentDeposit : componentRegisterCC);
	},

	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	}

});

module.exports.CreditCard = CreditCard;