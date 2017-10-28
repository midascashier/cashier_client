import React from 'react'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { CashierStore } from '../../../stores/CashierStore'
import { ApplicationService } from '../../../services/ApplicationService'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'

let CryptoTransfer = React.createClass({

	propTypes: {
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,

		setAmount: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func
	},

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
	 * Set btc amount
	 *
	 * @param btcAmount
	 * @param rate
	 */
	setCryptoAmount(btcAmount, rate){
		let actualState = this.state.info;
		actualState.cryptoAmount = btcAmount * rate ;
		this.setState({info: actualState});
	},

	/**
	 * Set btc amount
	 * 
	 * @param amount
     */
	setCustomerAmount(amount){
		let actualState = this.state.info;
		actualState.customerAmount = amount ;
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

	render() {
		return (
			<div id="crypto">
				<div className="col-sm-6">
					<AskInfo
						amount={this.props.amount}
						btcAmount={this.props.btcAmount}
						cryptoAmount={this.state.info.cryptoAmount}
						customerAmount={this.state.info.customerAmount}

						setAmount={this.props.setAmount}
						setLimits={this.setCurrencyLimits}
						setBTCAmount={this.props.setBTCAmount}
						setCryptoAmount={this.setCryptoAmount}
						setCustomerAmount={this.setCustomerAmount}
						getCurrencyRate={this.getCurrencyRate}

						rate={this.state.info.rate}
						limits={this.state.info.limits}
					/>
				</div>

				<div className="col-sm-6">
					{(() =>{
						if(!this.state.info.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						return(
							<InfoMethod
								amount={this.props.amount}
								btcAmount={this.props.btcAmount}
								cryptoAmount={this.state.info.cryptoAmount}
								customerAmount={this.state.info.customerAmount}

								setAmount={this.props.setAmount}
								setLimits={this.setCurrencyLimits}
								setBTCAmount={this.props.setBTCAmount}
								setCryptoAmount={this.setCryptoAmount}
								setCustomerAmount={this.setCustomerAmount}
								getCurrencyRate={this.setCurrencyRate}

								rate={this.state.info.rate}
								limits={this.state.info.limits}
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