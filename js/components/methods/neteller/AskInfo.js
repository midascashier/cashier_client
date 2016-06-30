import React from 'react'
import {translate} from '../../../constants/Translate'
import {SelectPayAccount} from '../../SelectPayAccount'
import {Input} from '../../Inputs'
import {AmountController} from '../../AmountController'
import {controllerUIService} from '../../../services/ControllerService'

let AskInfo = React.createClass({

	propTypes: {
		netellerPasswordInput: React.PropTypes.func, password: React.PropTypes.string, selectedProcessor: React.PropTypes.object
	},

	render() {
		let netellerPasswordInput = this.props.netellerPasswordInput;
		let password = this.props.password;
		let isWithDraw = controllerUIService.getIsWithDraw();
		let originPath = controllerUIService.getOriginPath();

		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');
		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}

		return (
			<div id="askAmount" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<div className="title">{proccesingTitle}</div>
							</div>
							<div className="col-sm-12">
								<div className="infoCol">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-3">
												<div className="method active pull-left">
													<img className="img-responsive" src={originPath + '/images/processors/333.png'} alt="Neteller"/>
												</div>
											</div>
											<div className="col-sm-9">
												{translate('NETELLER_ACCOUNT', 'Neteller Account')}:
												<SelectPayAccount />
												{translate('NETELLER_SECURE', 'Secure ID')}:
												<Input onChange={netellerPasswordInput} value={password} type="password"/>
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
