import React from 'react'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import {CashierStore} from '../../../stores/CashierStore'
import {TransactionService} from '../../../services/TransactionService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'

let Ecopayz = React.createClass({

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

	/**
	 * Set ecopayz New Account Info
	 *
	 * @param propertyName
	 * @param isSelectComponent
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		let actualState = this.state;

		let value = event;

		if(isSelectComponent){
			value = value.target.value;
		}

		actualState[propertyName] = value;

		this.setState(
			actualState
		);

	},

	render(){
		return (
			<div id="ecopayz">
				<div className="col-sm-6">
					<AskInfo
						amount={this.props.amount}
						setAmount={this.props.setAmount}
						limitsCheck={this.props.limitsCheck}
						payAccount={this.state.payAccount}
						feeCashValue={this.props.feeCashValue}
						feeCheck={this.props.feeCheck}
						changeValue={this.changeValue}
						setPromoCode={this.props.setPromoCode}
						promoCode={this.props.promoCode}
					/>
				</div>
				<div className="col-sm-6">
					{(() => {

						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						return (
							<InfoMethod
								amount={this.props.amount}
								limitsCheck={this.props.limitsCheck}
								feeCheck={this.props.feeCheck}
								feeCashValue={this.props.feeCashValue}
								payAccount={this.state.payAccountId}
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

module.exports.Ecopayz = Ecopayz;