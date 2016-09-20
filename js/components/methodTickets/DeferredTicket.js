import React from 'react'
import { UIService } from '../../services/UIService'
import { CashierStore } from '../../stores/CashierStore'

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
							<a href="https://www.americascardroom.eu/online-poker-promotions/mo-mo-mo-plo/" target="_blank">
								<img className="img-responsive banner" src={originPath + '/images/momomo.jpg'} alt="Mo Mo Mo"/>
							</a>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="success-message">
							<img src={originPath + '/images/u16.png'} />
							<div className="title">Your withdraw was successfully submitted.</div>
							<p>Your balance is now {balance + ' ' + currency}</p>
							<p>An email has been sent to {email} with the transaction details.</p>
							<button type="button" className="btn btn-green">Go to Poker Lobby</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.DeferredTicket = DeferredTicket;
