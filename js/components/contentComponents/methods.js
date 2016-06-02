import React from 'react'

let Methods = React.createClass({
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
});

module.exports.Methods = Methods;