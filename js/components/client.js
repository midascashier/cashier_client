import React from 'react'
import {Header} from './header'
import {Link} from 'react-router'
import {Test} from '../../dev/validate-form.js'

let Client = React.createClass({
	render() {
		return (
			<div id="main">
				<Test />
				<Link to={`/deposit/`}>Deposit</Link> | <Link to={`/withdraw/`}>Withdraw</Link>
				<Header />
				<div>{this.props.children}</div>
			</div>
		)
	}
});

module.exports.Client = Client;