import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../../stores/CashierStore';

const InfoMethod = React.createClass({
	getInitialState: function () {
		let button_text = "";
		let next_step = "";
		if (CashierStore.getCurrentStep() == "infoMethod") {
			button_text = "Deposit With Neteller";
			next_step = "askinfo";
		} else {
			button_text = "Complete Deposit";
			next_step = "ticket";
		}
		return { button_text: button_text, next_step: next_step};
	},
	render() {
		return (
			<div id="infoLimits">
				<h3>Neteller Deposit Limits</h3>
				Min.Deposit $10
				<hr/>
				<br/>
				Max. Deposit $640 / 24 Hours<br/>
				<hr />
				Remaining Limit: $640<br /><br/><br/><br/>
				<b><Link to={`/deposit/neteller/${this.state.next_step}`}>{this.state.button_text} >></Link></b>
			</div>
		)
	}
});

let NetellerInfo = React.createClass({
	getInitialState: function () {
		CashierStore.setCurrentStep("infoMethod");
		return null;
	},
	render() {
		return (
			<div id="infoMethod">
				<InfoMethod />
			</div>
		)
	}
});

module.exports.NetellerInfo = NetellerInfo;
module.exports.InfoMethod = InfoMethod;