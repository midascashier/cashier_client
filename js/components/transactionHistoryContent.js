import React from 'react'
import {Info} from './headerComponents/info'
import {TransactionHistory} from './contentComponents/TransactionHistory'

let TransactionHistoryContent = React.createClass({
	render() {
		return (
			<div id="transactionHistoryContent" className="transaction-page">
				<Info />
        <TransactionHistory />
			</div>
		)
	}
});

module.exports.TransactionHistoryContent = TransactionHistoryContent;