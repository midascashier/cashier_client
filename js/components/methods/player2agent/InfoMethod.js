import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {translate} from '../../../constants/Translate'
import Cashier from '../../../constants/Cashier'
import {TransactionService} from '../../../services/TransactionService'
import {UIService} from '../../../services/UIService'
import {LoadingSpinner} from '../../loading/LoadingSpinner'

let InfoMethod = React.createClass({

	propTypes: {
		amount: React.PropTypes.node,
		limitsCheck: React.PropTypes.string,
		feeCheck: React.PropTypes.number,
		feeCashValue: React.PropTypes.number,
		allowContinueToConfirm: React.PropTypes.bool,
		account: React.PropTypes.string,
		waitForValidation: React.PropTypes.func,
		invalidAccount: React.PropTypes.func
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
	 *  this function sets and return object with local states
	 *
	 * @returns {{processor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), currentPayAccount: *, originPath: (*|string)}}
	 */
	refreshLocalState(){
		return {
			processor: CashierStore.getProcessor(),
			currentPayAccount: CashierStore.getCurrentPayAccount(),
			transaction: CashierStore.getTransaction(),
			waitForValidation: false,
			playerAccount: UIService.getPlayerAccount()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	/**
	 * this function sends deposit info to cashier
	 */
	continueTransaction(){
		this.props.invalidAccount(false);
		TransactionService.setAmount(this.props.amount);

		TransactionService.setPlayerAccount(this.props.account);
		TransactionService.setFeeAmount(this.props.feeCashValue);
		let currentState = this.state;

		new Promise(resolve => {

			if(!TransactionService.getCurrentPayAccount().payAccountId){
				TransactionService.registerPayAccountAsync({
					account: TransactionService.getCustomer().username.toUpperCase()
				}).then(() => resolve())
			}else{
				resolve()
			}
		}).then(() => {
			UIService.accountExists(this.props.account)
				.then(exists => {
					if(exists){
						this.props.invalidAccount(false);
						UIService.confirmTransaction();
					}else{
						this.props.invalidAccount(true);
					}
					currentState.waitForValidation = false;
					this.setState(currentState);
				})
		}).catch(() => {
			this.props.invalidAccount(true);
		});

		currentState.waitForValidation = true;
		this.setState(currentState);
	},

	render(){
		let limitsCheck = false;

		if(this.props.limitsCheck === Cashier.LIMIT_NO_ERRORS){
			limitsCheck = true;
		}

		let allowContinueToConfirm = true;

		let processorDisplayName = UIService.getProcessorDisplayName().toUpperCase();
		let payAccountInfo = UIService.getDisplayLimits(this.props.amount);
		let originPath = UIService.getOriginPath();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);

		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName,
			transactionType: transactionType
		});

		let isNextDisabled = "disabled";

		if(limitsCheck && allowContinueToConfirm){
			isNextDisabled = "";
		}

		return (
			<div id="InfoMethodPlayer2Agent">
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
					<div className="row mod-btns">
						<div className="col-sm-6">
							{(() => {
								if(this.state.waitForValidation){
									return (
										<LoadingSpinner/>
									);
								}else{
									return (
										<button type='button' onClick={this.continueTransaction} disabled={isNextDisabled} className='btn btn-green'>
											{translate('PROCESSING_BUTTON_NEXT', 'Next')}
										</button>
									);
								}
							})()}
							<p><a onClick={this.setFirstStep}>{translate('USE_DIFFERENT_METHOD')}.</a></p>
						</div>
						<div className="col-sm-6">
							<img src={originPath + '/images/ssl.png'} alt="ssl"/>
						</div>
					</div>
				</div>
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.InfoMethod = InfoMethod;