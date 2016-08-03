import React from 'react'
import { Link } from 'react-router'
import { CashierStore } from '../../../stores/CashierStore'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'
import { translate } from '../../../constants/Translate'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'
import { TransactionService } from '../../../services/TransactionService'
import { UIService } from '../../../services/UIService'
import { ApplicationService } from '../../../services/ApplicationService'

let Visa = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string
	},

	/**
	 * React function to set component initial state
	 */

	getInitialState(){
		return this.refreshLocalState();
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
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			selectedProcessor: CashierStore.getProcessor(),
			payAccount: TransactionService.getCurrentPayAccount(),
			transaction: UIService.getTransactionInformation()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		this.setState(this.refreshLocalState());
	},

	/**
	 * set local state with transaction amount
	 */
	transactionAmount(amount){
		this.setState({amount: Number(amount)});
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

		actualState[propertyName] = value;

		TransactionService.setDOBSSN(propertyName, value);
	},

	/**
	 * Checks if ssn is valid
	 *
	 * @returns {*}
	 */
	formValidator(){
		let payAccount = this.state.payAccount;
		if (payAccount.extra.dob == null && payAccount.extra.ssn == null && payAccount.payAccountId != 0){
			return ApplicationService.validateInfo(this.state.ssn, "isNumber");
		}else{
			return true;
		}
	},

	render() {
		return (
			<div id="visa">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY')}</p>
					</Link>
					<AskInfo amount={this.props.amount}
									 setAmount={this.props.setAmount}
									 payAccount={this.state.payAccount}
									 limitsCheck={this.props.limitsCheck}
									 dobMonth={this.state.transaction.dobMonth}
									 dobDay={this.state.transaction.dobDay}
									 dobYear={this.state.transaction.dobYear}
									 ssn={this.state.transaction.ssn}
									 changeValue={this.changeValue}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						} else{
							return <InfoMethod amount={this.props.amount} limitsCheck={this.props.limitsCheck}
																 formValidator={this.formValidator}/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Visa = Visa;