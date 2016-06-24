import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../stores/CashierStore'
import {translate} from '../../constants/Translate'
import {MethodsDepositList} from '../contentComponents/MethodsDepositList'
import {MethodInfo} from '../contentComponents/MethodInfo'
import {LoadingSpinner} from '../../components/loading/LoadingSpinner'


let MethodList = React.createClass({
	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{depositProcessors, selectedProcessor, originPath, customerAction, currentStep, customerOption, customerCurrency, transactions, isWithDraw}}
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
	 * this function sets and return object with local states
	 *
	 * @returns {{depositProcessors: Array, selectedProcessor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), originPath: (*|string), customerAction: (*|string), currentStep: (*|string), customerOption: (*|string), customerCurrency: string, transactions: ({}|*), isWithDraw: (*|int)}}
	 */
	refreshLocalState() {
		return {
			depositProcessors: CashierStore.getCustomer().depositProcessors,
			selectedProcessor: CashierStore.getProcessor(),
			originPath: CashierStore.getOriginPath(),
			customerAction: CashierStore.getCustomerAction(),
			currentStep: CashierStore.getCurrentStep(),
			customerOption: CashierStore.getCustomerAction(),
			customerCurrency: CashierStore.getCustomer().currency,
			transactions: CashierStore.getCustomer().lastTransactions,
			isWithDraw: CashierStore.getIsWithdraw()
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

	render() {
		return (
			<div className="container">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY')}</p>
					</Link>
					<MethodsDepositList
						selectedProcessor={parseInt(this.state.selectedProcessor.processorId)}
						depositProcessors={this.state.depositProcessors}
						originPath={this.state.originPath}/>
				</div>
				<div className="col-sm-6">
					{(() => {
						if (!this.state.selectedProcessor.processorId) {
							return <LoadingSpinner />;
						} else {
							return <MethodInfo selectedProcessor={this.state.selectedProcessor}
																 customerAction={this.state.customerAction}
																 originPath={this.state.originPath}
																 isWithDraw={this.state.isWithDraw}/>
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.MethodList = MethodList;
