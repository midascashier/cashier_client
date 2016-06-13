import React from 'react'
import {Link} from 'react-router'
import {translate} from '../constants/translate'
import {CashierActions} from '../actions/cashierActions'
import {CashierStore} from '../stores/CashierStore'

let Client = React.createClass({
	getInitialState(){
		if (loginInfo.username && loginInfo.password){
			CashierActions.login(loginInfo);
		}
		return null;
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	getCustomerSID() {
		return {
			sid: CashierStore.getCustomerSID()
		}
	},

	_onChange() {
		if (this.isMounted() === true) {
			this.setState(this.getCustomerSID);
			if (this.state.sid){
				this.context.router.push("/deposit/");
			}
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