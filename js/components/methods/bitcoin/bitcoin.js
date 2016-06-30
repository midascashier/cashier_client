import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {translate} from '../../../constants/Translate'
import {AskInfo} from './AskInfo'
import {AskInfoWithdraw} from './AskInfoWithdraw'
import {InfoMethod} from './InfoMethod'
import {InfoMethodWithdraw} from './InfoMethodWithdraw'
import {controllerUIService} from '../../../services/ControllerService'

let Bitcoin = React.createClass({

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
																		controllerUIService.setCurrentStep(2);
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
																		if(this.isMounted() === true){
																			this.setState(this.refreshLocalState());
																		}
																	},

																	render() {
																		return (
																			<div id="bitCoin">
																				<div className="col-sm-6">
																					<Link to={`/transaction_history/`}>
																						<p>{translate('TRANSACTION_HISTORY')}</p>
																					</Link>
																					<AskInfo selectedProcessor={this.state.selectedProcessor}/>;
																				</div>
																				<div className="col-sm-6">
																					{(() =>{
																						if(!this.state.selectedProcessor.processorId){
																							return <LoadingSpinner />;
																						} else{
																							return <InfoMethod selectedProcessor={this.state.selectedProcessor}
																																 transaction={this.state.transaction}/>;
																						}
																					})()}
																				</div>
																			</div>
																		)
																	}
																});

module.exports.Bitcoin = Bitcoin;