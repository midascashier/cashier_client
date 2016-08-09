import React from 'react'
import { translate } from '../../constants/Translate'

let TransactionPendingMTCN = React.createClass({

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
						<th>Column</th>
					</tr>
					{(() =>{
						if(transactions){
							var rows = [];
							transactions.map((transaction, i)=>{
								rows.push(
										<tr key={i}>
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

module.exports.TransactionPendingMTCN = TransactionPendingMTCN;
