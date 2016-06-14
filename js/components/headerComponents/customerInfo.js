import React from 'react'
import {translate} from '../../constants/translate'
import {CashierStore} from '../../stores/CashierStore'

let CustomerInfo = React.createClass({

	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {

		let customer = CashierStore.getCustomer();

		let customerLoaded = () => {
			return (customer.customerId > 0);
		}

		return {
			username: customer.username,
			email: customer.personalInformation.email,

			customerLoaded: customerLoaded()
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {
		return (
			<div id="customerInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">

							<div className="col-sm-6">{translate('CUSTOMER_INFO_USER')}:
								<span>
									{(() => {
										if (!this.state.customerLoaded){
											return "Loading...";
										} else {
											return this.state.username
										}
									 })()}
								</span>
							</div>
							<div className="col-sm-6">{translate('CUSTOMER_INFO_EMAIL')}:
								<span>
									{(() => {
										if (!this.state.customerLoaded){
											return "Loading...";
										} else {
											return this.state.email
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