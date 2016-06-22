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
		return {
			step: CashierStore.getCurrentStep(),
			processorSteps: CashierStore.getProcessorSteps()
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
	},

	render() {
		return (
			<div id="header">
				{(() => {
					if (this.state.step<=this.state.processorSteps) {
						return <Steps step={this.state.step} steps={this.state.processorSteps}/>
					}
				})()}
				<Info />
			</div>
		)
	}
});

module.exports.Header = Header;