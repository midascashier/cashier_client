import React from 'react'
import { Link } from 'react-router'
import { Info } from './headerComponents/Info'
import { translate } from '../constants/Translate'
import { CashierStore } from '../stores/CashierStore'
import { CustomerService } from './../services/CustomerService'
import { UIService } from './../services/UIService'
import { LoadingSpinner } from './loading/LoadingSpinner'

let PendingControlNumber = React.createClass({

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
	 * @returns {{transactions: {}}}
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
		if (isWithdraw == 1 ){
			customerOpt = "WITHDRAW";
		}
		return (
			<div id="pendingControlNumber">
				<Info />
				<div id="transactionHistory" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">
								<div className="title">Pending Control Numbers</div>

								{(() =>{
									if(transactionHistory.length == 0){
										return <LoadingSpinner/>
									}else {
										return <p>Content</p>
									}
								})()}

								<Link to={"/"+customerOpt.toLowerCase()+"/"}>
									<button type="button" className="btn btn-green">{translate(customerOpt)}</button>
								</Link>

							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports.PendingControlNumber = PendingControlNumber;
