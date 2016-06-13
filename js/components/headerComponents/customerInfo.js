import React from 'react'
import {translate} from '../../constants/translate'
import {CashierStore} from '../../stores/CashierStore'

let CustomerInfo = React.createClass({
	getInitialState(){
		return {username:"",email:""}
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	getCustomerInfo() {
		return {
			Customer: CashierStore.getCustomer()
		}
	},

	_onChange() {
		if (this.isMounted() === true) {
			let customer=this.getCustomerInfo();
			this.setState({username: customer.Customer.username, email: customer.Customer.personalInformation.email});
		}
	},

	render() {
		return (
			<div id="customerInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">{translate('CUSTOMER_INFO_USER')}:<span>{this.state.username}</span></div>
							<div className="col-sm-6">{translate('CUSTOMER_INFO_EMAIL')}:<span>{this.state.email}</span></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CustomerInfo = CustomerInfo;