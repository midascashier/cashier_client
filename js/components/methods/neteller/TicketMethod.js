import React from 'react'
import {Loading} from '../../loading/Loading'
import {CashierStore} from '../../../stores/CashierStore'

let NetellerTicket = React.createClass({
	/**
	 * React function to set component initial state
	 *
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transactionResponse: *}}
   */
	refreshLocalState() {
		return {
			transactionResponse: CashierStore.getLastTransactionResponse()
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
	},

	render() {
		let userMessage = this.state.transactionResponse.userMessage;
		return (
			<div id="methods">
				{(() => {
					if (!userMessage) {
						return <Loading />;
					} else {
						return this.props.children
					}
				})()}
			</div>
		)
	}
});

module.exports.NetellerTicket = NetellerTicket;