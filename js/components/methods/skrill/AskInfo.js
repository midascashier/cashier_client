import React from 'react'
import {translate} from '../../../constants/Translate'
import cashier  from '../../../constants/Cashier'
import {AmountController} from '../../AmountController'
import {PromoCode} from '../../PromoCode'
import {UIService} from '../../../services/UIService'
import {Register} from './Register.js'
import {CustomerService} from '../../../services/CustomerService'
import { PayAccountDropDown } from '../../commonComponents/payaccount/payAccountDropDown'

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
	getProps() {
		return this.props
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},

	render() {
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;
		let setPromoCode = this.props.setPromoCode;
		let promoCode = this.props.promoCode;

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

								{(() =>{
									if(!isWithDraw){
										promoCode = (
											<div className="form-group">
												<PromoCode setPromoCode={setPromoCode} promoCode={promoCode}/>
											</div>
										);
									}

									if(payAccountDisplayName == cashier.NO_RESPONSE || payAccountId == 0){
										return <Register/>
									}

									return (
										<div>
											<PayAccountDropDown info={this.getProps()}/>
											<div className="form-group">
												<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
											</div>
											{promoCode}
										</div>
									)
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