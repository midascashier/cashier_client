import React from 'react'
import { Header } from './Header'
import { TransactionService } from '../services/TransactionService'
import { UIService } from '../services/UIService'
import { CashierStore } from './../stores/CashierStore'
import  ProcessorSettings from '../constants/Processors'
import Cashier from '../constants/Cashier'

let Content = React.createClass({

		/**
		 * React function to set component initial state
		 *
		 * @returns {{amount: string, limitsCheck: number}}
		 */
		getInitialState(){
			return {
				info: {
					amount: "",
					btcAmount: "",
					limitsCheck: "",
					feeCheck: 0,
					feeCashValue: 0
				}
			};
		},

		/**
		 * Check mix and Max limits
		 *
		 * @returns {number}
		 */
		limitCheckStatus(version){
			let payAccountInfo = TransactionService.getCurrentPayAccount();
			let amount = this.state.info.amount;
			let limitsInfo = payAccountInfo.limitsData;

			if(isNaN(amount)){
				return Cashier.LOADING;
			}

			let min, max, available = 0;
			if(UIService.getIsWithDraw()){
				min = parseFloat(limitsInfo.minAmountWithdraw);
				max = parseFloat(limitsInfo.maxAmountWithdraw);
				available = limitsInfo.availableWithdraw;
			} else{
				min = parseFloat(limitsInfo.minAmount);
				max = parseFloat(limitsInfo.maxAmount);
				available = limitsInfo.available;
			}

			if(!min && !max){
				let limits = UIService.getProcessorLimitMinMax();
				min = limits.minAmount;
				max = limits.maxAmount;
			}

			if(amount < min){
				return Cashier.M_BELOW_MIN;
			}

			if(amount > max){
				return Cashier.M_ABOVE_MAX;
			}

			if(version == "full"){

				if(amount > available){
					return Cashier.M_AVAILABLE;
				}

				if(limitsInfo.enabled == 0){
					for(let limit of limitsInfo.limits){
						if(limit.Type.toLowerCase() == "count" && limit.Minutes <= 59){
							return Cashier.COUNT_ERROR;
						} else if(limit.Type.toLowerCase() == "count"){
							return Cashier.COUNT_ERROR;
						}
					}
				}
			}

			if(amount == "" || isNaN(max) || isNaN(min)){
				return Cashier.LOADING;
			} else{
				return Cashier.LIMIT_NO_ERRORS;
			}

		},

		/**
		 * calculate fee amount
		 */
		checkFees(){
			let feeCashValue = 0;
			let feeInsufficientFunds = 0;
			if(this.state.info.amount != ""){
				let processor = CashierStore.getProcessor();
				let transaction = CashierStore.getTransaction();
				let feeStructure = processor.fees.structure;
				let customer = CashierStore.getCustomer();
				let currentBalance = Math.round(customer.balance * 100) / 100;
				let amount = parseFloat(this.state.info.amount);

				if(transaction.feeType == "Free"){
					if(amount > currentBalance){
						feeInsufficientFunds = 1;
					}
				} else if(transaction.feeType == "Cash" && processor.fees.cashType == "1percent"){
					feeCashValue = parseFloat(amount * 0.01);
					if((amount + feeCashValue) > parseFloat(currentBalance)){
						feeInsufficientFunds = 1;
					}
				} else{
					if(feeStructure){
						for(let i = 0; i < feeStructure.length; i++){
							let feeItem = feeStructure[i];
							if(parseFloat(feeItem.FromAmount) <= amount && amount < parseFloat(feeItem.ToAmount)){
								feeCashValue = Math.ceil(parseFloat(feeItem.OnlineCash));

								if(transaction.feeType == "CASH" && (amount + feeCashValue) > parseFloat(currentBalance)){
									feeInsufficientFunds = 1;
								}
								break;
							}
						}
					}
				}
			}
			let actualState = this.state.info;
			actualState.feeCashValue = feeCashValue;
			actualState.feeCheck = feeInsufficientFunds;
			this.setState({ info: actualState });
		},

		/**
		 * set limits status local state
		 */
		checkLimits()
		{
			let actualState = this.state.info;
			let currentProcessor = TransactionService.getCurrentProcessor();
			let limitsValidationVersion = ProcessorSettings.settings[currentProcessor.processorId][ProcessorSettings.LIMITS_VALIDATION_VERSION];
			if(limitsValidationVersion){
				actualState.limitsCheck = this.limitCheckStatus(limitsValidationVersion);
			}
			this.setState({ info: actualState });

		},

		/**
		 * Set local amount as local state
		 *
		 * @param amount
		 */
		setAmount(amount)
		{
			let actualState = this.state.info;
			let processorID = UIService.getProcessorId();
			// Calculate BTC just for bitcoin ProcessorID
			if(processorID == Cashier.PROCESSOR_ID_BITCOIN && CashierStore.getBTCRate()){
				let btcAmount = amount * CashierStore.getBTCRate();
				actualState.btcAmount = btcAmount;
			}
			actualState.amount = amount;
			this.setState({ info: actualState }, function afterAmountChange(){
				this.checkLimits();
				this.checkFees()
			});
		},

		/**
		 * Set btc amount
		 *
		 * @param amount
		 */
		setBTCAmount(btcAmount){
			let actualState = this.state.info;
			let amount = btcAmount / CashierStore.getBTCRate();
			actualState.amount = amount;
			actualState.btcAmount = btcAmount;
			this.setState({ info: actualState }, function afterAmountChange(){
				this.checkLimits();
				this.checkFees()
			});
		},

		render()
		{

			const childrenWithProps = React.Children.map(this.props.children,
				(child) => React.cloneElement(child, {
					setAmount: this.setAmount,
					setBTCAmount: this.setBTCAmount,
					limitsCheck: this.state.info.limitsCheck,
					amount: this.state.info.amount,
					btcAmount: this.state.info.btcAmount,
					feeCashValue: this.state.info.feeCashValue,
					feeCheck: this.state.info.feeCheck
				})
			);

			return (
				<div id="depositContent">
					<Header />
					<div id="internal-content" className="internal-content">
						<div className="row">
							<div className="col-sm-12">
								<div className="modules">
									<div className="row">
										{childrenWithProps}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	})
	;

module.exports.Content = Content;