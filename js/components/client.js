import React from 'react'
import {Header} from './header'
import {Link} from 'react-router'
import {CashierStore} from '../stores/CashierStore'
import {translate} from '../constants/translate'

let Client = React.createClass({
	getInitialState: function () {
		CashierStore.setLanguage("EN");
		return null;
	},
	render() {
		return (
			<div id="main">
				<Link to={`/deposit/`}>{translate('DEPOSIT')}</Link> | <Link to={`/withdraw/`}>{translate('WITHDRAW')}</Link>
				<Header />
				<div>{this.props.children}</div>
			</div>
		)
	}
});

module.exports.Client = Client;