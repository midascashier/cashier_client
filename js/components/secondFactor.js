import React from 'react'
import { translate } from '../constants/Translate'
import { CashierStore } from '../stores/CashierStore'
import { Input } from './Inputs'
import Cashier from '../constants/Cashier'
import { TransactionService } from '../services/TransactionService'
import { UIService } from '../services/UIService'

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
				info: {
					customer: CashierStore.getCustomer(),
					code: "",
					requestedCode: true,
					verifyCodeSent: false
				}
			}
		},

		/**
		 * Request transaction Token
		 */
		sendTransactionToken(){
			let actualState = this.state.info;
			actualState.requestedCode = false;
			this.setState(
				actualState
			);
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
			this.setState(
				actualState
			);
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

			this.setState(
				actualState
			);

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
			let originPath = UIService.getOriginPath();
			let verifyCodeSent = this.state.info.verifyCodeSent;
			let allowContinueToConfirm = this.props.allowContinueToConfirm;
			let customerPersonalInfo = this.state.info.customer.personalInformation;
			let phoneCountryCode = customerPersonalInfo.countryPhoneCode;
			let requestedCode = this.state.info.requestedCode;
			let phone = customerPersonalInfo.phone.replace(/\d(?=\d{4})/g, "*");


			let isNextDisabled = "disabled";
			if(limitsCheck && allowContinueToConfirm && typeof phone != "undefined" && phone != "" && hash == ""){
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
				<div>
					<label for="" className="control-label">{translate('SECOND_FACTOR_INFO')}</label><br /><br />
					<label for="" className="control-label">{translate('SECOND_FACTOR_PHONE_CONFIMATION')}</label><br />
					<label for=""
								 className="control-label">{translate('SECOND_FACTOR_PHONE_REGISTERED')}</label>
					<span>
						{(() =>{
							if(phoneDisabled == "disabled"){
								return (
									<div className="row">
										<div className="col-sm-6">
											<Input className="form-control" type="text" id="phoneCountryCode" name="phoneCountryCode"
														 value={phoneCountryCode} disabled readonly/>
											<Input className="form-control" type="text" id="customerPhone" name="customerPhone" value={phone}
														 disabled readonly/>
										</div>
									</div>
								)
							} else{
								return (
									<Input className="form-control" onChange={this.changeValue.bind(null, 'phone')} type="text"
												 id="customerPhone" name="customerPhone" value={phone}/>
								)
							}
						})()}
				</span>
					{(() =>{
						if(!requestedCode && hash == "" && (verifyMsg == null || verifyMsg == "")){
							return (<img src={originPath + '/images/loader-xs_17x17.gif'}/>)
						}

						if(hash != ""){
							return (<span>V</span>)
						}

					})()}
					<button disabled={isNextDisabled} className="btn btn-green"
									onClick={this.sendTransactionToken}>{translate('SECOND_FACTOR_REQUEST_CODE_BUTTON')}</button>
					<br />
					<label for="" className="control-label">{translate('SECOND_FACTOR_ENTER_CODE')}</label>

					{(() =>{
						if(disableVerifyButton){
							return (
								<div>
									<Input className="form-control" type="text" id="verificationCode" name="verificationCode" disabled/>
								</div>
							)
						} else{
							return (
								<div>
									<Input className="form-control" type="text" validate="isNumber" id="verificationCode"
												 onChange={this.changeValue.bind(null, 'code')} name="verificationCode"/>
								</div>
							)
						}
					})()}

					{(() =>{

						if(verifyMsg != null && verifyMsg != "" && isCodeValid == 0){
							return null;
						}

						if(verifyCodeSent && isCodeValid == 0){
							return (<img src={originPath + '/images/loader-xs_17x17.gif'}/>)
						}

						if(isCodeValid == 1){
							return (<span>V</span>)
						}

					})()}

					{(() =>{
						if(verifyMsg != null && verifyMsg != ""){
							return <div className="alert alert-danger" role="alert">
								<i class="fa fa-thumbs-o-down red"></i>
								<strong>{verifyMsg}</strong>
							</div>
						}
					})()}

					<button className="btn btn-green" disabled={disableVerifyButton}
									onClick={this.verifyTransactionToken}>{translate('SECOND_FACTOR_VERIFY_CODE')}</button>

					<br />
				</div>
			)
		}
	})
	;

module.exports.SecondFactor = SecondFactor;