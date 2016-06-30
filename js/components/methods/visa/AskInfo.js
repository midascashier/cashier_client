import React from 'react'
import {translate} from '../../../constants/Translate'
import {SelectPayAccount} from '../../SelectPayAccount'
import {AmountController} from '../../AmountController'
import {controllerUIService} from '../../../services/ControllerService'

let AskInfo = React.createClass({

	propTypes: {
		selectedProcessor: React.PropTypes.object
	},

	render() {
		let originPath = controllerUIService.getOriginPath();
		let processingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');

		return (
			<div id="askAmount" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<div className="title">{processingTitle}</div>
							</div>
							<div className="col-sm-12">
								<div className="infoCol">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-3">
												<div className="method active pull-left">
													<img className="img-responsive" src={originPath + '/images/processors/11001.png'} alt="Card"/>
												</div>
											</div>
											<div className="col-sm-9">
                        {translate('CREDIT_CARD_SELECT', 'Credit Card')}:
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


module.exports.AskInfo = AskInfo;
