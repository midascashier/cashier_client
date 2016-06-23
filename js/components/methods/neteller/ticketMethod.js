import React from 'react'
import {Link} from 'react-router'

let NetellerTicket = React.createClass({
	render() {
		return (
			<div id="methods">
				<Link to="/test/">test</Link>
				<h1>Your $ deposit was successful.</h1><br />
			</div>
		)
	}
});

module.exports.NetellerTicket = NetellerTicket;