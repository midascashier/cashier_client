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
	refreshLocalState() {
		return {
			info : {
				rate : '',
				cryptoAmount : '',
				customerAmount : '',
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
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * Get rate to current currency symbol value
	 * 
	 * @param symbolValue
     */
	getCurrencyRate(symbolValue) {
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
		this.setState({info: actualState});
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
		this.setState({info: actualState});
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
	 * Calculate btc amount from crypto amount
	 *
	 * @param amount
	 * @returns {number}
	 */
	amountToBTCCalculate(amount) {
		return amount * parseFloat(CashierStore.getBTCRate()).toFixed(8);
	},

	/**
	 * Calculate amount from crypto amount
	 *
	 * @param cryptoAmount
	 * @returns {number}
	 */
	btcToAmountCalculate(cryptoAmount) {
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
								setCustomerAmount={this.setCustomerAmount}
								cryptoAmount={this.state.info.cryptoAmount}
								customerAmount={this.state.info.customerAmount}
								amountToBTCCalculate={this.amountToBTCCalculate}
								btcToAmountCalculate={this.btcToAmountCalculate}
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
								cryptoAmount={this.state.info.cryptoAmount}
								customerAmount={this.state.info.customerAmount}
								setCryptoAmount={this.setCryptoAmount}
								getCurrencyRate={this.getCurrencyRate}
								setCustomerAmount={this.setCustomerAmount}
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
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.CryptoTransfer = CryptoTransfer;