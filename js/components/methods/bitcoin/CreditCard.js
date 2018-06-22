/**
 * Created by armandoc on 6/22/2018.
 */
import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {CustomerService} from '../../../services/CustomerService'

let CreditCard = React.createClass({

	getInitialState(){
		CustomerService.getCustomerPayAccounts();
		return this.parameters();
	},

	parameters(){
		return {
			cards: CashierStore.getCustomerPayAccounts()
		}
	},

	_onChange(){
		this.setState(this.parameters);
	},

	render() {

		console.log(this.state);

		return (
			<select>
				<option>Select credit card</option>
			</select>
		);
	},

	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	}

});

module.exports.CreditCard = CreditCard;