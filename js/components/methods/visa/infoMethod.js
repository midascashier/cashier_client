import React from 'react'
import { Link } from 'react-router'
import {MethodList} from '../../contentComponents/methodsList'
import {CashierStore} from '../../../stores/CashierStore';

const InfoMethod = React.createClass({
	render() {
		return (
			<div id="infoMethod">
				<h3>Visa Deposit Limits</h3>
				Min.Deposit $10<hr/><br/>
				Max. Deposit $640 / 24 Hours<br/><hr />
				Remaining Limit: $640<br /><br/><br/><br/>
				<b><Link to={`/deposit/Visa/test`}> test >></Link></b>
			</div>
		)
	}
});

let VisaInfo = React.createClass({
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

module.exports.VisaInfo = VisaInfo;
module.exports.InfoMethod = InfoMethod;