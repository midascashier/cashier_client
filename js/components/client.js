import React from 'react'
import {CashierActions} from '../actions/cashierActions'
import {CashierStore} from '../stores/cashierStore'
import RouterContainer from '../services/routerContainer'

let Client = React.createClass({

	getInitialState(){
		if (loginInfo.username && loginInfo.password){
			CashierActions.login(loginInfo);
		}
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			sid: CashierStore.getCustomerSID()
		}
	},

	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
		if (this.state.sid && this.props.location.pathname=="/"){
			let nextPath = '/'+CashierStore.getUI().currentView+'/';
			RouterContainer.get().props.history.push(nextPath);
		}
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