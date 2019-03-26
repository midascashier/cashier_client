import React from 'react'
import {translate} from '../../../../constants/Translate'
import {UIService} from '../../../../services/UIService'
import {CashierStore} from '../../../../stores/CashierStore'
import {TransactionService} from '../../../../services/TransactionService'
import {ApplicationService} from '../../../../services/ApplicationService'
import cashier from '../../../../constants/Cashier'

let VisaRejectAmountTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*}
	 */
	getInitialState(){
		let transactionResponse = UIService.getLastTransactionResponse();
		let state = Object.assign(this.refreshLocalState(), {transactionAmount: transactionResponse.amount});
		return state;
	},

	/**
	 * build the state
	 *
	 * @returns {{currency: string, currencyAmount: string}}
	 */
	refreshLocalState(){
		let limits = UIService.getPayAccountLimits();
		let customer = UIService.getCustomerInformation();
		let transaction = UIService.getTransactionInformation();
		return {
			enableReprocess: false,
			currency: customer.currency,
			currencyAmount: transaction.amount,
			limits: limits
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
	 * reprocesses a credit card transaction that just failed.
	 */
	reProcessTransaction(){
		TransactionService.processCC();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	/**
	 * Set transaction amount in the store
	 *
	 * @param event
	 */
	changeValue(event){
		let amount = event.currentTarget.value;
		TransactionService.setAmount(amount);

		let limits = this.state.limits;
		let maxCurrencyAmount = Number(this.state.transactionAmount);

		if(limits.minAmount <= amount && amount < maxCurrencyAmount){
			this.setState({enableReprocess: true});
		}else{
			this.setState({enableReprocess: false});
		}
	},

	render(){

		let tags = [];
		let limits = this.state.limits;
		let currency = this.state.currency;
		let currencyAmount = this.state.currencyAmount;
		let transactionAmount = this.state.transactionAmount;
		tags['currencyFormat'] = ApplicationService.currency_format(transactionAmount) + ' ' + currency;
		let content = translate('CREDIT_CARD_DEPOSIT_REJECTED', '', tags);
    let processorId = UIService.getProcessorId();

		return (
			<div id="visaRejectAmountTicket">
				<div className="title">Quick fix...</div>
				<div className="col-sm-12">
					<p dangerouslySetInnerHTML={{__html: content}}/>
					<br/>
					<div className="row">
						<div className="form-group col-md-6 col-md-offset-3">
							<label for="">{translate('')}</label>
							<input type="number" id="amount" className="form-control center-block" value={currencyAmount}
										 onChange={this.changeValue}/>
							<small>{translate('PROCESSING_MIN', 'Min')}: {ApplicationService.currency_format(limits.minAmount) + ' ' + currency} - Max: Check your credit card limit.</small>
						</div>
					</div>
					<br/>
					<button type="button" className="btn btn-green" disabled={!this.state.enableReprocess} onClick={this.reProcessTransaction}>
						Complete this deposit
					</button>
					<p><a onClick={this.setFirstStep}>No thanks. I'll deposit a different way.</a></p>
				</div>
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

module.exports.VisaRejectAmountTicket = VisaRejectAmountTicket;