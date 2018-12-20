import React from 'react'
import {Input} from './Inputs'
import Cashier from '../../constants/Cashier'
import {UIService} from '../../services/UIService'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'
import {TransactionService} from '../../services/TransactionService'

let SecondFactor = React.createClass({

	propTypes: {
		setVerifyCode: React.PropTypes.func,
		transaction: React.PropTypes.object,
		limitsCheck: React.PropTypes.string,
		allowContinueToConfirm: React.PropTypes.bool
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
	refreshLocalState(){
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
	verifyTransactionToken(){
		let token = this.state.info.code;
		let actualState = this.state.info;
		actualState.verifyCodeSent = true;

		this.setState(actualState);
		TransactionService.verifyTransactionToken(token);
	},

	/**
	 * Set state for phone and code
	 *
	 * @param propertyName
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

	render(){
		let originPath = UIService.getOriginPath();
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

			if("setVerifyCode" in this.props){
				this.props.setVerifyCode(true);
			}
		}

		return (
			<div id="SecondFactor">
				<div className="infoCol text-justify">
					<p><em>{translate('SECOND_FACTOR_INFO')}</em></p>
					<p><em>{translate('SECOND_FACTOR_PHONE_CONFIRMATION')}</em></p>
				</div>

				<div className="form-group">
					<div id="requestedCodeHash">
						<label className="col-sm-12 control-label text-left">{translate('SECOND_FACTOR_PHONE_REGISTERED')}</label>
						{(() => {
							if(phoneDisabled == "disabled"){
								return (
									<div id="phoneCountryCode">
										<div className="col-sm-2">
											<Input type="text" id="phoneCountryCode" name="phoneCountryCode" value={phoneCountryCode} disabled readonly/>
										</div>
										<div className="col-sm-5">
											<Input type="text" id="customerPhone" name="customerPhone" value={phone} disabled readonly/>
										</div>
									</div>
								)
							}

							return (
								<div id="customerPhone" className="col-sm-7">
									<Input
										onChange={this.changeValue.bind(null, 'phone')}
										type="text"
										id="customerPhone"
										name="customerPhone"
										value={phone}
									/>
								</div>
							)
						})()}

						<div className="col-sm-1">
							{(() => {
								if(requestedCode && hash == ""){
									return (<img src={originPath + '/images/loader-xs_17x17.gif'}/>)
								}
								if(hash != ""){
									return (<i className="fa fa-check green"></i>)
								}
							})()}
						</div>

						<div className="col-sm-4">
							<button disabled={isNextDisabled} className="btn btn-green" onClick={this.sendTransactionToken}>
								{translate('SECOND_FACTOR_REQUEST_CODE_BUTTON')}
							</button>
						</div>
					</div>

					<div id="verificationCodeContent" className="form-group">
						<label className="col-sm-12 control-label text-left">{translate('SECOND_FACTOR_ENTER_CODE')}</label>
						{(() => {
							if(disableVerifyButton){
								return (
									<div className="col-sm-7">
										<Input type="text" id="verificationCode" name="verificationCode" disabled/>
									</div>
								)
							}

							return (
								<div className="col-sm-7">
									<Input
										type="text"
										validate="isNumber"
										id="verificationCode"
										onChange={this.changeValue.bind(null, 'code')}
										name="verificationCode"
									/>
								</div>
							)
						})()}

						<div className="col-sm-1">
							{(() => {
								if(verifyMsg != null && verifyMsg != "" && isCodeValid == 0){
									return null;
								}

								if(verifyCodeSent && isCodeValid == 0){
									return (<img src={originPath + '/images/loader-xs_17x17.gif'}/>)
								}

								if(isCodeValid == 1){
									return (<i className="fa fa-check green"></i>)
								}
							})()}
						</div>

						<div className="col-sm-3">
							<button className="btn btn-green" disabled={disableVerifyButton} onClick={this.verifyTransactionToken}>
								{translate('SECOND_FACTOR_VERIFY_CODE')}
							</button>
						</div>
					</div>

					{(() => {
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
			</div>
		)
	}
});

module.exports.SecondFactor = SecondFactor;
