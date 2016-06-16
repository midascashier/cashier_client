import React from 'react'
import {Loading} from '../loading'

let MethodInfo = React.createClass({
	propTypes: {
		selectedProcessorName: React.PropTypes.string,
		customerAction: React.PropTypes.string
	},

	render() {
		return (
			<div id="methodInfo">
				{(() => {
					if (!this.props.selectedProcessorName) {
						return <Loading />;
					}else{
						return this.props.selectedProcessorName + ' ' + this.props.customerAction + ' Limits'
					}
				})()}
			</div>
		)
	}
});

module.exports.MethodInfo = MethodInfo;