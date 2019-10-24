import React from 'react'
import {translate} from '../../constants/Translate'
import {Loading} from '../loading/Loading'
import {ApplicationService} from '../../services/ApplicationService'
import {UIService} from '../../services/UIService'
import cashier from '../../constants/Cashier'
import {CashierStore} from "../../stores/CashierStore";

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
    if(+this.props.company.companyId == cashier.POKER_KING_ID){
      let firstName = this.props.customer.personalInformation.firstName;
      let lastName = this.props.customer.personalInformation.lastName;
      let email = this.props.customer.personalInformation.email;
      let fullName = firstName + ' ' + lastName;
      window.open('https://support.pokerking.com/visitor/index.php?/Pokerking/LiveChat/Chat/Request/_sessionID=/_promptType=chat/_proactive=0/_filterDepartmentID=5%2C6/_randomNumber=s4gs51xoh03v31xqyxbdk1xrtamaz1xs/_fullName=' + fullName + '/_email=' + email + '/', 'Chat', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,width=800,height=680');
    }else{
      chat();
    }
	},

	/**
	 * function to open chat window
	 */
	openFAQ(){
		let urlToFAQ = 'https://den.secureprivate.com/FAQ.html';

		if(+this.props.company.companyId == cashier.POKER_KING_ID) {
			urlToFAQ = 'https://den.secureprivate.com/FAQ-PK.html';

			if (CashierStore.getLanguage() == "RU") {
				urlToFAQ = 'https://den.secureprivate.com/FAQ-PK-RU.html';
			}
		}

		window.open(urlToFAQ, 'FAQ', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,width=800,height=680');
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
