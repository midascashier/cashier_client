import React from 'react'
import { Link } from 'react-router'
import {MethodList} from '../../contentComponents/methodsList'
import {CashierStore} from '../../../stores/CashierStore';

const InfoMethod = React.createClass({
	render() {
		return (
			<div id="infoMethod">
				<h3>Neteller Deposit Limits</h3>
				Min.Deposit $10<hr/><br/>
				Max. Deposit $640 / 24 Hours<br/><hr />
				Remaining Limit: $640<br /><br/><br/><br/>
				<b><Link to={`/deposit/neteller/askinfo`}>NEXT >></Link></b>
			</div>
		)
	}
});

let NetellerInfo = React.createClass({
	componentDidMount: function() {
		CashierStore.setCurrentStep("infoMethod");
	},
	render() {
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