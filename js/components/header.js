import React from 'react'
import {Steps} from './headerComponents/steps'
import {Info} from './headerComponents/info'
import {CashierStore} from './../stores/CashierStore'

let Header = React.createClass({
	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount: function() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		let step = CashierStore.getCurrentStep();
		return {
			step: step
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
	},
	render() {
		return (
			<div id="header">
				<Steps step={this.state.step}/>
				<Info />
			</div>
		)
	}
});

module.exports.Header = Header;