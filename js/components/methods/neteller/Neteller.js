import React from 'react'
import { Link } from 'react-router'
import { CashierStore } from '../../../stores/CashierStore'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'
import { translate } from '../../../constants/Translate'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'

let Neteller = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		allowContinue: React.PropTypes.number,
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
			selectedProcessor: CashierStore.getProcessor()
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
	 * set local state with neteller password
	 *
	 * @param value
	 * @constructor
	 */
	netellerPassword(value) {
		this.setState({ password: value });
	},

	render() {
		return (
			<div id="neteller">
				<div className="col-sm-6">
					<AskInfo netellerPassword={this.netellerPassword}
									 password={this.state.password}
									 amount={this.props.amount}
									 setAmount={this.props.setAmount}
									 allowContinue={this.props.allowContinue}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						} else{
							return <InfoMethod amount={this.props.amount} allowContinue={this.props.allowContinue} password={this.state.password}/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Neteller = Neteller;