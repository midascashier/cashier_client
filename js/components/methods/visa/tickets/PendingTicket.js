import React from 'react'
import {RedirectTicket} from '../../../methodTickets/RedirectTicket'

let VisaPendingTicket = React.createClass({

	render(){
		return (
			<div>
				<RedirectTicket/>
			</div>
		)
	}
});

module.exports.VisaPendingTicket = VisaPendingTicket;