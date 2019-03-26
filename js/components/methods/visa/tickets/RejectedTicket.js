import React from 'react'
import {UIService} from '../../../../services/UIService'
import {CashierStore} from '../../../../stores/CashierStore'
import {ApplicationService} from '../../../../services/ApplicationService'
import cashier from '../../../../constants/Cashier'

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
	refreshLocalState(){
		let company = UIService.getCompanyInformation();
		let customer = UIService.getCustomerInformation();
		let transaction = UIService.getTransactionInformation();
		let processorName = UIService.getProcessorDisplayName();

		let transactionResponse = UIService.getLastTransactionResponse();
		let creditCardTransaction = [];
		if(transactionResponse && transactionResponse.details && transactionResponse.details.creditCardTransaction){
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
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	},

	/**
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	/**
	 * function to open chat window
	 */
	openChat(event){
		chat();
	},

	render(){
		let creditCardTransaction = this.state.creditCardTransaction;

		let currencyAmount = this.state.currencyAmount;
		let currency = this.state.currency;
		let processorName = this.state.processorName;
		let companyPhone = this.state.companyPhone;
		let isWithDraw = UIService.getIsWithDraw();
    let processorId = UIService.getProcessorId();
		let action;
		if(isWithDraw){
			action = "withdraw";
		}else{
			action = "deposit";
		}

		return (
			<div id="visaRejectedTicket">
				{(() => {
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
														At this moment your transaction has been declined. We suggest you try depositing using alternative options such as Mastercard or Bitcoin. You can also call our poker solutions team at 1-877-314-4195 or visit our Live Chat and we will assist you with the transaction.
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
        {(() =>{
          if(processorId == cashier.PROCESSOR_ID_VISA){
            lpTag.section = ["VisaRejected"];
          }
          return <div></div>
        })()}
			</div>
		)
	}
});

module.exports.VisaRejectedTicket = VisaRejectedTicket;
