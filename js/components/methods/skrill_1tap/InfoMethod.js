import React from 'react'
import { translate } from '../../../constants/Translate'
import Cashier from '../../../constants/Cashier'
import { CashierStore } from '../../../stores/CashierStore'
import { TransactionService } from '../../../services/TransactionService'
import { UIService } from '../../../services/UIService'

let InfoMethod = React.createClass({
	propTypes: {
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		account: React.PropTypes.node,
		validAccount: React.PropTypes.bool
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
			processor: CashierStore.getProcessor()
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
		let isWithDraw = UIService.getIsWithDraw();
		let checkAmount = false;

		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS){
			checkAmount = true;
		}

		if(checkAmount){
			return true;
		}

		else if(checkAmount && isWithDraw){
			return true
		}

		return false;
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
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
			let payAccount = {};
			payAccount.account = this.props.account;
			this.refs.processingButton.setAttribute("disabled", "disabled");
			TransactionService.registerPayAccount(payAccount);

		}
	},

	render() {
		let limitsCheck = this.allowProcess();
		let originPath = UIService.getOriginPath();

		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: "1Tap",
			transactionType: transactionType
		});

		let isNextDisabled = "disabled";
		if(this.props.account && limitsCheck && this.props.validAccount){
			isNextDisabled = "";
		}

		let processor = this.state.processor;
		let payAccountInfo = UIService.getDisplayLimits(this.props.amount);

		return (
			<div id="1tapMethod">
				<div className="row">
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
								<button type='button' onClick={this.continueTransaction} ref='processingButton'
												disabled={isNextDisabled} className='btn btn-green'>
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
		)
	}
});

module.exports.InfoMethod = InfoMethod;