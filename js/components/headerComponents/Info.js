import React from 'react'
import { CompanyInfo } from './CompanyInfo'
import { CustomerInfo } from './CustomerInfo'
import { translate } from '../../constants/Translate'
import { CashierStore } from '../../stores/CashierStore'
import { stompConnector } from '../../services/StompConnector'

let Info = React.createClass({
	
	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{customer, company}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{customer: (*|{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, load: (function(*))}), company: (*|{companyId: number, companyName: string, phone: string, companyLabel: Array})}}
	 */
	refreshLocalState() {
		return {
			customer: CashierStore.getCustomer(),
			company: CashierStore.getCompany(),
			UI: CashierStore.getUI()
		}
	},

	/**
	 *this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {
		let customer = CashierStore.getCustomer();
		let company = CashierStore.getCompany();
		return (
			<div>
				<div id="headerInfo" className="header-top">
					<CustomerInfo customer={customer}/>
					<CompanyInfo customer={customer} company={company}/>
				</div>

				{(() =>{
					if(this.state.UI.userMessage){
						if(this.state.UI.userMessage == 'Your session has expired'){
							stompConnector.stopSending();

							return(
								<div id='expiredSessionModal'>
									<div id='expiredSessionModal-content'>
										<img id="restartIMG" src="/images/restart.svg"/>
										<p id="restartTXT">{translate('CRYPTO_EXPIRED_SESSION_MSG', 'Your session has expired due to inactivity. Please login again to continue using our cashier.')}</p>
										<div className="alert alert-warning text-center">
											<i className="fa fa-warning orange"/>
											{this.state.UI.userMessage}
										</div>
									</div>
								</div>
							)
						}

						return(
							<div className="alert alert-warning text-center">
								<i className="fa fa-warning orange"/>
								{this.state.UI.userMessage}
							</div>
						)
					}
				})()}
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.Info = Info;