import React from 'react'
import cashier from '../../constants/Cashier'
import {translate} from '../../constants/Translate'
import {ApplicationService} from '../../services/ApplicationService'
import {TransactionService} from '../../services/TransactionService'

let TransactionHistory = React.createClass({

	propTypes: {
		transactions: React.PropTypes.array
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{transactions}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transactions: Array}}
	 */
	refreshLocalState(){
		return {
			cancelPayoutButton: true
		}
	},

	/**
	 * cancel a pending payout
	 *
	 */
	cancelPendingPayout(journalId){
		$('#' + journalId).hide();
		TransactionService.cancelPendingPayout(journalId);
	},

	render(){

		let transactions = this.props.transactions;
		let pendingPayouts = this.props.pendingPayouts;
		let cancelPayoutButton = this.state.cancelPayoutButton;

		return (
			<div className="transactions">
				<div className="table-responsive" id="transactionHistoryTable">
					<table className="table table-striped">
						<tbody>
						<tr>
							<th>{translate('TRANSACTION_HISTORY_TABLE_COL_DATE', 'Date')}</th>
							<th>{translate('TRANSACTION_HISTORY_TABLE_COL_TYPE', 'Type')}</th>
							<th>{translate('TRANSACTION_HISTORY_TABLE_COL_METHOD', 'Method')}</th>
							<th>{translate('TRANSACTION_HISTORY_TABLE_COL_AMOUNT', 'Amount')}</th>
							<th>{translate('TRANSACTION_HISTORY_TABLE_COL_STATUS', 'Status')}</th>
							<th></th>
						</tr>
						{(() => {
							if(transactions){
								let rows = [];
								transactions.map((transaction, i) => {
									let status = transaction.TransactionStatus.toLowerCase();
									let fontColor = "black";
									switch(status){
										case "failed":
										case "deferred":
											fontColor = "purple";
											break;

										case "processing":
											fontColor = "blue";
											break;

										case "rejected":
											fontColor = "red";
											break;

										case "pre-approved":
											fontColor = "aqua";
											break;

										case "cancelled":
											fontColor = "navy";
											break;

										case "approved":
											fontColor = "green";
											break;

										case "pending":
											fontColor = "orange";
											break;
									}

									let cancelButton = "";

									if(transaction.caTransactionType_Id == cashier.TRANSACTION_TYPE_PAYOUT && (transaction.caTransactionStatus_Id == cashier.TRANSACTION_STATUS_DEFERRED || transaction.caTransactionStatus_Id == cashier.TRANSACTION_STATUS_PRE_APPROVE)){
										pendingPayouts.map((payout) => {
											if(transaction.caJournal_Id == payout['caJournal_Id'] && cancelPayoutButton){
												cancelButton = <button type="button" id={transaction.caJournal_Id} className="btn btn-grey"
																							 onClick={this.cancelPendingPayout.bind(this, transaction.caJournal_Id)}
																							 class="btn btn-grey">
													Cancel</button>;
											}
										});
									}

									rows.push(
										<tr key={i} className={transaction.TransactionStatus.toLowerCase()}>
											<td>{transaction.DateTrans}</td>
											<td>{translate('TRANSACTION_TYPE_ID_' + transaction.caTransactionType_Id, transaction.TransactionType)}</td>
											<td>{transaction.Method}</td>
											<td>{ApplicationService.currency_format(transaction.CurrencyAmount) + ' ' + transaction.CurrencyCode}</td>
											<td className={status}>
												{(() => {
													if(transaction.TransactionStatus.toUpperCase() == 'DEFERRED'){
														return <span className={fontColor}>{translate('TRANSACTION_STATUS_PENDING', 'Penging')}</span>
													}else{
														return <span className={fontColor}>{translate('TRANSACTION_STATUS_' + transaction.TransactionStatus.toUpperCase(), transaction.TransactionStatus)}</span>
													}
												})()}
											</td>
											<td>{cancelButton}</td>
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
	}
});

module.exports.TransactionHistory = TransactionHistory;