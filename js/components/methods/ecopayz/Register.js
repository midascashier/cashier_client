import React from 'react'
import {Input} from '../../commonComponents/Inputs'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {CashierActions} from '../../../actions/CashierActions'
import {TransactionService} from '../../../services/TransactionService'
import {ApplicationService} from '../../../services/ApplicationService'

let Register = React.createClass({

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 */
	refreshLocalState(){
		return {
			displaySaveButton: true,
			displayCancelButton: true,
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
		if(!ApplicationService.emptyInput(e)){

			this.setState({
				displaySaveButton: false
			});

			TransactionService.registerPayAccount(this.state.payAccount);
		}
	},

	/**
	 * Cancel button
	 */
	cancel(){
		let payAccounts = CashierStore.getProcessorPayAccount();
		if(Object.keys(payAccounts).length > 0){

			let processor = CashierStore.getProcessor();
			let previousPayAccount = 0;

			for(let payAccount in payAccounts){
				if(previousPayAccount == 0){
					previousPayAccount = payAccount;
				}
			}

			CashierActions.changePayAccount(previousPayAccount, processor.processorId);
		}else{
			UIService.changeUIState('/' + UIService.getCurrentView() + '/');
		}
	},

	render(){
		return (
			<div id="ecoPayzRegister">
				<form onSubmit={this.addNewPayAccount}>
					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('ECOPAYZ_ACCOUNT', 'ECO Account Number"')}:</label>
						<div className="col-sm-8">
							<Input
								className="form-control" type="text" id="openPayzNewAccount" name="openPayzNewAccount" ref="account"
								validate="isNumber" onChange={this.changeValue} value={this.state.payAccount.account} require
							/>
						</div>
					</div>

					<div className="col-md-4 col-md-offset-4">
						<div className="row">
							<div className="col-sm-6">
								{this.state.displaySaveButton ? <button type='submit' className='btn btn-green'>
									{translate('PROCESSING_BUTTON_SAVE', 'Save')}
								</button> : null}
							</div>

							<div className="col-sm-6">
								{this.state.displayCancelButton ? <button type='button' onClick={this.cancel} className='btn btn-green'>
									{translate('PROCESSING_BUTTON_CANCEL', 'Save')}
								</button> : null}
							</div>
						</div>
					</div>
				</form>
			</div>
		)
	}
});

module.exports.Register = Register;