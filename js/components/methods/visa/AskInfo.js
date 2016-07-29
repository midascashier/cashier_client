import React from 'react'
import { translate } from '../../../constants/Translate'
import { SelectPayAccount } from '../../SelectPayAccount'
import { AmountController } from '../../AmountController'
import { TermsController } from '../../TermsController'
import { UIService } from '../../../services/UIService'
import { CustomerService } from '../../../services/CustomerService'
import { CashierStore } from '../../../stores/CashierStore'
import { Register } from './Register.js'
import { ExtraInfo } from './ExtraInfo'
import { TransactionService } from '../../../services/TransactionService'
import { ApplicationService } from '../../../services/ApplicationService'

let AskInfo = React.createClass({

	propTypes: {
		transactionAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.number,
		amount: React.PropTypes.string,
		payAccount: React.PropTypes.object
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
	 */
	refreshLocalState() {
		return {
			payAccount: TransactionService.getCurrentPayAccount(),
			ssn: "",
			dobMonth: "",
			dobDay: "",
			dobYear: ""
		}
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	disablePayAccount() {
		CustomerService.getDisablePayAccount();
	},

	/**
	 * Set visa New Account Info
	 *
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		const actualState = this.state;

		let value = event;

		if(isSelectComponent){
			value = value.target.value;
		}

		if(propertyName == 'country'){
			ApplicationService.getCountryStates(value);
		}

		actualState[propertyName] = value;

		this.setState(
			actualState
		);

	},

	render() {
		let setAmount = this.props.setAmount;
		let payAccount = this.state.payAccount;
		let payAccountId = payAccount.payAccountId;
		let amount = this.props.amount;
		let limitsCheck = this.props.limitsCheck;
		let originPath = UIService.getOriginPath();
		let displayName = UIService.getProcessorDisplayName();
		let title = translate('PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD', 'Please Enter Your Card Details');
		let information = translate('CREDIT_CARD_INFO', '');
		let ssn = this.state.ssn;
		let dobMonth = this.state.dobMonth;
		let dobDay = this.state.dobDay;
		let dobYear = this.state.dobYear;

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
													<img className="img-responsive" src={originPath + '/images/processors/11001.png'}
															 alt={displayName}/>
												</div>
											</div>
											<div className="col-sm-9">
												<div className="form-group" id="payAccount">
													<label for="">{translate('CREDIT_CARD_SELECT', 'Credit Card')}:</label>
													{(() =>{
														if(payAccountId != 0){
															return (
																<div>
																	<div className="col-sm-9">
																		<SelectPayAccount />
																	</div>
																	<div className="col-sm-3">
																		<button type='button' onClick={this.disablePayAccount}
																						className='btn btn-xs btn-green'>
																			Delete Card
																		</button>
																	</div>
																</div>
															)
														} else{
															return (
																<div>
																	<SelectPayAccount />
																</div>
															)
														}
													})()}

													{(() =>{
														if(payAccountId == 0){
															return <Register />
														}
													})()}
												</div>
												<div className="form-group">
													{(() =>{
														if(payAccountId != 0){
															return <AmountController setAmount={setAmount} amount={amount} limitsCheck={limitsCheck}/>
														}
													})()}

													{(() =>{
														if(payAccount.extra.dob == "" && payAccount.extra.ssn == "" && payAccountId != 0){
															return <ExtraInfo changeValue={this.changeValue} ssn={ssn}
																								dobMonth={dobMonth}
																								dobDay={dobDay} dobYear={dobYear}/>
														}
													})()}

												</div>
											</div>
										</div>
										{(() =>{
											if(payAccountId != 0){
												return <TermsController />
											}
										})()}
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