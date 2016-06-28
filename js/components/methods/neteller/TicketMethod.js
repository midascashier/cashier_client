import React from 'react'
import {Loading} from '../../loading/Loading'
import {CashierStore} from '../../../stores/CashierStore'
import {CashierActions} from '../../../actions/CashierActions'

let NetellerTicket = React.createClass({
	/**
	 * React function to set component initial state
	 *
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierActions.changeCurrentStep(3);
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{depositProcessors: Array, selectedProcessor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), originPath: (*|string), customerAction: (*|string), currentStep: (*|string), customerOption: (*|string), customerCurrency: string, transactions: ({}|*), transactionAmount: (string|number|*)}}
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
