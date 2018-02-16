import React from 'react'
import {UIService} from '../../services/UIService'
import {inputsErrorMsgs} from '../../constants/inputsErrorMsgs' //TODO add message error types in the input validation
import {ApplicationService} from '../../services/ApplicationService'
import {translate} from '../../constants/Translate'

let Input = React.createClass({

	propTypes: {
		value: React.PropTypes.node,
		onChange: React.PropTypes.func,
		customValidations: React.PropTypes.object
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
		let validate;

		if(this.props.validate === 'rgxValidate'){
			let rgx = '';
			if(this.props.id === 'zip'){
				let compare = UIService.getCountrySelected();
				rgx = UIService.getCurrentZipCodeRgx(compare);
			}

			validate = ApplicationService.validateInfo(e, this.props.validate, rgx);
		}else{
			validate = ApplicationService.validateInfo(e, this.props.validate);
		}

		if(!validate){
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
		} else {

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
	 * local function which send by parameter to the function received on the props the value of the input
	 *
	 * @param e
	 */
	changeHandler(e) {
		let isValid = true;
		let value = e.target.value;

		if(typeof this.props.onChange === 'function') {
			if(this.props.validate) {
				isValid = this.validateData(value);
			}
			if(!isValid && value.length > 0) {
				e.target.style['border-color'] = 'red';
			} else {
				e.target.style['border-color'] = '';
			}

			this.props.onChange(value, isValid);
		}
	},

	handleCustomValidations(currentValue) {
		let isValid = true;
		if (this.props.customValidations) {
			let obj = this.props.customValidations;
			let error = Object.keys(obj).find((key) => obj[key] === true);

			if(error) {
				isValid = false;
				this.setState({
					isValid: false,
					errorMessage: translate(error),
					value: currentValue
				});
			}
		}
		return isValid;
	},

	render() {
		let require = 0;
		if(typeof this.props.require !== "undefined"){
			require = 1;
		}

		let disabled = false;
		if(typeof this.props.disabled !== "undefined"){
			disabled = true;
		}

		let props = disabled ? {
			disabled: true
		} : {
			onBlur: this.handleBlur,
			onFocus: this.handleFocus
		};

		let validate = this.props.validate;
		let customValidations = this.props.customValidations;
		let isValid = this.state.isValid;
		let value = this.state.value || this.props.value;

		if(this.props.customValidations && isValid) {
			isValid = this.handleCustomValidations(value);
		}

		return (
			<div id={this.props.id + "InputContent"}>
				<input
					className="form-control"
					type={this.props.type || 'text'}
					name={this.props.name}
					id={this.props.id}
					{...props}
					placeholder={this.props.placeholder || ''}
					onChange={this.changeHandler}
					value={this.props.value}
					data-isValid={this.state.isValid}
					data-isRequired={require}
					data-validation={this.props.validate}
				/>
				{
					((validate || customValidations) && !isValid && value) &&
					<div className="alert alert-danger" role="alert">
						<i className="fa fa-thumbs-o-down red"/>
						<span>{this.state.errorMessage}</span>
					</div>
				}
			</div>
		)
	}
});

module.exports.Input = Input;