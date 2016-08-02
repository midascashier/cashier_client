import React from 'react'
import { CashierActions } from './../actions/CashierActions'
import { CashierStore } from './../stores/CashierStore'

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
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
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
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function change the store states with the new payaccount selected or added
	 *
	 * @param event
	 */
	changeValue(event) {
		let processorID = this.state.processor.processorId;
		let payAccountID = event.currentTarget.value;
		CashierActions.changePayAccount(payAccountID, processorID);
	},

	/**
	 *this function just return the html select created in renderElement function
	 *
	 * @returns {*|XML}
	 */
	render() {
		let optionNodes = [];
		let defaultValue = "";
		let renderOption = function(item, key){
			return (
				<option key={key} value={key}>{item.label}</option>
			)
		};
		let payAccounts = this.state.payAccounts;

		if(payAccounts){
			defaultValue = this.state.currentPayAccount.payAccountId;
			for(let index in payAccounts){
				optionNodes.push(renderOption({ label: payAccounts[index].displayName }, index));
			}
		} else{
			defaultValue = "";
			optionNodes.push(renderOption({ label: "Loading..." }, -1));
		}

		return (
			<select ref="element" className="form-control" value={defaultValue} onChange={this.changeValue}>
				{optionNodes}
			</select>
		)
	}
});

module.exports.SelectPayAccount = SelectPayAccount;