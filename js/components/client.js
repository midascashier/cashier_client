import React from 'react'
import {Header} from './header'
import {Link} from 'react-router'
import {CashierStore} from '../stores/CashierStore';


let Client = React.createClass({
	getInitialState: function () {
		CashierStore.setLanguage("EN");
		return null;
	},
	render() {
		return (
			<div id="main">
				<Link to={`/deposit/`}>Deposit</Link> | <Link to={`/withdraw/`}>Withdraw</Link>
				<Header />
				<div>{this.props.children}</div>
			</div>
		)
	}
});

module.exports.Client = Client;