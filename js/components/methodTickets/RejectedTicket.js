import React from 'react'
import { CashierStore } from '../../stores/CashierStore'
import { UIService } from '../../services/UIService'

let RejectedTicket = React.createClass({

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
		let processorName = UIService.getProcessorDisplayName().toUpperCase();
		return {
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

	render() {

		let currencyAmount = this.state.currencyAmount;
		let currency = this.state.currency;
		let processorName = this.state.processorName;
		let companyPhone = this.state.companyPhone;

		return (
			<div className="col-sm-12">
				<div className="modules">
					<div className="row">
						<div className="col-sm-12">
							<div className="alert alert-danger" role="alert">
								<i className="fa fa-ban red"></i>
								<strong>Transaction Rejected</strong>
								<p>
									<strong>Unfortunately</strong>, we were unable to process your <strong>{processorName}</strong> deposit for {currencyAmount + ' ' + currency} at this time.
									Perhaps our Customer Support team can help. Call us at {companyPhone} or Live Chat. Or, you could try a <a onClick={this.setFirstStep}>different deposit method</a>.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.RejectedTicket = RejectedTicket;
