import React from 'react'
import {translate} from '../../../constants/Translate'
import {SelectPayAccount} from '../../SelectPayAccount'
import {AmountController} from '../../AmountController'
import {controllerUIService} from '../../../services/ControllerService'
import {FeeController} from '../../FeeController'

let AskInfo = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
	},

	render() {
		let isWithDraw = controllerUIService.getIsWithDraw();
		let originPath = controllerUIService.getOriginPath();
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
																<div><label for="">{translate('BITCOIN_ADDRESS', 'BitCoin Address')}:</label>
																<SelectPayAccount /></div>
															)
														}
													})()}
												</div>
												<AmountController />
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
