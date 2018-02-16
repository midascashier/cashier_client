import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'

let Player2Agent = React.createClass({

	propTypes: {
		amount: React.PropTypes.string,
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		account: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number
	},

	customProps: {
		invalidAccount: false
	},

	/**
	 * check if an account is invalid
	 * @param state
	 */
	invalidAccount(state) {
		this.customProps.invalidAccount = state;
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
		let account = "";
		if(this.state){
			if(this.state.info.account !== "") {
				account = this.state.info.account;
				this.props.account = account;
			}
		}

		let allowContinueToConfirm = false;
		if(this.state){
			if(this.state.info.allowContinueToConfirm){
				allowContinueToConfirm = true;
			}
		}

		return {
			info: {
				selectedProcessor: CashierStore.getProcessor(),
				transaction: CashierStore.getTransaction(),
				account: account,
				allowContinueToConfirm: allowContinueToConfirm
			}
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
	 * Set local state for accountTo and if is allow to continue
	 *
	 * @param e
	 * @param state
	 */
	changeValue(e, state) {
		let actualState = this.state.info;
		actualState.account = e;
		actualState.allowContinueToConfirm = state || state !== undefined;
		this.setState({
			info: actualState
		})
	},

	render(){
		return (
			<div id="agentTransfer">
				<div className="col-sm-6">
					<AskInfo
						amount={this.props.amount}
						account={this.state.info.account}
						setAmount={this.props.setAmount}
						limitsCheck={this.props.limitsCheck}
						accountChange={this.changeValue}
						feeCashValue={this.props.feeCashValue}
						feeCheck={this.props.feeCheck}
						allowContinueToConfirm={this.state.info.allowContinueToConfirm}
						invalidAccount={this.customProps.invalidAccount}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.info.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}
						return(
							<InfoMethod
								amount={this.props.amount}
								limitsCheck={this.props.limitsCheck}
								feeCashValue={this.props.feeCashValue}
								allowContinueToConfirm={this.state.info.allowContinueToConfirm}
								account={this.state.info.account}
								invalidAccount={this.invalidAccount}
							/>
						)
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

module.exports.Player2Agent = Player2Agent;
