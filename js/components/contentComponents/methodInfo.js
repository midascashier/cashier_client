import React from 'react'

let MethodInfo = React.createClass({
	render() {
		return (
			<div id="methodInfo">
				<h1>Method Information</h1>
				Method Deposit Limit<br />
				Min. Deposit: $10
			</div>
		)
	}
});

module.exports.MethodInfo = MethodInfo;