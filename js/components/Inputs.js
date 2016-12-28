import React from 'react'
import { ApplicationService } from '../services/ApplicationService'

let Input = React.createClass({
	propTypes: {
		value: React.PropTypes.node,
		onChange: React.PropTypes.func
	},

	/**
	 * React function to set component initial state
	 */

	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			isValid: true,
			errorMessage: "",
			inputError: false,
			value: ''
		}
	},

	/**
	 * Validates inputs value and sets if is valid information or not
	 *
	 * @param e
	 * @returns {*}
	 */
	validateData(e){
		let isValid;
		if(!ApplicationService.validateInfo(e, this.props.validate)){
			let errorMessage = "Invalid Data";
			switch(this.props.id){
				case "ccName":
					errorMessage = "Invalid Card Holder's Name";
					break;
				case "creditCardNumber":
					errorMessage = "Invalid Card Number";
					break;
				case "cvv":
					errorMessage = "CVV";
					break;
				case "ssn":
					errorMessage = "SSN";
					break
			}
			isValid = false;
			this.setState(
				{
					isValid: false,
					errorMessage: errorMessage,
					value: e
				}
			);
		} else{
			isValid = true;
			this.setState(
				{
					isValid: true,
					errorMessage: "",
					value: e
				}
			);
		}
		return isValid;
	},

	/**
	 * flag to show error message
	 */
	handleBlur(){
		let actualState = this.state;
		actualState.inputError = true;
		this.setState(
			actualState
		);
	},

	/**
	 * flag to show error message
	 */
	handleFocus(){
		let actualState = this.state;
		actualState.inputError = false;
		this.setState(
			actualState
		);
	},

	/**
	 * local function which send by parameter to the function recevied on the props the value of the input
	 *
	 * @param e
	 */
	changeHandler(e) {
		let value = e.target.value;
		let isValid;
		if(typeof this.props.onChange === 'function'){
			if(this.props.validate){
				isValid = this.validateData(value);
			}
			if(!isValid && value.length > 0){
				e.target.style['border-color'] = 'red';
			} else{
				e.target.style['border-color'] = '';
			}
			this.props.onChange(value, isValid);
		}
	},

	render() {
		let require = 0;
		if(typeof this.props.require != "undefined"){
			require = 1;
		}

		let disabled = false;
		if(typeof this.props.disabled != "undefined"){
			disabled = true;
		}

		return (
			<div id={this.props.id + "InputContent"}>
				{(() =>{
					if(!disabled){
						return <input
							className="form-control"
							type={this.props.type || 'text'}
							name={this.props.name}
							onBlur={this.handleBlur}
							onFocus={this.handleFocus}
							id={this.props.id}
							placeholder={this.props.placeholder || ''}
							onChange={this.changeHandler}
							value={this.props.value}
							data-isValid={this.state.isValid}
							data-isRequired={require}
							data-validation={this.props.validate}
						/>
					} else{
						return <input
							className="form-control"
							type={this.props.type || 'text'}
							name={this.props.name}
							id={this.props.id}
							disabled
							placeholder={this.props.placeholder || ''}
							onChange={this.changeHandler}
							value={this.props.value}
							data-isValid={this.state.isValid}
							data-isRequired={require}
							data-validation={this.props.validate}
						/>
					}
				})()}

				{(() =>{
					if(this.props.validate && !this.state.isValid && this.state.value && this.state.inputError){
						return (
							<div className="alert alert-danger" role="alert">
								<i class="fa fa-thumbs-o-down red"></i>
								<span>{this.state.errorMessage}</span>
							</div>
						)
					}
				})()}
			</div>
		)
	}
});

module.exports.Input = Input;
