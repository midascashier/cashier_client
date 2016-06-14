import React from 'react'
import {translate} from '../../constants/translate'
import {CashierStore} from '../../stores/CashierStore'

let CompanyInfo = React.createClass({
	render() {
		return (
			<div id="companyInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">{translate('CUSTOMER_INFO_BALANCE')}:
								<span>
																		{(() => {
																			if (!this.props.customer.customerId) {
																				return "Loading...";
																			} else {
																				return this.props.customer.currencySymbol + " " + CashierStore.getCustomer().balance
																			}
																		})()}
							</span></div>
							<div className="col-sm-6"><a
								href="#">{translate('CUSTOMER_INFO_LIVE_CHAT')}</a> {translate('CUSTOMER_INFO_PHONE')} 877-314-4195
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CompanyInfo = CompanyInfo;