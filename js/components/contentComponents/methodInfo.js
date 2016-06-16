import React from 'react'
import {Loading} from '../loading'

let MethodInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerAction: React.PropTypes.string
	},

	render() {
		return (
			<div id="methodInfo">
				{(() => {
					if (!this.props.selectedProcessor.displayName) {
						return <Loading />;
					}else{
						return <div>
							<div><h3>{this.props.selectedProcessor.displayName} {this.props.customerAction} Limits</h3></div><br/><br/>
							<div>Min. Deposit: {parseFloat(this.props.selectedProcessor.limits.currencyMin)} {this.props.selectedProcessor.limits.currencyCode}</div><hr/>
							<div>Max. Deposit: {parseFloat(this.props.selectedProcessor.limits.currencyMax)} {this.props.selectedProcessor.limits.currencyCode}</div><hr/><br/><br/>
							<div><button type="button">Deposit With {this.props.selectedProcessor.displayName}</button></div>
						</div>
					}
				})()}
			</div>
		)
	}
});

module.exports.MethodInfo = MethodInfo;