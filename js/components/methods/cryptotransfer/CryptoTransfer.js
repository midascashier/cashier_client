import React from 'react'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import Cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {ApplicationService} from '../../../services/ApplicationService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'

let CryptoTransfer = React.createClass({

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		ApplicationService.getCurrency("BTC");
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState(){
		return {
			info : {
				promoCode: '',
				limitsCheck : '',
				cryptoAmount : '',
				cryptoAddress : '',
				amountRateBTC : '',
				customerAmount : '',
				cryptoAddressError : false,
				rate : UIService.getCurrentCryptoRate(),
				limits : UIService.getProcessorLimitMinMax(),
				cryptoCurrencyName : UIService.getCurrentCryptoName(),
				cryptoCurrencyISO : UIService.getCurrentCryptoSymbol()
			}
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

	getSymbol(){
		let symbol = this.state.info;
		return symbol.cryptoCurrencyISO;
	},

	/**
	 * Check mix and Max limits
	 *
	 * @returns {*}
     */
	limitCheckStatus(){
		let limitsInfo = this.state.info.limits;
		let amount = this.state.info.customerAmount;

		if(isNaN(amount)){
			return Cashier.LOADING;
		}

		let min = parseFloat(limitsInfo.minAmount);
		let max = parseFloat(limitsInfo.maxAmount);

		if(!min && !max){
			let limits = UIService.getProcessorLimitMinMax();
			min = limits.minAmount;
			max = limits.maxAmount;
		}

		if(amount < min){
			return Cashier.M_BELOW_MIN;
		}

		if(amount > max){
			return Cashier.M_ABOVE_MAX;
		}

		return Cashier.LIMIT_NO_ERRORS;
	},

	/**
	 * set limits status local state
	 */
	checkLimits(){
		let actualState = this.state.info;
		actualState.limitsCheck = this.limitCheckStatus();
		this.setState({info: actualState});
	},

	/**
	 * Check is crypto address is valid
	 */
	checkCryptoAddress(callback){
		var symbol = document.getElementById('symbolValue');
		var address = this.state.info.cryptoAddress;

		let url = Cashier.CRYPTO_API_URL + Cashier.CRYPTO_API_VALIDATE_ADDRESS + address + '/' + symbol.innerHTML;
		fetch(url, {method: 'GET'}).then((response) => {
			return response.json();
		}).then((isValid) => {
			callback(isValid.isvalid);
		}).catch((err) => {
			console.error(err);
		});
	},

	/**
	 * Set crypto amount
	 *
	 * @param cryptoAmount
	 * @param customerAmount
     */
	setCryptoAmount(cryptoAmount, customerAmount){
		let actualState = this.state.info;
		actualState.customerAmount = customerAmount;
		actualState.cryptoAmount = parseFloat(cryptoAmount).toFixed(8);
		this.setState({info: actualState}, function afterAmountChange(){
			this.checkLimits();
		});
	},

	/**
	 * Set customer Amount
	 * 
	 * @param amount
	 * @param cryptoAmount
     */
	setCustomerAmount(amount, cryptoAmount){
		let actualState = this.state.info;
		actualState.cryptoAmount = cryptoAmount;
		actualState.customerAmount = parseFloat((btcAmount / CashierStore.getBTCRate())).toFixed(5);
		this.setState({info: actualState}, function afterAmountChange(){
			this.checkLimits();
		});
	},

	/**
	 * Set rate to current currency
	 *
	 * @param rate
     */
	setCurrencyRate(rate){
		let actualState = this.state.info;
		actualState.rate = rate ;
		this.setState({info: actualState});
	},

	/**
	 * Set crypto address
	 *
	 * @param cryptoAddress
     */
	setCryptoAddress(cryptoAddress){
		let actualState = this.state.info;
		actualState.cryptoAddress = cryptoAddress ;
		this.setState({info: actualState}, function afterAmountChange(){
			this.setCryptoAddressError(false);
		});
	},

	/**
	 * Set true in state if exist error in crypto address
	 */
	setCryptoAddressError(cryptoAddressError){
		let actualState = this.state.info;
		actualState.cryptoAddressError = cryptoAddressError ;
		this.setState({info: actualState});
	},

	/**
	 * Set amount rate BTC
	 */
	setAmountRateBTC(rateBTC){
		let actualState = this.state.info;
		actualState.amountRateBTC = rateBTC ;
		this.setState({info: actualState});
	},

	/**
	 * Set crypto currency ISO
	 */
	setCryptoCurrencyISO(currencyISO){
		let actualState = this.state.info;
		actualState.cryptoCurrencyISO = currencyISO;
		UIService.setCurrentCryptoSymbol(currencyISO);
		this.setState({info: actualState});
	},

	/**
	 * Set crypto currency name
	 */
	setCryptoCurrencyName(currencyName){
		let actualState = this.state.info;
		actualState.cryptoCurrencyName = currencyName;
		UIService.setCurrentCryptoSymbol(currencyName);
		this.setState({info: actualState});
	},

	/**
	 * Set transaction transaction promoCode in the store
	 *
	 * @param promoCode
     */
	setPromoCode(promoCode){
		TransactionService.setPromoCode(promoCode);
		let actualState = this.state.info;
		actualState.promoCode = promoCode ;
		this.setState({info: actualState});
	},

	/**
	 * Calculate btc amount from crypto amount
	 *
	 * @param amount
	 * @returns {number}
	 */
	amountToBTCCalculate(amount){
		return amount * parseFloat(CashierStore.getBTCRate()).toFixed(8);
	},

	/**
	 * Calculate amount from crypto amount
	 *
	 * @param cryptoAmount
	 * @returns {number}
	 */
	btcToAmountCalculate(cryptoAmount){
		return cryptoAmount / parseFloat(CashierStore.getBTCRate()).toFixed(8);
	},

	render(){
		return (
			<div id="crypto">
				<div className="col-sm-6">
					{(() =>{
						let processor = CashierStore.getProcessor();
						if(!processor.processorId){
							return <LoadingSpinner/>;
						}

						return(
							<AskInfo
								getSymbol={this.getSymbol}
								rate={this.state.info.rate}
								limits={this.state.info.limits}
								setPromoCode={this.setPromoCode}
								loadingLimits={this.loadingLimits}
								setLimits={this.setCurrencyLimits}
								promoCode={this.state.info.promoCode}
								setCryptoAmount={this.setCryptoAmount}
								getCurrencyRate={this.getCurrencyRate}
								loadLimits={this.state.info.loadLimits}
								setCryptoAddress={this.setCryptoAddress}
								setAmountRateBTC={this.setAmountRateBTC}
								limitsCheck={this.state.info.limitsCheck}
								setCustomerAmount={this.setCustomerAmount}
								cryptoAmount={this.state.info.cryptoAmount}
								cryptoAddress={this.state.info.cryptoAddress}
								customerAmount={this.state.info.customerAmount}
								conversionRate={this.state.info.conversionRate}
								amountToBTCCalculate={this.amountToBTCCalculate}
								btcToAmountCalculate={this.btcToAmountCalculate}
								setCryptoCurrencyISO={this.setCryptoCurrencyISO}
								setCryptoCurrencyName={this.setCryptoCurrencyName}
								cryptoAddressError={this.state.info.cryptoAddressError}
							/>
						)
					})()}
				</div>

				<div className="col-sm-6">
					{(() =>{
						let processor = CashierStore.getProcessor();
						if(!processor.processorId){
							return <LoadingSpinner/>;
						}

						return(
							<InfoMethod
								rate={this.state.info.rate}
								limits={this.state.info.limits}
								setLimits={this.setCurrencyLimits}
								promoCode={this.state.info.promoCode}
								setCryptoAmount={this.setCryptoAmount}
								getCurrencyRate={this.getCurrencyRate}
								limitsCheck={this.state.info.limitsCheck}
								setCustomerAmount={this.setCustomerAmount}
								cryptoAmount={this.state.info.cryptoAmount}
								checkCryptoAddress={this.checkCryptoAddress}
								cryptoAddress={this.state.info.cryptoAddress}
								amountRateBTC={this.state.info.amountRateBTC}
								customerAmount={this.state.info.customerAmount}
								setCryptoAddressError={this.setCryptoAddressError}
								cryptoCurrencyISO={this.state.info.cryptoCurrencyISO}
								cryptoCurrencyName={this.state.info.cryptoCurrencyName}
							/>
						)
					})()}
				</div>
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

module.exports.CryptoTransfer = CryptoTransfer;