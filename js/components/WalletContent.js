import React from 'react'
import {BuyCryptoTransactions} from './contentComponents/BuyCryptoTransactions'
import {CryptoPendingDepositTransaction} from './contentComponents/CryptoPendingDepositTransaction'
import {CashierStore} from '../stores/CashierStore'
import Cashier from '../constants/Cashier'
import {Info} from './headerComponents/Info'
import {translate} from '../constants/Translate'
import {Link} from 'react-router'
import {UIService} from '../services/UIService'

let WalletContent = React.createClass({

	/**
	 * on component init
	 */
	getInitialState(){
		UIService.buyCryptoIsActive();
		UIService.buyCryptoGetCustomerBalance('BTC');
		this.state = {buyTransactions: Cashier.WALLET_DEFAULT_TAB}

		return this.refreshLocalState();
	},

	/**
	 * refresh local state
	 */
	refreshLocalState(){
		return {
			buyTransactions: CashierStore.showWalletTab(),
			isBuyCryptoActive: CashierStore.isActiveBuyCrypto(),
			customerCryptoBalance: CashierStore.getCryptoBalance()
		}
	},

	/**
	 * show pending transaction component
	 */
	showPendingTransactions(){
		CashierStore.setWalletTab(Cashier.WALLET_PENDING_DEPOSITS);
		CashierStore.emitChange();
	},

	/**
	 * show buy crypto transaction component
	 */
	showBuyCryptoTransactions(){
		CashierStore.setWalletTab(Cashier.WALLET_PURCHASES);
		CashierStore.emitChange();
	},

	/**
	 * on change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * component render
	 *
	 * @return {*}
	 */
	render(){
		let view = CashierStore.showWalletTab();
		let isWithdraw = UIService.getIsWithDraw();
		let customerOpt = Cashier.VIEW_DEPOSIT;
		let customerBalance = this.state.customerCryptoBalance;
		let balance = customerBalance + ' ' + Cashier.CRYPTO_CURRENCY_BTC;
		let classTabCustom = 'wallet-tablinks';
		let classPendingActive = '';
		let classPurchaseActive = '';

		if(isWithdraw == 1){
			customerOpt = Cashier.VIEW_DEPOSIT;
		}

		if(view === Cashier.WALLET_PENDING_DEPOSITS){
			classPendingActive = 'wallet-active';
		} else {
			classPurchaseActive = 'wallet-active';
		}

		return (
			<div>
				<Info/>
				<div className="row">
					<div className="col-md-offset-9">
						<div className="wallet-customer-crypto-balance">
							<span className="textbox-balance">
								{balance}
							</span>
							<hr/>
							<span>{translate('WALLET_BITCOIN_BALANCE')}</span>
						</div>
					</div>
				</div>

				<div className="wallet-tab">
					<div className={classTabCustom + ' ' + classPendingActive}>
						<a onClick={this.showPendingTransactions}>{translate('WALLET_TAB_PENDING_DEPOSITS')}</a>
					</div>
					<div className={classTabCustom + ' ' + classPurchaseActive}>
						<a onClick={this.showBuyCryptoTransactions}>{translate('WALLET_TAB_PURCHASES')}</a>
					</div>
				</div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-10 col-md-offset-1">
							{(() =>{
								if(view === Cashier.WALLET_PENDING_DEPOSITS){
									return <CryptoPendingDepositTransaction cryptoCustomerBalance={this.state.customerCryptoBalance}/>
								}else{
									return <BuyCryptoTransactions/>
								}
							})()}
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-2 col-md-offset-9 wallet-btn-deposit">
						<Link to={"/" + customerOpt.toLowerCase() + "/"}>
							<button type="submit" className="btn btn-green">{translate(customerOpt.toUpperCase())}</button>
						</Link>
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
module.exports.WalletContent = WalletContent;