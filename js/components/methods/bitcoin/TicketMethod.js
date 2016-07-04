import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'

let BitCoinTicket = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 *
	 * @returns {{transactionResponse: *}}
	 */
	refreshLocalState() {
		return {
			transactionResponse: CashierStore.getLastTransactionResponse()
		}
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
		let transactionResponse = this.state.transactionResponse;
		return (
			<div id="bitCoinTicket">
				{(() => {
					if ((!transactionResponse.status) && (!transactionResponse.userMessage)){
						return (
							<div className="col-sm-12">
								<div className="modules">
									<div className="row">
										<div className="col-sm-12">
											<div className="loader-sm"></div>
											<h3>
												Processing... please wait!
											</h3>
										</div>
									</div>
								</div>
							</div>
						);
					} else {
						return this.props.children
					}
				})()}
			</div>
		)
	}
});

module.exports.BitCoinTicket = BitCoinTicket;