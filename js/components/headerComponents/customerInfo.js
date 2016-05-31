import React from 'react'

let CustomerInfo = React.createClass({
	render() {
		return (
			<div id="customerInfo" className="col-xs-6">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-6">User:<span>test1</span></div>
							<div className="col-sm-6">Email:<span>test@gmail.com</span></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CustomerInfo = CustomerInfo;