import React from 'react'
import {RedirectTicket} from '../../../methodTickets/RedirectTicket'

let EcopayzTicketPending = React.createClass({

	render(){
		return (
			<div>
				<RedirectTicket/>
			</div>
		)
	}
});

module.exports.EcopayzTicketPending = EcopayzTicketPending;
