import React from 'react'
import {Loading} from '../../loading/Loading'
import Cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'

let InfoMethod = React.createClass({

	propTypes: {
		amount: React.PropTypes.string,
		limitsCheck: React.PropTypes.string,
		formValidator: React.PropTypes.func
	},

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{transaction, processor, currentPayAccount, customer}|{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, cleanTransaction: (function())}), processor: (*|{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, fees: Array, limits: Array, limitRules: Array, load: (function(*))}), currentPayAccount: (*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}), customer: (*|{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: {}, load: (function(*))})}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transaction: (*|{amount: string, fee: number, feeType: string, bonusId: number, checkTermsAndConditions: number, cleanTransaction: (function())}), processor: (*|{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, fees: Array, limits: Array, limitRules: Array, load: (function(*))}), currentPayAccount: (*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}), customer: (*|{atDeviceId: string, ioBB: string, companyId: number, customerId: number, username: string, password: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, lastTransactions: {}, load: (function(*))})}}
	 */
	refreshLocalState(){
		return {
			transaction: CashierStore.getTransaction(),
			currentPayAccount: CashierStore.getCurrentPayAccount(),
			customer: CashierStore.getCustomer()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * this function checks if password and amount are valid
	 */
	allowProcess(){
		if(this.props.amount == ""){
			return false;
		}

		let checkAmount = false;

		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS){
			checkAmount = true;
		}

		let checkTerms = this.state.transaction.checkTermsAndConditions;

		return (checkAmount && checkTerms);
	},

	/**
	 * send the customer to select the processor again
	 *
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	continueTransaction(){
		TransactionService.setAmount(this.props.amount);
		if(this.state.currentPayAccount.password){
			TransactionService.setCVV(this.state.currentPayAccount.password);
			TransactionService.updateCreditCardSecure();
		}
		UIService.confirmTransaction();
	},

	/**
	 * validate date of birth / SSB and DOB
	 *
	 * @returns {{check: boolean, message: string}}
	 */
	validateExtra(){
		let checkData = {check: false, message: ''};
		let dobTransactionCheck = Boolean(this.state.transaction.dobDay && this.state.transaction.dobMonth && this.state.transaction.dobYear);
		let payAccountDOB = Boolean(this.state.currentPayAccount.extra.dobDay && this.state.currentPayAccount.extra.dobMonth && this.state.currentPayAccount.extra.dobYear);

		let country = this.state.customer.personalInformation.country;
		if(country === 'US'){

			let transactionSSN = Boolean(this.state.transaction.ssn && this.state.transaction.ssn.length === 4);
			let payAccountSSN = Boolean(this.state.currentPayAccount.extra.ssn && this.state.currentPayAccount.extra.ssn.length === 4);

			checkData.check = (dobTransactionCheck || payAccountDOB) && (transactionSSN || payAccountSSN);
			if(!checkData.check){
				checkData.message = translate('PROCESSING_VALIDATION_DOB_SSN', 'Please, check your date of birth or SSN!');
			}
		}else{
			checkData.check = (dobTransactionCheck || payAccountDOB);
			if(!checkData.check){
				checkData.message = translate('PROCESSING_VALIDATION_DOB', 'Please, validate your date of birth!');
			}
		}

		return checkData;
	},

	render(){
		let originPath = UIService.getOriginPath();
		let isEditingCCInfo = UIService.getCCEditMode();
		let processorDisplayName = UIService.getProcessorDisplayName().toUpperCase();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName, transactionType: transactionType
		});

		let validateExtra = this.validateExtra();
		let payAccountInfo = UIService.getDisplayLimits(this.props.amount);

		let allowProcess = false;
		if(!isEditingCCInfo){
			allowProcess = payAccountInfo.payAccountId && payAccountInfo.enabled && this.allowProcess() && this.props.formValidator() && validateExtra.check;
		}

		let isNextDisabled = "disabled";
		if(!isEditingCCInfo && allowProcess){
			isNextDisabled = "";
		}

		return(
			<div id="InfoMethodCC_99Cents">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="box">
							<p>This text is for test</p>
						</div>
						<div className="table-responsive">
							<table className="table table-striped">
								<tbody>

									<tr className="red">
										{(() =>{
											if(payAccountInfo.payAccountId && !validateExtra.check){
												return (
													<td colSpan="2">
														<i className="fa fa-exclamation-circle"></i>
														<span>{validateExtra.message}</span>
													</td>
												)
											}
										})()}
									</tr>
									<tr>
										{(() =>{
											if(payAccountInfo.errorLimitMessage){
												return (<td colSpan={2} dangerouslySetInnerHTML={{__html: payAccountInfo.errorLimitMessage}}></td>)
											}
										})()}
									</tr>
								</tbody>
							</table>
						</div>

						<div className="row mod-btns">
							<div className="col-sm-6">
								<button type='button' className='btn btn-green' disabled={payAccountInfo.payAccountId == null || this.state.transaction.checkTermsAndConditions==false} onClick={this.continueTransaction}>
									{translate('PROCESSING_BUTTON_NEXT', 'Next')}
								</button>
								<p>
									<a onClick={this.setFirstStep}>{translate('USE_DIFFERENT_METHOD')}.</a>
								</p>
							</div>
							<div className="col-sm-6">
								<img src={originPath + '/images/ssl.png'} alt="ssl"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.InfoMethod = InfoMethod;