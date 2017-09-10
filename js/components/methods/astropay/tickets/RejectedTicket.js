import React from 'react'
import { UIService } from '../../../../services/UIService'
import { CashierStore } from '../../../../stores/CashierStore'
import { ApplicationService } from '../../../../services/ApplicationService'

let AstroPayRejectedTicket = React.createClass({

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
		let transactionResponse = UIService.getLastTransactionResponse();
		let creditCardTransaction = [];
		if (transactionResponse && transactionResponse.details && transactionResponse.details.creditCardTransaction){
			creditCardTransaction = transactionResponse.details.creditCardTransaction;
		}
		return {
			creditCardTransaction: creditCardTransaction
		}
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

	render() {
		let creditCardTransaction = this.state.creditCardTransaction;
		let transaction = CashierStore.getTransaction();
		return (
			<div id="astropayRejectedTicket">
				{(() =>{
					if(!creditCardTransaction || (!creditCardTransaction.PendingReprocess || !creditCardTransaction.PendingReprocess == 0)){
						return (
							<div className="col-sm-12">
								<div className="modules">
									<div className="row">
										<div className="col-sm-12">
											<div className="alert alert-danger" role="alert">
												<i className="fa fa-ban red"></i>
												<strong>Transaction Rejected</strong>
												<p>
													<strong>Unfortunately</strong>, we were unable to process your Astropay deposit for ${ApplicationService.currency_format(transaction.amount)} at this time.
													Perhaps our Customer Support team can help. Call us at 877-314-4195 or Live Chat. Or, you could try a <a onClick={this.setFirstStep}>different deposit method</a>.
												</p>
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
	}
});

module.exports.AstroPayRejectedTicket = AstroPayRejectedTicket;
