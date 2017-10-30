import React from 'react'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { CashierStore } from '../../../stores/CashierStore'
import { ApplicationService } from '../../../services/ApplicationService'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'

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
				rate : '',
				limitsCheck : '',
				cryptoAmount : '',
				cryptoAddress : '',
				customerAmount : '',
				cryptoAddressError : false,
				transaction : CashierStore.getTransaction(),
				limits : UIService.getProcessorLimitMinMax(),
				selectedProcessor : CashierStore.getProcessor()
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

	/**
	 * Get rate to current currency symbol value
	 *
	 * @param symbolValue
     */
	getCurrencyRate(symbolValue){
		let url = Cashier.CRYPTO_API_URL + Cashier.CRYPTO_API_GET_RATE + symbolValue + '_BTC';
		fetch(url, {method: 'GET'}).then((response) => {
			return response.json();
		}).then((rate) => {
			this.setCurrencyRate(rate.rate);
		}).catch((err) => {
			console.error(err);
		});
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
	 * @param btcAmount
	 * @param customerAmount
     */
	setCryptoAmount(btcAmount, customerAmount){
		let rate = this.state.info.rate;
		let actualState = this.state.info;
		actualState.customerAmount = customerAmount;
		actualState.cryptoAmount = parseFloat(btcAmount / rate).toFixed(8);
		this.setState({info: actualState}, function afterAmountChange(){
			this.checkLimits();
		});
	},

	/**
	 * Set customer Amount
	 * 
	 * @param btcAmount
	 * @param cryptoAmount
     */
	setCustomerAmount(btcAmount, cryptoAmount){
		let actualState = this.state.info;
		actualState.cryptoAmount = cryptoAmount;
		actualState.customerAmount = parseFloat(btcAmount / CashierStore.getBTCRate()).toFixed(2);
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
	 * Set limits to current currency
	 *
	 * @param limits
     */
	setCurrencyLimits(limits){
		let actualState = this.state.info;
		actualState.limits = limits ;
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
		return cryptoAmount * parseFloat(CashierStore.getBTCRate()).toFixed(8);
	},

	render() {
		return (
			<div id="crypto">
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.info.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						return(
							<AskInfo
								rate={this.state.info.rate}
								limits={this.state.info.limits}
								setLimits={this.setCurrencyLimits}
								setCryptoAmount={this.setCryptoAmount}
								getCurrencyRate={this.getCurrencyRate}
								setCryptoAddress={this.setCryptoAddress}
								limitsCheck={this.state.info.limitsCheck}
								setCustomerAmount={this.setCustomerAmount}
								cryptoAmount={this.state.info.cryptoAmount}
								cryptoAddress={this.state.info.cryptoAddress}
								customerAmount={this.state.info.customerAmount}
								amountToBTCCalculate={this.amountToBTCCalculate}
								btcToAmountCalculate={this.btcToAmountCalculate}
								cryptoAddressError={this.state.info.cryptoAddressError}
							/>
						)
					})()}
				</div>

				<div className="col-sm-6">
					{(() =>{
						if(!this.state.info.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						return(
							<InfoMethod
								setLimits={this.setCurrencyLimits}
								rate={this.state.info.rate}
								limits={this.state.info.limits}
								setCryptoAmount={this.setCryptoAmount}
								getCurrencyRate={this.getCurrencyRate}
								limitsCheck={this.state.info.limitsCheck}
								setCustomerAmount={this.setCustomerAmount}
								cryptoAmount={this.state.info.cryptoAmount}
								checkCryptoAddress={this.checkCryptoAddress}
								cryptoAddress={this.state.info.cryptoAddress}
								customerAmount={this.state.info.customerAmount}
								setCryptoAddressError={this.setCryptoAddressError}
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