import React from 'react'

let Input = React.createClass({
	propTypes: {
		value: React.PropTypes.string,
		onChange: React.PropTypes.func
	},

	/**
	 * Sets initial props to the component
	 *
	 * @returns {{value: string}}
	 */
	getDefaultProps() {
		return {
			value: ''
		};
	},

	/**
	 * local function which send by parameter to the function recevied on the props the value of the input
	 *
	 * @param e
	 */
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

module.exports.Input = Input;