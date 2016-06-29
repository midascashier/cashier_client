import React from 'react'
import {Link} from 'react-router'
import {translate} from '../../constants/Translate'

let ProcessorInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object.isRequired,
		originPath: React.PropTypes.string.isRequired,
		isWithDraw: React.PropTypes.number.isRequired
	},


	/**
	 * this function returns customer selected option
	 *
	 * @returns {*}
	 */
	customerAction(){
		if (!this.props.isWithDraw) {
			return "deposit";
		}
		else {
			return "withdraw";
		}
	},

	/**
	 * this option checks for process minimum limit
	 *
	 * @returns {*}
	 */
	getMinProcessorLimit() {
		if (!this.props.selectedProcessor.limits.currencyMin) {
			return 0;
		}
		else {
			return parseFloat(this.props.selectedProcessor.limits.currencyMin);
		}
	},

	/**
	 * this option checks for process max limit
	 *
	 * @returns {*}
	 */
	getMaxProcessorLimit() {
		if (!this.props.selectedProcessor.limits.currencyMax) {
			return 0;
		}
		else {
			return parseFloat(this.props.selectedProcessor.limits.currencyMax);
		}
	},

	render() {
		let customerAction = this.customerAction();
		let processorDisplayName = this.props.selectedProcessor.displayName;
		let minProcessorLimit = this.getMinProcessorLimit();
		let maxProcessorLimit = this.getMaxProcessorLimit();
		let currencyCode = this.props.selectedProcessor.limits.currencyCode;
		let originPath = this.props.originPath;
    let isWithDraw = this.props.isWithDraw;

		return (
			<div id="infoLimits">
				<p><a href="#">Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></a></p>
				<div className="row">
					<div className="col-sm-12">
						<div className="deposit-limits">
							<div className="title">{processorDisplayName} {customerAction} Limits</div>
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<td>Min. Deposit:</td>
										<td>
											<span>{minProcessorLimit} {currencyCode}</span>
										</td>
									</tr>
									<tr>
										<td>Max. Deposit:</td>
										<td>
											<span>{maxProcessorLimit} {currencyCode}</span>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<Link to={"/"+customerAction+"/"+processorDisplayName.toLowerCase()+"/"}>
                  {(() => {
                    if (!isWithDraw) {
                      return (<button type="button" className="btn btn-green">{translate('PROCESSING_BUTTON_NEXT_DEPOSIT', 'Next')} {processorDisplayName}</button>);
                    }else{
                      return (<button type="button" className="btn btn-green">{translate('PROCESSING_BUTTON_NEXT_WITHDRAW', 'Next')}</button>);
                    }
                  })()}
								</Link>
							</div>
							<div className="col-sm-6">
								<img src={originPath + '/images/ssl.png'} alt="ssl"/>
							</div>
						</div>

					</div>
				</div>
			</div>
		)
	}
});

module.exports.ProcessorInfo = ProcessorInfo;
