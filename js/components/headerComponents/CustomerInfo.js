import React from 'react'
import { translate } from '../../constants/Translate'
import { Loading } from '../loading/Loading'

let CustomerInfo = React.createClass({
	propTypes: {
		customer: React.PropTypes.object
	},

	render() {
		return (
			<div id="customerInfo" className="col-xs-4">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">

							<div className="col-sm-5">{translate('CUSTOMER_INFO_USER', 'User')}:
								<span>
									{(() =>{
										if(!this.props.customer.customerId){
											return <Loading />;
										} else{
											return this.props.customer.username
										}
									})()}
								</span>
							</div>

							<div className="col-sm-7">{translate('CUSTOMER_INFO_EMAIL', 'Email')}:
								<span>
									{(() =>{
										if(!this.props.customer.customerId){
											return <Loading />;
										} else{
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
