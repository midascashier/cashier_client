import React from 'react'
import {UIService} from '../../../../services/UIService'

let Person2PersonTicketInstructions = React.createClass({

	render() {
		let originPath = UIService.getOriginPath();
		let transaction = UIService.getTransactionInformation();
		let customer = UIService.getCustomerInformation();

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
