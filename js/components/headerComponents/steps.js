import React from 'react'

let Steps = React.createClass({
	render() {
		return (
			<div id="steps" className="steps">
				<div className="step1 active">
					<p>
						<span>1</span>Deposit Method
					</p>
				</div>
				<div className="step2 normal">
					<p>
						<span>2</span>How Much?
					</p>
				</div>
				<div className="step3 normal">
					<p>
						<span>3</span>Billing Info
					</p>
				</div>
			</div>
		)
	}
});

module.exports.Steps = Steps;