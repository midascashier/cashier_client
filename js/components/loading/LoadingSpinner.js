import React from 'react'
import {translate} from '../../constants/Translate'

let LoadingSpinner = React.createClass({
	render() {
		let processing = translate('PROCESSING_SPINNER', '...please wait!');
		return (
			<div className="row" id="loadingSpinner">
				<div className="col-sm-12">
					<div className="modules">
						<div className="row">
							<div className="col-sm-12">
								<div className="loader-sm"></div>
								<h3>
									&nbsp;
								</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.LoadingSpinner = LoadingSpinner;