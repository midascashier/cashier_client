import React from 'react'
import { UIService } from '../../services/UIService'

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
	 * component is ready
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
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
							<img className="img-responsive banner" src={originPath + '/images/momomo.jpg'} alt="Mo Mo Mo"/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="success-message">
							<i className="fa fa-check-circle-o green"></i>
							<div className="title">Your withdraw was successfully submitted.</div>
							<p>Your balance is now {currency + '' + balance}</p>
							<p>An email has been sent to {email} with the transaction details.</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.DeferredTicket = DeferredTicket;
