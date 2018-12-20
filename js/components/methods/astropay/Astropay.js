import React from 'react'
import {Link} from 'react-router'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'

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
	refreshLocalState(){
		let now = new Date();
		let actualYear = now.getFullYear();
		return {
			payAccount: {
				ccNumber: "",
				ccCVV: "",
				ccExpMonth: "01",
				ccExpYear: actualYear
			},
			selectedProcessor: CashierStore.getProcessor()
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
	 * @param propertyName
	 * @param isSelectComponent
	 * @param event
	 */
	changeValue(propertyName, isSelectComponent = 0, event){
		let value = event;
		let actualState = this.state;

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

	render(){
		return (
			<div id="astropay">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY', 'Transaction History')}</p>
					</Link>
					<AskInfo
						amount={this.props.amount}
						changeValue={this.changeValue}
						setAmount={this.props.setAmount}
						limitsCheck={this.props.limitsCheck}
					/>
				</div>
				<div className="col-sm-6">
					{(() => {
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						return (
							<InfoMethod
								check={this.state.check}
								amount={this.props.amount}
								payAccount={this.state.payAccount}
								formValidator={this.formValidator}
								limitsCheck={this.props.limitsCheck}
								currencyId={this.state.currencyId}
							/>
						)
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Astropay = Astropay;