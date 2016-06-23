import React from 'react'

let MyInput = React.createClass({
	getInitialState() {
		return this.refreshLocalState();
	},

	refreshLocalState() {
		return {
			value: ''
		}
	},

	changeValue(event) {
		let value = event.currentTarget.value;
		this.setState({value: value});
	},

	render() {
		return (
			<div>
				<input
					type={this.props.type || 'text'}
					name={this.props.name}
					onChange={this.changeValue}
					value={this.state.value}
				/>
			</div>
		);
	}
});

module.exports.MyInput=MyInput;