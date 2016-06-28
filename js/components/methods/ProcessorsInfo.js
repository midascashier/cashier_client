import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../stores/CashierStore'
import {translate} from '../../constants/Translate'
import {ProcessorsList} from '../contentComponents/ProcessorsList'
import {ProcessorInfo} from '../contentComponents/ProcessorInfo'
import {LoadingSpinner} from '../../components/loading/LoadingSpinner'

let ProcessorsInfo = React.createClass({
	/**
	 * React function to set component inital state
	 *
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
	 */
	refreshLocalState() {
		return {
			customer: CashierStore.getCustomer(),
			selectedProcessor: CashierStore.getProcessor(),
			originPath: CashierStore.getOriginPath(),
			customerAction: CashierStore.getCustomerAction(),
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
					<ProcessorsList
						selectedProcessor={parseInt(this.state.selectedProcessor.processorId)}
						depositProcessors={this.state.customer.depositProcessors}
						originPath={this.state.originPath}/>
				</div>
				<div className="col-sm-6">
					{(() => {
						if (!this.state.selectedProcessor.processorId) {
							return <LoadingSpinner />;
						} else {
							return <ProcessorInfo selectedProcessor={this.state.selectedProcessor}
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

module.exports.ProcessorsInfo = ProcessorsInfo;