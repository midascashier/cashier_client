import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {TransactionService} from '../../../services/TransactionService'

let TransferCrypto = React.createClass({

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		let coinDirect = CashierStore.getCoinDirectData();
		let processorLimits = UIService.getBuyCryptoProcessorLimits();

		let currencyCode = coinDirect.currencyCode;

		if(currencyCode !== ''){
			TransactionService.getCryptoRate(currencyCode, 'USD');
		}

		this.state = {amount: '', cryptoAmount: '', btnActive: true, currentRate: coinDirect.rate, processorLimits: processorLimits};
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState(){
		let amount = '';
		let cryptoAmount = '';
		let coinDirect = CashierStore.getCoinDirectData();
		let processorLimits = UIService.getBuyCryptoProcessorLimits();
		let btnActive = true;

		if(this.state.amount){
			if(this.state.amount != ''){
				amount = this.state.amount;
			}
		}

		if(this.state.cryptoAmount){
			if(this.state.cryptoAmount != ''){
				cryptoAmount = this.state.cryptoAmount;
			}
		}

		if(this.state.btnActive){
			btnActive = this.state.btnActive;
		}

		return {
			amount: amount,
			cryptoAmount: cryptoAmount,
			btnActive: btnActive,
			currentRate: coinDirect.rate,
			processorLimits: processorLimits
		}
	},

	/**
	 * refresh local storage
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * get the deposit amount
	 *
	 * @param e
	 */
	changeAmountValue(e){
		let amount = e.target.value;
		let cryptoAmount = amount / this.state.currentRate;
		let processorLimits = this.state.processorLimits;
		let cryptoBalance = CashierStore.getCryptoBalance();

		cryptoAmount = cryptoAmount.toFixed(8);

		if(amount >= processorLimits.min && amount <= processorLimits.max && cryptoAmount <= cryptoBalance){
			this.setState({btnActive: false});
		}else{
			this.setState({btnActive: true});
		}

		this.setState({amount: amount, cryptoAmount: cryptoAmount});
	},

	/**
	 * process transaction and deposit with customer balance
	 */
	getCryptoAddress(){
		CashierStore.setBuyCryptoUseBalance(true);
		let processorSelected = CashierStore.getProcessor();
		let processorId = processorSelected.processorId;
		TransactionService.getCryptoAddress(processorId, this.state.amount);
	},

	/**
	 * render component
	 *
	 * @return {*}
	 */
	render(){
		let processorLimits = this.state.processorLimits;
		let min = processorLimits.min;
		let max = processorLimits.max;
		let currencyCode = processorLimits.currencyCode;

		let titleAvailable = translate('TITLE_AVAILABLE', '', {
			customerBalance: CashierStore.getCryptoBalance(),
			cryptoCurrencyCode: 'BTC'
		});

		let cryptoCurrencyName = 'bitcoin';

		return (
			<div className="col-md-12">
				<div className="crypto-fund-background">
					<div className="row fund-content">
						<div className="col-md-6 center-block text-center crypto-box-content deposit-with-available">
							<div className="crypto-m-tittle">
								<h2>{translate('TITLE_AMOUNT')}</h2>
							</div>
							<div style={{marginTop: "55px"}}>
								<div className="col-md-2">
									<img src="../../../../images/buyCrypto/icon_dolar.png" alt="icon_dolar"/>
								</div>
								<div className="col-md-10">
									<input type="number" className="crypto-input" onChange={this.changeAmountValue} value={this.state.amount}/>
								</div>
							</div>
							<div className="crypto-m-footer">
								<div className="crypto-limits-left"><strong>Min</strong><br/><strong>{min} {currencyCode}</strong></div>
								<div className="crypto-limits-right"><strong>Max</strong><br/><strong>{max} {currencyCode}</strong></div>
							</div>
						</div>
						<div className="col-md-6 center-block text-center crypto-box-content deposit-with-available">
							<div className="crypto-m-tittle">
								<h2>{translate('TITLE_AVAILABLE')}</h2>
							</div>
							<div>
								<h4>{CashierStore.getCryptoBalance()} {CashierStore.getCoinDirectData().currencyCode}</h4>
							</div>
							<div className="crypto-m-middle">
								<div className="col-md-2">
									<img src="../../../../images/buyCrypto/icon_bitcoin.png" alt="icon_bitcoin"/>
								</div>
								<div className="col-md-10">
									<input type="number" className="crypto-input" disabled value={this.state.cryptoAmount}/>
								</div>
							</div>
							<div className="crypto-m-footer">
								<input type="button" onClick={this.getCryptoAddress} className="btn btn-green" disabled={this.state.btnActive} value={translate('BTN_DEPOSIT_WITH', '', {cryptoCurrencyName: cryptoCurrencyName})}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
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
module.exports.TransferCrypto = TransferCrypto;