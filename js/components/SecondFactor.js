import React from 'react'
import {translate} from '../constants/Translate'
import {CashierStore} from '../stores/CashierStore'
import {Input} from './Inputs'
import Cashier from '../constants/Cashier'
import {TransactionService} from '../services/TransactionService'
import {UIService} from '../services/UIService'

let SecondFactor = React.createClass({

	propTypes: {
		limitsCheck: React.PropTypes.string, allowContinueToConfirm: React.PropTypes.bool, transaction: React.PropTypes.object
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
			info: {
				customer: CashierStore.getCustomer(), code: "", requestedCode: false, verifyCodeSent: false
			}
		}
	},

	/**
	 * Request transaction Token
	 */
	sendTransactionToken(){
		let actualState = this.state.info;
		TransactionService.startSecondFactorProcess();
		actualState.requestedCode = true;
		actualState.verifyCodeSent = false;
		this.setState(actualState);
		TransactionService.sendTransactionToken(this.state.info.customer.personalInformation.phone);
	},

	/**
	 * Verify is token is valid
	 */
	verifyTransactionToken()
	{
		let token = this.state.info.code;
		let actualState = this.state.info;
		actualState.verifyCodeSent = true;
		this.setState(actualState);
		TransactionService.verifyTransactionToken(token);
	},

	/**
	 * Set state for phone and code
	 *
	 * @param event
	 */
	changeValue(propertyName, event){

		let actualState = this.state.info;

		if(propertyName == "phone"){
			actualState.customer.personalInformation.phone = event;
		}

		if(propertyName == "code"){
			actualState.code = event;
		}

		this.setState(actualState);

	},

	render()
	{
		let limitsCheck = false;

		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS){
			limitsCheck = true;
		}
		let verifyMsg = this.props.transaction.secondFactorMessage;
		let hash = this.props.transaction.hash;
		let isCodeValid = this.props.transaction.isCodeValid;
		let verifyCodeSent = this.state.info.verifyCodeSent;
		let allowContinueToConfirm = this.props.allowContinueToConfirm;
		let customerPersonalInfo = this.state.info.customer.personalInformation;
		let phoneCountryCode = customerPersonalInfo.countryPhoneCode;
		let requestedCode = this.state.info.requestedCode;
		let phone = customerPersonalInfo.phone.replace(/\d(?=\d{4})/g, "*");
		let maxAttempts = this.props.transaction.secondFactorMaxAttempts;
		if(maxAttempts){
			requestedCode = false;
		}

		let isNextDisabled = "disabled";
		if(limitsCheck && allowContinueToConfirm && typeof phone != "undefined" && phone != "" && hash == "" && !requestedCode){
			isNextDisabled = "";
		}

		let phoneDisabled = "disabled";
		if(typeof phone == "undefined" || phone == ""){
			phoneDisabled = "";
		}

		let disableVerifyButton = true;
		if(hash != ""){
			disableVerifyButton = false;
		}

		if(isCodeValid == 1){
			disableVerifyButton = true;
		}

		return (
			<div id="SecondFactor">
				<p><em>{translate('SECOND_FACTOR_INFO')}</em></p>
				<p><em>{translate('SECOND_FACTOR_PHONE_CONFIRMATION')}</em></p>
				<div id="requestedCodeHash">
					<label className="col-sm-4 control-label">{translate('SECOND_FACTOR_PHONE_REGISTERED')}</label>
					{(() =>{
						if(phoneDisabled == "disabled"){
							return (
								<div id="phoneDisabled">
									<div className="col-sm-2">
										<Input type="text" id="phoneCountryCode" name="phoneCountryCode" value={phoneCountryCode} disabled readonly/>
									</div>
									<div className="col-sm-3">
										<Input type="text" id="customerPhone" name="customerPhone" value={phone} disabled readonly/>
									</div>
								</div>
							)
						} else{
							return (
								<Input onChange={this.changeValue.bind(null, 'phone')} type="text" id="customerPhone" name="customerPhone" value={phone}/>
							)
						}
					})()}

					<div className="col-sm-2">
						{(() =>{
							if(requestedCode && hash == ""){
								return (<i className="fa fa-spinner" aria-hidden="true"></i>)
							}
							if(hash != ""){
								return (<i className="fa fa-check green"></i>)
							}
						})()}
					</div>
					<button disabled={isNextDisabled} className="btn btn-green" onClick={this.sendTransactionToken}>{translate('SECOND_FACTOR_REQUEST_CODE_BUTTON')}</button>
				</div>

				<div id="verificationCodeContent">
					<label className="col-sm-4 control-label">{translate('SECOND_FACTOR_ENTER_CODE')}</label>
					{(() =>{
						if(disableVerifyButton){
							return (
								<div className="col-sm-4">
									<Input type="text" id="verificationCode" name="verificationCode" disabled/>
								</div>
							)
						} else{
							return (
								<div className="col-sm-4">
									<Input type="text" validate="isNumber" id="verificationCode" onChange={this.changeValue.bind(null, 'code')} name="verificationCode"/>
								</div>
							)
						}
					})()}
					<div className="col-sm-2">
						{(() =>{
							if(verifyMsg != null && verifyMsg != "" && isCodeValid == 0){
								return null;
							}
							if(verifyCodeSent && isCodeValid == 0){
								return (<i className="fa fa-spinner" aria-hidden="true"></i>)
							}

							if(isCodeValid == 1){
								return (<i className="fa fa-check green"></i>)
							}
						})()}
					</div>
					<div className="col-sm-2">
						<button className="btn btn-green" disabled={disableVerifyButton} onClick={this.verifyTransactionToken}>{translate('SECOND_FACTOR_VERIFY_CODE')}</button>
					</div>
				</div>

				{(() =>{
					if(verifyMsg != null && verifyMsg != ""){
						return (
							<div className="alert alert-danger" role="alert">
								<i class="fa fa-thumbs-o-down red"></i>
								<strong>{verifyMsg}</strong>
							</div>
						)
					}
				})()}

			</div>
		)
	}
});

module.exports.SecondFactor = SecondFactor;
