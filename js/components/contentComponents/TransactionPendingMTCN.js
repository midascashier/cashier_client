import React from 'react'
import { translate } from '../../constants/Translate'

let TransactionPendingMTCN = React.createClass({

	propTypes: {
		transactions: React.PropTypes.array
	},

	render() {
		let transactions = this.props.transactions;
		return (
			<div>
				{(() =>{
					if(transactions){
						var tables = [];
						transactions.map((transaction, i)=>{
							tables.push(
								<div key={i} className=" table-responsive" id="TransactionPendingMTCN">
									<table className="table table-striped">
										<tbody>
											<tr>
												<th colspan="4">{transaction.PAFirstName + ' ' + transaction.PALastName}</th>
												<th colspan="1">{transaction.receiverName}</th>
												<th colspan="5">{transaction.CardType}</th>
												<th colspan="5">{transaction.Country + ' ' + transaction.State}</th>
											</tr>
											<tr>
												<td><strong>PENDING_MTCN_MTCN</strong></td>
												<td><strong>PENDING_MTCN_AMOUNT</strong></td>
												<td><strong>PENDING_MTCN_FEE</strong></td>
												<td></td>
												<td></td>
											</tr>
										</tbody>
									</table>
								</div>
							);
						});
						return tables;
					} else{
						return (<p>No records!</p>)
					}
				})()}
			</div>
		)
	}
});

module.exports.TransactionPendingMTCN = TransactionPendingMTCN;