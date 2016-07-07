import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { FeeController } from '../../FeeController'

let AskInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		transactionAmount: React.PropTypes.func,
		amount: React.PropTypes.number
	},

	render() {
		let isWithDraw = UIService.getIsWithDraw();
		let originPath = UIService.getOriginPath();
		let transactionAmount = this.props.transactionAmount;
		let amount = this.props.amount;
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')
		}

		return (
			<div id="askAmount" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<div className="title">{title}</div>
							</div>
							<div className="col-sm-12">
								<div className="infoCol">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-3">
												<div className="method active pull-left">
													<img className="img-responsive" src={originPath + '/images/processors/814.png'} alt="Bitcoin"/>
												</div>
											</div>
											<div className="col-sm-9">
												<div className="form-group">
													{(() =>{
														if(isWithDraw){
															return (
																<div>
																	<label for="">{translate('BITCOIN_ADDRESS', 'BitCoin Address')}:</label>
																	<SelectPayAccount />
																</div>
															)
														}
													})()}
												</div>
												<AmountController transactionAmount={transactionAmount} value={amount}/>
												{(() =>{
													if(isWithDraw){
														return <FeeController />;
													}
												})()}
											</div>
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
