import React from 'react'
import {CustomerInfo} from './customerInfo'
import {CompanyInfo} from './companyInfo'

let Info = React.createClass({
	render() {
		return (
			<div id="headerInfo">
				<CustomerInfo />
				<CompanyInfo />
				<br />
			</div>
		)
	}
});

module.exports.Info = Info;