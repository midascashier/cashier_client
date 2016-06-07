import React from 'react'
import {Link} from 'react-router'
import {translate} from '../constants/translate'

let Client = React.createClass({
	getInitialState: function () {
		return null;
	},
	render() {
		return (
			<div id="main">
				<div>
					<Link to={`/welcome/`}>{translate('WELCOME')}</Link> |
					<Link to={`/deposit/`}>{translate('DEPOSIT')}</Link> |
					<Link to={`/withdraw/`}>{translate('WITHDRAW')}</Link>
				</div>

				<div id="mainContent" className="global">
          <div className="container">
            {this.props.children}
          </div>
				</div>
			</div>
		)
	}
});

module.exports.Client = Client;