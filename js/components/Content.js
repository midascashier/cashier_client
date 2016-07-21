import React from 'react'
import { Header } from './Header'
import { TransactionService } from '../services/TransactionService'
import { UIService } from '../services/UIService'
import  ProcessorSettings from '../constants/Processors'

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
			limitsCheck: 0,
			feeCheck: 0
		}};
	},

	/**
	 * Check full set of limits
	 *
	 * @returns {number}
	 */
	checkLimitsFull(amount){
		return 1;
	},

	/**
	 * Check mix and Max limits
	 *
	 * @returns {number}
	 */
	checkLimitsLite(){
		let payAccountInfo = TransactionService.getCurrentPayAccount();
		let amount = this.state.info.amount;
		let limitsInfo = payAccountInfo.limitsData;

		let min, max = 0;
		if(UIService.getIsWithDraw()){
			min = limitsInfo.minAmountWithdraw;
			max = limitsInfo.maxAmountWithdraw;
		}
		else{
			min = limitsInfo.minAmount;
			max = limitsInfo.maxAmount;
		}

		if(min <= amount && amount <= max){
			return 1;
		} else{
			return 0;
		}
	},

	checkFees(){
		return 0;
	},

	checkLimits(){
		let actualState = this.state.info;
		if(this.checkFees() == 1){
			actualState.feeCheck = 1;
		}
		let currentProcessor = TransactionService.getCurrentProcessor();
		let limitsValidationVersion = ProcessorSettings.settings[currentProcessor.processorId][ProcessorSettings.LIMITS_VALIDATION_VERSION];
		if(limitsValidationVersion == "lite"){
			actualState.limitsCheck = this.checkLimitsLite();
		}
		else if(limitsValidationVersion == "full"){
			actualState.limitsCheck = this.checkLimitsFull();
		}

		this.setState({info :actualState});

	},

	/**
	 * Set local amount as local state
	 *
	 * @param amount
	 */
	setAmount(amount){
		let actualState = this.state.info;
		actualState.amount = amount;
		this.setState({info :actualState}, function afterAmountChange(){this.checkLimits()});
	},

	render() {
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				setAmount: this.setAmount,
				limitsCheck: this.state.info.limitsCheck,
				amount: this.state.info.amount
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
});

module.exports.Content = Content;