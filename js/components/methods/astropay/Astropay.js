import React from 'react'
import { Link } from 'react-router'
import { CashierStore } from '../../../stores/CashierStore'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'
import { translate } from '../../../constants/Translate'
import { AskInfo } from './AskInfo'
import { InfoMethod } from './InfoMethod'
import { UIService } from '../../../services/UIService'

let Astropay = React.createClass({

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
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		let now = new Date();
		let actualYear = now.getFullYear();
		return {
			selectedProcessor: CashierStore.getProcessor(),
			payAccount: {
				ccNumber: "",
				ccCVV: "",
				ccExpMonth: "01",
				ccExpYear: actualYear
			}
		}
	},

	/**
	 * set local state with transaction amount
	 */
	transactionAmount(amount){
		this.setState({amount: Number(amount)});
	},

	/**
	 * Set astropay New Account Info
	 *
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		let actualState = this.state;

		let value = event;

		if(isSelectComponent){
			value = value.target.value;
		}

		if(propertyName == 'country'){
			UIService.getCountryStates(value);
		}

		actualState.payAccount[propertyName] = value;

		this.setState(
			actualState
		);

	},

	render() {
		return (
			<div id="astropay">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY')}</p>
					</Link>
					<AskInfo amount={this.props.amount}
									 setAmount={this.props.setAmount}
									 limitsCheck={this.props.limitsCheck}
									 changeValue={this.changeValue}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						} else{
							return <InfoMethod amount={this.props.amount} limitsCheck={this.props.limitsCheck}
																 payAccount={this.state.payAccount}
																 check={this.state.check}
																 currencyId= {this.state.currencyId}
																 formValidator={this.formValidator}/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Astropay = Astropay;