import React from 'react'
import {CashierActions} from '../actions/cashierActions'
import {CashierStore} from '../stores/CashierStore'

let Client = React.createClass({

	getInitialState(){
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
			sid: CashierStore.getCustomerSID()
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
		if (this.state.sid){
			this.context.router.push('/'+CashierStore.getUI().currentView+'/');
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