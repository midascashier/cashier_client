import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { TermsController } from '../../TermsController'
import { UIService } from '../../../services/UIService'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		allowContinue: React.PropTypes.number,
		amount: React.PropTypes.number
	},

	render() {
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;

		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		let information = translate('CREDIT_CARD_INFO', '');

		return (
			<div id="askAmountVisa" className="box">
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
													<img className="img-responsive" src={originPath + '/images/processors/11001.png'} alt={displayName}/>
												</div>
											</div>
											<div className="col-sm-9">
												<div className="form-group">
													<label for="">{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
													<SelectPayAccount />
												</div>
												<AmountController setAmount={setAmount} value={amount}/>
												<TermsController />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<p>{information}</p>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.AskInfo = AskInfo;
