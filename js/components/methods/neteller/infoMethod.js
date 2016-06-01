import React from 'react'
import { Link } from 'react-router'
import {MethodList} from '../../contentComponents/methodsList'
import {CashierStore} from '../../../stores/CashierStore';

const InfoMethod = React.createClass({
	render() {
		let button_text="";
		let next_step="";
		if (CashierStore.getCurrentStep()=="infoMethod"){
			button_text="Deposit With Neteller";
			next_step="askinfo";
		}else{
			button_text="Complete Deposit";
			next_step="ticket";
		}
		return (
			<div id="infoMethod">
				<h3>Neteller Deposit Limits</h3>
				Min.Deposit $10<hr/><br/>
				Max. Deposit $640 / 24 Hours<br/><hr />
				Remaining Limit: $640<br /><br/><br/><br/>
				<b><Link to={`/deposit/neteller/${next_step}`}>{button_text} >></Link></b>
			</div>
		)
	}
});

let NetellerInfo = React.createClass({
	render() {
		CashierStore.setCurrentStep("infoMethod");
		return (
			<div>
			<MethodList />
			<InfoMethod />
			</div>
		)
	}
});

module.exports.NetellerInfo = NetellerInfo;
module.exports.InfoMethod = InfoMethod;