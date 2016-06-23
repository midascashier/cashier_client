import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../stores/CashierStore'
import {translate} from '../../constants/translate'
import {MethodsDepositList} from '../contentComponents/methodsDepositList'
import {MethodInfo} from '../contentComponents/methodInfo'
import {LoadingSpinner} from '../../components/loading/loadingSpinner'


let MethodList = React.createClass({
	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

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
