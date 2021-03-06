import React from 'react'
import {Link} from 'react-router'
import Cashier from '../../constants/Cashier'
import {Input} from '../commonComponents/Inputs'
import {UIService} from '../../services/UIService'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'
import {TransactionService} from '../../services/TransactionService'

let TransactionPendingMTCN = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{transactions}|{transactions: Array}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transactions: Array}}
	 */
	refreshLocalState(){
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
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * Change current value
	 *
	 * @param transactionId
	 * @param attribute
	 * @param value
	 * @param isSelect
	 * @returns {boolean}
	 */
	changeValue(transactionId, attribute, value, isSelect){
		const transactions = this.state.transactions;
		const transaction = transactions[transactionId];

		transaction[attribute] = value;
		transactions[transactionId] = transaction;
		this.setState({transactions: transactions});
		return true;
	},

	/**
	 * this function sends submit transaction to cashier
	 *
	 * @param transaction
	 */
	submitTransaction(transaction){
		TransactionService.processSubmit(transaction);
	},

	render(){
		let transactions = this.state.transactions;
		let isWithdraw = UIService.getIsWithDraw();
		let customerOpt = "DEPOSIT";
		if(isWithdraw == 1){
			customerOpt = "WITHDRAW";
		}

		return (
			<div id="controlNumberList" className="mtcn scroll">
				{(() => {
					let senderLabel = translate('PENDING_MTCN_SENDER', 'Sender');
					let receiverLabel = translate('PENDING_MTCN_RECEIVER', 'Receiver');
					let destinationLabel = translate('PENDING_MTCN_DESTINATION', 'Destination');
					let controlNumberLabel = translate('PENDING_MTCN_MTCN', 'Control Number');
					let amountLabel = translate('PENDING_MTCN_AMOUNT', 'Amount');
					let feeLabel = translate('PENDING_MTCN_FEE', 'Fee');
					let digitsLabel = translate('PENDING_MTCN_DIGITS', 'digits');
					let btnConfirmLabel = translate('PROCESSING_BUTTON_CONFIRM', 'Confirm');
					let btnEditLabel = translate('PROCESSING_BUTTON_EDIT', 'Edit');

					let tables = [];
					transactions.map((transaction, i) => {

						let transactionId = transaction.caTransaction_Id;
						let controlNumber = transaction.ControlNumber;
						let currencyAmount = transaction.CurrencyAmount;
						let currencyFee = transaction.CurrencyFee;
						let processorIdRoot = transaction.caProcessor_Id_Root;

						let digits = 11;
						if(processorIdRoot == 6){
							digits = 10;
						}else if(processorIdRoot == 16 || processorIdRoot == 36){
							digits = 8;
						}else if(processorIdRoot == 26){
							digits = 11;
						}

						let isConfirmEnabled = true;
						if(digits == controlNumber.length){
							isConfirmEnabled = false;
						}

						tables.push(
							<div key={i} id={"transactionPendingMTCN" + transactionId} className="table-responsive">
								<table className="table table-striped mtcn-table">
									<tbody>
									<tr>
										<th colSpan="4">
											{senderLabel}: <span>{transaction.PAFirstName + ' ' + transaction.PALastName}</span>
										</th>
										<th colSpan="1">{transaction.CardType}</th>
									</tr>
									<tr>
										<th colSpan="5">{receiverLabel}: <span>{transaction.Name}</span></th>
									</tr>
									<tr>
										<th colSpan="5">
											{destinationLabel}: <span>{transaction.Country + ', ' + transaction.State}</span>
										</th>
									</tr>
									<tr>
										<td><strong>{controlNumberLabel}</strong></td>
										<td><strong>{amountLabel}</strong></td>
										<td><strong>{feeLabel}</strong></td>
										<td></td>
										<td></td>
									</tr>
									<tr id={"transaction" + transactionId}>
										<td>
											<Input
												type="text"
												id="controlNumber"
												className="form-control"
												value={controlNumber}
												minLength={digits}
												maxLength={digits}
												placeholder={digits + ' ' + digitsLabel}
												onChange={this.changeValue.bind(this, transactionId, 'ControlNumber')}
												validate="isNumber" required
											/>
										</td>
										<td>
											<Input
												type="number"
												min="0.0001"
												step="0.1" id="amount"
												className="form-control"
												value={currencyAmount}
												onChange={this.changeValue.bind(this, transactionId, 'CurrencyAmount')}
												validate="isNumber" required
											/>
										</td>
										<td>
											<Input
												type="number"
												min="0.0001"
												step="0.1"
												id="fee"
												className="form-control"
												value={currencyFee}
												onChange={this.changeValue.bind(this, transactionId, 'CurrencyFee')}
												validate="isNumber" required
											/>
										</td>
										<td>
											<button type="button" className="btn btn-green" disabled={isConfirmEnabled} onClick={this.submitTransaction.bind(this, transaction)}>
												{btnConfirmLabel}
											</button>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						);
					});
					return tables;
				})()}

				<Link to={"/" + customerOpt.toLowerCase() + "/"}>
					<button type="button" className="btn btn-green">{translate(customerOpt)}</button>
				</Link>
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.TransactionPendingMTCN = TransactionPendingMTCN;