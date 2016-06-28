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
			sid: CashierStore.getCustomerSID(),
			transactionResponse: CashierStore.getLastTransactionResponse(),
			processor: CashierStore.getProcessor(),
			UI: CashierStore.getUI()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		console.log(this.state.UI);
		if (this.isMounted() === true) {
			this.setState(this.refreshLocalState());
		}
		if (this.state.sid && this.props.location.pathname == "/") {
			let nextPath = '/' +this.state.UI.currentView + '/';
			RouterContainer.get().props.history.push(nextPath);
		}

		if (this.state.transactionResponse.state == "error"){
			let nextPath = "/deposit/"+this.state.processor.displayName.toLowerCase()+"/ticket/rejected";
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