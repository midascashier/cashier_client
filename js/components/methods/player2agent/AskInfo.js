import React from 'react'
import {Input} from '../../commonComponents/Inputs'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {AmountController} from '../../commonComponents/AmountController'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		setAmount: React.PropTypes.func,
		changeValue: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		account: React.PropTypes.string,
		transaction: React.PropTypes.object,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	performSearch() {
		Tr
	},

	render(){
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let btcAmount = this.props.btcAmount;
		let limitsCheck = this.props.limitsCheck;
		let feeCashValue = this.props.feeCashValue;
		let feeCheck = this.props.feeCheck;
		let account = this.props.account;
		let setPromoCode = this.props.setPromoCode;
		let promoCode = this.props.promoCode;

		let isWithDraw = UIService.getIsWithDraw();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')
		}

		return (
			<div id="btcAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('AGENT_TRANSFER_USER_ACCOUNT', 'User account')}:</label>
											<div className="col-sm-8">
												<Input
													type="text"
													id="account"
													name="account"
													ref="account"
													validate="isBitCoinAddress"
													onChange={this.props.changeValue}
													value={account}
													addonBtn="fa-search"
													addonClick={this.performSearch}
												/>
											</div>
										</div>

										<div className="form-group">
											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>
									</div>
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