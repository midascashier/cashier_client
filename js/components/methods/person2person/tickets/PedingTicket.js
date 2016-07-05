import React from 'react'
import {controllerUIService} from '../../../../services/ControllerService'

let Person2PersonPendingTicket = React.createClass({

	render() {
		let originPath = controllerUIService.getOriginPath();
		let transaction = controllerUIService.getTransactionInformation();
		let customer = controllerUIService.getCustomerInformation();

		return (
			<div className="internal-content">
				<div className="row">
					Pending
				</div>
			</div>
		)
	}
});

module.exports.Person2PersonPendingTicket = Person2PersonPendingTicket;
