import React from 'react'
import { ApplicationService } from '../services/ApplicationService'

let Input = React.createClass({
	propTypes: {
		value: React.PropTypes.string,
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
		let errorMessage = " Invalid!";

		if(!ApplicationService.validateInfo(e, this.props.validate)){
			switch(this.props.id){
				case "ccName":
					errorMessage = "Card Holder's Name" + errorMessage;
					break;
				case "creditCardNumber":
					errorMessage = "Credit Card" + errorMessage;
					break;
				case "cvv":
					errorMessage = "CVV" + errorMessage;
					break
			}
			this.setState(
				{
					isValid: false,
					errorMessage: errorMessage
				}
			)
		} else{
			this.setState(
				{
					isValid: true,
					errorMessage: ""
				}
			)
		}
		return e;
	},

	/**
	 * local function which send by parameter to the function recevied on the props the value of the input
	 *
	 * @param e
	 */
	changeHandler(e) {
		let value = e.target.value;
		if(typeof this.props.onChange === 'function'){
			if(this.props.validate){
				this.validateData(value);
			}
			this.props.onChange(value, this.state.isValid);
		}
	},

	render() {
		return (
			<div>
				<input
					className="form-control"
					type={this.props.type || 'text'}
					name={this.props.name}
					onChange={this.changeHandler}
					value={this.props.value}
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
