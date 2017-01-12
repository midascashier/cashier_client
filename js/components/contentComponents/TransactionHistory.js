import React from 'react'
import { translate } from '../../constants/Translate'
import { ApplicationService } from '../../services/ApplicationService'

let TransactionHistory = React.createClass({

	propTypes: {
		transactions: React.PropTypes.array
	},

	render() {

		let transactions = this.props.transactions;

		return (
			<div className="table-responsive" id="transactionHistoryTable">
				<table className="table table-striped">
					<tbody>
					<tr>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_DATE')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_TYPE')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_METHOD')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_AMOUNT')}</th>
						<th>{translate('TRANSACTION_HISTORY_TABLE_COL_STATUS')}</th>
					</tr>
					{(() =>{
						if(transactions){
							let rows = [];
							transactions.map((transaction, i)=>{
								let status = transaction.TransactionStatus.toLowerCase();
								let fontColor = "black";
								switch (status){
									case "failed":
										fontColor="tomato";
										break;
									case "deferred":
										fontColor="purple";
										break;
									case "processing":
										fontColor="blue";
										break;
									case "rejected":
										fontColor="red";
										break;
									case "pre-approved":
										fontColor="aqua";
										break;
									case "cancelled":
										fontColor="navy";
										break;
									case "approved":
										fontColor="green";
										break;
									case "pending":
										fontColor="orange";
										break;
								}

								rows.push(<tr key={i} className={transaction.TransactionStatus.toLowerCase()}>
									<td>{transaction.DateTrans}</td>
									<td>{translate('TRANSACTION_TYPE_ID_' + transaction.caTransactionType_Id, transaction.TransactionType)}</td>
									<td>{transaction.Method}</td>
									<td>{ApplicationService.currency_format(transaction.CurrencyAmount) + ' ' + transaction.CurrencyCode}</td>
									<td className={status}><span className={fontColor}>{translate('TRANSACTION_STATUS_' + transaction.TransactionStatus.toUpperCase(), transaction.TransactionStatus)}</span></td>
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
