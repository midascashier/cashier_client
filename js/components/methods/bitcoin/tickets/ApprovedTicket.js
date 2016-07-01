import React from 'react'

let BitCoinTicketApproved = React.createClass({
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
							<div className="title">Your withdraw was successfully submitted.</div>
							<p>Your balance is now $80.00</p>
							<p>An email has been sent to youremail@email.com with the transaction details.</p>
							<button type="submit" className="btn btn-green">Go to Poker Lobby</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.BitCoinTicketApproved = BitCoinTicketApproved;
