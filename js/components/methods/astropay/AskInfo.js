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
		amount: React.PropTypes.string
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{step, processorSteps}}
	 */
	getInitialState() {
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 */
	refreshLocalState() {
		return {
			payAccount: {
				account: "",
				password: "",
				expDay: "01",
				expMonth: "01",
				expYear: 2018
			}
		}
	},

	/**
	 * Set astropay New Account Info
	 *
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		let actualState = this.state;

		let value = event;

		if(isSelectComponent){
			value = value.target.value;
		}

		if(propertyName == 'country'){
			UIService.getCountryStates(value);
		}

		actualState.payAccount[propertyName] = value;

		this.setState(
			actualState
		);

	},


	render(){
		let limitsCheck = this.props.limitsCheck;
		let isWithDraw = UIService.getIsWithDraw();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		let information = translate('CREDIT_CARD_INFO', '');
		let setAmount = this.props.setAmount;
		let amount = this.props.amount;

		let selectMonths = [];
		let selectYears = [];
		let now = new Date();

		for(let i = 1; i < 13; i++){
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
												<Input type="text" id="creditCardNumber" ref="creditCardNumber" validate="isCreditNumber" onChange={this.changeValue.bind(null, 'account', 0)} require/>
											</div>
										</div>


										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('CREDIT_CARD_EXPIRATION', 'Expiration Date')}:</label>
											<div className="col-sm-4">
												<select className="form-control" id="ccExpMonth" onChange={this.changeValue.bind(null, 'extra1',1)}>
													{selectMonths}
												</select>
											</div>
											<div className="col-sm-4">
												<select className="form-control" id="ccExpYear" onChange={this.changeValue.bind(null, 'extra2',1)}>
													{selectYears}
												</select>
											</div>
										</div>

										<div className="form-group">
											<label className="col-sm-4 control-label">{translate('CREDIT_CARD_CVV', 'CVV')}:</label>
											<div className="col-sm-8">
												<Input type="text" id="cvv" ref="cvv" validate="isCVV" onChange={this.changeValue.bind(null, 'password', 0)} require/>
											</div>
										</div>

										<div className="form-group">
											<AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
										</div>

										<TermsController />


										{(() =>{
											if(!isWithDraw){
												return (
													<p><em>{translate('BONUS_NEWS1')}<span>{translate('BONUS_NEWS2')}</span>{translate('BONUS_NEWS3')}<span>{translate('BONUS_NEWS4')}</span></em></p>
												)
											}
										})()}

										<div className="col-sm-12">
											<p>{information}</p>
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