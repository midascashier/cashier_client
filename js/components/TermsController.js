import React from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
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

	/**
	 *
	 */
	openTermsConditions(){
		this.setState({ showModal: true });
	},

	/**
	 *
	 */
	closeTermsConditions(){
		this.setState({ showModal: false });
	},

	render() {
		let content = translate('CREDIT_CARD_CHECK_TERMENS');
		let contentLink = translate('CREDIT_CARD_TERMS_COND');
		return (
			<div className="form-group">
				<div className="checkbox">
					<label title={content}>
						<input type="checkbox" id="checkTermsAndConditions" name="checkTermsAndConditions"
									 onChange={this.changeValue}
									 checked={this.state.check}/>
						<span>{content}&nbsp;</span>
					</label>
					<a href="#" onClick={this.openTermsConditions}>
						{contentLink}
					</a>
					{this.state.showModal ?
						<FirstModal onClose={this.closeTermsConditions}/>
						: null}
				</div>
			</div>
		)
	}
});

let FirstModal = React.createClass({
	propTypes: {
		onClose: React.PropTypes.func
	},

	render() {
		return <ModalContainer onClose={this.props.onClose}>
			<ModalDialog onClose={this.props.onClose}>
				<ul>
					<li>For Transaction security we use SSL encryption.</li>
					<li>All customer data will be treated confidential and will not be sold to others</li>
					<li>If you are totally dissatisfied with the service you have received, we will consider your case and refund your purchase so long as your reason is valid. To apply for a refund e-mail us</li>
					<li>It is recommended you may only participate in any gambling events if it is legal for you to do so according to the laws that apply in the jurisdiction from where you are connecting or calling.<br /> You must understand and accept that we are unable to provide you any legal advice or assurances</li>
					<li>After purchase you will receive an e-mail notification. We recommend the cardholder to print out all transactions data, the rules of the game, <br />the cancellation regulations, and the payment methods in order to avoid misconceptions and discussions at a later time and keep them at an easily accesible place.</li>
					<li>All customer queries will be answered within two working days.</li>
					<li>All orders will be effected immediately.</li>
					<li>After purchase the customer is able to play immediately.</li>
					</ul>
			</ModalDialog>
		</ModalContainer>;
	}
});

module.exports.TermsController = TermsController;
