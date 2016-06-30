import React from 'react'

let VisaTicketApproved = React.createClass({
	render() {
		return (
			<div className="internal-content">
				<div className="row">
					<div className="col-sm-6">
						<div className="box">
							<img className="img-responsive banner" src="images/momomo.jpg" alt="Mo Mo Mo"/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="success-message">
							<i className="fa fa-check-circle-o green"></i>
							<div className="title">Your $ deposit was successful.</div>
							<p>Your balance is now $80.00</p>
							<p>This charge will show up on your statement as nloeLsjoe A/S.</p>
							<p>An email has been sent to youremail@email.com with the transaction details.</p>
							<button type="submit" className="btn btn-green">Go to Poker Lobby</button>
							<div className="checkbox text-center">
								<label>
									<input type="checkbox">
										<span>Save method for <a href="#">Quick Deposit</a></span>
									</input>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaTicketApproved = VisaTicketApproved;
