import React from 'react'

let Methods = React.createClass({
	render() {
		return (
			<div id="methods">
				{this.props.children}
				METHOD
			</div>
		)
	}
});

module.exports.Methods = Methods;