import React from 'react'
import { translate } from '../../constants/Translate'
import { Loading } from '../loading/Loading'
import { ApplicationService } from '../../services/ApplicationService'
import { UIService } from '../../services/UIService'

let CompanyInfo = React.createClass({
	propTypes: {
		customer: React.PropTypes.object,
		company: React.PropTypes.object
	},

	/**
	 * function to open chat window
	 */
	openChat(event) {
		chat();
	},

	/**
	 * function to open chat window
	 */
	openFAQ(event) {
		FAQ();
	},

	render() {
		let customerBalance = ApplicationService.currency_format(this.props.customer.balance);
		let isWithdraw = UIService.getIsWithDraw();
		return (
			<div id="companyInfo" className="col-xs-8">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-1"></div>
							<div className="col-sm-5">{translate('CUSTOMER_INFO_BALANCE')}:
								<span>
									{(() =>{
										if(!this.props.customer.customerId){
											return <Loading />;
										} else{
											return customerBalance + " " + this.props.customer.currency;
										}
									})()}
								</span>
							</div>
							<div className="col-sm-6">
								{translate('CUSTOMER_INFO_NEED_HELP')}
								{(() =>{
									if(isWithdraw){
										return <a href='#' onClick={this.openFAQ}>FAQ, </a>;
									}
								})()}
								<a href='#' onClick={this.openChat}>{translate('CUSTOMER_INFO_LIVE_CHAT')},</a>
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
