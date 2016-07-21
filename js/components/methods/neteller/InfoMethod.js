import React from 'react'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'
import { TransactionService } from '../../../services/TransactionService'
import { UIService } from '../../../services/UIService'

let InfoMethod = React.createClass({
	propTypes: {
		password: React.PropTypes.string,
		limitsCheck: React.PropTypes.number,
		amount: React.PropTypes.string
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
	 * this function checks if password and amount are valid
	 */
	allowProcess(){
		let password = this.props.password;
		let isWithDraw = UIService.getIsWithDraw();
		let checkAmount = this.props.limitsCheck;

		if(password && String(password).length >= 5 && checkAmount){
			return true;
		}
		else if(checkAmount && isWithDraw){
			return true
		}

		return false;
	},

	/**
	 * this function return payAccount limits and ID
	 * 
	 * @returns {{minPayAccount: string, maxPayAccount: string, payAccountId: null}}
	 */
	getPayAccountLimits(){
		let minPayAccount = "";
		let maxPayAccount = "";
		let payAccount = this.state.currentPayAccount;
		if(payAccount.payAccountId != 0){
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
			UIService.confirmTransaction();
		}
		else{
			//process the deposit
			let password = this.props.password;
			let dynamicParams = {};
			dynamicParams.password = password;
			TransactionService.setAmount(this.props.amount);
			TransactionService.process(dynamicParams, "ticket");
		}
	},

	render() {
		let limitsCheck = this.allowProcess();
		let payAccountInfo = this.getPayAccountLimits();
		let originPath = UIService.getOriginPath();

		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: "Neteller",
			transactionType: transactionType
		});

		return (
			<div id="InfoMethodNeteller">
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
										if(payAccountInfo.payAccountId && limitsCheck){
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