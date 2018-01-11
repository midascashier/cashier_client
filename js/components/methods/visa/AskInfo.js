import React from 'react'
import { ExtraInfo } from './ExtraInfo'
import { Register } from './Register.js'
import {EditPayAccount} from './EditPayAccount'
import  cashier  from '../../../constants/Cashier'
import {TermsController} from '../../TermsController'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {AmountController} from '../../AmountController'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../loading/LoadingSpinner'
import {PayAccountDropDown} from '../../../components/commonComponents/payaccount/PayAccountDropDown'

let AskInfo = React.createClass({

	propTypes: {
		dobDay: React.PropTypes.node,
		dobYear: React.PropTypes.node,
		amount: React.PropTypes.string,
		dobMonth: React.PropTypes.node,
		setAmount: React.PropTypes.node,
		changeValue: React.PropTypes.func,
		payAccount: React.PropTypes.object,
		limitsCheck: React.PropTypes.string
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

		let isWithDraw = UIService.getIsWithDraw();
		let isEditingCCInfo = UIService.getCCEditMode();
		let transaction = CashierStore.getTransaction();
		let ssn = transaction.ssn;

		let deleteButton = translate('PROCESSING_BUTTON_DELETE_CARD', 'Delete Card');
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');

		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		}

		return(
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
														if((payAccount.extra.dob == '' ||
																payAccount.extra.dob == null ||
																payAccount.extra.ssn == null ||
																payAccount.extra.ssn == '' || isEditingCCInfo
															) && payAccount.address.country == cashier.USA_COUNTRY_CODE){
															extraInfo = (
																<ExtraInfo
																	ssn={ssn}
																	dobDay={dobDay}
																	dobYear={dobYear}
																	dobMonth={dobMonth}
																	changeValue={changeValue}
																/>
															)
														}

														return(
															<div>
																<PayAccountDropDown
																	info={payAccount}
																	amount={this.props.amount}
																	msgDeleteBtn={deleteButton}
																	setAmount={this.props.setAmount}
																/>

																<div className="form-group">
																	<AmountController
																		amount={amount}
																		setAmount={setAmount}
																		limitsCheck={limitsCheck}
																	/>
																</div>
																{extraInfo}
																<TermsController />
															</div>
														)
													}

													return(
														<EditPayAccount changeValue={changeValue} payAccount={payAccount}/>
													)
												}
											}
										})()}
									</div>
									{(() =>{
										if(payAccountId != 0 && payAccountDisplayName != cashier.NO_RESPONSE){
											let information = translate('CREDIT_CARD_INFO', '');
											return(
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