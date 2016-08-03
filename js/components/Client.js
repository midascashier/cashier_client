import React from 'react'
import { CustomerService } from './../services/CustomerService'

let Client = React.createClass({

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CustomerService.customerLogin();
	},

	render() {
		return (
			<div id="main">
				<div id="mainContent" className="global">
					<div id="client" className="container">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
});

module.exports.Client = Client;