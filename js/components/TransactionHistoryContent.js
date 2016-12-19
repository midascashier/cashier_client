import React from 'react'
import { Link } from 'react-router'
import { Info } from './headerComponents/Info'
import { TransactionHistory } from './contentComponents/TransactionHistory'
import { translate } from '../constants/Translate'
import { CashierStore } from '../stores/CashierStore'
import { CustomerService } from './../services/CustomerService'
import { UIService } from './../services/UIService'
import { LoadingSpinner } from './loading/LoadingSpinner'

let TransactionHistoryContent = React.createClass({

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{transactions}}
	 */
	getInitialState(){
		CustomerService.getCustomerTransactions();
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transactions: Array}}
	 */
	refreshLocalState() {
		let customer = CashierStore.getCustomer();
		let lastTransactions = customer.lastTransactions;
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

		let transactionHistory = this.state.transactions;
		let isWithdraw = UIService.getIsWithDraw();
		let customerOpt = "DEPOSIT";
		if(isWithdraw == 1){
			customerOpt = "WITHDRAW";
		}
		return (
			<div id="transactionHistoryContent">
				<Info />
				<div id="transactionHistory" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
								<div className="title text-center">{translate('TRANSACTION_HISTORY_TITLE')}</div>
								<div className="history">
									<div className="col-sm-7">
									{(() =>{
										if(transactionHistory && transactionHistory.length == 0){
											return <LoadingSpinner/>
										} else{
											return <TransactionHistory transactions={transactionHistory}/>
										}
									})()}
									</div>
									<div className="col-sm-5">
									<ul className="list-group">
										<li>
											<span>{translate('TRANSACTION_STATUS_PENDING')}: </span>{translate('TRANSACTION_HISTORY_STATUS_PENDING')}
										</li>
										<li>
											<span>{translate('TRANSACTION_STATUS_PROCESSING')}: </span>{translate('TRANSACTION_HISTORY_STATUS_PROCESSING')}
										</li>
										<li>
											<span>{translate('TRANSACTION_STATUS_PRE_APPROVE')}: </span>{translate('TRANSACTION_HISTORY_STATUS_PRE_APPROVE')}
										</li>
										<li>
											<span>{translate('TRANSACTION_STATUS_APPROVED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_APPROVED')}
										</li>
										<li>
											<span>{translate('TRANSACTION_STATUS_REJECTED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_REJECTED')}
										</li>
										<li>
											<span>{translate('TRANSACTION_STATUS_CANCELLED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_CANCELLED')}
										</li>
										<li>
											<span>{translate('TRANSACTION_STATUS_FAILED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_FAILED')}
										</li>
									</ul>
										<div className="row">
											<div className="col-sm-6">
												<Link to={"/"+customerOpt.toLowerCase()+"/"}>
													<button type="submit" className="btn btn-green">{translate(customerOpt)}</button>
												</Link>
											</div>
										</div>
								</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.TransactionHistoryContent = TransactionHistoryContent;
