import React from 'react'
import {NetellerInfoMethod} from './neteller/infoMethod'

let ProcessorMethodInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object
	},

	render() {
		let infoMethod;
		switch (this.props.selectedProcessor.processorId) {
			case '333':
				infoMethod=<NetellerInfoMethod />
				break;
		}
		return (
			infoMethod
		)
	}
});

module.exports.ProcessorMethodInfo = ProcessorMethodInfo;