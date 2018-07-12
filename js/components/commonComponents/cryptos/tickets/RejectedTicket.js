import React from 'react'
import {translate} from '../../../../constants/Translate'

let CryptoTicketRejected = React.createClass({

	/**
	 * render component
	 *
	 * @return {*}
	 */
	render (){
		return (
			<div className="crypto-fund-background">
				<div className="row" style={{paddingTop: "45px"}}>
					<div className="col-md-6 col-md-offset-3">
						<div className="buy-crypto-section buy-crypto-section-large">
							<div style={{marginTop: '25px'}} className="col-md-2 col-md-offset-5">
								<img src="../../../../../images/buyCrypto/icon_rejected.png" alt="Approved"/>
							</div>
							<div className="col-md-12">
								<p className="buy-crypto-ticket-text">
									{translate('BUY_CRYPTO_TICKET_REJECTED')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports.CryptoTicketRejected = CryptoTicketRejected;