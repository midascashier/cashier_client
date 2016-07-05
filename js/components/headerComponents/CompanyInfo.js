import React from 'react'
import { translate } from '../../constants/Translate'
import { Loading } from '../loading/Loading'

let CompanyInfo = React.createClass({
	propTypes: {
		customer: React.PropTypes.object, company: React.PropTypes.object
	},

	render() {
		return (
			<div id="companyInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">{translate('CUSTOMER_INFO_BALANCE')}:
								<span>
									{(() =>{
										if(!this.props.customer.customerId){
											return <Loading />;
										} else{
											return this.props.customer.currencySymbol + " " + this.props.customer.balance;
										}
									})()}
								</span>
							</div>
							<div className="col-sm-6">
								<a href="#">{translate('CUSTOMER_INFO_LIVE_CHAT')}</a>
								{(() =>{
									if(!this.props.company.companyId){
										return <Loading />;
									} else{
										return ' ' + translate('CUSTOMER_INFO_PHONE') + " " + this.props.company.companyLabel.COMPANY_PHONE;
									}
								})()}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CompanyInfo = CompanyInfo;
