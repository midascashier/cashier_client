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
		setAmount: React.PropTypes.func,
		changeValue: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		bitcoinAddress: React.PropTypes.string,
		transaction: React.PropTypes.object,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
	},

	render(){
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let btcAmount = this.props.btcAmount;
		let limitsCheck = this.props.limitsCheck;
		let feeCashValue = this.props.feeCashValue;
		let feeCheck = this.props.feeCheck;
		let bitcoinAddress = this.props.bitcoinAddress;
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
										{(() => {
											if(isWithDraw){
												return (
													<div className="form-group">
														<label className="col-sm-4 control-label">{translate('BITCOIN_ADDRESS', 'BitCoin Address')}:</label>
														<div className="col-sm-8">
															<Input type="text" id="bitcoinAddress" name="bitcoinAddress" ref="bitcoinAddress" validate="isBitCoinAddress" onChange={this.props.changeValue} value={bitcoinAddress}/>
														</div>
													</div>
												)
											}
										})()}

										<div className="form-group">
											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>

										{(() => {
											if(!isWithDraw){
												return (
													<div>
														<div className="form-group">
															<label className="col-sm-4 control-label">BTC ~</label>
															<div className="col-sm-8">
																<Input className="form-control" type="number" id="btcAmount" name="btcAmount" ref="btcAmount" validate="isNumber" onChange={this.props.setBTCAmount} value={btcAmount}/>
															</div>
														</div>
														<div className="form-group">
															<PromoCode setPromoCode={setPromoCode} promoCode={promoCode}/>
														</div>
														<div className="form-group">
															<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
														</div>
													</div>
												);
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