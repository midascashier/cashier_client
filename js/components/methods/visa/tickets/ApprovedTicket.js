import React from 'react'
import { controllerUIService } from '../../../../services/ControllerService'

let VisaTicketApproved = React.createClass({

	render() {
		let originPath = controllerUIService.getOriginPath();
		let transaction = controllerUIService.getTransactionInformation();
		let customer = controllerUIService.getCustomerInformation();

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
							<div className="title">Your $ deposit was successful.</div>
							<p>Your balance is now {customer.currencySymbol + " " + customer.balance}</p>
							<p>This charge will show up on your statement as {transaction.descriptor}.</p>
							<p>An email has been sent to {customer.personalInformation.email} with the transaction details.</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaTicketApproved = VisaTicketApproved;
