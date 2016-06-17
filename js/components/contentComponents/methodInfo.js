import React from 'react'
import {LoadingSpinner} from '../loading/loadingSpinner'

let MethodInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerAction: React.PropTypes.string
	},

	render() {
		if (!this.props.selectedProcessor.limits.currencyMin){
			this.props.selectedProcessor.limits.currencyMin=0;
		}
		if (!this.props.selectedProcessor.limits.currencyMax){
			this.props.selectedProcessor.limits.currencyMax=0;
		}
		return (
			<div id="methodInfo">
				{(() => {
					if (!this.props.selectedProcessor.displayName) {
						return <LoadingSpinner />;
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