import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { Input } from '../../Inputs'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'

let AskInfo = React.createClass({

	propTypes: {
		netellerPassword: React.PropTypes.func,
		transactionAmount: React.PropTypes.func,
		allowContinue: React.PropTypes.number,
		password: React.PropTypes.string,
		amount: React.PropTypes.number
	},

	render() {
		let netellerPassword = this.props.netellerPassword;
		let allowContinue = this.props.allowContinue;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let password = this.props.password;
		let isWithDraw = UIService.getIsWithDraw();
		let originPath = UIService.getOriginPath();

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
													<img className="img-responsive" src={originPath + '/images/processors/333.png'}
															 alt="Neteller"/>
												</div>
											</div>
											<div className="col-sm-9">
												<div className="form-group">
													<label for="">{translate('NETELLER_ACCOUNT', 'Neteller Account')}:</label>
													<SelectPayAccount />
												</div>
												{(() =>{
													if(!isWithDraw){
														return <div className="form-group">
															<label for="">{translate('NETELLER_SECURE', 'Secure ID')}:</label>
															<Input onChange={netellerPassword} value={password} type="password"/>
														</div>
													}
												})()}
												<AmountController setAmount={setAmount} value={amount}/>
												{(() =>{
													if(!allowContinue){
														return <span>LIMITS ERROR</span>
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
