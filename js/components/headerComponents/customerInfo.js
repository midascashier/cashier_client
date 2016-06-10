import React from 'react'
import {translate} from '../../constants/translate'
import {CashierStore} from '../../stores/CashierStore'

let CustomerInfo = React.createClass({
	render() {
		return (
			<div id="customerInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">{translate('CUSTOMER_INFO_USER')}:<span>{CashierStore.getCustomer().username}</span></div>
							<div className="col-sm-6">{translate('CUSTOMER_INFO_EMAIL')}:<span>{CashierStore.getCustomer().personalInformation.email}</span></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CustomerInfo = CustomerInfo;