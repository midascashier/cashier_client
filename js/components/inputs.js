import React from 'react'

let Input = React.createClass({
	propTypes: {
		value:      React.PropTypes.string,
		onChange:   React.PropTypes.func
	},

	getDefaultProps() {
		return {
			value: ''
		};
	},

	changeHandler(e) {
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(e.target.value);
		}
	},

	render() {
		return (
			<div>
				<input
					type={this.props.type || 'text'}
					name={this.props.name}
					onChange={this.changeHandler}
					value={this.props.value}
				/>
			</div>
		)
	}
});

module.exports.Input=Input;