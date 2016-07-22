import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { Loading } from '../../loading/Loading'
import { translate } from '../../../constants/Translate'
import { TransactionService } from '../../../services/TransactionService'
import { UIService } from '../../../services/UIService'

let InfoMethod = React.createClass({

	propTypes: {
		amount: React.PropTypes.string,
		limitsCheck: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		feeCashValue: React.PropTypes.number,
		allowContinueToConfirm: React.PropTypes.bool,
		bitcoinAddress: React.PropTypes.string
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
		let minPayAccount = <Loading />;
		let maxPayAccount = <Loading />;
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
		TransactionService.setBitcoinAddress(this.props.bitcoinAddress);
		TransactionService.setFeeAmount(this.props.feeCashValue);
		if(isWithDraw){
			UIService.confirmTransaction();
		}
		else{
			//process the deposit
			let customer = UIService.getCustomerInformation();
			TransactionService.processBTC({account: customer.username},'instructions');
		}
	},

	render() {
		let limitsCheck = this.props.limitsCheck;
		let feeCheck = this.props.feeCheck;
		let allowContinueToConfirm = this.props.allowContinueToConfirm;
		let payAccountInfo = this.getPayAccountLimits();
		let originPath = UIService.getOriginPath();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: "BitCoin",
			transactionType: transactionType
		});

		return (
			<div id="InfoMethodBitCoin">
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
										if(payAccountInfo.payAccountId && limitsCheck && !feeCheck && allowContinueToConfirm){
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