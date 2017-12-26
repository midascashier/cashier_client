import React from 'react'
import { CashierStore } from './../stores/CashierStore'
import { CustomerService } from './../services/CustomerService'

let Client = React.createClass({

	/**
	 * Showing in this container the component selected and the components or methods of the children at any point in the rendering time
	 */
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
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		let app = CashierStore.getApplication();
		if(!app.sid){
			CustomerService.startConnection();
		}
	}
});

module.exports.Client = Client;