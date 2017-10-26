import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {ApplicationService} from '../../../services/ApplicationService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import { UIService } from '../../../services/UIService'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'

let CryptoTransfer = React.createClass({

	propTypes: {
		amount: React.PropTypes.node,
		setAmount: React.PropTypes.func,
		btcAmount: React.PropTypes.node,
		setBTCAmount: React.PropTypes.func,

		limits: React.PropTypes.object,
		rate: React.PropTypes.number,
		cryptoAmount: React.PropTypes.node,
		setCryptoAmount: React.PropTypes.func,
		customerAmount: React.PropTypes.node
	},

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		ApplicationService.getCurrency("BTC");
		this.props.limits = UIService.getProcessorLimitMinMax();
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			info: {
				checkLimits : false,
				allowContinueToConfirm: false,
				transaction: CashierStore.getTransaction(),
				selectedProcessor: CashierStore.getProcessor()
			}
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
		return (
			<div id="crypto">
				<div className="col-sm-6">
					<AskInfo
						amount={this.props.amount}
						setAmount={this.props.setAmount}
						btcAmount={this.props.btcAmount}
						setBTCAmount={this.props.setBTCAmount}
						customerAmount={this.props.customerAmount}

						rate={this.props.rate}
						limits={this.props.limits}
						cryptoAmount={this.props.cryptoAmount}
						setCryptoAmount={this.props.setCryptoAmount}

						allowContinueToConfirm={this.props.allowContinueToConfirm}
					/>
				</div>

				<div className="col-sm-6">
					{(() =>{
						if(!this.state.info.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						return(
							<InfoMethod
								amount={this.props.amount}
								limits={this.props.limits}
								allowContinueToConfirm={this.props.allowContinueToConfirm}
							/>
						)
					})()}
				</div>
			</div>
		)
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

module.exports.CryptoTransfer = CryptoTransfer;