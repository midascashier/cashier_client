import React from 'react'
import { translate } from '../../constants/Translate'
import { Input } from '../../components/Inputs'

let TransactionPendingMTCN = React.createClass({

	propTypes: {
		transactions: React.PropTypes.array
	},

	render() {
		let transactions = this.props.transactions;
		return (
			<div>
				{(() =>{
					if(transactions){

						let senderLabel = translate('PENDING_MTCN_SENDER', 'Sender');
						let receiverLabel = translate('PENDING_MTCN_RECEIVER', 'Receiver');
						let destinationLabel = translate('PENDING_MTCN_DESTINATION', 'Destination');
						let controlNumberLabel = translate('PENDING_MTCN_MTCN', 'Control Number');
						let amountLabel = translate('PENDING_MTCN_AMOUNT', 'Amount');
						let feeLabel = translate('PENDING_MTCN_FEE', 'Fee');
						let digitsLabel = translate('PENDING_MTCN_DIGITS');
						let btnConfirmLabel = translate('PROCESSING_BUTTON_CONFIRM', 'Confirm');
						let btnEditLabel = translate('PROCESSING_BUTTON_EDIT', 'Edit');

						let tables = [];
						transactions.map((transaction, i)=>{

							let transactionId = transaction.caTransaction_Id;
							let controlNumber = transaction.ControlNumber;
							let currencyAmount = transaction.CurrencyAmount;
							let currencyFee = transaction.CurrencyFee;
							let processorIdRoot = transaction.caProcessor_Id_Root;

							let digits = 11;
							if(processorIdRoot == 6){
								digits = 10;
							}else if (processorIdRoot == 16 || processorIdRoot == 36){
								digits = 8;
							}else if (processorIdRoot == 26){
								digits = 11;
							}

							tables.push(
								<div key={i} className=" table-responsive" id="TransactionPendingMTCN">
									<table className="table table-striped">
										<tbody>
											<tr>
												<th colSpan="4">{senderLabel}: {transaction.PAFirstName + ' ' + transaction.PALastName}</th>
												<th colSpan="1">{transaction.CardType}</th>
											</tr>
											<tr>
												<th colSpan="5">{receiverLabel}: {transaction.Name}</th>
											</tr>
											<tr>
												<th colSpan="5">{destinationLabel}: {transaction.Country + ', ' + transaction.State}</th>
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
													<Input type="text" id="controlNumber" value={controlNumber} maxlength={digits} placeholder={digits + ' ' + digitsLabel}/>
												</td>
												<td>
													<Input type="number" id="amount" value={currencyAmount}/>
												</td>
												<td>
													<Input type="number" id="fee" value={currencyFee}/>
												</td>
												<td>
													<input type="button" className="btn btn-green" value={btnConfirmLabel}/>
												</td>
												<td>
													<input type="button" className="btn btn-default" value={btnEditLabel}/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							);
						});
						return tables;
					} else{
						return (<p>No records!</p>)
					}
				})()}
			</div>
		)
	}
});

module.exports.TransactionPendingMTCN = TransactionPendingMTCN;