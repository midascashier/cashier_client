import React from 'react'
import {UIService} from '../../../../services/UIService'
import  {translate} from '../../../../constants/Translate'
import {CashierStore} from '../../../../stores/CashierStore'
import {ApplicationService} from  '../../../../services/ApplicationService'

let CC_99CentsApprovedTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*|{address}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * build the state
	 *
	 * @returns {{balance: string, email: string, currencyAmount: string, descriptor: string}}
	 */
	refreshLocalState(){
		let customer = UIService.getCustomerInformation();
		let transaction = UIService.getTransactionInformation();
		let transactionResponse = UIService.getLastTransactionResponse();
		let descriptor = "Loading...";
		if(transactionResponse && transactionResponse.details && transactionResponse.details.creditCardTransaction){
			descriptor = transactionResponse.details.creditCardTransaction.Descriptor;
		}

		return {
			email: customer.personalInformation.email,
			currency: customer.currency,
			balance: customer.balance,
			currencyAmount: transaction.amount,
			descriptor: descriptor
		}
	},

	/**
	 * component is ready
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * refresh the state when changes occur
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	render(){
		let originPath = UIService.getOriginPath();
		let currencyAmount = this.state.currencyAmount;
		let currency = this.state.currency;
		let email = this.state.email;
		let balance = this.state.balance;
		let descriptor = this.state.descriptor;

		let tags = [];
		tags['email'] = email;
		tags['descriptor'] = descriptor;
		tags['currencyFormat'] = ApplicationService.currency_format(balance) + ' ' + currency;
		tags['currencyAmount'] = ApplicationService.currency_format(currencyAmount) + ' ' + currency;
		let content = translate('CC_99CENTS__DEPOSIT_SUCCESSFUL', '', tags);

		return (
			<div className="internal-content" id="cc_99centsApprovedTicket">
				<div className="row">
					<div className="col-sm-6">
						<div className="box">
							<a>
								<img className="img-responsive banner" src={originPath + '/images/promo1.jpg'} alt="Promo"/>
							</a>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="success-message">
							<i className="fa fa-check-circle-o green"/>
							<div dangerouslySetInnerHTML={{__html: content}}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.CC_99CentsApprovedTicket = CC_99CentsApprovedTicket;