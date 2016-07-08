import React from 'react'
import { Link } from 'react-router'
import { CashierStore } from '../../../stores/CashierStore'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'
import { translate } from '../../../constants/Translate'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'
import { TransactionService } from '../../../services/TransactionService'
import { UIService } from '../../../services/UIService'

let Neteller = React.createClass({
	propTypes: {
		checkLimitsLite: React.PropTypes.func
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
			transaction: CashierStore.getTransaction()
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
	 * set local state with neteller password
	 *
	 * @param value
	 * @constructor
	 */
	netellerPassword(value) {
		this.setState({password: value});
	},

	/**
	 * set local state with transaction amount
	 */
	transactionAmount(amount){
		let payAccountInfo =TransactionService.getCurrentPayAccount();
		let limitsInfo=payAccountInfo.limitsData;
		let min, max =0;
		if (UIService.getIsWithDraw()){
			min = limitsInfo.minAmountWithdraw;
			max = limitsInfo.maxAmountWithdraw;
		}
		else{
			min = limitsInfo.minAmount;
			max = limitsInfo.maxAmount;
		}
		this.setState({amount: Number(amount), allowContinue: this.props.checkLimitsLite(amount, min, max)});
	},

	render() {
		return (
			<div id="neteller">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY')}</p>
					</Link>
					<AskInfo netellerPassword={this.netellerPassword}
									 transactionAmount={this.transactionAmount}
									 password={this.state.password}
									 amount={this.state.amount}
									 allowContinue={this.state.allowContinue}
									 selectedProcessor={this.state.selectedProcessor}/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						} else{
							return <InfoMethod selectedProcessor={this.state.selectedProcessor}
																 password={this.state.password}
																 amount={this.state.amount}
																 allowContinue={this.state.allowContinue}
																 transaction={this.state.transaction}/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Neteller = Neteller;