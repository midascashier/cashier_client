import React from 'react'
import { translate } from '../../../constants/Translate'
import { Input } from '../../Inputs'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { FeeController } from '../../FeeController'
import { SecondFactor } from '../../SecondFactor'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		changeValue: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		bitcoinAddress: React.PropTypes.string,
		transaction: React.PropTypes.object
	},

	render() {
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let btcAmount = this.props.btcAmount;
		let limitsCheck = this.props.limitsCheck;
		let feeCashValue = this.props.feeCashValue;
		let feeCheck = this.props.feeCheck;
		let bitcoinAddress = this.props.bitcoinAddress;
		let isWithDraw = UIService.getIsWithDraw();
		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')
		}

		return (
			<div id="btcAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol">
							<div className="row">
								<div className="col-sm-3">
									<div className="method active pull-left">
										<img className="img-responsive" src={originPath + '/images/processors/814.png'} alt={displayName}/>
									</div>
								</div>
								<div className="col-sm-9">

									{(() =>{
										if(isWithDraw){
											return (
												<div className="form-group">
													<label>{translate('BITCOIN_ADDRESS', 'BitCoin Address')}:</label>
													<Input className="form-control" type="text" id="bitcoinAddress" name="bitcoinAddress"
																 ref="bitcoinAddress" validate="isBitCoinAddress" onChange={this.props.changeValue}
																 value={bitcoinAddress}/>
												</div>
											)
										}
									})()}

									<div className="form-group">
										<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>

										{(() =>{
											if(!isWithDraw){
												return (<div>
													<label>BTC ~</label>
													<Input className="form-control" type="number" id="btcAmount" name="btcAmount"
																 ref="btcAmount" validate="isNumber" onChange={this.props.setBTCAmount}
																 value={btcAmount}/>
												</div>);
											}
										})()}

										{(() =>{
											if(isWithDraw){
												return <FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>;
											}
										})()}

										{(() =>{
											if(isWithDraw){
												return <SecondFactor transaction={this.props.transaction} limitsCheck={limitsCheck} allowContinueToConfirm={this.props.allowContinueToConfirm}/>
											}
										})()}

									</div>

									{(() =>{
										if(!isWithDraw){
											return (
												<p><em>Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></em></p>
											)
										}
									})()}
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
