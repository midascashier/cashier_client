import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/loadingSpinner'
import {translate} from '../../../constants/translate'
import {NetellerAskInfo} from './AskInfo'
import {NetellerInfoMethod} from './InfoMethod'
import {Link} from 'react-router'
import {CashierActions} from '../../../actions/cashierActions'

let Neteller = React.createClass({
	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierActions.getPayAccounts();
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
			transactions: CashierStore.getCustomer().lastTransactions
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
					<NetellerAskInfo originPath={this.state.originPath}
													 customerOption={this.state.customerOption}
													 selectedProcessor={this.state.selectedProcessor}/>;
				</div>
				<div className="col-sm-6">
					{(() => {
						if (!this.state.selectedProcessor.processorId) {
							return <LoadingSpinner />;
						} else {
							return <NetellerInfoMethod selectedProcessor={this.state.selectedProcessor}/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Neteller = Neteller;