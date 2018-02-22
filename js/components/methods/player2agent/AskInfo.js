import React from 'react'
import {Input} from '../../commonComponents/Inputs'
import {translate} from '../../../constants/Translate'
import {AmountController} from '../../commonComponents/AmountController'
import {FeeController} from '../../commonComponents/FeeController'

let AskInfo = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,

		account: React.PropTypes.string,
		amount: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,

		accountChange: React.PropTypes.func,
		invalidAccount: React.PropTypes.bool
	},

	render(){
		let setAmount = this.props.setAmount;
		let limitsCheck = this.props.limitsCheck;
		let account = this.props.account;
		let feeCheck = this.props.feeCheck;
		let feeCashValue = this.props.feeCashValue;
		let amount = this.props.amount;

		const title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')

		let validations = {
			AGENT_TRANSFER_INVALID_USER_ACCOUNT: this.props.invalidAccount
		};

		//console.log(validations);

		return (
			<div id="btcAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
							<div className="row">
								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('AGENT_TRANSFER_USER_ACCOUNT', 'User account')}:</label>
											<div className="col-sm-8">
												<Input type="text" customValidations={validations} id="account" name="account" ref="account" value={account} onChange={this.props.accountChange}/>
											</div>
										</div>

										<div className="form-group">
											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>

										<div className="form-group">
											<FeeController feeCashValue={feeCashValue} feeCheck={feeCheck} amount={amount}/>
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