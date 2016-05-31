import React from 'react'

let CompanyInfo = React.createClass({
	render() {
		return (
			<div id="companyInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">Current Balance:<span>$115.75</span></div>
							<div className="col-sm-6">Need Help? <a href="#">Live Chat</a> or 877-314-4195</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CompanyInfo = CompanyInfo;