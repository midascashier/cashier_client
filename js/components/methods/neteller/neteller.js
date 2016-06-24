import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {translate} from '../../../constants/Translate'
import {NetellerAskInfo} from './AskInfo'
import {NetellerInfoMethod} from './InfoMethod'
import {CashierActions} from '../../../actions/CashierActions'

let Neteller = React.createClass({
	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{depositProcessors, selectedProcessor, originPath, customerAction, currentStep, customerOption, customerCurrency, transactions, transactionAmount}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierActions.getPayAccounts();
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{depositProcessors: Array, selectedProcessor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), originPath: (*|string), customerAction: (*|string), currentStep: (*|string), customerOption: (*|string), customerCurrency: string, transactions: ({}|*), transactionAmount: (string|number|*)}}
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
			transactionAmount: CashierStore.getTransaction().amount
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
	 * custom function to sets password in askInfo Component
	 *
	 * @param value
	 * @constructor
	 */
	NetellerPasswordInput(value) {
		this.setState({
			password: value
		});
	},

	render() {
		console.log(this.props.netellerAmountController.amount);
		return (
			<div className="container">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY')}</p>
					</Link>
					<NetellerAskInfo originPath={this.state.originPath}
													 customerOption={this.state.customerOption}
													 selectedProcessor={this.state.selectedProcessor}
													 NetellerPasswordInput={this.NetellerPasswordInput}
													 password={this.state.password}/>
				</div>
				<div className="col-sm-6">
					{(() => {
						if (!this.state.selectedProcessor.processorId) {
							return <LoadingSpinner />;
						} else {
							return <NetellerInfoMethod selectedProcessor={this.state.selectedProcessor}
																				 password={this.state.password}
																				 transactionAmount={this.state.transactionAmount}/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Neteller = Neteller;