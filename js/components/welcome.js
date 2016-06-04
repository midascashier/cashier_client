import React from 'react'
import {translate} from '../constants/translate'

let Welcome = React.createClass({
	render() {
		return (
			<div id="welcome" className="welcome-page">
				<div className="row">
					<div className="col-sm-12">
						<div className="welcome-info">
							<div className="row">
								<div className="col-sm-12">
									<h2><span>{translate('WELCOME_TITLE')}</span><span>{translate('WELCOME_TITLE_TO')}</span></h2>
									<p className="title">{translate('WELCOME_LOADING')}</p>
								</div>
								<div className="col-sm-12">
									<button className="btn btn-welcome btn-green">{translate('WELCOME_GET_STARTED')}</button>
								</div>
								<div className="col-sm-12">
									<img src="/images/24-7_secure.png" alt="24/7 Secure"/>
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