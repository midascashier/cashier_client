import React from 'react'
import {UIService} from '../../../../services/UIService'

let RequestedTicket = React.createClass({

	render() {
		let originPath = UIService.getOriginPath();
		let transaction = UIService.getTransactionInformation();
		let customer = UIService.getCustomerInformation();

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
