import React from 'react'
import {translate} from '../constants/Translate'
import {CashierActions} from './../actions/CashierActions'
import {CashierStore} from './../stores/CashierStore'

let TermsController = React.createClass({

	getInitialState() {
		return this.refreshLocalState();
	},

	componentDidMount() {
		CashierStore.addChangeListener(this._onChange);
	},

	refreshLocalState() {
		return {
			check: CashierStore.getTransaction().checkTermsAndConditions
		}
	},

	_onChange() {
		if(this.isMounted() === true){
			this.setState(this.refreshLocalState());
		}
	},

	changeValue(event) {
		let checked = event.currentTarget.checked;
		this.setState({check: checked});
		CashierActions.setTransactionTerms(checked);
	},

	render() {
		let content = translate('CREDIT_CARD_CHECK_TERMENS');
		return (
			<div className="checkbox text-center">
				<label title={content}>
					<input type="checkbox" id="checkTermsAndConditions" name="checkTermsAndConditions" onChange={this.changeValue} checked={this.state.check}/>
					<span>{content}</span>
				</label>
			</div>
		)
	}
});

module.exports.TermsController = TermsController;
