import React from 'react'
import {Loading} from '../loading'

let MethodInfo = React.createClass({
	propTypes: {
		selectedProcessorName: React.PropTypes.string,
		customerAction: React.PropTypes.string,
		limits: React.PropTypes.array
	},

	render() {
		return (
			<div id="methodInfo">
				{(() => {
					if (!this.props.selectedProcessorName) {
						return <Loading />;
					}else{
						return <div>
							<div><h3>{this.props.selectedProcessorName} {this.props.customerAction} Limits</h3></div><br/><br/>
							<div>Min. Deposit: $ {this.props.limits.currencyMin} </div><hr/>
							<div>Max. Deposit: $ {this.props.limits.currencyMax} </div><hr/><br/><br/>
							<div><button type="button">Deposit With {this.props.selectedProcessorName}</button></div>
						</div>
					}
				})()}
			</div>
		)
	}
});

module.exports.MethodInfo = MethodInfo;