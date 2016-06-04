import React from 'react'
import {translate} from '../../constants/translate'

let CompanyInfo = React.createClass({
	render() {
		return (
			<div id="companyInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">{translate('CUSTOMER_INFO_BALANCE')}:<span>$115.75</span></div>
							<div className="col-sm-6">{translate('CUSTOMER_INFO_NEED_HELP')} <a href="#">{translate('CUSTOMER_INFO_LIVE_CHAT')}</a> {translate('CUSTOMER_INFO_PHONE')} 877-314-4195</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CompanyInfo = CompanyInfo;