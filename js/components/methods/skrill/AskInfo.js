import React from 'react'
import {Register} from './Register.js'
import cashier from '../../../constants/Cashier'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {PromoCode} from '../../commonComponents/PromoCode'
import {CustomerService} from '../../../services/CustomerService'
import {AmountController} from '../../commonComponents/AmountController'
import {PayAccountDropDown} from '../../commonComponents/payaccount/PayAccountDropDown'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		payAccount: React.PropTypes.object,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
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
	 * Remove current selected PayAccount
	 */
	disablePayAccount(){
		CustomerService.getDisablePayAccount();
	},

	render(){
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;

		let isWithDraw = UIService.getIsWithDraw();
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');

		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}

		return (
			<div id="skrillAskInfo" className="box">
				<div className="row">
					<div className="title">{proccesingTitle}</div>
					<div className="infoCol">
						<div className="col-sm-12">
							<div className="form-horizontal">

								{(() => {
									if(payAccountDisplayName == cashier.NO_RESPONSE || payAccountId == 0){
										return <Register/>
									}

									return (
										<div>
											<PayAccountDropDown
												info={payAccount}
												amount={this.props.amount}
												setAmount={this.props.setAmount}
											/>
											<div className="form-group">
												<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
											</div>
										</div>
									)
								})()}

								{(() => {
									if(!isWithDraw){
										return (
											<div className="form-group">
												<PromoCode setPromoCode={this.props.setPromoCode} promoCode={this.props.promoCode}/>
											</div>
										);
									}
								})()}

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.AskInfo = AskInfo;