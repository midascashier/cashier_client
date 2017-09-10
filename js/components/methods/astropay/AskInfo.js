import React from 'react'
import { translate } from '../../../constants/Translate'
import { Input } from '../../Inputs'
import { UIService } from '../../../services/UIService'
import { TermsController } from '../../TermsController'
import { AmountController } from '../../AmountController'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		changeValue: React.PropTypes.func
	},

	render(){
		let limitsCheck = this.props.limitsCheck;
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;

		let selectMonths = [];
		let selectYears = [];
		let now = new Date();
		let actualMonth  = now.getMonth() + 2;

		for(let i = 1; i < 13; i++){
			i = ('0' + i).slice(-2);
			selectMonths.push(UIService.renderOption({ label: i }, i));
		}

		for(let i = now.getFullYear(); i < now.getFullYear() + 15; i++){
			selectYears.push(UIService.renderOption({ label: i }, i));
		}

		return (
			<div id="astropayAskInfo" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="title">{title}</div>
						<div className="infoCol scroll">
							<div className="row">

								<div className="col-sm-12">
									<div className="form-horizontal">
										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('CREDIT_CARD_NUMBER', 'Card Number')}:</label>
											<div className="col-sm-8">
												<Input type="text" id="creditCardNumber" ref="creditCardNumber" validate="isCreditNumber" onChange={this.props.changeValue.bind(null, 'ccNumber', 0)} require/>
											</div>
										</div>
										
										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
											<div className="col-sm-4">
												<select className="form-control" id="ccExpMonth" onChange={this.props.changeValue.bind(null, 'ccExpMonth',1)} value = {actualMonth}>
													{selectMonths}
												</select>
											</div>
											<div className="col-sm-4">
												<select className="form-control" id="ccExpYear" onChange={this.props.changeValue.bind(null, 'ccExpYear',1)}>
													{selectYears}
												</select>
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
											<div className="col-sm-8">
												<Input type="text" id="cvv" ref="cvv" validate="isCVV4" onChange={this.props.changeValue.bind(null, 'ccCVV', 0)} require/>
											</div>
										</div>

										<div className="form-group">
											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>

										<TermsController />
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