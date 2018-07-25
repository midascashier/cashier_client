import React from 'react'
import {translate} from '../../../../constants/Translate'

let CryptoTicketApproved = React.createClass({

	/**
	 * render component
	 * @return {*}
	 */
	render (){
		return (
			<div className="crypto-fund-background">
				<div className="row" style={{paddingTop: "58px"}}>
					<div className="col-md-6 col-md-offset-3">
						<div className="buy-crypto-section buy-crypto-section-large">
							<div style={{marginTop: '25px', marginLeft: '182px'}} className="col-md-2 col-md-offset-5">
								<img src="../../../../../images/buyCrypto/icon_approved.png" alt="Approved"/>
							</div>
							<div className="col-md-12">
								<p style={{fontSize: '25px'}} className="buy-crypto-ticket-text">
									{translate('BUY_CRYPTO_TICKET_APPROVED')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports.CryptoTicketApproved = CryptoTicketApproved;