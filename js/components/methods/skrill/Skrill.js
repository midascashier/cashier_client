import React from 'react'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'

let Skrill = React.createClass({

	propTypes:{
		amount: React.PropTypes.string,
		setAmount: React.PropTypes.func,
		feeCheck: React.PropTypes.number,
		promoCode: React.PropTypes.string,
		setPromoCode: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		feeCashValue: React.PropTypes.number
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
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	render(){
		return(
			<div id="skrill">
				<div className="col-sm-6">
					<AskInfo 
						amount={this.props.amount}
						setAmount={this.props.setAmount}
						payAccount={this.state.payAccount}
						limitsCheck={this.props.limitsCheck}
						feeCashValue={this.props.feeCashValue}
						feeCheck={this.props.feeCheck}
						setPromoCode={this.props.setPromoCode}
						promoCode={this.props.promoCode}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						}else{
							return <InfoMethod amount={this.props.amount} limitsCheck={this.props.limitsCheck}/>;
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

module.exports.Skrill = Skrill;