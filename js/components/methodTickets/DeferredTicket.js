import React from 'react'
import { UIService } from '../../services/UIService'

let DeferredTicket = React.createClass({

	render() {
		let originPath = UIService.getOriginPath();
		let customer = UIService.getCustomerInformation();

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
							<p>Your balance is now {customer.currencySymbol + " " + customer.balance}</p>
							<p>An email has been sent to {customer.personalInformation.email} with the transaction details.</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.DeferredTicket = DeferredTicket;
