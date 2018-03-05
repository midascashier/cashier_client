import React from 'react'
import cashier from '../constants/Cashier'
import actions from '../constants/Actions'
import ProcessorSettings from '../constants/Processors'
import RouterContainer from './RouterContainer'
import {CashierStore} from '../stores/CashierStore'
import {CashierActions} from '../actions/CashierActions'
import {TransactionService} from './TransactionService'
import {ApplicationService} from './ApplicationService'
import {ConnectorServices} from './ConnectorServices'
import {translate} from '../constants/Translate'

class UiService {

	constructor(){
		this.customerAction = "deposit";
	};

	/**
	 * Do some other actions after login response
	 */
	loginResponse(data){
		if(CashierStore.getIsWithdraw()){
			this.customerAction = "withdraw";
		}
		this.loginSuccess(data);
	};

	/**
	 * Redirect to first screen after login success
	 */
	loginSuccess(data){
		let nextPath = "/" + this.customerAction + "/";
		if(data.restart){
			this.selectProcessor(data.processorId);
			let route = ProcessorSettings.settings[data.processorId].route;
			let processorSteps = CashierStore.getCurrentProcessorSteps();
			CashierActions.setCurrentStep(processorSteps[processorSteps.length - 1]);
			if(data.Tstatus == 2){
				nextPath += route + "ticket/approved/";
			}else{
				nextPath += route + "ticket/rejected/";
			}
		}
		this.changeUIState(nextPath);
	}

	/**
	 * here is where we redirect to start transaction
	 */
	startTransaction(){
		let processorSteps = CashierStore.getCurrentProcessorSteps();
		CashierActions.setCurrentStep(processorSteps[1]);
		let route = "/" + this.customerAction + "/" + this.getProcessorName() + '/';
		this.changeUIState(route);
	}

	/**
	 * here is where we redirect to process transaction
	 */
	processTransaction(nextStep, processor = null){
		let processorSelected = "";
		if(processor){
			processorSelected = processor;
		}else{
			processorSelected = UIService.getProcessorName();
		}
		CashierActions.setCurrentStep(nextStep);
		let route = '/' + UIService.getCurrentView() + '/' + processorSelected.toLowerCase() + '/ticket/';
		this.changeUIState(route);
	}

	/**
	 * Redirects to confirm route
	 */
	confirmTransaction(){
		CashierActions.setCurrentStep("confirm");
		UIService.changeUIState('/' + UIService.getCurrentView() + '/' + UIService.getProcessorName().toLowerCase() + "/confirm/");
	}

	/**
	 * change cc edit mode
	 */
	setCCEditMode(editMode){
		CashierActions.setCCEditMode(editMode);
	}

	/**
	 * redirect to a specific route
	 */
	changeUIState(route){
		RouterContainer.get().props.history.push(route);
	}

	/**
	 * Redirect depends of the transaction response
	 */
	processResponse(data){
		let status = 0;
		if(data && data.response && data.response.transaction){
			status = Number(data.response.transaction.caTransactionStatus_Id);
		}

		let ticketResult = 'rejected';
		if(status == cashier.TRANSACTION_STATUS_APPROVED){
			ticketResult = 'approved';
		}else if(status == cashier.TRANSACTION_STATUS_PENDING){
			ticketResult = 'pending';
		}else if(status == cashier.TRANSACTION_STATUS_PROCESSING){
			ticketResult = 'processing';
		}else if(status == cashier.TRANSACTION_STATUS_DEFERRED){
			ticketResult = 'deferred';
		}

		this.changeUIState('/' + this.getCurrentView() + '/' + this.getProcessorName().toLowerCase() + '/ticket/' + ticketResult + '/');
	}

	/**
	 * Redirect depends of the cc transaction response
	 */
	creditCardTransactionResponse(data){

		let layout = 'rejected';
		let transactionDetails = data.response;
		let transactionResponse = CashierStore.getLastTransactionResponse();
		if(transactionDetails && transactionDetails.creditCardTransaction){
			let creditCardTransaction = transactionDetails.creditCardTransaction;
			if(creditCardTransaction && creditCardTransaction.PendingReprocess == 1){
				layout = creditCardTransaction.Layout;
			}
		}

		if(transactionResponse.status != cashier.TRANSACTION_STATUS_APPROVED){
			let ticketResult = 'rejected';
			if(layout == 'card'){
				ticketResult += '/blockByBank';
			}else if(layout == 'amount'){
				ticketResult += '/invalidAmount';
			}else if(layout == 'invalid-card'){
				ticketResult += '/invalidCard';
			}

			this.changeUIState('/' + this.getCurrentView() + '/' + this.getProcessorName().toLowerCase() + '/ticket/' + ticketResult + '/');
		}
	}

	/**
	 * return the origin path
	 *
	 * @returns {*|string}
	 */
	getOriginPath(){
		return CashierStore.getOriginPath();
	}

	/**
	 * get transaction information
	 *
	 * @returns {*|{amount: string, fee: number, feeType: string, bonusId: number, secondFactorAuth: number, bitcoinAddress: string, checkTermsAndConditions: number, controlNumber: string, sendBy: string, timeFrameDay: null, timeFrameTime: null, dobMonth: string, dobDay: string, dobYear: string, ssn: string, expirationMonth: string, expirationYear: string, randomTuid: string, hash: string, isCodeValid: number, secondFactorMessage: string, secondFactorMaxAttempts: boolean, promoCode: string, cleanTransaction}}
	 */
	getTransactionInformation(){
		return CashierStore.getTransaction();
	}

	/**
	 * get last customer information
	 *
	 * @returns {*|{companyId: number, customerId: number, username: string, password: string, currency: string, currencySymbol: string, balance: string, balanceBP: string, lang: string, personalInformation: {level: string, firstName: string, middleName: string, lastName: string, secondLastName: string, dateOfBirth: string, ssn: string, email: string, mobile: string, phone: string, fax: string, docsOnFile: string, isAgent: string, personalId: string, addressOne: string, addressTwo: string, country: string, countryName: string, countryPhoneCode: string, state: string, stateName: string, city: string, postalCode: string}, depositProcessors: Array, withdrawProcessors: Array, pendingP2PTransactions: Array, load: (function(*))}}
	 */
	getCustomerInformation(){
		return CashierStore.getCustomer();
	}

	/**
	 * get company information
	 *
	 * @returns {*|{companyId: number, companyName: string, phone: string, companyLabel: Array, load: (function(*))}}
	 */
	getCompanyInformation(){
		return CashierStore.getCompany();
	}

	/**
	 * return current PayAccount
	 *
	 * @returns {*|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: (function(*))}}
	 */
	getPayAccountInformation(){
		return CashierStore.getCurrentPayAccount();
	}

	/**
	 * return current view
	 *
	 * @returns {*|string}
	 */
	getCurrentView(){
		return CashierStore.getCurrentView();
	}

	/**
	 * get server time
	 *
	 * @returns {*|int}
	 */
	getServerTime(){
		return CashierStore.getServerTime();
	}

	/**
	 * get if is withdraw
	 *
	 * @returns {*|int}
	 */
	getIsWithDraw(){
		return CashierStore.getIsWithdraw();
	}

	/**
	 * get current process name
	 *
	 * @returns {string}
	 */
	getProcessorDisplayName(){
		let processor = CashierStore.getProcessor();
		return processor.displayName;
	}

	/**
	 * get current process name
	 *
	 * @returns {string}
	 */
	getProcessorName(){
		let processor = CashierStore.getProcessor();
		if(processor.Name.toLowerCase() == "btcscreen"){
			return "bitcoin";
		}
		return processor.Name.toLowerCase();
	}

	/**
	 * get current processor id
	 *
	 * @returns {number}
	 */
	getProcessorId(){
		let processor = CashierStore.getProcessor();
		return processor.processorId;
	}

	/**
	 * get the processor currency amount
	 *
	 * @returns {{minAmount: number, maxAmount: number, currencyCode}}
	 */
	getProcessorLimitMinMax(){
		let processor = CashierStore.getProcessor();
		let minAmount = Number(processor.limits.currencyMin);
		let maxAmount = Number(processor.limits.currencyMax);
		let currencyCode = processor.limits.currencyCode;
		return {minAmount: minAmount, maxAmount: maxAmount, currencyCode: currencyCode};
	}

	/**
	 * get the processor currency amount
	 *
	 * @param currency
	 *
	 * @returns {*}
	 */
	getCryptoTransferLimits(currency){
		let processor = CashierStore.getProcessor();
		let customer = CashierStore.getCustomer();
		let data = {
			f: "getCryptoTransferLimits",
			customerCurrency: customer.currency,
			currencyCode: currency,
			lowerLimit: processor.limits.currencyMin,
			upperLimit: processor.limits.currencyMax
		};

		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeCashierRequest(actions.GET_CRYPTO_TRANSFER_LIMITS_RESPONSE, rabbitRequest);
	}

	/**
	 * get the payAccount currency amount
	 *
	 * @returns {{payAccountId: null, available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}|_payAccount.limitsData|{available, type, remaining, enabled, enabledOn, minAmount, maxAmount, availableWithdraw, remainingWithdraw, enabledWithdraw, enabledOnWithdraw, minAmountWithdraw, maxAmountWithdraw, depositLimits, withdrawLimits, limitsPassed}|{}|*}
	 */
	getPayAccountLimits(){
		let payAccount = CashierStore.getCurrentPayAccount();
		let limitsData = CashierStore.getCurrentPayAccountLimit();

		limitsData.displayName = payAccount.displayName;
		limitsData.payAccountId = payAccount.payAccountId;
		limitsData.available = Number(limitsData.available);
		limitsData.availableWithdraw = Number(limitsData.availableWithdraw);
		limitsData.maxAmount = Number(limitsData.maxAmount);
		limitsData.maxAmountWithdraw = Number(limitsData.maxAmountWithdraw);
		limitsData.minAmount = Number(limitsData.minAmount);
		limitsData.minAmountWithdraw = Number(limitsData.minAmountWithdraw);

		return limitsData;
	}

	/**
	 * get the processor/payAccount limits to display
	 *
	 * @param currentAmount [temporally amount]
	 * @returns {{minPayAccount: string, maxPayAccount: string, payAccountId: (*|null|number), remaining: string, currencyCode: *}}
	 */
	getDisplayLimits(currentAmount = 0){
		let transaction = this.getTransactionInformation();
		let processorLimits = this.getProcessorLimitMinMax();
		let payAccountLimits = this.getPayAccountLimits();

		let amount = (currentAmount > 0) ? currentAmount : transaction.amount;
		let fee = (transaction.fee > 0) ? transaction.fee : 0;
		let totalAmount = Number(amount) + Number(fee);
		let currencyCode = processorLimits.currencyCode;

		let remaining = processorLimits.maxAmount - totalAmount;
		if(remaining < 0){
			remaining = 0;
		}

		remaining = remaining + " " + currencyCode;

		let minPayAccount = processorLimits.minAmount;
		let maxPayAccount = processorLimits.maxAmount;
		let limitError = "";
		let limits = {};

		if(payAccountLimits.payAccountId > 0){

			let availablePayAccount = payAccountLimits.available;
			if(this.getIsWithDraw()){
				availablePayAccount = payAccountLimits.availableWithdraw;
				minPayAccount = payAccountLimits.minAmountWithdraw;
				maxPayAccount = payAccountLimits.maxAmountWithdraw;
			}

			remaining = availablePayAccount - totalAmount;
			if(remaining < 0){
				remaining = 0;
			}
			remaining = remaining + " " + currencyCode;

			if(!this.getIsWithDraw() && (!payAccountLimits.enabled || !payAccountLimits.enabledWithdraw)){
				let limitRemaining = payAccountLimits.remaining + 1;
				switch(payAccountLimits.type.toUpperCase()){
					case 'COUNT':
						if(limitRemaining <= 59){
							limitError += translate('CC_LIMIT_ERROR_COUNT_TIME_SPAN', '', payAccountLimits);
						}else{
							limitError += translate('CC_LIMIT_ERROR_COUNT', '', payAccountLimits);
						}
						break;
					case 'AMOUNT':
						limitError += translate('CC_LIMIT_ERROR_AMOUNT', '', payAccountLimits);
						break;
					case 'NUMCC':
						limitError += translate('CC_LIMIT_ERROR_NUM_CC', '', payAccountLimits);
						break;
				}
			}

		}

		limits.minPayAccount = ApplicationService.currency_format(minPayAccount) + " " + currencyCode;
		limits.maxPayAccount = ApplicationService.currency_format(maxPayAccount) + " " + currencyCode;
		limits.payAccountId = payAccountLimits.payAccountId;
		limits.remaining = ApplicationService.currency_format(remaining) + " " + currencyCode;
		limits.currencyCode = currencyCode;
		limits.available = (payAccountLimits.available);
		limits.enabled = (payAccountLimits.enabled);
		limits.enabledOn = payAccountLimits.enabledOn;
		limits.errorLimitMessage = limitError;

		return limits;
	}

	/**
	 * Return last transaction cashier response
	 *
	 * @returns {*|{transactionId: number, journalId: number, amount: string, feeType: string, fee: number, userMessage: string, state: string, details: Array, cleanTransaction: function()}}
	 */
	getLastTransactionResponse(){
		return CashierStore.getLastTransactionResponse();
	}

	/**
	 * get payAccounts by processor
	 *
	 * @returns {*}
	 */
	getProcessorPayAccount(){
		return CashierStore.getProcessorPayAccount();
	}

	/**
	 * Function to change current processor
	 */
	selectProcessor(processorID){
		let stepOption = ProcessorSettings.DEPOSIT_STEPS;
		let stepsSetting = undefined;

		if(stepOption){
			if(this.getIsWithDraw()){
				stepOption = ProcessorSettings.WITHDRAW_STEPS;
			}

			if(processorID in ProcessorSettings.settings){
				if(stepOption in ProcessorSettings.settings[processorID]){
					stepsSetting = ProcessorSettings.settings[processorID][stepOption];
				}
			}

			if(!stepsSetting){
				stepsSetting = ProcessorSettings.settings[0][stepOption];
			}

			let processorSteps = stepsSetting;
			CashierActions.selectProcessor(processorID, processorSteps, processorSteps[0]);
			TransactionService.selectProcessor(processorID);
		}
	};

	/**
	 * Do some actions after processors response
	 */
	customerProcessorsResponse(processor){
		let selectedProcessor = CashierStore.getProcessor();
		this.selectProcessor(selectedProcessor.processorId);
	};

	/**
	 * Return current step
	 */
	getCurrentStep(){
		return CashierStore.getCurrentStep();
	};

	/**
	 * Return Processor Steps
	 */
	getCurrentProcessorSteps(){
		return CashierStore.getCurrentProcessorSteps();
	};

	/**
	 * Set first step as current
	 */
	setFirstStep(){
		//clean current transaction response
		CashierStore.getLastTransactionResponse().cleanTransaction();

		let firstStep = this.getCurrentProcessorSteps();
		CashierActions.setCurrentStep(firstStep[0]);
		let route = "/" + this.customerAction + "/";
		this.changeUIState(route);
	};

	/**
	 * get countries
	 *
	 * @returns {{}}
	 */
	getCountries(){
		return CashierStore.getUI().countries;
	}

	/**
	 * get country states
	 *
	 * @param country
	 * @returns {*}
	 */
	getCountryStates(country = null){
		if(!country){
			country = CashierStore.getUI().selectedCountry;
		}else{
			CashierActions.setSelectedCountry(country);
		}
		let countryStates = CashierStore.getUI().countryStates;
		let states = countryStates[country];
		if(!states || states.length <= 0){
			ApplicationService.getCountryStates(country);
			states = [];
		}

		return states;
	}

	/**
	 * return edit cc mode
	 */
	getCCEditMode(){
		return CashierStore.getUI().ccEdit;
	}

	/**
	 * get country info
	 *
	 * @param country
	 * @returns {*}
	 */
	getCountry(country){
		let countries = this.getCountries();
		for(let i = 0; i < countries.length; i++){
			let _country = countries[i];
			if(_country.Small == country){
				return {Small: _country.Small, Name: _country.Name};
			}
		}
		return {Small: country, Name: country};
	}

	/**
	 * get state
	 *
	 * @param country
	 * @param countryState
	 * @returns {{Small: *, Name: *}}
	 */
	getState(country, countryState){
		let countryStates = CashierStore.getUI().countryStates;
		let states = countryStates[country];
		if(states && states.length > 0){
			for(let i = 0; i < states.length; i++){
				let _countryState = states[i];
				if(_countryState.Small == countryState){
					return {Small: _countryState.Small, Name: _countryState.Name};
				}
			}
		}
		return {Small: countryState, Name: countryState};
	}

	/**
	 * Return option element to a html select
	 *
	 * @param item
	 * @param key
	 * @returns {XML}
	 */
	renderOption(item, key){
		if(!key || key == null || key == undefined || key == ''){
			let optId = 'opt' + (new Date().getTime());
			return (
				<option id={optId} key={optId} value={key}>{item.label}</option>
			)
		}else{
			return (
				<option id={key} key={key} value={key}>{item.label}</option>
			)
		}
	}

	/**
	 * switch action
	 */
	switchAction(){
		CashierActions.switchAction();
		let reloadMeForm = document.getElementById('reloadMeForm');
		if(reloadMeForm){
			reloadMeForm.submit();
		}else{
			location.reload();
		}
	}

	/**
	 * return left hours of the day
	 */
	getP2pHours(){
		let data = {
			f: "getPacificTimeHour", module: 'filters'
		};
		let application = CashierStore.getApplication();
		let rabbitRequest = Object.assign(data, application);
		ConnectorServices.makeBackendRequest(actions.GET_PACIFIC_TIME_HOUR_RESPONSE, rabbitRequest);
	}

	/**
	 * Get months and years after the current date to use in CC expire date
	 *
	 * @returns {{selectMonths: Array, selectYears: Array}}
	 */
	getCCDate(){
		let now = new Date();
		let selectYears = [];
		let selectMonths = [];
		selectYears.push(UIService.renderOption({label: ''}, ''));
		selectMonths.push(UIService.renderOption({label: ''}, ''));

		for(let i = 1; i < 13; i++){
			i = ('0' + i).slice(-2);
			selectMonths.push(UIService.renderOption({label: i}, i));
		}

		for(let i = now.getFullYear(); i < now.getFullYear() + 15; i++){
			selectYears.push(UIService.renderOption({label: i}, i));
		}

		return {
			selectMonths: selectMonths,
			selectYears: selectYears
		}
	}

	/**
	 * Get countries and list of states to use in location information
	 *
	 * @returns {{states: Array, countries: Array}}
	 */
	getCountriesInfo(){
		let stateOptionNodes = [];
		let countryOptionNodes = [];
		let countries = UIService.getCountries();
		let states = UIService.getCountryStates();

		for(let i = 0; i < countries.length; i++){
			countryOptionNodes.push(UIService.renderOption({label: countries[i]['Name']}, countries[i]['Small']));
		}

		for(let i = 0; i < states.length; i++){
			stateOptionNodes.push(UIService.renderOption({label: states[i]['Name']}, states[i]['Small']));
		}

		return {
			states: stateOptionNodes,
			countries: countryOptionNodes
		}
	}

	/**
	 * Check if the current selected processor is of type CC
	 *
	 * @returns {boolean}
	 */
	isCC(){
		let processor = CashierStore.getProcessor();
		return (processor.processorClass == cashier.PROCESSOR_CLASS_ID_CREDIT_CARDS);
	}

	/**
	 * Set current selected country from any input in UI
	 *
	 * @param country
	 */
	setCurrentSelectedCountry(country){
		CashierStore.setCurrentSelectedCountry(country)
	}

	/**
	 * Get current country selected
	 */
	getCountrySelected(){
		return CashierStore.getCurrentSelectedCountry()
	}

	/**
	 * Verify current zip code
	 *
	 * @param country
	 */
	getCurrentZipCodeRgx(country){
		return CashierStore.getZipCodeRegex(country);
	}

	/**
	 *Load crypto currencies list from cashier service
	 */
	loadCryptoCurrencies(){
		let company = this.getCompanyInformation();
		let params = {
			f: 'getCoins',
			companyId: company.companyId
		};

		ConnectorServices.makeCashierRequest(actions.GET_CRYPTO_CURRENCIES_RESPONSE, params);
	}

	/**
	 * Get crypto currencies list
	 *
	 * @returns {*}
	 */
	getCryptoCurrencies(){
		return CashierStore.getCryptoCurrencies();
	}

	/**
	 * Load current crypto currency limits from cashier service
	 *
	 * @param cryptoCurrencyCode
	 */
	loadCurrencyLimits(cryptoCurrencyCode, minAmount, maxAmount){
		let company = this.getCompanyInformation();
		let customer = this.getCustomerInformation();

		let params = {
			companyId: company.companyId,
			f: 'getCryptoTransferLimits',
			lowerLimit: minAmount,
			upperLimit: maxAmount,
			currencyCode: cryptoCurrencyCode,
			customerCurrency: customer.currency
		};

		ConnectorServices.makeCashierRequest(actions.GET_CRYPTO_CURRENCY_LIMITS_RESPONSE, params);
	}

	/**
	 * Activate flag for wait limits response
	 */
	loadingLimits(){
		CashierStore.loadingLimits()
	}

	/**
	 * Return limits loading state
	 *
	 * @returns {*}
	 */
	getLoadingLimits(){
		return CashierStore.getLoadingLimits()
	}

	/**
	 * Get rate from current crypto currency
	 *
	 * @returns {*}
	 */
	getCurrentCryptoRate(){
		return CashierStore.getCurrentCryptoRate()
	}

	/**
	 * Get convertion rate from current crypto currency
	 *
	 * @returns {*}
	 */
	getCurrentCryptoConvertionRate(){
		return CashierStore.getCurrentCryptoConvertionRate()
	}

	/**
	 * Set crypto currency symbol selected
	 *
	 * @param symbol
	 */
	setCurrentCryptoSymbol(symbol){
		CashierStore.setCurrentCryptoSymbol(symbol)
	}

	/**
	 * Get crypto currency symbol selected
	 *
	 * @returns {*}
	 */
	getCurrentCryptoSymbol(){
		return CashierStore.getCurrentCryptoSymbol()
	}

	/**
	 * Set crypto currency name selected
	 *
	 * @param name
	 */
	setCurrentCryptoName(name){
		CashierStore.setCurrentCryptoName(name)
	}

	/**
	 * Get crypto currency name selected
	 *
	 * @returns {*}
	 */
	getCurrentCryptoName(){
		return CashierStore.getCurrentCryptoName()
	}

	/**
	 * Set crypto address
	 *
	 * @param cryptoAddress
	 */
	setCryptoAddress(cryptoAddress){
		CashierStore.setCryptoAddress(cryptoAddress)
	}

	/**
	 * Get crypto address
	 *
	 * @returns {*}
	 */
	getCryptoAddress(){
		return CashierStore.getCryptoAddress()
	}

	/**
	 * Set crypto promo code
	 *
	 * @param promoCode
	 */
	setCryptoPromoCode(promoCode){
		CashierStore.setCryptoPromoCode(promoCode)
	}

	/**
	 * Get crypto promo code
	 *
	 * @returns {*}
	 */
	getCryptoPromoCode(){
		return CashierStore.getCryptoPromoCode()
	}

	/**
	 * Set crypto amount
	 *
	 * @param cryptoAmount
	 */
	setCryptoAmount(cryptoAmount){
		CashierStore.setCryptoAmount(cryptoAmount)
	}

	/**
	 * Get crypto amount
	 *
	 * @returns {*}
	 */
	getCryptoAmount(){
		return CashierStore.getCryptoAmount()
	}

	/**
	 * Set crypto customer amount
	 *
	 * @param customerAmount
	 */
	setCryptoCustomerAmount(customerAmount){
		CashierStore.setCryptoCustomerAmount(customerAmount)
	}

	/**
	 * Get crypto customer amount
	 *
	 * @returns {*}
	 */
	getCryptoCustomerAmount(){
		return CashierStore.getCryptoCustomerAmount()
	}

	/**
	 * Return if is required refund address
	 *
	 * @param currencyCode
	 * @returns {boolean}
	 */
	cryptoAddressRequired(currencyCode){
		if(this.getIsWithDraw()){
			return true;
		}

		let processor = CashierStore.getProcessor();
		let processorId = processor.processorId;
		if(processorId == cashier.PROCESSOR_ID_CRYPTOScreen){
			return (currencyCode != 'BTC' && currencyCode != 'LTC' && currencyCode != 'BCH') ? true : false;
		}else{
			return true;
		}
	}

	/**
	 * Validate if is valid refund address format
	 *
	 * @param currencyCode
	 * @param address
	 */
	validateCryptoAddress(currencyCode, address){
		if(address){
			let params = {
				address: address,
				f: 'validateAddress',
				currencyCode: currencyCode
			};

			ConnectorServices.makeCashierRequest(actions.VALIDATE_CRYPTO_ADDRESS, params);
		}

		this.setCryptoAddress(address);
	}

	/**
	 * Get result if current address is valid
	 *
	 * @returns {*}
	 */
	getValidAddress(){
		return CashierStore.getValidAddress()
	}

	/**
	 * Set current option selected in docs files
	 * 
	 * @param options
     */
	setDocsCurrentOption(options){
		CashierStore.setDocsCurrentOption(options)
	}

	/**
	 * Get docs files categories list
	 */
	docFilesCategories(){
		let params = {f: 'docFilesCategories'};
		ConnectorServices.makeCashierRequest(actions.DOCS_FILES_GET_FORMS_CATEGORIES_RESPONSE, params);
	}

	/**
	 * Call pending form from customers
	 */
	docFilesCustomerPendingForms(){
		let params = {
			f: 'docFilesCustomerPendingForms',
			customerId: UIService.getCustomerInformation().customerId
		};

		CashierStore.docFilesCustomerPendingFormsWait();
		ConnectorServices.makeCashierRequest(actions.DOCS_FILES_GET_CUSTOMER_PENDING_FORMS_RESPONSE, params);
	}

	/**
	 * Get form selected id
	 *
	 * @returns {*|boolean}
     */
	docFilesGetFormSelectedId(){
		return CashierStore.docFilesGetFormSelectedId()			
	}

	/**
	 * Set form selected id
	 *
	 * @param id
     */
	docFilesSetFormSelectedId(id){
		CashierStore.docFilesSetFormSelectedId(id)
	}

	/**
	 * Call form information from customer
	 *
	 * @param category
	 */
	docFilesCustomerFormsInformation(category){
		let categoryId = UIService.getDocsFileCategoryId(category);
		let pendingInfo = CashierStore.docsFilePendingCustomerFormInfo();

		if(pendingInfo && category){
			let params = {
				languageId: 11,
				categoryId: categoryId,
				f: 'docFilesCustomerFormsInformation',
				companyId: UIService.getCompanyInformation().companyId,
				customerId: UIService.getCustomerInformation().customerId
			};

			CashierStore.docFilesCustomerPendingFormInfoWait();
			ConnectorServices.makeCashierRequest(actions.DOCS_FILES_GET_CUSTOMER_FORMS_INFORMATION_RESPONSE, params);
		}
	}

	/**
	 * Get docs files inputs category
	 *
	 * @param category
	 */
	docFilesFormInputsCategories(category){
		let docs = UIService.getDocsFile();
		if(docs.forms.hasOwnProperty(category)){
			let forms = docs.forms[category];
			let pendingInfo = CashierStore.docsFilePendingInputsCategory();

			if(pendingInfo){
				for(let form in forms){
					if(forms.hasOwnProperty(form)){
						let params = {
							f: 'docFilesFormInputsCategories',
							formId: forms[form].caDocumentForm_Id
						};

						ConnectorServices.makeCashierRequest(actions.DOCS_FILES_GET_FORMS_INPUTS_CATEGORIES_RESPONSE, params);
					}
				}

				CashierStore.docsFileInputsCategoryWait();
			}
		}
	}

	/**
	 * Get id category 
	 * 
	 * @param categoryName
	 * @returns {*}
     */
	getDocsFileCategoryId(categoryName){
		let docs = UIService.getDocsFile();
		let categories = docs.categoriesList;

		for(let category in categories){
			if(categories.hasOwnProperty(category)){
				if(ApplicationService.toCamelCase(categories[category].Name) == categoryName){
					return categories[category].caDocumentCategory_Id
				}
			}
		}

		return false
	}
	
	/**
	 * Get Docs on Files object
	 * 
	 * @returns {*}
     */
	getDocsFile(){
		return CashierStore.getDocsFile();
	}

	/**
	 * Get response to upload file
	 *
	 * @returns {boolean}
	 */
	getDocsUploadResponse(){
		return CashierStore.getDocsUploadResponse()
	}

	/**
	 * Reset response wait
	 */
	docsFileReset(){
		CashierStore.docsFileReset()
	}

	/**
	 * Get current form to option selected
	 *
	 * @returns {*}
     */
	docsFileGetCurrentForm(){
		let docs = UIService.getDocsFile();
		if(docs.forms.hasOwnProperty(docs.currentOptionSelected)){
			let forms = docs.forms[docs.currentOptionSelected];
			for(let current in forms){
				if(forms.hasOwnProperty(current)){
					if(forms[current].caDocumentForm_Id == docs.formSelectedId){
						return forms[current]
					}
				}
			}
		}

		return false
	}

	/**
	 * Get current customer form request to option selected
	 *
	 * @param customerFormId
	 * @returns {*}
     */
	docsFileGetCustomerDocumentForm(customerFormId){
		let docs = UIService.getDocsFile();
		if(docs.customerForms.hasOwnProperty(docs.currentOptionSelected)){
			let customerForms = docs.customerForms[docs.currentOptionSelected];
			for(let current in customerForms){
				if(customerForms.hasOwnProperty(current)){
					if(customerForms[current].caDocumentFormCustomer_Id == customerFormId){
						return customerForms[current]
					}
				}
			}
		}

		return false
	}

	/**
	 * Get current file option element selected
	 * 
	 * @param optionId
	 * @returns {*}
     */
	docsFileGetCurrentFormElement(optionId){
		let form = UIService.docsFileGetCurrentForm();
		if(form.hasOwnProperty('fields')){
			for(let field in form.fields){
				if(form.fields.hasOwnProperty(field)){
					if(form.fields[field].hasOwnProperty('file')){
						if(form.fields[field].file.hasOwnProperty('types')){
							for(let type in form.fields[field].file.types){
								if(form.fields[field].file.types.hasOwnProperty(type)){
									if(form.fields[field].file.types[type].caCustomerFileType_Id == optionId){
										return form.fields[field].file.types[type]
									}
								}
							}
						}
					}
				}
			}
		}

		return false
	}

	/**
	 * Get source img to current option file selected
	 *
	 * @param element
	 * @returns {*}
     */
	docsFileGetSrcImg(element){
		let prefixAdd = 'docsFileOption';

		let label;
		if(element.hasOwnProperty('label')){
			label = element.label.replace('BD_TEXT_TYPE_', '');
		}else{
			if(element.hasOwnProperty('Description')){
				label = element.Description.replace('BD_TEXT_TYPE_', '');
			}
		}

		let imgName = capitalize(label.toLowerCase());

		return "../images/docsOnFiles/" + prefixAdd + imgName +".svg"
	}

	/**
	 * Get if KYC form is approved
	 */
	docsFileCheckApprovedKYC(){
		let params = {
			f: 'docsFileCheckApprovedKYC',
			customerId: UIService.getCustomerInformation().customerId
		};

		CashierStore.docFilesCustomerPendingFormsWait();
		ConnectorServices.makeCashierRequest(actions.DOCS_FILES_GET_CUSTOMER_KYC_IS_APPROVE, params);
	}
}

export let UIService = new UiService();