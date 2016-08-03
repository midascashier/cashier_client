import React from 'react'
import { translate } from '../constants/Translate'
import { TransactionService } from './../services/TransactionService'
import { CashierStore } from './../stores/CashierStore'

let TermsController = React.createClass({

	getInitialState() {
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			check: CashierStore.getTransaction().checkTermsAndConditions
		}
	},

	_onChange() {
		this.setState(this.refreshLocalState());
	},

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
