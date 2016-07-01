import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {Loading} from '../../loading/Loading'
import {translate} from '../../../constants/Translate'
import {transactionService} from '../../../services/TransactionService'
import {controllerUIService} from '../../../services/ControllerService'
import {Link} from 'react-router'

let InfoMethod = React.createClass({
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
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	/**
	 * this function checks if password and amount are valid
	 */
	allowProcess(){
		let amount = this.props.transaction.amount;
		if(amount){
			if(amount > 0){
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
		if(payAccount.payAccountId){
			minPayAccount = payAccount.limitsData.minAmount + " " + payAccount.limitsData.currencyCode;
			maxPayAccount = payAccount.limitsData.maxAmount + " " + payAccount.limitsData.currencyCode;
		}
		return {"minPayAccount": minPayAccount, "maxPayAccount": maxPayAccount, "payAccountId": payAccount.payAccountId}
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	continueTransaction(){
		let isWithDraw=controllerUIService.getIsWithDraw();
		controllerUIService.setCurrentStep(3);
		if (!isWithDraw){
			transactionService.process();
		}
	},

	render() {
		let allowContinue = this.allowProcess();
		let payAccountInfo = this.getPayAccountLimits();
		let originPath = controllerUIService.getOriginPath();
		let nextStep = controllerUIService.getNextStep();

		return (
			<div id="infoLimits" className="row">
				<div className="col-sm-12">
					<div className="title">Neteller Deposit Limits</div>
					<div className="table-responsive">
						<table className="table table-striped">
							<tbody>
							<tr>
								<td>Min. Deposit:</td>
								<td><span>{payAccountInfo.minPayAccount}</span></td>
							</tr>
							<tr>
								<td>Max. Deposit:</td>
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
											return <Link to={nextStep}>
												<button type='button' onClick={this.continueTransaction} className='btn btn-green'>{translate('PROCESSING_BUTTON_NEXT', 'Next')}</button>
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