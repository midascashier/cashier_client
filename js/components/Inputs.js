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
			errorMessage: ""
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
			let errorMessage = " Invalid!";
			switch(this.props.id){
				case "ccName":
					errorMessage = errorMessage + "Card Holder's Name";
					break;
				case "creditCardNumber":
					errorMessage = errorMessage + "Credit Card";
					break;
				case "cvv":
					errorMessage = errorMessage + "CVV";
					break
			}
			isValid = false;
			this.setState(
				{
					isValid: false,
					errorMessage: errorMessage
				}
			);
		} else{
			isValid = true;
			this.setState(
				{
					isValid: true,
					errorMessage: ""
				}
			);
		}
		return isValid;
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
			this.props.onChange(value, isValid);
		}
	},

	render() {
		let require = 0;
		if (typeof this.props.require != "undefined"){
			require = 1;
		}
		return (
			<div>
				<input
					className="form-control"
					type={this.props.type || 'text'}
					name={this.props.name}
					id={this.props.id}
					onChange={this.changeHandler}
					value={this.props.value}
					data-isValid={this.state.isValid}
					data-isRequired={require}
				/>
				{(() =>{
					if(this.props.validate && !this.state.isValid && this.props.value){
						return <div>{this.state.errorMessage}</div>
					}
				})()}
			</div>

		)
	}
});

module.exports.Input = Input;
