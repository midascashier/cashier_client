import React from 'react'
import {ExtraInfo} from './ExtraInfo'
import cashier from '../../../constants/Cashier'
import {Input} from '../../commonComponents/Inputs'
import {TermsController} from '../../TermsController'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {ApplicationService} from '../../../services/ApplicationService'
import {TransactionService} from '../../../services/TransactionService'

let EditPayAccount = React.createClass({
	propTypes: {
		payAccount: React.PropTypes.node,
		changeValue: React.PropTypes.func
	},

	/**
	 * edit payAccount
	 */
	editPayAccount(value = 1){
		UIService.setCCEditMode(value);
	},

	/**
	 * Save CC info
	 */
	saveEditCC(){
		TransactionService.updatePayAccount();
		this.editPayAccount(0);
	},

	formEditPayAccount(e){
		e.preventDefault();

		for(let i = 0; i < e.target.length; i++){
			if(e.target[i].type != 'submit' && e.target[i].type != 'button' && e.target[i].type != 'checkbox'){
				e.target[i].style['border-color'] = '';
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

		this.saveEditCC();
	},

	render(){
		let ccDate = UIService.getCCDate();
		let payAccount = this.props.payAccount;
		let isEditingCCInfo = UIService.getCCEditMode();
		let transaction = CashierStore.getTransaction();

		return (
			<div>
				<form onSubmit={this.formEditPayAccount}>
					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_HOLDER', 'Holder\'s Name')}:</label>
						<div className="col-sm-8">
							<Input
								type="text"
								id="ccName"
								ref="ccName"
								validate="isString"
								value={this.props.payAccount.secure.extra3}
								onChange={this.props.changeValue.bind(null, 'extra3', 'payAccount.secure', 0)}
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
						<div className="col-sm-8">
							<Input
								type="text"
								id="cvv"
								ref="cvv"
								validate="isCVV"
								value={transaction.password}
								onChange={this.props.changeValue.bind(null, 'password', 'transaction', 0)}
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-4 control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
						<div className="col-sm-4">
							<select
								id="ccExpMonth"
								className="form-control"
								data-validation='isNumber'
								value={transaction.expirationMonth}
								onChange={this.props.changeValue.bind(null, 'expirationMonth', 'transaction', 1)}
							>
								{ccDate.selectMonths}
							</select>
						</div>
						<div className="col-sm-4">
							<select
								id="ccExpYear"
								className="form-control"
								data-validation='isNumber'
								value={transaction.expirationYear}
								onChange={this.props.changeValue.bind(null, 'expirationYear', 'transaction', 1)}
							>
								{ccDate.selectYears}
							</select>
						</div>
					</div>
					{(() => {
						if(
							(
								(payAccount.extra.dob == '' || payAccount.extra.dob == null)
								||
								(payAccount.extra.ssn == null || payAccount.extra.ssn == '')
								||
								isEditingCCInfo
							) &&
							(payAccount.address.country == cashier.USA_COUNTRY_CODE)
						){
							return <ExtraInfo changeValue={this.props.changeValue} ssn={payAccount.extra.ssn} dobMonth={payAccount.extra.dobMonth} dobDay={payAccount.extra.dobDay} dobYear={payAccount.extra.dobYear} country={payAccount.address.country}/>;
						}
					})()}

					<div className="form-group">
						<div className="col-sm-4"></div>
						<div className="col-sm-2">
							<button type='submit' className='btn btn-green'>
								{translate('PROCESSING_BUTTON_SAVE', 'Save')}
							</button>
						</div>
						<div className="col-sm-2">
							<button type='button' className='btn btn-green' onClick={this.editPayAccount.bind(null, 0)}>
								{translate('PROCESSING_BUTTON_CANCEL', 'Cancel')}
							</button>
						</div>
					</div>
					<TermsController/>
				</form>
			</div>
		)
	}
});

module.exports.EditPayAccount = EditPayAccount;