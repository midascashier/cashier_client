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
						return <div>
							<div><h3>{this.props.selectedProcessorName} {this.props.customerAction} Limits</h3></div><br/><br/>
							<div>Min. Deposit: $ 10.00 </div><hr/>
							<div>Max. Deposit: $ 640.00 </div><hr/>
							<div>Remaining Limit: $640.00 </div><br/><br/>
							<div><button type="button">Deposit With {this.props.selectedProcessorName}</button></div>
						</div>
					}
				})()}
			</div>
		)
	}
});

module.exports.MethodInfo = MethodInfo;