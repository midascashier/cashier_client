import React from 'react'
import {Link} from 'react-router'

let MethodInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		customerAction: React.PropTypes.string,
		originPath: React.PropTypes.string,
		isWithDraw: React.PropTypes.number
	},

	render() {
		let customerAction;

		if (!this.props.isWithDraw) {
			customerAction = "deposit";
		}

		if (!this.props.selectedProcessor.limits.currencyMin) {
			this.props.selectedProcessor.limits.currencyMin = 0;
		}
		if (!this.props.selectedProcessor.limits.currencyMax) {
			this.props.selectedProcessor.limits.currencyMax = 0;
		}
		return (
			<div id="infoLimits">
				<p><a href="#">Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></a></p>
				<div className="row">
					<div className="col-sm-12">
						<div className="deposit-limits">
							<div className="title">{this.props.selectedProcessor.displayName} {this.props.customerAction} Limits</div>
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<td>Min. Deposit:</td>
										<td>
											<span>{parseFloat(this.props.selectedProcessor.limits.currencyMin)} {this.props.selectedProcessor.limits.currencyCode}</span>
										</td>
									</tr>
									<tr>
										<td>Max. Deposit:</td>
										<td>
											<span>{parseFloat(this.props.selectedProcessor.limits.currencyMax)} {this.props.selectedProcessor.limits.currencyCode}</span>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<Link to={"/"+customerAction+"/"+this.props.selectedProcessor.displayName.toLowerCase()+"/"}>
									<button type="button" className="btn btn-green">Deposit
										with {this.props.selectedProcessor.displayName}</button>
								</Link>
							</div>
							<div className="col-sm-6">
								<img src={this.props.originPath + '/images/ssl.png'} alt="ssl"/>
							</div>
						</div>

					</div>
				</div>
			</div>
		)
	}
});

module.exports.MethodInfo = MethodInfo;