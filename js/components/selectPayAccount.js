import React from 'react'
import {CashierActions} from '../actions/cashierActions'


let SelectPayAccount = React.createClass({

	propTypes: {
		payAccounts: React.PropTypes.array
	},
	changeValue(event) {
		let processorID=this.props.processor.processorId;
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

		let renderOption = function(item, key) {
			return (
				<option key={key} value={key}>{item.label}</option>
			)
		};
		let payAccounts=this.props.payAccounts[this.props.processor.processorId];

		optionNodes.push(renderOption({"label":"Register new account"},0));
		for (let index in payAccounts){
			optionNodes.push(renderOption({"label":payAccounts[index].displayName},index));
		}

		return (
			<select
				ref="element"
				className="form-control"
				//value="jorge@midas.com"
				onChange={this.changeValue}
			>
				{optionNodes}
			</select>
		);
	}
});

module.exports.SelectPayAccount=SelectPayAccount;