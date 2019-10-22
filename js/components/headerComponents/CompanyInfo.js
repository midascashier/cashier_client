import React from 'react'
import {translate} from '../../constants/Translate'
import {Loading} from '../loading/Loading'
import {ApplicationService} from '../../services/ApplicationService'
import {UIService} from '../../services/UIService'
import cashier from '../../constants/Cashier'

let CompanyInfo = React.createClass({
	propTypes: {
		customer: React.PropTypes.object,
		company: React.PropTypes.object,
		application: React.PropTypes.object
	},

	/**
	 * function to open chat window
	 */
	openChat(event){
		chat();
	},

	/**
	 * function to open chat window
	 */
	openFAQ(){
		switch(+this.props.company.companyId){
			case cashier.POKER_KING_ID:
			  if (this.props.customer.lang.toLowerCase() == "ru") {
          window.open('https://www.pokerking.com/metody-depozita/%d0%bf%d0%be%d0%bb%d0%b8%d1%82%d0%b8%d0%ba%d0%b0-%d0%b2%d1%8b%d0%b2%d0%be%d0%b4%d0%b0-%d1%81%d1%80%d0%b5%d0%b4%d1%81%d1%82%d0%b2/', 'FAQ', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,width=800,height=680');
        } else {
          window.open('https://www.pokerking.com/payment-methods/cashout-policy/', 'FAQ', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,width=800,height=680');
        }
				break;
			default:
				window.open('https://den.secureprivate.com/FAQ.html', 'FAQ', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,width=800,height=680');
		}
	},

	render(){
		let customerBalance = ApplicationService.currency_format(this.props.customer.balance);
		let isWithdraw = UIService.getIsWithDraw();
		let isMobile = UIService.getIsMobile();

		return (
			<div id="companyInfo" className="col-xs-8">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-2"></div>
							<div className="col-sm-4">{translate('CUSTOMER_INFO_BALANCE', 'Current Balance')}:
								<span>
									{(() => {
										if(!this.props.customer.customerId){
											return <Loading/>;
										}else{
											return customerBalance + " " + this.props.customer.currency;
										}
									})()}
								</span>
							</div>
							<div className="col-sm-6">
								{translate('CUSTOMER_INFO_NEED_HELP', 'Need Help? ')}
								{(() => {
									if(isWithdraw){
										return <a href='#' onClick={this.openFAQ}>FAQ, </a>;
									}
								})()}
								<a href='#' onClick={this.openChat}>{translate('CUSTOMER_INFO_LIVE_CHAT', 'Live Chat')},</a>
								{(() => {
									if(!this.props.company.companyId){
										return <Loading/>;
									}else{
										return ' ' + translate('CUSTOMER_INFO_PHONE', 'Or') + " " + this.props.company.companyLabel.COMPANY_PHONE;
									}
								})()}

								{(() => {
									if(isMobile && this.props.application.redirectSite){
										return <a href={this.props.application.redirectSite}> {translate('PROCESSING_GO_BACK', 'Go Back')} </a>;
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
