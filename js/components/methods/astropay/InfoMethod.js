import React from 'react'
import {translate} from '../../../constants/Translate'
import Cashier from '../../../constants/Cashier'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {UIService} from '../../../services/UIService'

let InfoMethod = React.createClass({

	propTypes: {
		amount: React.PropTypes.string,
		limitsCheck: React.PropTypes.string,
		formValidator: React.PropTypes.func,
		payAccount: React.PropTypes.array
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
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	/**
	 * this function sends deposit info to cashier
	 */
	continueTransaction(confirmTerms){
		let ccConfirmTerms = 0;
		if(confirmTerms){
			ccConfirmTerms = 1;
		}
		TransactionService.setAmount(this.props.amount);
		let customer = CashierStore.getCustomer();
		let currency = customer.currency;
		let UI = CashierStore.getUI();
		if(UI['currencies'][currency]){
			let currencyId = UI['currencies'][currency].caCurrency_Id;
			TransactionService.processAstroPay({
				ccConfirmTerms: ccConfirmTerms,
				ccNumber: this.props.payAccount.ccNumber,
				ccExpMonth: this.props.payAccount.ccExpMonth,
				ccExpYear: this.props.payAccount.ccExpYear,
				ccCVV: this.props.payAccount.ccCVV,
				currency: currencyId
			}, this.props.amount, 'ticket');
		}
	},

	render(){
		let limitsCheck = this.allowProcess();
		let confirmTerms = CashierStore.getTransaction().checkTermsAndConditions;
		let payAccountInfo = UIService.getDisplayLimits(this.props.amount);
		let originPath = UIService.getOriginPath();

		let processorDisplayName = UIService.getProcessorName().toUpperCase();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);
		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName, transactionType: transactionType
		});

		let isNextDisabled = "disabled";
		if(limitsCheck){
			isNextDisabled = "";
		}

		return (
			<div id="InfoMethodVisa">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="table-responsive">
							<table className="table table-striped">
								<tbody>
								<tr>
									<td>{translate('PROCESSING_MIN', 'Min.') + ' ' + transactionType}:</td>
									<td><span>{payAccountInfo.minPayAccount}</span></td>
								</tr>
								<tr>
									<td>{translate('PROCESSING_MAX', 'Max.') + ' ' + transactionType}:</td>
									<td><span>{payAccountInfo.maxPayAccount}</span></td>
								</tr>
								<tr>
									<td>{translate('PROCESSING_LIMIT_REMAINING', 'Remaining Limit')}:</td>
									<td><span>{payAccountInfo.remaining}</span></td>
								</tr>
								</tbody>
							</table>
						</div>
						<div className="row mod-btns">
							<div className="col-sm-6">
								<button type='button' className='btn btn-green' disabled={isNextDisabled}
												onClick={this.continueTransaction.bind(null, confirmTerms)}>
									{translate('PROCESSING_BUTTON_NEXT', 'Next')}
								</button>
								<p><a onClick={this.setFirstStep}>{translate('USE_DIFFERENT_METHOD', 'Use different Method')}.</a></p>
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