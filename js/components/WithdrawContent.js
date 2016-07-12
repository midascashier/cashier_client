import React from 'react'
import { Header } from './Header'
import { TransactionService } from '../services/TransactionService'
import { UIService } from '../services/UIService'
import  ProcessorSettings from '../constants/Processors'

let WithdrawContent = React.createClass({
	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		return {
			amount: ""
		};
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
		let amount = this.state.amount;
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

	checkLimits(){
		let currentProcessor = TransactionService.getCurrentProcessor();
		let limitsValidationVersion = ProcessorSettings.settings[currentProcessor.processorId].validationVersion;
		if(limitsValidationVersion == "lite"){
			this.setState({ allowContinue: this.checkLimitsLite() });
		}
		else if(limitsValidationVersion == "full"){
			this.setState({ allowContinue: this.checkLimitsFull() });
		}
	},

	/**
	 * Set local amoun as local state
	 *
	 * @param amount
	 */
	setAmount(amount){
		this.setState({ amount: amount }, function afterAmountChange(){this.checkLimits()});
	},
	
	render() {
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				setAmount: this.setAmount,
				allowContinue: this.state.allowContinue,
				amount: this.state.amount
			})
		);

		return (
			<div id="withdrawContent">
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

module.exports.WithdrawContent = WithdrawContent;