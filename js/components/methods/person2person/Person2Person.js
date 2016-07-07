import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {translate} from '../../../constants/Translate'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import {UIService} from '../../../services/UIService'

let Person2Person = React.createClass({

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
			transaction: CashierStore.getTransaction()
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
	 * set local state with transaction amount
	 */
	transactionAmount(amount){
		this.setState({amount: Number(amount)});
	},

	render() {
		return (
			<div id="visa">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY')}</p>
					</Link>
					<AskInfo selectedProcessor={this.state.selectedProcessor}
									 transactionAmount={this.transactionAmount}
									 amount={this.state.amount}/>
				</div>
				<div className="col-sm-6">
					{(() => {
						if (!this.state.selectedProcessor.processorId) {
							return <LoadingSpinner />;
						} else {
							return <InfoMethod selectedProcessor={this.state.selectedProcessor}
																 amount={this.state.amount}
																 transaction={this.state.transaction}/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Person2Person = Person2Person;