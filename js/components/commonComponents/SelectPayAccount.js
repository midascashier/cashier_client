import React from 'react'
import {translate} from '../../constants/Translate'
import {CashierStore} from './../../stores/CashierStore'
import {CashierActions} from './../../actions/CashierActions'
import {TransactionService} from './../../services/TransactionService'

let SelectPayAccount = React.createClass({

	propTypes: {
		amount: React.PropTypes.node,
		setAmount: React.PropTypes.func
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{processor, payAccounts, currentPayAccount}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{processor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), payAccounts: *, currentPayAccount: *}}
	 */
	refreshLocalState(){
		return {
			processor: CashierStore.getProcessor(),
			payAccounts: CashierStore.getProcessorPayAccount(),
			currentPayAccount: CashierStore.getCurrentPayAccount()
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
	 * this function change the store states with the new payaccount selected or added
	 *
	 * @param event
	 */
	changeValue(event){
		let processorID = this.state.processor.processorId;
		let payAccountID = event.currentTarget.value;
		this.props.setAmount(this.props.amount);
		CashierActions.changePayAccount(payAccountID, processorID);

		if(payAccountID > 0){
			TransactionService.getPayAccountLimits(payAccountID);
		}
	},

	/**
	 *this function just return the html select created in renderElement function
	 *
	 * @returns {*|XML}
	 */
	render(){
		let optionNodes = [];
		let defaultValue = "";
		let renderOption = function(item, key){
			return <option key={key} value={key}>{item.label}</option>
		};
		let payAccounts = this.state.payAccounts;

		if(payAccounts){
			defaultValue = this.state.currentPayAccount.payAccountId;
			for(let index in payAccounts){
				if(payAccounts[index].displayName){
					optionNodes.push(renderOption({label: payAccounts[index].displayName}, index));
				}
			}
		}else{
			defaultValue = "";
			optionNodes.push(renderOption({label: translate('LOADING', 'loading')}, -1));
		}

		return (
			<select ref="element" className="form-control" value={defaultValue} onChange={this.changeValue}>
				{optionNodes}
			</select>
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

module.exports.SelectPayAccount = SelectPayAccount;