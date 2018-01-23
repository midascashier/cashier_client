import React from 'react'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'

let Genck = React.createClass({

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
	 * set local state
	 *
	 * @param element
     */
	setSendBy(element) {
		let value = '';

		if (typeof element != "object") {
			value = element;
		} else {
			value = element.target.value;
		}

		this.setState({ sendBy: value});
	},

	setFeeType(value) {
		this.setState({ feeType: value });
	},

	render() {
		return (
			<div id="genck">
				<div className="col-sm-6">
					<AskInfo 
						amount={this.props.amount}
						setAmount={this.props.setAmount}
						limitsCheck={this.props.limitsCheck}
						payAccount={this.state.payAccount}
						feeCashValue={this.props.feeCashValue}
						feeCheck={this.props.feeCheck}
						setSendBy={this.setSendBy}
						sendBy={this.state.sendBy}
						setFeeType={this.setFeeType}
						feeType={this.state.feeType}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						}

						return(
							<InfoMethod
								amount={this.props.amount}
								setSendBy={this.setSendBy}
								sendBy={this.state.sendBy}
								setFeeType={this.setFeeType}
								feeType={this.state.feeType}
								feeCheck={this.props.feeCheck}
								limitsCheck={this.props.limitsCheck}
								feeCashValue={this.props.feeCashValue}
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
	componentWillUnmount()  {
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.Genck = Genck;