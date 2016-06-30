import React from 'react'
import {translate} from '../../../constants/Translate'
import {SelectPayAccount} from '../../SelectPayAccount'
import {AmountController} from '../../AmountController'

let AskInfoWithdraw = React.createClass({
	propTypes: {
		originPath: React.PropTypes.string,
		selectedProcessor: React.PropTypes.object,
		isWithDraw: React.PropTypes.number
	},

	render() {
		return (
			<div id="askAmount" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
              	<div className="title">{translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')}</div>
							</div>
							<div className="col-sm-12">
								<div className="infoCol">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-3">
												<div className="method active pull-left">
													<img className="img-responsive" src={this.props.originPath + '/images/processors/814.png'} alt="Bitcoin"/>
												</div>
											</div>
											<div className="col-sm-9">
                        {translate('BITCOIN_ADDRESS', 'BitCoin Address')}:
                        <SelectPayAccount />
                        {translate('PROCESSING_AMOUNT', 'Amount')}:
												<AmountController />
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


module.exports.AskInfoWithdraw = AskInfoWithdraw;
