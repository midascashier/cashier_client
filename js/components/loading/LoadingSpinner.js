import React from 'react'

let LoadingSpinner = React.createClass({
	render() {
		return (
			<div className="row" id="loadingSpinner">
				<div className="col-sm-12">
					<div className="modules">
						<div className="row">
							<div className="col-sm-12">
								<div className="loader-sm"></div>
								<h3>
									Processing... please wait!
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