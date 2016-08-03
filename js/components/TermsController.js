import React from 'react'
import { translate } from '../constants/Translate'
import { TransactionService } from './../services/TransactionService'
import { CashierStore } from './../stores/CashierStore'

let TermsController = React.createClass({
	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{transactions}}
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
	 * @returns {{transactions: {}}}
	 */
	refreshLocalState() {
		return {
			check: CashierStore.getTransaction().checkTermsAndConditions
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
	 * set store with term and condition check box value
	 *
	 * @param event
	 */
	changeValue(event) {
		let checked = event.currentTarget.checked;
		this.setState({ check: checked });
		TransactionService.setTermsAndConditions(checked);
	},

	render() {
		let content = translate('CREDIT_CARD_CHECK_TERMENS');
		return (
			<div className="form-group">
				<div className="checkbox">
					<label title={content}>
						<input type="checkbox" id="checkTermsAndConditions" name="checkTermsAndConditions"
									 onChange={this.changeValue}
									 checked={this.state.check}/>
						<span>{content}</span>
					</label>
				</div>
			</div>
		)
	}
});

module.exports.TermsController = TermsController;
