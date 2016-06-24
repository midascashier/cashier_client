import React from 'react'
import {CustomerInfo} from './CustomerInfo'
import {CompanyInfo} from './CompanyInfo'
import {CashierStore} from '../../stores/CashierStore'

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
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{customer: (*|{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, load: (function(*))}), company: (*|{companyId: number, companyName: string, phone: string, companyLabel: Array})}}
	 */
	refreshLocalState() {
		let customer = CashierStore.getCustomer();
		let company = CashierStore.getCompany();
		return {
			customer: customer,
			company: company
		}
	},

	/**
	 *this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		if (this.isMounted() === true) {
			this.setState(this.refreshLocalState());
		}
	},

	render() {
		return (
			<div id="headerInfo" className="header-top">
				<CustomerInfo customer={this.state.customer}/>
				<CompanyInfo customer={this.state.customer} company={this.state.company}/>
			</div>
		)
	}
});

module.exports.Info = Info;