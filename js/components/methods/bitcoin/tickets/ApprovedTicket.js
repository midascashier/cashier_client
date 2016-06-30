import React from 'react'

let BitCoinTicketApproved = React.createClass({
	render() {
		return (
			<div class="internal-content">
				<div class="row">
					<div class="col-sm-6">
						<div class="box">
							<img class="img-responsive banner" src="images/momomo.jpg" alt="Mo Mo Mo"/>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="success-message">
							<i class="fa fa-check-circle-o green"></i>
							<div class="title">Your withdraw was successfully submitted.</div>
							<p>Your balance is now $80.00</p>
							<p>An email has been sent to youremail@email.com with the transaction details.</p>
							<button type="submit" class="btn btn-green">Go to Poker Lobby</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.BitCoinTicketApproved = BitCoinTicketApproved;
