import React from 'react'
import { UIService } from '../../services/UIService'
import { CashierStore } from '../../stores/CashierStore'
import { ApplicationService } from '../../services/ApplicationService'

let DeferredTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{address}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{email: string, currency: string, balance: string}}
	 */
	refreshLocalState() {
		let customer = UIService.getCustomerInformation();
		return {
			email: customer.personalInformation.email,
			currency: customer.currency,
			balance: customer.balance
		}
	},

	/**
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {
		let originPath = UIService.getOriginPath();
		let email = this.state.email;
		let currency = this.state.currency;
		let balance = this.state.balance;

		return (
			<div className="internal-content">
				<div className="row">
					<div className="col-sm-6">
						<div className="box">
							<a href="" target="_blank">
								<img className="img-responsive banner" src={originPath + '/images/promo.jpg'} alt=""/>
							</a>
						</div>
					</div>
					
					<div className="col-sm-6">
						<div className="success-message">
							<img src={originPath + '/images/u16.png'} />
							<div className="title">Your withdraw was successfully submitted.</div>
							<p>Your balance is now {ApplicationService.currency_format(balance) + ' ' + currency}</p>
							<p>An email has been sent to {email} with the transaction details.</p>
						</div>
					</div>
				</div>
			</div>
		)
	},

	/**
	 * component is ready
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	}
});

module.exports.DeferredTicket = DeferredTicket;
