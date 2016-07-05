import React from 'react'
import {controllerUIService} from '../../../../services/ControllerService'

let RequestedTicket = React.createClass({

	render() {
		let originPath = controllerUIService.getOriginPath();
		let transaction = controllerUIService.getTransactionInformation();
		let customer = controllerUIService.getCustomerInformation();

		return (
			<div className="internal-content">
				<div className="row">
					Payout Requested
				</div>
			</div>
		)
	}
});

module.exports.RequestedTicket = RequestedTicket;
