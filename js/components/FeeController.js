import React from 'react'
import { CashierStore } from './../stores/CashierStore'
import { translate } from '../constants/Translate'
import { UIService } from '../services/UIService'
import { TransactionService } from '../services/TransactionService'
import { ApplicationService } from '../services/ApplicationService'

let FeeController = React.createClass({

	propTypes: {
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number
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
	 *
	 * @returns {{step: (*|string), processorSteps: *}}
	 */
	refreshLocalState() {
		return {
			processor: CashierStore.getProcessor()
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
	 * set fee option
	 *
	 * @param e
	 */
	transactionFee(e){
		let transactionFee = e.target.value;
		TransactionService.setTransactionFee(transactionFee);
	},

	render() {
		let fees = this.state.processor.fees;
		let customer = CashierStore.getCustomer();
		let options = [];
		if(fees.enableFree == 1){ options.push(UIService.renderOption({ label: "Free" }, "Free")) }
		if(fees.enableBP == 1){ options.push(UIService.renderOption({ label: "Betpoints" }, "BetPoints")) }
		if(fees.enableCash == 1){ options.push(UIService.renderOption({ label: "Cash" }, "Cash")) }
		return (
			<div id="feeController">
				{(() =>{
					if(fees.enableBP == 1 || fees.enableFree == 1 || fees.enableCash == 1){
						return (
							<div id="feeSelection">
								<label className="col-sm-4 control-label">{translate('PROCESSING_FEE', 'Fee')}:</label>
								<div className="col-sm-8">
									<select className="form-control" onChange={this.transactionFee}>
										{options}
									</select>
									{translate('PROCESSING_FEE', 'Fee')}: {ApplicationService.currency_format(this.props.feeCashValue)} {customer.currency}- {translate('PROCESSING_BALANCE', 'Balance')}: {ApplicationService.currency_format(customer.balance)} {customer.currency}
								</div>
							</div>
						)
					}
				})()}
				{(() =>{
					if(this.props.feeCheck && this.props.amount != ""){
						return (
							<div className="col-sm-8">
								<div className="alert alert-danger" role="alert">
									<i className="fa fa-thumbs-o-down red"></i>
									<strong>{translate('PROCESSING_FEE_ENOUGH_BALANCE')}</strong>
								</div>
							</div>
						)
					}
				})()}
			</div>
		)
	}
});

module.exports.FeeController = FeeController;