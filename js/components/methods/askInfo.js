import React from 'react'
import {NetellerAskInfo} from './neteller/askInfo'

let AskInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerOption: React.PropTypes.string
	},

	render() {
		let askInfo;
		switch (this.props.selectedProcessor.processorId) {
			case '333':
				askInfo=<NetellerAskInfo customerOption={this.props.customerOption} selectedProcessor={this.props.selectedProcessor}/>
				break;
		}
		return (
			askInfo
		)
	}
});

module.exports.AskInfo = AskInfo;