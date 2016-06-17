import React from 'react'
import {NetellerInfoMethod} from './neteller/infoMethod'

let ProcessorMethodInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		originPath: React.PropTypes.string
	},

	render() {
		let infoMethod;
		switch (this.props.selectedProcessor.processorId) {
			case '333':
				infoMethod=<NetellerInfoMethod originPath={this.props.originPath}/>
				break;
		}
		return (
			infoMethod
		)
	}
});

module.exports.ProcessorMethodInfo = ProcessorMethodInfo;