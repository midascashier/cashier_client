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
								<p key={i}>{transaction.Name}</p>
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
