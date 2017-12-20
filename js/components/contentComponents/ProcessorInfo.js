import React from 'react'
import { Link } from 'react-router'
import { translate } from '../../constants/Translate'
import { UIService } from '../../services/UIService'
import { TransactionService } from '../../services/TransactionService'
import { ApplicationService } from '../../services/ApplicationService'
import { CashierStore } from '../../stores/CashierStore'
import cashier from '../../constants/Cashier'
import { GetBitcoin } from '../commonComponents/tools/GetBitcoin'

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

	/**
	 * redirect to deposit/withdraw
	 */
	switchAction(){
		UIService.switchAction();
	},

	render() {
		let originPath = UIService.getOriginPath();
		let isWithDraw = UIService.getIsWithDraw();
		let processor = this.props.selectedProcessor;

		let processorDisplayName = capitalize(processor.displayName.toLowerCase(),true);

		let minProcessorLimit = ApplicationService.currency_format(this.getMinProcessorLimit());
		let maxProcessorLimit = ApplicationService.currency_format(this.getMaxProcessorLimit());
		let currencyCode = this.props.selectedProcessor.limits.currencyCode;
		let buttonNext = translate('PROCESSING_BUTTON_NEXT_DEPOSIT', 'Deposit with');
		let switch_button = translate('SWICTH_WITHDRAW', 'Withdraw Instead');
		if(isWithDraw){
			buttonNext = translate('PROCESSING_BUTTON_NEXT_WITHDRAW', 'Withdraw to');
			switch_button = translate('SWITCH_DEPOSIT', 'Deposit Instead');
		}

		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName,
			transactionType: transactionType
		});

		let customer = CashierStore.getCustomer();
		let pendingP2P = customer.pendingP2PTransactions;

		return (
			<div id="processorInfo">
				<p>

				</p>
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

						<div className="row mod-btns">
							<div className="col-sm-6">
								<button onClick={this.startTransaction} type="button" className="btn btn-green">{buttonNext} {processorDisplayName}</button>
							</div>
							<div className="col-sm-6">
								{(() =>{
									if(!isWithDraw && pendingP2P.length > 0 && pendingP2P != cashier.NO_RESPONSE){
										return (
											<p>
												<Link to={`/pendingControlNumber/`}>
													{translate('PENDING_MTCN', 'Pending Control Numbers')}
												</Link>
											</p>
										)
									}
								})()}
								<img src={originPath + '/images/ssl.png'} alt="ssl"/>
							</div>

							<GetBitcoin/>

							<div className="col-sm-6">
								<button type="button" className="btn btn-grey" onClick={this.switchAction}>{switch_button}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.ProcessorInfo = ProcessorInfo;
