import React from 'react'
import {CustomerInfo} from './customerInfo'
import {CompanyInfo} from './companyInfo'

let Info = React.createClass({
	render() {
		return (
			<div id="headerInfo" className="header-top">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<CustomerInfo />
							<CompanyInfo />
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.Info = Info;