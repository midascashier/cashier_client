import React from 'react'
import Cashier from '../../../constants/Cashier'
import { UIService } from '../../../services/UIService'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'
import { TransactionService } from '../../../services/TransactionService'
import { LoadingSpinnerSmall } from '../../../components/loading/LoadingSpinnerSmall'

let InfoMethod = React.createClass({

	propTypes: {
		rate: React.PropTypes.number,
		limits: React.PropTypes.object,
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
	 *  this function sets and return object with local states
	 *
	 * @returns {{processor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), currentPayAccount: *, originPath: (*|string)}}
	 */
	refreshLocalState() {
		return {
			checkIn : false,
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
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	/**
	 * this function sends deposit info to cashier
	 *
	 */
	continueTransaction(){

		this.setState({checkIn : true});

		let amount = this.props.customerAmount;
		let address = this.props.cryptoAddress;
		let rateBTC = this.props.amountRateBTC;
		let currencyISO = this.props.cryptoCurrencyISO;
		let currencyName = this.props.cryptoCurrencyName;
		let transaction = CashierStore.getTransaction();

		transaction.amount = amount;
		transaction.payAccountId = 0;
		transaction.cryptoAddress = address;
		transaction.currencyName = currencyName;
		transaction.currencySymbol = currencyISO;
		transaction.BTCConversionAmount = rateBTC;

		this.props.checkCryptoAddress((valid) => {
			if(valid){
				let isWithDraw = UIService.getIsWithDraw();
				if(isWithDraw){
					UIService.confirmTransaction();
				}else{
					TransactionService.processCryptoTransfer(transaction, 'instructions');
				}
			}else{
				this.setState({checkIn : false});
				this.props.setCryptoAddressError(true);
			}
		});
	},

	render() {
		let nextBTN = (
			<button type='button' onClick={this.continueTransaction} disabled={isNextDisabled} className='btn btn-green'>
				{translate('PROCESSING_BUTTON_NEXT', 'Next')}
			</button>
		);

		if(this.state.checkIn){
			nextBTN = <LoadingSpinnerSmall/>;
		}

		let limitsCheck = false;

		if(this.props.limitsCheck == Cashier.LIMIT_NO_ERRORS){
			limitsCheck = true;
		}

		let feeCheck = this.props.feeCheck;
		let isWithDraw = UIService.getIsWithDraw();
		let allowContinueToConfirm = true;

		if(isWithDraw){
			allowContinueToConfirm = this.props.allowContinueToConfirm;
		}

		let processorDisplayName = UIService.getProcessorDisplayName().toUpperCase();
		let payAccountInfo = UIService.getDisplayLimits(this.props.customerAmount);
		let originPath = UIService.getOriginPath();
		let currentView = UIService.getCurrentView().toUpperCase();
		let transactionType = translate(currentView);

		let title = translate('PROCESSING_LIMIT_INFORMATION_TITLE', 'Limits', {
			processorName: processorDisplayName,
			transactionType: transactionType
		});

		let isNextDisabled = "disabled";

		if(isWithDraw){
			if(limitsCheck && !feeCheck && this.props.cryptoAddress){
				isNextDisabled = "";
			}
		}else{
			if(limitsCheck && this.props.cryptoAddress){
				isNextDisabled = "";
			}
		}

		let currency = this.props.limits.currencyCode;

		return (
			<div id="InfoMethodBitCoin">
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
								<tr>
									<td>{translate('PROCESSING_LIMIT_REMAINING', 'Remaining Limit')}:</td>
									<td><span>{payAccountInfo.remaining}</span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="row mod-btns">
						<div className="col-sm-6">
							{nextBTN}
							<p><a onClick={this.setFirstStep}>{translate('USE_DIFFERENT_METHOD')}.</a></p>
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
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.InfoMethod = InfoMethod;