import React from 'react'
import { Info } from './headerComponents/Info'
import { translate } from '../constants/Translate'
import { CashierStore } from '../stores/CashierStore'
import { LoadingSpinner } from './loading/LoadingSpinner'
import { TransactionPendingMTCN } from '../components/contentComponents/TransactionPendingMTCN'
import { CustomerService } from './../services/CustomerService'

let PendingControlNumber = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{transactions}}
	 */
	getInitialState(){
		CustomerService.getPendingMTCNTransactions();
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transactions: Array}}
	 */
	refreshLocalState() {
		let customer = CashierStore.getCustomer();
		let lastTransactions = customer.pendingP2PTransactions;
		return {
			transactions: lastTransactions
		}
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
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {

		let pendingP2PTransactions = this.state.transactions;

		return (
			<div id="pendingControlNumber">
				<Info />
				<div id="pendingControlNumberTransactions" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">
								<div className="title">{translate('PENDING_MTCN', 'Pending Control Numbers')}</div>

								{(() =>{
									if(pendingP2PTransactions && pendingP2PTransactions.length > 0){
										return <TransactionPendingMTCN/>
									}else {
										return <LoadingSpinner/>
									}
								})()}

							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports.PendingControlNumber = PendingControlNumber;
