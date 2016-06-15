import React from 'react'
let Processor = React.createClass({
	render() {
		return (
			<div className="method">{this.props.processor.DisplayName}</div>
		)
	}
	});


module.exports.Processor = Processor;