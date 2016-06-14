import React from 'react'
import {translate} from '../../constants/translate'
import {Loading} from '../loading'

let CustomerInfo = React.createClass({
	render() {
		return (
			<div id="customerInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">

							<div className="col-sm-6">{translate('CUSTOMER_INFO_USER')}:
								<span>
									{(() => {
										if (!this.props.customer.customerId){
											return <Loading />;
										} else {
											return this.props.customer.username
										}
									 })()}
								</span>
							</div>
							<div className="col-sm-6">{translate('CUSTOMER_INFO_EMAIL')}:
								<span>
									{(() => {
										if (!this.props.customer.customerId){
											return <Loading />;
										} else {
											return this.props.customer.personalInformation.email
										}
									})()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CustomerInfo = CustomerInfo;