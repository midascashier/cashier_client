import React from 'react'
import {Link} from 'react-router'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {Loading} from '../../loading/Loading'
import {transactionService} from '../../../services/TransactionService'
import {controllerUIService} from '../../../services/ControllerService'


let InfoMethod = React.createClass({
	propTypes: {
		password: React.PropTypes.string
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
		if (this.isMounted() === true) {
			this.setState(this.refreshLocalState());
		}
	},

	/**
	 * this function checks if password and amount are valid
	 */
	allowProcess(){
		let amount = this.props.transaction.amount;
		if (amount) {
			if (amount > 0) {
				return true;
			}
		}
		return false;
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
		if (payAccount.payAccountId) {
			minPayAccount = payAccount.limitsData.minAmount + " " + payAccount.limitsData.currencyCode;
			maxPayAccount = payAccount.limitsData.maxAmount + " " + payAccount.limitsData.currencyCode;
		}
		return {"minPayAccount":minPayAccount, "maxPayAccount":maxPayAccount,"payAccountId":payAccount.payAccountId}
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	processDeposit(){
		let dynamicParams = {};
		transactionService.process(dynamicParams);
	},

	render() {
		let allowContinue = this.allowProcess();
		let payAccountInfo = this.getPayAccountLimits();
		let displayName = this.props.selectedProcessor.displayName;
		let originPath = controllerUIService.getOriginPath();
		let nextStep = controllerUIService.getNextStep();
		let currentView = controllerUIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Deposit Limits', {processorName:displayName, transactionType:transactionType});

		return (
			<div id="InfoMethodVIsa" className="row">
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
									{(() => {
										if (payAccountInfo.payAccountId && allowContinue) {
											return <Link to={nextStep}>
												<button type='button' onClick={this.processDeposit} className='btn btn-green'>Next2</button>
											</Link>
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