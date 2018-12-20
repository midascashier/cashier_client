import React from 'react'
import {Register} from './Register'
import cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {PromoCode} from '../../commonComponents/PromoCode'
import {CustomerService} from '../../../services/CustomerService'
import {FeeController} from '../../commonComponents/FeeController'
import {AmountController} from '../../commonComponents/AmountController'
import {PayAccountDropDown} from '../../commonComponents/payaccount/PayAccountDropDown'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.node,
		promoCode: React.PropTypes.string,
		setPromoCode: React.PropTypes.func
	},

	componentWillMount(){
		this.state = {
			errorMessage: null
		}
	},

	/**
	 * Pass props on to son
	 *
	 * @returns {*}
	 */
	getProps(){
		return this.props
	},

	/**
	 * Disable selected payAccount
	 */
	disablePayAccount(){
		CustomerService.getDisablePayAccount();
	},

	render(){
		let amount = this.props.amount;
		let feeCheck = this.props.feeCheck;
		let setAmount = this.props.setAmount;
		let payAccount = this.props.payAccount;
		let limitsCheck = this.props.limitsCheck;
		let payAccountId = payAccount.payAccountId;
		let feeCashValue = this.props.feeCashValue;
		let payAccountDisplayName = payAccount.displayName;
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
									{((() => {

										if(payAccountDisplayName == cashier.NO_RESPONSE || payAccountId == 0){
											return <Register/>
										}

										return (
											<div>
												<PayAccountDropDown info={payAccount} amount={this.props.amount} setAmount={this.props.setAmount}/>

												<div className="form-group">
													<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
												</div>

												{(() => {
													if(!isWithDraw){
														return (
															<div className="form-group">
																<PromoCode setPromoCode={this.props.setPromoCode} promoCode={this.props.promoCode}/>
															</div>
														);
													}
												})()}

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
