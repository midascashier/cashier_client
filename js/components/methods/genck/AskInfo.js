import React from 'react'
import  cashier  from '../../../constants/Cashier'
import { translate } from '../../../constants/Translate'
import { AmountController } from '../../AmountController'
import { UIService } from '../../../services/UIService'
import { Register } from './Register.js'
import { CustomerService } from '../../../services/CustomerService'
import { LoadingSpinner } from '../../loading/LoadingSpinner'
import { CashierStore } from './../../../stores/CashierStore'
import { PayAccountDropDown } from '../../commonComponents/payaccount/payAccountDropDown'
import { ApplicationService } from '../../../services/ApplicationService'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		amount: React.PropTypes.string,
		setFeeType: React.PropTypes.func,
		feeType: React.PropTypes.string,
		setSendBy: React.PropTypes.func,
		sendBy: React.PropTypes.string
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},

	/**
	 * Pass props on to son
	 *
	 * @returns {*}
	 */
	getProps() {
		return this.props
	},

	render() {
		let customer = CashierStore.getCustomer();
		let processor = CashierStore.getProcessor();
		let processorFees = processor.fees;
		let setSendBy = this.props.setSendBy;
		let defaultOption = 'FedEx';
		let sendBy = (this.props.sendBy) ? this.props.sendBy : this.props.setSendBy(defaultOption);
		let setFeeType = this.props.setFeeType;
		let feeType = this.props.feeType;
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let payAccount = this.props.payAccount;
		let payAccountId = payAccount.payAccountId;
		let payAccountDisplayName = payAccount.displayName;
		let isWithDraw = UIService.getIsWithDraw();
		let withdrawFee = "";
		let deleteButton = (!isWithDraw) ? translate('PROCESSING_BUTTON_DELETE_SENDER', 'Delete Sender') : translate('PROCESSING_BUTTON_DELETE_RECEIVER', 'Delete Receiver');
		let proccesingTitle = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information');

		if(isWithDraw){
			proccesingTitle = translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information');
		}

		let sendByOptionNodes = [];
		sendByOptionNodes.push(UIService.renderOption({ label: translate('CK_SEND_BY_FEDEX', 'FedEx') }, 'FedEx'));
		
		if(processorFees.enableFree == 1){
			sendByOptionNodes.push(UIService.renderOption({ label: translate('CK_SEND_BY_REGULAR', 'Regular mail') }, 'Mail'));
		}

		let feeOptions = [];
		
		if(processorFees){
			if(sendBy == 'Mail'){
				if(processorFees.enableFree == 1){
					feeOptions.push(UIService.renderOption({ label: "Free" }, "Free"));
					if(feeType != "Free"){
						setFeeType("Free");
					}
				}
			}else{
				if(processorFees.enableCash == 1){
					feeOptions.push(UIService.renderOption({ label: "Cash" }, "Cash"));
					if(feeType != "Cash"){
						setFeeType("Cash");
					}
				}
			}
		}

		if(isWithDraw){
			withdrawFee = (
				<div className="form-group">
					<div id="feeControllerGenCK">
						{(() =>{

							if(feeOptions && (processorFees.enableFree == 1 || processorFees.enableCash == 1)){
								return (
									<div id="feeSelection">
										<label className="col-sm-4 control-label">{translate('PROCESSING_FEE', 'Fee')}:</label>
										<div className="col-sm-8">
											<select className="form-control" onChange={this.transactionFee}>
												{feeOptions}
											</select>
											{translate('PROCESSING_FEE', 'Fee')}: {ApplicationService.currency_format(this.props.feeCashValue)} {customer.currency}- {translate('PROCESSING_BALANCE', 'Balance')}: {ApplicationService.currency_format(customer.balance)} {customer.currency}
										</div>
									</div>
								)
							}

							if(this.props.feeCheck && this.props.amount != ""){
								return (
									<div className="col-sm-8">
										<div className="alert alert-danger" role="alert">
											<i className="fa fa-thumbs-o-down red"></i>
											<strong>{translate('PROCESSING_FEE_ENOUGH_BALANCE', "You don't have enough balance to cover the required fees")}</strong>
										</div>
									</div>
								)
							}
						})()}
					</div>
				</div>
			);
		}

		return (
			<div id="genckAskInfo" className="box">
				<div className="row">
					<div className="title">{proccesingTitle}</div>
					<div className="infoCol">
						<div className="col-sm-12">
							<div className="form-horizontal">

								{(() =>{
									if(!payAccountDisplayName){
										return <LoadingSpinner />;
									}

									if(payAccountDisplayName == cashier.NO_RESPONSE || payAccountId == 0){
										return <div className="scroll"><Register/></div>
									}

									return (
										<div>
											<PayAccountDropDown info={this.getProps()} msgDeleteBtn={deleteButton}/>

											<div className="form-group">
												<label className="col-sm-4 control-label">{translate('CK_SEND_BY', 'Send by')}:</label>
												<div className="col-sm-8">
													<select className="form-control" data-validation='isString' id="sendBy" value={sendBy} onChange={setSendBy} required="required">
														{sendByOptionNodes}
													</select>
												</div>
											</div>

											<div className="form-group">
												<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
											</div>
											{withdrawFee}
										</div>
									)
								})()}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.AskInfo = AskInfo;
