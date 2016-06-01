import React from 'react'
import { Link } from 'react-router'

let MethodList = React.createClass({
	render() {
		return (
			<div id="methods">
				<Link to={`/transaction_history/`}>Transaction History</Link>
				<h1>Select Your Methods</h1><br />
				<ul>
					<li><Link to={`/deposit/neteller/`}>Neteller</Link></li>
					<li><Link to={`/deposit/visa/`}>Visa</Link></li>
				</ul>
			</div>
		)
	}
});

module.exports.MethodList = MethodList;