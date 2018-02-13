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

		accountChange: React.PropTypes.func
	},

	render(){
		let setAmount = this.props.setAmount;
		let limitsCheck = this.props.limitsCheck;
		let account = this.props.account;
		let feeCheck = this.props.feeCheck;
		let feeCashValue = this.props.feeCashValue;
		let amount = this.props.amount;

		const title = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')
		let isInvalid = !this.state.waitForValidation && this.state.playerAccount;

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
												<div className={"form-control " + isInvalid ? "has-error" : null}>
													<input type="test" id="account" name="account" ref="account" value={account} onChange={this.props.accountChange}/>
													{(() => {
														if(isInvalid) {
															return (
																<div className="alert alert-danger" role="alert">
																	<i className="fa fa-thumbs-o-down red"/>
																	<span>{translate('AGENT_TRANSFER_INVALID_USER_ACCOUNT')}</span>
																</div>
															)
														}
													})()}
												</div>
												{/*<Input type="text" validate="invalid-account" id="account" name="account" ref="account" value={account} onChange={this.props.accountChange}/>*/}
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