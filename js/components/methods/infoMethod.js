import React from 'react'
import {NetellerInfoMethod} from './neteller/infoMethod'

let ProcessorMethodInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		originPath: React.PropTypes.string,
		currency: React.PropTypes.string
	},

	render() {
		let infoMethod;
		switch (this.props.selectedProcessor.processorId) {
			case '333':
				infoMethod=<NetellerInfoMethod originPath={this.props.originPath} selectedProcessor={this.props.selectedProcessor} currency={this.props.currency}/>
				break;
		}
		return (
			infoMethod
		)
	}
});

module.exports.ProcessorMethodInfo = ProcessorMethodInfo;