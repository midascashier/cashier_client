import React from 'react'
import {UIService} from '../../services/UIService'
import {CashierStore} from '../../stores/CashierStore'
import {LoadingSpinner} from '../../components/loading/LoadingSpinner'
import {TransactionService} from '../../services/TransactionService'
import cashier from '../../constants/Cashier'
import {translate} from '../../constants/Translate'

let ProcessorCryptoInfo = React.createClass({
	propTypes: {
		waitLimits: React.PropTypes.node,
		selectedProcessor: React.PropTypes.object.isRequired
	},

	/**
	 * this option checks for process minimum limit
	 *
	 * @returns {*}
	 */
	getMinProcessorLimit(){
		if(!this.props.selectedProcessor.limits.currencyMin){
			return 0;
		}else{
			return parseFloat(this.props.selectedProcessor.limits.currencyMin);
		}
	},

	/**
	 * this option checks for process max limit
	 *
	 * @returns {*}
	 */
	getMaxProcessorLimit(){
		if(!this.props.selectedProcessor.limits.currencyMax){
			return 0;
		}else{
			return parseFloat(this.props.selectedProcessor.limits.currencyMax);
		}
	},

	/**
	 * get currency to processor limit
	 */
	getProcessorLimitCurrency(){
		if(!this.props.selectedProcessor.limits.currencyCode){
			return cashier.DEFAULT_CURRENCY;
		}else{
			return this.props.selectedProcessor.limits.currencyCode;
		}
	},

	/**
	 * start a new transaction based on the current selected processor
	 */
	startTransaction(){
		TransactionService.startTransaction();
	},

	/**
	 * redirect to deposit/withdraw
	 */
	switchAction(){
		UIService.switchAction();
	},

	/**
	 * React function to set component initial state
	 *
	 */
	getInitialState(){
		UIService.buyCryptoIsActive();
		UIService.buyCryptoGetCustomerBalance('BTC');
		this.setState({hover: ''});
		return this.refreshLocalState();
	},

	/**
	 * call buyCryptoIsActive
	 */
	isCoinDirectActive(){
		UIService.buyCryptoIsActive();
	},

	/**
	 * set processorLimits to _BuyCrypto object
	 */
	setProcessorLimits(){
		let min = this.getMinProcessorLimit();
		let max = this.getMaxProcessorLimit();
		let currency = this.getProcessorLimitCurrency();
		UIService.setBuyCryptoProcessorLimits(min, max, currency);
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState(){
		return {
			isBuyCryptoActive: CashierStore.isActiveBuyCrypto(),
			customerCryptoBalance: CashierStore.getCryptoBalance(),
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
	 * change hover state whe mouse enter
	 *
	 * @param e
	 */
	onHover(e){
		let element = e.currentTarget.getAttribute('id');
		this.setState({hover: element});
	},

	/**
	 * change hover state when mouse leave content
	 */
	onLeave(){
		this.setState({hover: ''});
	},

	/**
	 * redirect to bitcoin fund
	 */
	loadFund(){
		UIService.changeUIState('/fund/bitcoin');
	},

	render(){
		this.setProcessorLimits();

		const buyOption = (
			<div id="buyOption" onMouseEnter={this.onHover} onMouseLeave={this.onLeave} className="center-block text-center content-crypto-buy">
				<img src="/images/buyCrypto/boton_buy.png" alt="Buy"></img>
			</div>
		);

		const fundOption = (
			<div id="fundOption" onMouseEnter={this.onHover} onMouseLeave={this.onLeave} onClick={this.loadFund} className="center-block text-center content-crypto-fund">
				<img src="/images/buyCrypto/boton_fund.png" alt="Fund"></img>
			</div>
		);

		const depositOption = (
			<div id="depositOption" onMouseEnter={this.onHover} onMouseLeave={this.onLeave} onClick={this.startTransaction} className="center-block text-center content-crypto-deposit">
				<img src="/images/buyCrypto/boton_deposit.png" alt="Deposit"></img>
			</div>
		);

		let customerBalance = this.state.customerCryptoBalance;
		let cryptoCurrencyCode = 'BTC';

		let translateHoverFundOption = translate('HOVER_FUND_OPTION', '', {
			customerBalance: customerBalance,
			cryptoCurrencyCode: cryptoCurrencyCode
		});

		let translateHoverBuyOption = translate('HOVER_BUY_OPTION', '', {
			customerBalance: customerBalance,
			cryptoCurrencyCode: cryptoCurrencyCode
		});

		let translateHoverDefaultOption = translate('HOVER_DEFAULT_OPTION', '', {
			customerBalance: customerBalance,
			cryptoCurrencyCode: cryptoCurrencyCode
		});

		return (
			<div id="processorInfo" className="crypto-background">
				<div className="row">
					<div className="col-sm-12">
						{(() =>{
							if(this.state.isBuyCryptoActive == null || this.state.customerCryptoBalance == null){
								return <LoadingSpinner/>;
							}
						})()}
						<div className="process-crypto-info">

							{(() =>{
								if(this.state.isBuyCryptoActive){

									if(this.state.customerCryptoBalance >= 0){
										return ([depositOption, fundOption, buyOption])
									}

									return ([depositOption, buyOption])
								}

								return depositOption
							})()}
						</div>
					</div>
				</div>
				{(() =>{
					if(this.state.hover == 'fundOption'){
						return (
							<div className="center-block text-center hoverContent" dangerouslySetInnerHTML={{__html: translateHoverFundOption}}></div>
						)
					}else if(this.state.hover == 'buyOption'){
						return (
							<div className="center-block text-center hoverContent" dangerouslySetInnerHTML={{__html: translateHoverBuyOption}}></div>
						)
					}else if(this.state.hover == 'depositOption'){
						return (
							<div className="center-block text-center hoverContent">
								{translate('HOVER_DEPOSIT_OPTION')}
							</div>
						)
					}

					if(this.state.customerCryptoBalance >= 0){
						return (
							<div className="center-block text-center hoverContent" dangerouslySetInnerHTML={{__html: translateHoverDefaultOption}}></div>
						)
					}

				})()}
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
		// CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.ProcessorCryptoInfo = ProcessorCryptoInfo;