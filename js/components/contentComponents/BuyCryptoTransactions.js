import React from 'react'
import {CustomerService} from '../../services/CustomerService'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'

let BuyCryptoTransactions = React.createClass({

	/**
	 * on component init
	 */
	getInitialState(){
		CustomerService.getBuyTransactionByCustomer();
		this.state = {buyTransactions: []}

		return this.refreshLocalState();
	},

	/**
	 * refresh local state
	 */
	refreshLocalState(){
		let buyTransactions = [];

		if(CashierStore.getWalletBuyTransactions().length > 0){
			buyTransactions = CashierStore.getWalletBuyTransactions();
		}

		return {
			buyTransactions: buyTransactions
		}
	},

	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * render component
	 */
	render(){
		let buyTransactions = this.state.buyTransactions;

		return (
			<div className="transactions">
				<h2>{translate('WALLET_BUY_TRANSACTION_TITLE')}</h2>
				<div className="table-responsive wallet-table-scroll" id="transactionHistoryTable">
					<table className="table table-striped">
						<tbody>
						<tr>
							<th>{translate('WALLET_BUY_TRANSACTION_TABLE_COL_STATUS')}</th>
							<th>{translate('WALLET_BUY_TRANSACTION_TABLE_COL_CC')}</th>
							<th>{translate('WALLET_BUY_TRANSACTION_TABLE_COL_DETAILS')}</th>
							<th>{translate('WALLET_BUY_TRANSACTION_TABLE_COL_DATE')}</th>
						</tr>
						{(() =>{
							if(buyTransactions.length > 0){
								let rows = [];
								buyTransactions.map((buyTransaction, i) =>{
									let status = buyTransaction.TransactionStatus.toLowerCase();

									rows.push(
										<tr key={i} className={status}>
											<td>{status}</td>
											<td>**** {buyTransaction.Last4}</td>
											<td>{buyTransaction.CustomerAmount + ' ' + buyTransaction.CustomerCurrency} <i className="fa fa-long-arrow-right" aria-hidden="true"></i> <strong>{buyTransaction.AmountToProvider + ' ' + buyTransaction.CurrencyToProvider}</strong></td>
											<td>{buyTransaction.DateTrans}</td>
										</tr>
									);
								});
								return rows;
							}else{
								return (
									<tr>
										<td colSpan="6">No records!</td>
									</tr>
								)
							}
						})()}
						</tbody>
					</table>
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

module.exports.BuyCryptoTransactions = BuyCryptoTransactions;