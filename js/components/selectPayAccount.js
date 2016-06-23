import React from 'react'
import {CashierActions} from './../actions/cashierActions'
import {CashierStore} from './../stores/CashierStore'

let SelectPayAccount = React.createClass({
	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			processor: CashierStore.getProcessor(),
			payAccounts: CashierStore.getProcessorPayAccount(),
			currentPayAccount: CashierStore.getCurrentPayAccount()
		}
	},

	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	changeValue(event) {
		let processorID=this.state.processor.processorId;
		let payAccountID = event.currentTarget.value;
		if (payAccountID==0){
			console.log("Add PayAccount");
		}
		else{
			CashierActions.changePayAccount({payAccountID:payAccountID, processorID:processorID});
		}
	},


	render() {
		return (
			this.renderElement()
		)
	},

	renderElement() {
		let optionNodes = [];
		let defaultValue="";
		let renderOption = function(item, key) {
			return (
				<option key={key} value={key}>{item.label}</option>
			)
		};
		let payAccounts=this.state.payAccounts;

		if (this.state.currentPayAccount.payAccountId) {
			defaultValue = this.state.currentPayAccount.payAccountId;
			optionNodes.push(renderOption({"label": "Register new account"}, 0));
			for (let index in payAccounts) {
				optionNodes.push(renderOption({"label": payAccounts[index].displayName}, index));
			}
		}else{
			defaultValue="";
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
		);
	}
});

module.exports.SelectPayAccount=SelectPayAccount;