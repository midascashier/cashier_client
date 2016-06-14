import React from 'react'
import {CustomerInfo} from './customerInfo'
import {CompanyInfo} from './companyInfo'
import {CashierStore} from '../../stores/CashierStore'

let Info = React.createClass({

	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {

		let customer = CashierStore.getCustomer();

		return {
			customer: customer
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {
		return (
			<div id="headerInfo" className="header-top">
				<CustomerInfo customer={this.state.customer} />
				<CompanyInfo customer={this.state.customer} />
			</div>
		)
	}
});

module.exports.Info = Info;