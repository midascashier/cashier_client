import React from 'react'
import {CashierActions} from '../actions/CashierActions'
import {CashierStore} from '../stores/CashierStore'
import RouterContainer from '../services/RouterContainer'

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
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{sid: *}}
	 */
	refreshLocalState() {
		return {
			sid: CashierStore.getCustomerSID()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		if (this.isMounted() === true) {
			this.setState(this.refreshLocalState());
		}
		if (this.state.sid && this.props.location.pathname == "/") {
			let nextPath = '/' + CashierStore.getUI().currentView + '/';
			RouterContainer.get().props.history.push(nextPath);
		}
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
