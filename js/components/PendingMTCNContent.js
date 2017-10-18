import React from 'react'
import { Link } from 'react-router'
import { Info } from './headerComponents/Info'
import { translate } from '../constants/Translate'
import cashier from '../constants/Cashier'
import { CashierStore } from '../stores/CashierStore'
import { LoadingSpinner } from './loading/LoadingSpinner'
import { TransactionPendingMTCN } from '../components/contentComponents/TransactionPendingMTCN'
import { UIService } from './../services/UIService'

let PendingControlNumber = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{transactions}}
	 */
	getInitialState(){
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
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {

		let pendingP2PTransactions = this.state.transactions;
		let isWithdraw = UIService.getIsWithDraw();
		let customerOpt = "DEPOSIT";
		if (isWithdraw == 1 ){
			customerOpt = "WITHDRAW";
		}

		return (
			<div id="pendingControlNumber">
				<Info />
				<div id="pendingControlNumberTransactions" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">
								<div className="title text-center">{translate('PENDING_MTCN', 'Pending Control Numbers')}</div>

								{(() =>{
									if(pendingP2PTransactions && pendingP2PTransactions.length > 0){
										if (this.state.transactions == cashier.NO_RESPONSE){
											return(
												<div>
													<p>No records!</p>
													<Link to={"/"+customerOpt.toLowerCase()+"/"}>
														<button type="button" className="btn btn-green center-block">{translate(customerOpt)}</button>
													</Link>
												</div>
											)
										}

										return <TransactionPendingMTCN/>
									}

									return <LoadingSpinner/>
								})()}

								{(() =>{
									if(!pendingP2PTransactions || pendingP2PTransactions.length == 0){
										return (
											<Link to={"/"+customerOpt.toLowerCase()+"/"}>
												<button type="button" className="btn btn-green center-block">{translate(customerOpt)}</button>
											</Link>
										)
									}
								})()}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
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
	}
});

module.exports.PendingControlNumber = PendingControlNumber;