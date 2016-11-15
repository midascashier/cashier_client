import React from 'react'
import { CashierStore } from '../../../stores/CashierStore'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'
import { TransactionService } from '../../../services/TransactionService'

let DebitCards = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.string
	},

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
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

	render() {
		if(this.state.payAccount && this.state.payAccount.payAccountId){
			return (
				<div id="debitCards">
					<div className="col-sm-6">
						<AskInfo
							amount={this.props.amount}
							setAmount={this.props.setAmount}
							payAccount={this.state.payAccount}
							limitsCheck={this.props.limitsCheck}
						/>
					</div>
					<div className="col-sm-6">
						{(() =>{
							if(!this.state.selectedProcessor.processorId){
								return <LoadingSpinner />;
							} else{
								return <InfoMethod amount={this.props.amount} limitsCheck={this.props.limitsCheck}/>;
							}
						})()}
					</div>
				</div>
			)
		} else{
			if(typeof (this.state.payAccount) === "undefined"){
				return (
					<div id="debitCards">
						<h2>DebitCards</h2>
						<a target="_blank" href="/docs/common/PREPAID_CARD_APPLICATION_FORM.pdf">
							NEW TO DEBIT CARDS PLEASE CLICK HERE TO PRINT OUT THE KYC FORM
						</a><br /><br /><br />
						<p>This form will be required by customer service to proceed with the FREE delivery of your Debit Card.</p>
						<br /><br />
						<p>In order to apply for a prepaid debit, follow these easy steps:</p>
						<p>1. Scan or photograph one of the following options:</p>
						<ul>
							<li>Passport</li>
							<li>National ID</li>
							<li>Driver's license with SSC</li>
						</ul>
						<p>2. Scan or photograph your utility bill (must match the address and the name on the KYC Form)</p>
						<p>3. Scan or photograph the KYC form</p>
						<p>4. Email your scanned documents to debitcards@bookmaker.eu</p>
					</div>
				)
			} else{
				return <div className="col-sm-12"><LoadingSpinner /></div>;
			}
		}
	}
});

module.exports.DebitCards = DebitCards;