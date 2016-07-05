import React from 'react'
import {controllerUIService} from '../../../../services/ControllerService'

let Person2PersonTicketInstructions = React.createClass({

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

module.exports.Person2PersonTicketInstructions = Person2PersonTicketInstructions;
