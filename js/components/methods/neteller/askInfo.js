import React from 'react'
import {InfoMethod} from './infoMethod'
import {CashierStore} from '../../../stores/CashierStore'
import Formsy from 'formsy-react'
import {MyInput} from '../../MyInput'


const AskInfo = React.createClass({
	getInitialState: function () {
		CashierStore.setCurrentStep("askInfo");
		return { canSubmit: false };
	},
	submit(data) {
		alert(JSON.stringify(data, null, 4));
	},
	enableButton() {
		this.setState({ canSubmit: true });
	},
	disableButton() {
		this.setState({ canSubmit: false });
	},
	render() {
		return (
			<div id="methods">
				<h3>Neteller Ask Info</h3>
				<Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
					<MyInput name="email" title="Neteller Account: " validations="isEmail" validationError="This is not a valid email" required />
					<MyInput name="amount" title="Amount: " type="number" step="any" validations="isNumeric" validationError="This is not a valid amount" required />
				</Formsy.Form>
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