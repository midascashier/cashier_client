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
	 * Sets OpenPayzNewAccount
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
			if(e.target[i].type != 'submit' && e.target[i].type != 'button'){
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
			<div id="ecoPayzRegister">
				<form onSubmit={this.addNewPayAccount}>
					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('ECOPAYZ_ACCOUNT', 'Enter New Account')}:</label>
						<div className="col-sm-8">
							<Input className="form-control" type="text" id="openPayzNewAccount" name="openPayzNewAccount"
										 ref="account" validate="isNumber" onChange={this.changeValue} value={this.state.payAccount.account}
										 require/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-4"></div>
						<div className="col-sm-2">
							{this.state.displaySaveButton ? <button type='submit'
																											className='btn btn-green'>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button> : null }
						</div>
						<div className="col-sm-2">
							{this.state.displaySaveButton ? <button type='button' onClick={this.cancel}
																											className='btn btn-green'>{translate('PROCESSING_BUTTON_CANCEL', 'Save')}</button> : null }
						</div>
					</div>
				</form>
			</div>
		)
	}
});

module.exports.Register = Register;