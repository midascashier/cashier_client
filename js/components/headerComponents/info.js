import React from 'react'
import {CustomerInfo} from './customerInfo'
import {CompanyInfo} from './companyInfo'

let Info = React.createClass({
	render() {
		return (
			<div id="headerInfo" className="header-top">
				<CustomerInfo />
				<CompanyInfo />
			</div>
		)
	}
});

module.exports.Info = Info;