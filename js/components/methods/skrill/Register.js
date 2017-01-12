import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { TransactionService } from '../../../services/TransactionService'
import { ApplicationService } from '../../../services/ApplicationService'
import { CashierActions } from '../../../actions/CashierActions'
import { CashierStore } from '../../../stores/CashierStore'

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

		for(let i = 0; i < e.target.length; i++){
			if(e.target[i].type != 'submit' && e.target[i].type != 'button' && e.target[i].type != 'checkbox'){
				if(parseInt(e.target[i].getAttribute('data-isRequired')) == 1 && e.target[i].value.length <= 0){
					e.target[i].style['border-color'] = 'red';
					e.target[i].focus();
					return false;
				}

				if(!ApplicationService.validateInfo(e.target[i].value, e.target[i].getAttribute('data-validation'))){
					e.target[i].style['border-color'] = 'red';
					e.target[i].focus();
					return false;
				}
			}
		}

		TransactionService.registerPayAccount(this.state.payAccount);
		this.setState({
			displaySaveButton: false
		});
	},

	/**
	 * Cancel button
	 */
	cancel() {
		let payAccounts = CashierStore.getProcessorPayAccount();
		if(Object.keys(payAccounts).length > 0){
			let processorID = CashierStore.getProcessor();
			let previousPayAccount = 0;
			for(let payAccount in payAccounts){
				if(previousPayAccount == 0){
					previousPayAccount = payAccount;
				}
			}
			CashierActions.changePayAccount(previousPayAccount, processorID.processorId);
		}
	},

	render() {
		return (
			<div id="netellerRegister">
				<form onSubmit={this.addNewPayAccount}>
					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('SKRILL_EMAIL', 'Enter Email')}:</label>
						<div className="col-sm-8">
							<Input className="form-control" type="text" id="SkrillAccount" name="SkrillAccount" ref="email"
										 validate="isEmail" onChange={this.changeValue} value={this.state.payAccount.account} require/>
						</div>
					</div>
				</form>
				<div className="col-md-4 col-md-offset-4">
					<div className="row">
						<div className="col-sm-6">
							{this.state.displaySaveButton ? <button type='submit'
																											className='btn btn-green'>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button> : null }
						</div>
						<div className="col-sm-6">
							{this.state.displaySaveButton ? <button type='button' onClick={this.cancel}
																											className='btn btn-green'>{translate('PROCESSING_BUTTON_CANCEL', 'Save')}</button> : null }
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.Register = Register;