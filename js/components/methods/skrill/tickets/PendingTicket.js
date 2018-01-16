import React from 'react'
import {RedirectTicket} from '../../../methodTickets/RedirectTicket'

let SkrillTicketPending = React.createClass({
    
	render(){
		return (
			<div>
				<RedirectTicket/>
			</div>
		)
	}
});

module.exports.SkrillTicketPending = SkrillTicketPending;