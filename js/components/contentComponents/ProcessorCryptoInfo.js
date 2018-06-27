import React from 'react'
import {UIService} from '../../services/UIService'
import {CashierStore} from '../../stores/CashierStore'
import {LoadingSpinner} from '../../components/loading/LoadingSpinner'

let ProcessorCryptoInfo = React.createClass({

	/**
	 * React function to set component initial state
	 *
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * call buyCryptoIsActive
	 */
	isCoinDirectActive(){
		UIService.buyCryptoIsActive();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState(){
		return {
			isBuyCryptoActive: CashierStore.isActiveBuyCrypto()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
		console.log(this.state.isBuyCryptoActive);
	},

	render(){
		return (
			<div id="processorInfo">
				<div className="row">
					<div className="col-sm-12">
						<div className="row process-crypto-info">
							<div className="col-md-4 col-md-offset-1">
								<img src="/images/buyCrypto/boton_deposit.png" alt="Deposit"></img>
							</div>
							{(() =>{
								if(!this.state.isBuyCryptoActive){
									return <LoadingSpinner/>;
								}

								if(this.state.isBuyCryptoActive){
									return <div className="col-md-4 col-md-offset-1">
										<img src="/images/buyCrypto/boton_buy.png" alt="Buy"></img>
									</div>
								}
							})()}
						</div>
					</div>
				</div>
			</div>
		);
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		this.isCoinDirectActive();
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		// CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.ProcessorCryptoInfo = ProcessorCryptoInfo;