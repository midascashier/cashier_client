import React from 'react'
import { translate } from '../constants/Translate'
import { CashierStore } from '../stores/CashierStore'
import { Input } from './Inputs'
import Cashier from '../constants/Cashier'
import { TransactionService } from '../services/TransactionService'

let SecondFactor = React.createClass({

		propTypes: {
			limitsCheck: React.PropTypes.string,
			allowContinueToConfirm: React.PropTypes.bool,
			transaction: React.PropTypes.object
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
				customer: CashierStore.getCustomer()
			}
		},

		/**
		 * Request transaction Token
		 */
		sendTransactionToken(){
			TransactionService.sendTransactionToken(this.state.customer.personalInformation.phone);
		},

		/**
		 * Verify is token is valid
		 */
		verifyTransactionToken()
		{
			TransactionService.verifyTransactionToken();
		},

		/**
		 * Set state for phone and code
		 *
		 * @param event
		 */
		changeValue(propertyName, event){
			let actualState = this.state;

			let value = event;

			/*if(isSelectComponent){
				value = value.target.value;
			}

			if(propertyName == 'country'){
				UIService.getCountryStates(value);
			}

			actualState.payAccount[propertyName] = value;

			this.setState(
				actualState
			);*/

		},

		render()
		{
			let limitsCheck = false;

			if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS){
				limitsCheck = true;
			}

			let allowContinueToConfirm = this.props.allowContinueToConfirm;
			let customerPersonalInfo = this.state.customer.personalInformation;
			let phoneCountryCode = customerPersonalInfo.countryPhoneCode;
			let phone = customerPersonalInfo.phone.replace(/\d(?=\d{4})/g, "*");
			let isNextDisabled = "disabled";

			if(limitsCheck && allowContinueToConfirm && typeof phone != "undefined" && phone != ""){
				isNextDisabled = "";
			}

			let phoneDisabled = "disabled";
			if(typeof phone == "undefined" || phone == ""){
				phoneDisabled = "";
			}

			let verifyCode = "disabled";
			if(this.props.transaction != "" && this.props.transaction.hash != ""){
				verifyCode = "";
			}

			return (
				<div>
					<label for="" className="control-label">{translate('SECOND_FACTOR_INFO')}</label><br /><br />
					<label for="" className="control-label">{translate('SECOND_FACTOR_PHONE_CONFIMATION')}</label><br />
					<label for=""
								 className="control-label">{translate('SECOND_FACTOR_PHONE_REGISTERED')}</label>
					<span>{phoneCountryCode}
						{(() =>{
							if(phoneDisabled == "disabled"){
								return (
									<Input className="form-control" type="text" onChange={this.changeValue.bind(null, 'phone')} id="customerPhone" name="customerPhone" value={phone}
												 disabled readonly/>
								)
							} else{
								return (
									<Input className="form-control" onChange={this.changeValue.bind(null, 'code')} type="text" id="customerPhone" name="customerPhone" value={phone}/>
								)
							}
						})()}
				</span>
					<button disabled={isNextDisabled}
									onClick={this.sendTransactionToken}>{translate('SECOND_FACTOR_REQUEST_CODE_BUTTON')}</button>
					<br />
					<label for="" className="control-label">{translate('SECOND_FACTOR_ENTER_CODE')}</label>

					{(() =>{
						if(verifyCode == "disabled"){
							return (
								<div>
									<Input className="form-control" type="text" id="verificationCode" name="verificationCode" disabled/>
									<button disabled>{translate('SECOND_FACTOR_VERIFY_CODE')}</button>
								</div>
							)
						} else{
							return (
								<div>
									<Input className="form-control" type="text" id="verificationCode" name="verificationCode"/>
									<button>{translate('SECOND_FACTOR_VERIFY_CODE')}</button>
								</div>
							)
						}
					})()}

					<br />
				</div>
			)
		}
	})
	;

module.exports.SecondFactor = SecondFactor;