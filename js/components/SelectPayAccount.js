import React from 'react'
import {CashierActions} from './../actions/CashierActions'
import {CashierStore} from './../stores/CashierStore'

let SelectPayAccount = React.createClass({
	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{processor, payAccounts, currentPayAccount}}
	 */
	getInitialState(){
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
	 * @returns {{processor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), payAccounts: *, currentPayAccount: *}}
	 */
	refreshLocalState() {
		return {
			processor: CashierStore.getProcessor(),
			payAccounts: CashierStore.getProcessorPayAccount(),
			currentPayAccount: CashierStore.getCurrentPayAccount()
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

	/**
	 * this function change the store states with the new payaccount selected or added
	 *
	 * @param event
	 */
	changeValue(event) {
		let processorID = this.state.processor.processorId;
		let payAccountID = event.currentTarget.value;
		if (payAccountID == 0) {
			console.log("Add PayAccount");
		}
		else {
			CashierActions.changePayAccount({payAccountID: payAccountID, processorID: processorID});
		}
	},

	/**
	 *this function just return the html select created in renderElement function
	 *
	 * @returns {*|XML}
	 */
	render() {
		return (
			this.renderElement()
		)
	},

	/**
	 * this function create html select input with the payaccounts
	 *
	 * @returns {XML}
	 */
	renderElement() {
		let optionNodes = [];
		let defaultValue = "";
		let renderOption = function (item, key) {
			return (
				<option key={key} value={key}>{item.label}</option>
			)
		};
		let payAccounts = this.state.payAccounts;

		if (this.state.currentPayAccount.payAccountId) {
			defaultValue = this.state.currentPayAccount.payAccountId;
			optionNodes.push(renderOption({"label": "Register new account"}, 0));
			for (let index in payAccounts) {
				optionNodes.push(renderOption({"label": payAccounts[index].displayName}, index));
			}
		} else {
			defaultValue = "";
			optionNodes.push(renderOption({"label": "Loading..."}, -1));
		}
		return (
			<select
				ref="element"
				className="form-control"
				value={defaultValue}
				onChange={this.changeValue}
			>
				{optionNodes}
			</select>
		)
	}
});

module.exports.SelectPayAccount = SelectPayAccount;
