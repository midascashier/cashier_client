import React from 'react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'
import { ApplicationService } from '../../../../services/ApplicationService'

let VisaRejectedTicket = React.createClass({

	/**
	 * initialize the state
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 */
	refreshLocalState() {
		let company = UIService.getCompanyInformation();
		let customer = UIService.getCustomerInformation();
		let transaction = UIService.getTransactionInformation();
		let processorName = UIService.getProcessorDisplayName();

		let transactionResponse = UIService.getLastTransactionResponse();
		let creditCardTransaction = [];
		if (transactionResponse && transactionResponse.details && transactionResponse.details.creditCardTransaction){
			creditCardTransaction = transactionResponse.details.creditCardTransaction;
		}
		return {
			creditCardTransaction: creditCardTransaction,
			currency: customer.currency,
			currencyAmount: transaction.amount,
			processorName: processorName,
			companyPhone: company.companyLabel.COMPANY_PHONE
		}
	},

	/**
	 * component is ready
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
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	/**
	 * function to open chat window
	 */
	openChat(event){
		chat();
	},

	render() {
		let creditCardTransaction = this.state.creditCardTransaction;

		let currencyAmount = this.state.currencyAmount;
		let currency = this.state.currency;
		let processorName = this.state.processorName;
		let companyPhone = this.state.companyPhone;
		let isWithDraw = UIService.getIsWithDraw();
		let action;
		if(isWithDraw){
			action = "withdraw";
		}else{
			action = "deposit";
		}

		return (
			<div id="visaRejectedTicket">
				{(() =>{
					if(!creditCardTransaction || (!creditCardTransaction.PendingReprocess || !creditCardTransaction.PendingReprocess == 0)){
						return (
							<div className="col-sm-12">
								<div className="modules">
									<div className="row">
										<div className="col-sm-12">
											<div className="alert alert-danger" role="alert">

												<div className="text-center col-sm-12 ticket-header">
													<i className="fa fa-ban red"></i>
													<strong>
														Transaction Rejected
													</strong>
												</div>
												<div className="ticket-body">
													<p>
														<strong>Unfortunately</strong>, we were unable to process your <strong>{processorName}</strong> {action} for <strong>{ApplicationService.currency_format(currencyAmount) + ' ' + currency}</strong> at this time.
													</p>
													<p>
														Perhaps our Customer Support team can help.
													</p>
													<p>
														Call us at {companyPhone} or <a onClick={this.openChat}>Live Chat</a> or you could try a <a onClick={this.setFirstStep}>different deposit method</a>.
													</p>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						)
					}else{
						return this.props.children;
					}
				})()}
			</div>
		)
	}
});

module.exports.VisaRejectedTicket = VisaRejectedTicket;
