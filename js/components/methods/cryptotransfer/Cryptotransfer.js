import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {ApplicationService} from '../../../services/ApplicationService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'

let Cryptotransfer = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		btcAmount: React.PropTypes.node,
		changeValue: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		transactionAmount: React.PropTypes.func,

		rate: React.PropTypes.number,
		limitsCheck: React.PropTypes.string,
		cryptoAmount: React.PropTypes.node,
		setCryptoAmount: React.PropTypes.func,

		allowContinueToConfirm: React.PropTypes.func
	},

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		ApplicationService.getCurrency("BTC");
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		let cryptoAddress = "";
		if(this.state){
			if(this.state.info.cryptoAddress != ""){
				cryptoAddress = this.state.info.cryptoAddress;
			}
		}

		let allowContinueToConfirm = false;
		if(this.state){
			if(this.state.info.allowContinueToConfirm){
				allowContinueToConfirm = true;
			}
		}

		return {
			info: {
				selectedProcessor: CashierStore.getProcessor(),
				transaction: CashierStore.getTransaction(),
				cryptoAddress: cryptoAddress,
				allowContinueToConfirm: allowContinueToConfirm
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

	/**
	 * Set local state for crypto Address and if is allow to continue
	 *
	 * @param e
	 * @param state
	 */
	changeValue(e, state) {
		let actualState = this.state.info;
		actualState.cryptoAddress = e;
		actualState.allowContinueToConfirm = state;
		this.setState({
			info: actualState
		})
	},

	render() {
		return (
			<div id="crypto">
				<div className="col-sm-6">
					<AskInfo
						setAmount={this.props.setAmount}
						btcAmount={this.props.btcAmount}
						changeValue={this.changeValue}
						setBTCAmount={this.props.setBTCAmount}

						rate={this.props.rate}
						limitsCheck={this.props.limitsCheck}
						cryptoAmount={this.props.cryptoAmount}

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
								limitsCheck={this.props.limitsCheck}
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

module.exports.Cryptotransfer = Cryptotransfer;