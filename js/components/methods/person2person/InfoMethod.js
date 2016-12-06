import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { translate } from '../../../constants/Translate'
import Cashier from '../../../constants/Cashier'
import { TransactionService } from '../../../services/TransactionService'
import { UIService } from '../../../services/UIService'

let InfoMethod = React.createClass({

	propTypes: {
		amount: React.PropTypes.string,
		limitsCheck: React.PropTypes.string,
		timeFrameDay: React.PropTypes.string,
		timeFrameTime: React.PropTypes.node,
		feeCashValue: React.PropTypes.number
	},

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{customer, company}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	},

	/**
	 *  this function sets and return object with local states
	 *
	 * @returns {{processor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), currentPayAccount: *, originPath: (*|string)}}
	 */
	refreshLocalState() {
		return {
			processor: CashierStore.getProcessor(),
			currentPayAccount: CashierStore.getCurrentPayAccount()
		}
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	continueTransaction(){
		let isWithDraw = UIService.getIsWithDraw();
		TransactionService.setAmount(this.props.amount);
		TransactionService.setFeeAmount(this.props.feeCashValue);
		if(isWithDraw){
			UIService.confirmTransaction();
		}
		else{
			//process to get new name
			TransactionService.setTimeFrame({
				timeFrameDay: this.props.timeFrameDay,
				timeFrameTime: this.props.timeFrameTime
			});
			TransactionService.processGetName('instructions');
		}
	},

	render() {
		let limitsCheck = false;
		let payAccountInfo = UIService.getDisplayLimits(this.props.amount);
		let originPath = UIService.getOriginPath();
		let processorDisplayName = UIService.getProcessorDisplayName().toUpperCase();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName,
			transactionType: transactionType
		});
		let isNextDisabled = "disabled";

		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS && this.props.amount){
			limitsCheck = true;
		}
		if(payAccountInfo.payAccountId && limitsCheck){
			isNextDisabled = "";
		}



		return (
			<div id="InfoMethodP2P">
				<div className="col-sm-12">
					<div className="title">{title}</div>
					<div className="table-responsive">
						<table className="table table-striped">
							<tbody>
							<tr>
								<td>{translate('PROCESSING_MIN', 'Min.') + ' ' + transactionType}:</td>
								<td><span>{payAccountInfo.minPayAccount}</span></td>
							</tr>
							<tr>
								<td>{translate('PROCESSING_MAX', 'Max.') + ' ' + transactionType}:</td>
								<td><span>{payAccountInfo.maxPayAccount}</span></td>
							</tr>
							<tr>
								<td>{translate('PROCESSING_LIMIT_REMAINING', 'Remaining Limit')}:</td>
								<td><span>{payAccountInfo.remaining}</span></td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="row">
								<div className="col-sm-6">
									<button type='button' onClick={this.continueTransaction} disabled={isNextDisabled} className='btn btn-green'>
										{translate('PROCESSING_BUTTON_NEXT', 'Next')}
									</button>
									<p><a onClick={this.setFirstStep}>{translate('USE_DIFFERENT_METHOD')}.</a></p>
								</div>
								<div className="col-sm-6">
									<img src={originPath + '/images/ssl.png'} alt="ssl"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.InfoMethod = InfoMethod;