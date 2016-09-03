import React from 'react'
import { translate } from '../constants/Translate'
import { CashierStore } from '../stores/CashierStore'
import { stompConnector } from '../services/StompConnector'

let Welcome = React.createClass({

	render() {

		if (CashierStore.getConnectionStatus()){
			stompConnector.sleep(9000);
			location.reload();
		}

		return (
			<div id="welcome" className="welcome-page">
				<div className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="welcome-info">
								<div className="row">
									<div className="col-sm-12">
										<h2><span>{translate('WELCOME_TITLE')}</span><span>{translate('WELCOME_TITLE_TO')}</span></h2>
										<p className="title">{translate('WELCOME_LOADING')}</p>
									</div>
									<div className="col-sm-12">
										<div class="loader-lg">
											<img class="center-block" src="/images/loader-lg_70x70.gif" alt="loader"/>
										</div>
									</div>
									<div className="col-sm-12">
										<img src="/images/24-7_secure.png" alt="24/7 Secure"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.Welcome = Welcome;
