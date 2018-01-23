import React from 'react'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import cashier from '../../../constants/Cashier'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'
import {DownloadDoc} from '../../commonComponents/files/DownloadDoc'
import {TransactionService} from '../../../services/TransactionService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'

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

	/**
	 *Download prepaid card form
	 */
	debitCardDoc(){
		DownloadDoc('docs/common/PREPAID_CARD_APPLICATION_FORM.pdf', 'PREPAID_CARD_APPLICATION_FORM.pdf');
	},

	render(){
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
							}

							return <InfoMethod amount={this.props.amount} limitsCheck={this.props.limitsCheck}/>;
						})()}
					</div>
				</div>
			)
		}else if(!this.state.payAccount.displayName || this.state.payAccount.displayName === null || this.state.payAccount.displayName == cashier.NO_RESPONSE){

			let content = translate('DEBITCARD_STEEPS_INFORMATION');

			return (
				<div id="debitCards">
					<div className="col-md-6 col-md-offset-3">
						<div className="box">
							<div className="title">DebitCards</div>
							<div className="infoCol">
								<p>
									<a href='#' onClick={this.debitCardDoc}>
										<strong>{translate('DEBITCARD_NEW_IN_DONWLOAD')}</strong>
									</a>
								</p>
								<div dangerouslySetInnerHTML={{__html: content}}/>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return <div className="col-sm-12"><LoadingSpinner /></div>;
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
	}
});

module.exports.DebitCards = DebitCards;