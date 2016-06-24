import React from 'react'
import {Steps} from './headerComponents/steps'
import {Info} from './headerComponents/info'
import {CashierStore} from './../stores/cashierStore'

let Header = React.createClass({
	getInitialState(){
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			step: CashierStore.getCurrentStep(),
			processorSteps: CashierStore.getProcessorSteps()
		}
	},

	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	render() {
		return (
			<div id="header">
				<Steps step={this.state.step} steps={this.state.processorSteps}/>
				<Info />
			</div>
		)
	}
});

module.exports.Header = Header;