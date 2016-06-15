import React from 'react'
import {CashierActions} from '../actions/cashierActions'
import {CashierStore} from '../stores/CashierStore'

let Client = React.createClass({

	getInitialState(){
		console.log(loginInfo);
		if (loginInfo.username && loginInfo.password){
			CashierActions.login(loginInfo);
		}
		return this.refreshLocalState();
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			sid: CashierStore.getCustomerSID(),
			customerOption: CashierStore.getCustomerAction()
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
		if (this.state.sid){
			let transitionTo = this.state.customerOption;
			this.context.router.push('/'+transitionTo+'/');
		}
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	render() {
		return (
			<div id="main">
				<div id="mainContent" className="global">
          <div className="container">
            {this.props.children}
          </div>
				</div>
			</div>
		)
	}
});

module.exports.Client = Client;