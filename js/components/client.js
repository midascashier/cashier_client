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
        <Link to={`/welcome/`}>{translate('WELCOME')}</Link> |
        <Link to={`/deposit/`}>{translate('DEPOSIT')}</Link> |
        <Link to={`/withdraw/`}>{translate('WITHDRAW')}</Link>
				<div id="children" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.Client = Client;