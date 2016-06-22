import React from 'react'
import {NetellerTicket} from './neteller/ticketMethod'

let Ticket = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object
	},

	render() {
		let ticket;
		switch (this.props.selectedProcessor.processorId) {
			case '333':
				ticket=<NetellerTicket/>
				break;
		}
		return (
			ticket
		)
	}
});

module.exports.Ticket = Ticket;