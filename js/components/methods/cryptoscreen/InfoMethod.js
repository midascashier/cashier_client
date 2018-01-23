import React from 'react'
import Cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {LoadingSpinnerSmall} from '../../../components/loading/LoadingSpinnerSmall'

let InfoMethod = React.createClass({

	propTypes: {
		rate: React.PropTypes.number,
		limits: React.PropTypes.object,
		promoCode: React.PropTypes.node,
		getSymbol: React.PropTypes.func,
		limitsCheck: React.PropTypes.node,
		cryptoAmount: React.PropTypes.node,
		cryptoAddress: React.PropTypes.node,
		customerAmount: React.PropTypes.node,
		getCurrencyRate: React.PropTypes.func,
		setCryptoAmount: React.PropTypes.func,
		setAmountRateBTC: React.PropTypes.func,
		setCustomerAmount: React.PropTypes.func,
		checkCryptoAddress: React.PropTypes.func,
		setCryptoCurrencyISO: React.PropTypes.node,
		setCryptoCurrencyName: React.PropTypes.node,
		setCryptoAddressError: React.PropTypes.node
	},

	/**
	 * React function to set component initial state
	 *
	 * @returns {*|{customer, company}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{checkIn: boolean, processor: *|{processorClass: number, processorId: number, Name: string, displayName: string, bonus: Array, rate: number, limits: Array, limitRules: Array, fees: {enableBP: number, enableCash: number, enableFree: number, cashType: string, structure: Array}, load: function(*)}, currentPayAccount: *|{payAccountId: null, displayName: null, personal: {firstName: null, middleName: null, lastName: null, lastName2: null, phone: null, email: null, personalId: null, personalIdType: null}, address: {country: null, countryName: null, state: null, stateName: null, city: null, address1: null, address2: null, zip: null}, secure: {account: null, password: null, extra1: null, extra2: null, extra3: null}, extra: {ssn: null, dob: null, dobDay: null, dobMonth: null, dobYear: null}, limitsData: {available: null, type: null, remaining: null, enabled: null, enabledOn: null, minAmount: null, maxAmount: null, availableWithdraw: null, remainingWithdraw: null, enabledWithdraw: null, enabledOnWithdraw: null, minAmountWithdraw: null, maxAmountWithdraw: null, depositLimits: {}, withdrawLimits: {}, limitsPassed: boolean}, load: function(*)}, transaction: *|{amount: string, fee: number, feeType: string, bonusId: number, secondFactorAuth: number, bitcoinAddress: string, checkTermsAndConditions: number, controlNumber: string, sendBy: string, timeFrameDay: null, timeFrameTime: null, dobMonth: string, dobDay: string, dobYear: string, ssn: string, expirationMonth: string, expirationYear: string, randomTuid: string, hash: string, isCodeValid: number, secondFactorMessage: string, secondFactorMaxAttempts: boolean, promoCode: string, cleanTransaction}}}
	 */
	refreshLocalState(){
		return {
			checkIn: false,
			processor: CashierStore.getProcessor(),
			currentPayAccount: CashierStore.getCurrentPayAccount(),
			transaction: CashierStore.getTransaction()
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
	 * send the customer to select the processor again
	 */
	setFirstStep(){
		UIService.setFirstStep();
	},

	/**
	 * Execute action to start new transaction
	 */
	goTransaction(){
		let promoCode = this.props.promoCode;
		let amount = this.props.customerAmount;
		let fee = this.props.feeCashValue;
		let cryptoAddress = this.props.cryptoAddress;
		let currencyRate = UIService.getCurrentCryptoConvertionRate();
		let currencyISO = UIService.getCurrentCryptoSymbol();
		let currencyName = UIService.getCurrentCryptoName();

		//set values
		TransactionService.setAmount(amount);
		TransactionService.setFeeAmount(fee);
		TransactionService.setPromoCode(promoCode);
		TransactionService.setCryptoAddress(cryptoAddress);
		TransactionService.setCryptoCurrencyISO(currencyISO);
		TransactionService.setCryptoCurrencyName(currencyName);
		TransactionService.setTransactionBTCConversionAmount(currencyRate);

		let isWithDraw = UIService.getIsWithDraw();
		if(isWithDraw){
			UIService.confirmTransaction();
		}else{

			let dynamicParams = {
				amount: amount,
				payAccountId: 0,
				promoCode: promoCode,
				cryptoAddress: cryptoAddress,
				refundAddress: cryptoAddress,
				currencyName: currencyName,
				currencySymbol: currencyISO,
				BTCConversionAmount: currencyRate
			};

			TransactionService.processCryptoTransfer(dynamicParams, 'instructions');
		}
	},

	/**
	 * this function sends deposit info to cashier
	 */
	continueTransaction(){
		this.setState({checkIn: true});
		let processor = UIService.getProcessorId();
		let currencyISO = this.props.cryptoCurrencyISO;
		let needCryptoAddress = UIService.refundAddressRequired(currencyISO);
		if(needCryptoAddress || processor == Cashier.PROCESSOR_ID_CRYPTO_TRANSFER){
			this.props.checkCryptoAddress((valid) =>{
				if(valid){
					this.goTransaction()
				}else{
					this.setState({checkIn: false});
					this.props.setCryptoAddressError(true);
				}
			});
		}else{
			this.goTransaction()
		}
	},

	render(){
		let limitsCheck = false;
		let isNextDisabled = "disabled";

		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS){
			limitsCheck = true;
		}

		if(isWithDraw){
			if(limitsCheck && !feeCheck && this.props.cryptoAddress){
				isNextDisabled = "";
			}
		}else{
			let processor = UIService.getProcessorId();
			let needCryptoAddress = UIService.refundAddressRequired(this.props.getSymbol());
			if(limitsCheck && (this.props.cryptoAddress || (!needCryptoAddress && processor != Cashier.PROCESSOR_ID_CRYPTO_TRANSFER))){
				isNextDisabled = "";
			}
		}

		let nextBTN = (
			<button type='button' onClick={this.continueTransaction} disabled={isNextDisabled} className='btn btn-green'>
				{translate('PROCESSING_BUTTON_NEXT', 'Next')}
			</button>
		);

		if(this.state.checkIn){
			nextBTN = <LoadingSpinnerSmall/>;
		}

		let feeCheck = this.props.feeCheck;
		let isWithDraw = UIService.getIsWithDraw();
		let allowContinueToConfirm = true;

		if(isWithDraw){
			allowContinueToConfirm = this.props.allowContinueToConfirm;
		}

		let processorDisplayName = UIService.getProcessorDisplayName().toUpperCase();
		let originPath = UIService.getOriginPath();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);

		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName,
			transactionType: transactionType
		});

		let currency = this.props.limits.currencyCode;

		return (
			<div id="InfoMethodCryptoScreen">
				<div className="col-sm-12">
					<div className="title">{title}</div>
					<div className="table-responsive">
						<table className="table table-striped">
							<tbody>
								<tr>
									<td>{translate('PROCESSING_MIN', 'Min.') + ' ' + transactionType}:</td>
									<td><span>{this.props.limits.minAmount + ' ' + currency}</span></td>
								</tr>
								<tr>
									<td>{translate('PROCESSING_MAX', 'Max.') + ' ' + transactionType}:</td>
									<td><span>{this.props.limits.maxAmount + ' ' + currency}</span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="row mod-btns">
						<div className="col-sm-6">
							{nextBTN}
							<p>
								<a onClick={this.setFirstStep}>{translate('USE_DIFFERENT_METHOD', 'Use different Method')}.</a>
							</p>
						</div>
						<div className="col-sm-6">
							<img src={originPath + '/images/ssl.png'} alt="ssl"/>
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