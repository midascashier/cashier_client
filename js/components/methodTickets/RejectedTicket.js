import React from 'react'
import { UIService } from '../../services/UIService'

let RejectedTicket = React.createClass({

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	render() {
		return (
			<div className="col-sm-12">
				<div className="modules">
					<div className="row">
						<div className="col-sm-12">
							<div className="alert alert-danger" role="alert">
								<i className="fa fa-ban red"></i>
								<strong>Transaction Rejected</strong>
								<p>
									<strong>Unfortunately</strong>, we were unable to process your deposit for $ at this time.
									Perhaps our Customer Support team can help. Call us at 877-314-4195 or Live Chat. Or, you could try a <a onClick={this.setFirstStep}>different deposit method</a>.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.RejectedTicket = RejectedTicket;
