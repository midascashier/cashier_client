import React from 'react'
import {ExtraInfo} from './ExtraInfo'
import {Register} from './Register.js'
import {EditPayAccount} from './EditPayAccount'
import  cashier  from '../../../constants/Cashier'
import {TermsController} from '../../TermsController'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {PromoCode} from '../../commonComponents/PromoCode'
import {LoadingSpinner} from '../../loading/LoadingSpinner'
import {AmountController} from '../../commonComponents/AmountController'
import {PayAccountDropDown} from '../../commonComponents/payaccount/PayAccountDropDown'

let AskInfo = React.createClass({

	propTypes: {
		dobDay: React.PropTypes.node,
		dobYear: React.PropTypes.node,
		amount: React.PropTypes.string,
		dobMonth: React.PropTypes.node,
		setAmount: React.PropTypes.node,
		changeValue: React.PropTypes.func,
		payAccount: React.PropTypes.object,
		limitsCheck: React.PropTypes.string,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	/**
	 * validate date of birth / SSB and DOB
	 *
	 * @returns {{check: boolean, message: string}}
	 */
	validateExtra(){
		let checkData = {check: false, message: ''};

		let customer = CashierStore.getCustomer();
		let country = customer.personalInformation.country;

		let payAccount = this.props.payAccount;
		let payAccountDOB = Boolean(payAccount.extra.dobDay && payAccount.extra.dobMonth && payAccount.extra.dobYear);

		if(country === 'US'){

			let payAccountSSN = Boolean(payAccount.extra.ssn && payAccount.extra.ssn.length === 4);

			checkData.check = (payAccountDOB && payAccountSSN);
			if(!checkData.check){
				checkData.message = translate('PROCESSING_VALIDATION_DOB_SSN', 'Please, check your date of birth or SSN!');
			}
		}else{
			checkData.check = payAccountDOB;
			if(!checkData.check){
				checkData.message = translate('PROCESSING_VALIDATION_DOB', 'Please, validate your date of birth!');
			}
		}

		return checkData;
	},

	render(){
		let amount = this.props.amount;
		let dobDay = this.props.dobDay;
		let dobYear = this.props.dobYear;
		let dobMonth = this.props.dobMonth;
		let setAmount = this.props.setAmount;
		let payAccount = this.props.payAccount;
		let limitsCheck = this.props.limitsCheck;
		let changeValue = this.props.changeValue;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;

		let isEditingCCInfo = UIService.getCCEditMode();
		let transaction = CashierStore.getTransaction();
		let ssn = transaction.ssn;

		let deleteButton = translate('PROCESSING_BUTTON_DELETE_CARD', 'Delete Card');
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');

		let validateExtra = this.validateExtra();

		return (
			<div id="visaAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{proccesingTitle}</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-horizontal">
										{(() =>{
											if(!payAccountDisplayName){
												return <LoadingSpinner/>;
											}else{

												if(payAccountDisplayName == cashier.NO_RESPONSE){
													return <Register/>
												}

												if(payAccountId == 0){
													return <Register />
												}else{
													if(isEditingCCInfo == 0){

														let extraInfo = "";
														if(!validateExtra.check || isEditingCCInfo){
															extraInfo = (
																<ExtraInfo ssn={ssn} dobDay={dobDay} dobYear={dobYear} dobMonth={dobMonth} changeValue={changeValue}/>
															)
														}

														return (
															<div>
																<PayAccountDropDown info={payAccount} amount={this.props.amount} msgDeleteBtn={deleteButton} setAmount={this.props.setAmount}/>

																<div className="form-group">
																	<AmountController amount={amount} setAmount={setAmount} limitsCheck={limitsCheck}/>
																</div>

                                                                {(() =>{
                                                                    if(UIService.getProcessorId() == cashier.PROCESSOR_ID_VISA){
                                                                        return (
                                                                        	<div>
																				<label>{translate('VISA_FEE_MAIN', 'Please note WPN charges 10% on all Visa Transactions. If for example you deposit $100 with Visa, $90 will be credited to your poker account.')}</label>
																			</div>
                                                                        )
                                                                    }
                                                                })()}

																<div className="form-group">
																	<PromoCode setPromoCode={this.props.setPromoCode} promoCode={this.props.promoCode}/>
																</div>

																{extraInfo}
																<TermsController />
															</div>
														)
													}

													return (
														<EditPayAccount changeValue={changeValue} payAccount={payAccount}/>
													)
												}
											}
										})()}
									</div>
									{(() =>{
										if(payAccountId != 0 && payAccountDisplayName != cashier.NO_RESPONSE){
											let information = translate('CREDIT_CARD_INFO', '');
											return (
												<div>
													<p/>
													<p className="text-justify">{information}</p>
												</div>
											)
										}
									})()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.AskInfo = AskInfo;