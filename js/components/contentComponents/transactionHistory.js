import React from 'react'

let TransactionHistory = React.createClass({
	render() {
		return (
			<div id="transactionHistory">
				<p><a href="#">Transaction History</a></p>
			</div>
		)
	}
});

module.exports.TransactionHistory = TransactionHistory;