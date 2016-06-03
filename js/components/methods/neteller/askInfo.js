import React from 'react'
import {InfoMethod} from './infoMethod'
import {CashierStore} from '../../../stores/CashierStore'

const AskInfo = React.createClass({
	getInitialState: function () {
		CashierStore.setCurrentStep("askInfo");
		return null;
	},
	render() {
		return (
			<div id="methods">
				<h3>Neteller Ask Info</h3>
				Neteller Account: <input type="text"/>
				<hr/>
				<br/>
				Enabled 2FA: <input type="text"/><br/>
				<hr />
				AMOUNT: <input type="text"/><br /><br/><br/><br/>
			</div>
		)
	}
});

let NetellerAskInfo = React.createClass({
	render() {
		return (
			<div>
				<AskInfo />
				<InfoMethod />
			</div>
		)
	}
});

module.exports.NetellerAskInfo = NetellerAskInfo;