import React from 'react'
import {CashierActions} from '../actions/CashierActions'

let Client = React.createClass({
	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{sid}}
	 */
	getInitialState(){
		if (loginInfo.username && loginInfo.password) {
			CashierActions.login(loginInfo);
		}
		return null;
	},

	render() {
		return (
			<div id="main">
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