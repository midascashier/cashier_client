import React from 'react'
import { Input } from '../../Inputs'
import { TransactionService } from '../../../services/TransactionService'

let Register = React.createClass({
	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState() {
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 */
	refreshLocalState() {
		return {
			displaySaveButton: true,
			payAccount: {
				account: ''
			}
		}
	},

	/**
	 * Sets netellerNewAccount
	 *
	 * @param event
	 */
	changeValue(event){
		this.setState({
			payAccount: {
				account: event
			}
		});
	},

	/**
	 * Sends request to register new payaccount
	 *
	 * @param e
	 * @returns {boolean}
	 */
	addNewPayAccount(e){
		e.preventDefault();
		for(let input in this.refs){
			if(this.refs[input].props.require && this.refs[input].props.value.length <= 0){
				return false;
			}
			if(!this.refs[input].state.isValid){
				return false;
			}
		}
		TransactionService.registerPayAccount(this.state.payAccount);
		this.setState({
			displaySaveButton: false
		});
	},

	render() {
		return (
			<div className="form-group">
				<form onSubmit={this.addNewPayAccount}>
					<label for="">Enter your Neteller Email Account:</label>
					<Input className="form-control" ref="netellerNewAccount" type="text" id="netellerNewAccount"
								 name="netellerNewAccount" ref="email" validate="email" require onChange={this.changeValue}
								 value={this.state.payAccount.account}/>
					{this.state.displaySaveButton ?
						<button type='submit' className='btn btn-green'>Save</button> : null }
				</form>
			</div>
		)
	}
});

module.exports.Register = Register;