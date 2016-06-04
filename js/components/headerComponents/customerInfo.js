import React from 'react'
import {translate} from '../../constants/translate'

let CustomerInfo = React.createClass({
	render() {
		return (
			<div id="customerInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">{translate('CUSTOMER_INFO_USER')}:<span>test1</span></div>
							<div className="col-sm-6">{translate('CUSTOMER_INFO_EMAIL')}:<span>test@gmail.com</span></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CustomerInfo = CustomerInfo;