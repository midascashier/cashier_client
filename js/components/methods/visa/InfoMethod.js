import React from 'react'
import {Link} from 'react-router'

const InfoMethod = React.createClass({
	render() {
		return (
			<div id="infoLimits">
				<h3>Visa Deposit Limits</h3>
				Min.Deposit $10
				<hr/>
				<br/>
				Max. Deposit $640 / 24 Hours<br/>
				<hr />
				Remaining Limit: $640<br /><br/><br/><br/>
				<b><Link to={`/deposit/Visa/test`}> test >></Link></b>
			</div>
		)
	}
});

let VisaInfo = React.createClass({
	render() {
		return (
			<div id="infoVisa">
				<InfoMethod />
			</div>
		)
	}
});

module.exports.VisaInfo = VisaInfo;
module.exports.InfoMethod = InfoMethod;
