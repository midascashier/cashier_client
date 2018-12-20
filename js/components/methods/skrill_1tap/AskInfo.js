import React from 'react'
import {Input} from '../../commonComponents/Inputs'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {PromoCode} from '../../commonComponents/PromoCode'
import {FeeController} from '../../commonComponents/FeeController'
import {AmountController} from '../../commonComponents/AmountController'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		changeValue: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		account: React.PropTypes.node,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 */
	refreshLocalState(){
		return {
			payAccount: {
				account: ""
			}
		}
	},

	render(){
		let limitsCheck = this.props.limitsCheck;
		let setAmount = this.props.setAmount;
		let changeValue = this.props.changeValue;
		let amount = this.props.amount;
		let isWithDraw = UIService.getIsWithDraw();
		let feeCashValue = this.props.feeCashValue;
		let feeCheck = this.props.feeCheck;
		let account = this.props.account;
		let setPromoCode = this.props.setPromoCode;
		let promoCode = this.props.promoCode;

		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');

		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}
		return (
			<div id="skrillAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{proccesingTitle}</div>
						<div className="infoCol scroll">
							<div className="row">

								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group" id="payAccount">
											<label className="col-sm-4 control-label">{translate('ONETAP_ACCOUNT', '1TAP Account')}:</label>
											<div className="col-sm-8" id="selectPayAccount">
												<Input className="form-control" type="text" id="ecoAccount" name="OneTapAccount" validate="isEmail" onChange={changeValue.bind(null, 'account', 0)} value={account} require/>
											</div>
										</div>

										<div className="form-group">
											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>

										{(() => {
											if(isWithDraw){
												return (
													<div className="form-group">
														<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
													</div>
												)
											}else{
												return (
													<div className="form-group">
														<PromoCode setPromoCode={this.props.setPromoCode} promoCode={this.props.promoCode}/>
													</div>
												)
											}
										})()}
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