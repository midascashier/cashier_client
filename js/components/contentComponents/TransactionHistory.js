import React from 'react'
import { translate } from '../../constants/Translate'

let TransactionHistory = React.createClass({

	propTypes: {
		transactions: React.PropTypes.array
	},

	render() {

		let transactions = this.props.transactions;

		return (
			<div className=" table-responsive" id="transactionHistoryTable">
				<table className="table table-striped">
					<tbody>
					<tr>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_DATE')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_TYPE')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_METHOD')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_AMOUNT')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_STATUS')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_NOTES')}</th>
					</tr>
					{(() =>{
						if(transactions){
							var rows = [];
							transactions.map((transaction, i)=>{
								rows.push(<tr key={i} className={transaction.TransactionStatus.toLowerCase()}>
									<td>{transaction.DateTrans}</td>
									<td>{translate('TRANSACTION_TYPE_ID_' + transaction.caTransactionType_Id, transaction.TransactionType)}</td>
									<td>{transaction.Method}</td>
									<td>{transaction.CurrencyAmount + ' ' + transaction.CurrencyCode}</td>
									<td>{translate('TRANSACTION_STATUS_' + transaction.TransactionStatus.toUpperCase(), transaction.TransactionStatus)}</td>
									<td>{transaction.Notes}</td>
								</tr>);
							});
							return rows;
						} else{
							return (
								<tr>
									<td colSpan="6">
										No records!
									</td>
								</tr>
							)
						}
					})()}
					</tbody>
				</table>
			</div>
		)
	}
});

module.exports.TransactionHistory = TransactionHistory;
