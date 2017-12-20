import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { TransactionService } from '../../../services/TransactionService'
import { ApplicationService } from '../../../services/ApplicationService'
import { CashierActions } from '../../../actions/CashierActions'
import { CashierStore } from '../../../stores/CashierStore'
import { UIService } from '../../../services/UIService'

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
		if (!ApplicationService.emptyInput(e)) {
			this.setState({
				displaySaveButton: false
			});

			TransactionService.registerPayAccount(this.state.payAccount);
		}
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
		}else{
			UIService.changeUIState('/' + UIService.getCurrentView() + '/');
		}
	},

	render() {
		return (
			<div id="netellerRegister">
				<form onSubmit={this.addNewPayAccount}>
					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('SKRILL_EMAIL', "Skrill's Email")}:</label>
						<div className="col-sm-8">
							<Input
								className="form-control"
								type="text"
								id="SkrillAccount"
								name="SkrillAccount"
								ref="email"
								validate="isEmail"
								onChange={this.changeValue}
								value={this.state.payAccount.account}
								require
							/>
						</div>
					</div>

					<div className="col-md-4 col-md-offset-4">
						<div className="row">
							<div className="col-sm-6">
								{this.state.displaySaveButton ? <button type='submit' className='btn btn-green'>{translate('PROCESSING_BUTTON_SAVE', 'Save')}</button> : null }
							</div>
							<div className="col-sm-6">
								{this.state.displaySaveButton ? <button type='button' onClick={this.cancel} className='btn btn-green'>{translate('PROCESSING_BUTTON_CANCEL', 'Cancel')}</button> : null }
							</div>
						</div>
					</div>
				</form>
			</div>
		)
	}
});

module.exports.Register = Register;