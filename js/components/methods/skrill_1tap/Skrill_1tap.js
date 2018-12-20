import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'

let Skrill_1tap = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		promoCode: React.PropTypes.string,
		setPromoCode: React.PropTypes.func
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
	refreshLocalState(){
		let account = "";
		if(this.state && this.state.info){
			account = this.state.info.account;
		}
		return {
			info: {
				selectedProcessor: CashierStore.getProcessor(),
				account: account,
				validAccount: false
			}
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * Set ecopayz New Account Info
	 *
	 * @param propertyName
	 * @param isSelectComponent
	 * @param event
	 * @param validAccount
	 */
	changeValue(propertyName, isSelectComponent = 0, event, validAccount){
		let actualState = this.state;

		let value = event;

		if(isSelectComponent){
			value = value.target.value;
		}

		actualState.info[propertyName] = value;
		actualState.info["validAccount"] = validAccount;

		this.setState(
			actualState
		);

	},

	render(){
		return (
			<div id="1tap">
				<div className="col-sm-6">
					<AskInfo
						amount={this.props.amount}
						setAmount={this.props.setAmount}
						limitsCheck={this.props.limitsCheck}
						feeCashValue={this.props.feeCashValue}
						feeCheck={this.props.feeCheck}
						changeValue={this.changeValue}
						account={this.state.info.account}
						setPromoCode={this.props.setPromoCode}
						promoCode={this.props.promoCode}
					/>
				</div>
				<div className="col-sm-6">
					{(() => {
						if(!this.state.info.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}else{
							return (
								<InfoMethod
									amount={this.props.amount}
									limitsCheck={this.props.limitsCheck}
									account={this.state.info.account}
									validAccount={this.state.info.validAccount}
								/>
							)
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
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.Skrill_1tap = Skrill_1tap;