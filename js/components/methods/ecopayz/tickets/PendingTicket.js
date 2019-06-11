import React from 'react'
import {CashierStore} from '../../../../stores/CashierStore'
import {PendingTicket} from '../../../methodTickets/PendingTicket'
import {RedirectTicket} from '../../../methodTickets/RedirectTicket'

let EcopayzTicketPending = React.createClass({
	render(){
		let transaction = CashierStore.getLastDataTransactionResponse();
		if("gotoURLAction" in transaction && "gotoURL" in transaction){
			return (
				<div>
					<RedirectTicket/>
				</div>
			)
		}else{
			return (
				<div>
					<PendingTicket/>
				</div>
			)
		}
	}
});

module.exports.EcopayzTicketPending = EcopayzTicketPending;
