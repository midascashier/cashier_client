/**
 * Created by armandoc on 7/11/2018.
 */

import React from 'react'
import {CustomerService} from '../../services/CustomerService'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'

let CryptoPendingDepositTransaction = React.createClass({

	/**
	 * on component init
	 */
	getInitialState(){
		CustomerService.getCryptoPendingDeposit();
		return this.refreshLocalState();
	},

	/**
	 * refresh local state
	 */
	refreshLocalState(){
		let pendingTransactions = CashierStore.getWalletPendingCryptoDeposit();
		return {
			pendingTransactions: pendingTransactions
		}
	},

	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * render component
	 */
	render(){

		let transactions = this.state.pendingTransactions;

		let html = (
			<div className="transactions">
				<h2>{translate('WALLET_PENDING_TRANSACTION_TITLE')}</h2>
				<div className="table-responsive wallet-table-scroll">
					<table className="table table-striped">
						<tbody>
						<tr>
							<th>{translate('WALLET_BUY_TRANSACTION_TABLE_COL_STATUS')}</th>
							<th>{translate('WALLET_BUY_TRANSACTION_TABLE_COL_DETAILS')}</th>
							<th>{translate('WALLET_BUY_TRANSACTION_TABLE_COL_DATE')}</th>
							<th></th>
						</tr>
						{(() =>{
							if(0 < transactions.length){
								let rows = [];
								for(let i = 0; i < transactions.length; i++){
									let row = transactions[i];
									rows.push(
										<tr>
											<td>{row.caTransactionStatus}</td>
											<td>
												<div>{row.Amount} {row.CurrencyCode}</div>
												<div>{row.CryptoAmount} {row.CryptoCurrencyCode}</div>
											</td>
											<td>{row.DateTrans_Modified}</td>
											<td></td>
										</tr>
									);
								}

								return rows;

							}else{
								return (
									<tr>
										<td colSpan="4">{translate('WALLET_BUY_NO_RECORDS')}</td>
									</tr>
								)
							}
						})()}
						</tbody>
					</table>
				</div>
			</div>
		);

		return (html);
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

module.exports.CryptoPendingDepositTransaction = CryptoPendingDepositTransaction;