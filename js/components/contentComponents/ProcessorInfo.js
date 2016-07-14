import React from 'react'
import { translate } from '../../constants/Translate'
import { UIService } from '../../services/UIService'
import { TransactionService } from '../../services/TransactionService'

let ProcessorInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object.isRequired
	},

	/**
	 * this option checks for process minimum limit
	 *
	 * @returns {*}
	 */
	getMinProcessorLimit() {
		if(!this.props.selectedProcessor.limits.currencyMin){
			return 0;
		} else{
			return parseFloat(this.props.selectedProcessor.limits.currencyMin);
		}
	},

	/**
	 * this option checks for process max limit
	 *
	 * @returns {*}
	 */
	getMaxProcessorLimit() {
		if(!this.props.selectedProcessor.limits.currencyMax){
			return 0;
		} else{
			return parseFloat(this.props.selectedProcessor.limits.currencyMax);
		}
	},

	/**
	 * start a new transaction based on the current selected processor
	 */
	startTransaction() {
		TransactionService.startTransaction();
	},

	render() {
		let originPath = UIService.getOriginPath();
		let isWithDraw = UIService.getIsWithDraw();
		let processorDisplayName = this.props.selectedProcessor.displayName;

		let minProcessorLimit = this.getMinProcessorLimit();
		let maxProcessorLimit = this.getMaxProcessorLimit();
		let currencyCode = this.props.selectedProcessor.limits.currencyCode;
		let buttonNext = translate('PROCESSING_BUTTON_NEXT_DEPOSIT', 'Next');
		if(isWithDraw){
			buttonNext = translate('PROCESSING_BUTTON_NEXT_WITHDRAW', 'Next')
		}

		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName,
			transactionType: transactionType
		});

		return (
			<div id="infoLimits">
				<p>Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></p>
				<div className="row">
					<div className="col-sm-12">
						<div className="deposit-limits">
							<div className="title">{title}</div>
							<div className="table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<td>{translate('PROCESSING_MIN', 'Min.') + ' ' + transactionType}:</td>
										<td>
											<span>{minProcessorLimit} {currencyCode}</span>
										</td>
									</tr>
									<tr>
										<td>{translate('PROCESSING_MAX', 'Max.') + ' ' + transactionType}:</td>
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
								<button onClick={this.startTransaction} type="button"
												className="btn btn-green">{buttonNext} {processorDisplayName}</button>
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
