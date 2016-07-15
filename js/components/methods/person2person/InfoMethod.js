import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { Loading } from '../../loading/Loading'
import { translate } from '../../../constants/Translate'
import { TransactionService } from '../../../services/TransactionService'
import { UIService } from '../../../services/UIService'

let InfoMethod = React.createClass({

	propTypes: {
		amount: React.PropTypes.string,
		allowContinue: React.PropTypes.number,
		timeFrameDay: React.PropTypes.string,
		timeFrameTime: React.PropTypes.number
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
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function return payAccount limits and ID
	 *
	 * @returns {{minPayAccount: XML, maxPayAccount: XML, payAccountId: (*|number|null)}}
	 */
	getPayAccountLimits(){
		let minPayAccount = "";
		let maxPayAccount = "";
		let payAccount = this.state.currentPayAccount;
		if(payAccount.payAccountId){
			minPayAccount = payAccount.limitsData.minAmount + " " + payAccount.limitsData.currencyCode;
			maxPayAccount = payAccount.limitsData.maxAmount + " " + payAccount.limitsData.currencyCode;
		}
		return { "minPayAccount": minPayAccount, "maxPayAccount": maxPayAccount, "payAccountId": payAccount.payAccountId }
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	continueTransaction(){
		let isWithDraw = UIService.getIsWithDraw();
		TransactionService.setAmount(this.props.amount);
		if(isWithDraw){
			//UIService.confirmTransaction();
		}
		else{
			//process to get new name
			TransactionService.setTimeFrame({timeFrameDay: this.props.timeFrameDay, timeFrameTime: this.props.timeFrameTime});
			TransactionService.processGetName('instructions');
		}
	},

	render() {
		let allowContinue = this.props.allowContinue;
		let payAccountInfo = this.getPayAccountLimits();
		let originPath = UIService.getOriginPath();

		let processorDisplayName = UIService.getProcessorDisplayName().toUpperCase();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName,
			transactionType: transactionType
		});

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
							</tbody>
						</table>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="row">
								<div className="col-sm-6">
									{(() =>{
										if(payAccountInfo.payAccountId && allowContinue){
											return (
												<button type='button' onClick={this.continueTransaction} className='btn btn-green'>
													{translate('PROCESSING_BUTTON_NEXT', 'Next')}
												</button>
											)
										}
									})()}
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