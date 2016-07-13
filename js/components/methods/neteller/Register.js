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

	addNewPayAccount(e){
		e.preventDefault();
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
								 name="netellerNewAccount" onChange={this.changeValue} value={this.state.payAccount.account}/>
					{this.state.displaySaveButton ?
						<button type='submit' className='btn btn-green'>Save</button> : null }
				</form>
			</div>
		)
	}
});

module.exports.Register = Register;