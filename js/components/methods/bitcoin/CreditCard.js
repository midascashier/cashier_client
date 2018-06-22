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

		let cards = this.state.cards;
		let options = [];

		for(let i in cards){
			let card = cards[i];
			options.push(<option key={card.caPayAccount_Id} value={card.caPayAccount_Id}>{card.Last4}</option>);
		}

		return (
			<div className="row">
				<div className="col-12">
					<select className="form-control">{options}</select>
				</div>
			</div>
		);
	},

	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	}

});

module.exports.CreditCard = CreditCard;