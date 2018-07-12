/**
 * Created by armandoc on 7/11/2018.
 */

import React from 'react'
import {CustomerService} from '../../services/CustomerService'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'
import {TransactionService} from '../../services/TransactionService'
import {LoadingSpinner} from '../loading/LoadingSpinner'

let CryptoPendingDepositTransaction = React.createClass({

	propTypes: {
		cryptoCustomerBalance: React.PropTypes.number
	},

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
			loading: false,
			pendingTransactions: pendingTransactions
		}
	},

	_onChange(){
		this.setState(this.refreshLocalState());
	},

	completeDeposit(depositInfo){
		this.setState({loading: true});
		let transactionId = depositInfo.caTransaction_Id;
		let processorId = depositInfo.caProcessor_Id_Selected;
		TransactionService.buyCryptoCompleteDeposit(transactionId, processorId);
	},

	/**
	 * render component
	 */
	render(){

		if(this.state.loading){
			return <LoadingSpinner/>
		}

		let transactions = this.state.pendingTransactions;
		let balance = parseInt(this.props.cryptoCustomerBalance);

		let html = (
			<div className="transactions">
				<h2>{translate('WALLET_PENDING_TRANSACTION_TITLE')}</h2>
				<div className="table-responsive wallet-table-scroll">
					<table className="table table-striped table-hover">
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
									let status = row.caTransactionStatus;
									if(row.caProviderTransaction_Id) {
										status = row.caProviderTransactionStatus;
									}
									let cryptoAmount = row.CryptoAmount;
									rows.push(
										<tr>
											<td>{status}</td>
											<td>
												<div>{row.Amount} {row.CurrencyCode} ~</div>
												<div>{cryptoAmount} {row.CryptoCurrencyCode}</div>
											</td>
											<td>{row.DateTrans_Modified}</td>
											<td>
												{(() =>{
													if(0 < balance && cryptoAmount < balance && status == 'Pending'){
														return (
															<div className="text-right">
																<button onClick={() => this.completeDeposit(row)} className="btn btn-info btn-sm">
																	{translate('WALLET_BUTTON_COMPLETE_DEPOSIT')}
																</button>
															</div>
														);
													}
												})()}
											</td>
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