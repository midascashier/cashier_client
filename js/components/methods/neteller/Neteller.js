import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'
import { TransactionService } from '../../../services/TransactionService'

let Neteller = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number
	},

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			selectedProcessor: CashierStore.getProcessor(),
			payAccount: TransactionService.getCurrentPayAccount()
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
		this.setState({ password: value });
	},

	render() {
		return (
			<div id="neteller">
				<div className="col-sm-6">
					<AskInfo
						netellerPassword={this.netellerPassword}
						password={this.state.password}
						amount={this.props.amount}
						setAmount={this.props.setAmount}
						payAccount={this.state.payAccount}
						feeCashValue={this.props.feeCashValue}
						feeCheck={this.props.feeCheck}
						limitsCheck={this.props.limitsCheck}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						} else{
							return <InfoMethod amount={this.props.amount} limitsCheck={this.props.limitsCheck} password={this.state.password}/>;
						}
					})()}
				</div>
			</div>
		)
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
	}
});

module.exports.Neteller = Neteller;