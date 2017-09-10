import React from 'react'
import  cashier  from '../../../constants/Cashier'
import { translate } from '../../../constants/Translate'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { CustomerService } from '../../../services/CustomerService'
import { FeeController } from '../../FeeController'
import { PayAccountDropDown } from '../../commonComponents/payaccount/payAccountDropDown'
import { Register } from './Register'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.node
	},

	componentWillMount() {
		this.state = {
			errorMessage: null
		}
	},

	/**
	 * Pass props on to son
	 *
	 * @returns {*}
     */
	getProps() {
		return this.props
	},

	/**
	 * Disable selected payAccount
	 */
	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},

	render() {
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;
		let feeCheck = this.props.feeCheck;
		let feeCashValue = this.props.feeCashValue;
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');

		let withdrawFee = "";
		let isWithDraw = UIService.getIsWithDraw();

		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');

			withdrawFee = (
				<div className="form-group">
					<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
				</div>
			);
		}

		return (
			<div id="ecoPayzAskInfo" className="box">
				<div className="row">
					<div className="title">{proccesingTitle}</div>
					<div className="infoCol">
						<div className="col-sm-12">
							<div className="form-horizontal">
								<div>
									{((()=>{

										if(payAccountDisplayName == cashier.NO_RESPONSE || payAccountId == 0){
											return <Register/>
										}

										return(
											<div>
												<PayAccountDropDown info={this.getProps}/>
												<div className="form-group">
													<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
												</div>
												{withdrawFee}
											</div>
										);
									})())}
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
