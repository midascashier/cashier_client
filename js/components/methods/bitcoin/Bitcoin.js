import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {ApplicationService} from '../../../services/ApplicationService'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'
import {UIService} from '../../../services/UIService'
import {TransactionService} from '../../../services/TransactionService'

let BitCoin = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		setBTCAmount: React.PropTypes.func,
		limitsCheck: React.PropTypes.string,
		amount: React.PropTypes.node,
		btcAmount: React.PropTypes.node,
		feeCashValue: React.PropTypes.number,
		feeCheck: React.PropTypes.number,
		setPromoCode: React.PropTypes.func,
		promoCode: React.PropTypes.string
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
	refreshLocalState(){
		let bitcoinAddress = "";
		if(this.state){
			if(this.state.info.bitcoinAddress != ""){
				bitcoinAddress = this.state.info.bitcoinAddress;
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
				bitcoinAddress: bitcoinAddress,
				allowContinueToConfirm: allowContinueToConfirm
			},
			customer: CashierStore.getCustomer(),
			imgLang: CashierStore.getLanguage()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange(){
		this.setState(this.refreshLocalState());
	},

	/**
	 * Set local state for bitcoin Address and if is allow to continue
	 *
	 * @param e
	 * @param state
	 */
	changeValue(e, state){
		let actualState = this.state.info;
		actualState.bitcoinAddress = e;
		actualState.allowContinueToConfirm = state;
		this.setState({
			info: actualState
		})
	},

	/**
	 * return the processor list
	 *
	 * @returns {Array}
	 */
	getProcessors(){
		return UIService.getIsWithDraw() ? this.state.customer.withdrawProcessors : this.state.customer.depositProcessors;
	},

	goToCryptoTransfer(){
		UIService.selectProcessor(830);
		TransactionService.startTransaction();
	},

	render(){
		const processors = this.getProcessors();
		const imgLang = this.state.imgLang;
		const isCryptoTransferActive = processors.find(processor => +processor.caProcessor_Id === 830);

		const redirectImgComponent = (
			<div className="col-sm-12" style={{textAlign: 'center'}}>
				<img
					style={{paddingTop: '5%', cursor: 'pointer'}}
					src={`/images/weHaveMoved/We-have-moved-${imgLang}_V2.jpg`}
					onClick={this.goToCryptoTransfer}
				/>
			</div>
		);

		const formComponent = (
			<div>
				<div className="col-sm-6">
					<AskInfo
						amount={this.props.amount}
						btcAmount={this.props.btcAmount}
						setBTCAmount={this.props.setBTCAmount}
						setAmount={this.props.setAmount}
						limitsCheck={this.props.limitsCheck}
						feeCashValue={this.props.feeCashValue}
						feeCheck={this.props.feeCheck}
						changeValue={this.changeValue}
						bitcoinAddress={this.state.info.bitcoinAddress}
						allowContinueToConfirm={this.state.info.allowContinueToConfirm}
						transaction={this.state.info.transaction}
						setPromoCode={this.props.setPromoCode}
						promoCode={this.props.promoCode}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.info.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						return (
							<InfoMethod
								amount={this.props.amount}
								limitsCheck={this.props.limitsCheck}
								feeCashValue={this.props.feeCashValue}
								feeCheck={this.props.feeCheck} bitcoinAddress={this.state.info.bitcoinAddress}
								allowContinueToConfirm={this.state.info.allowContinueToConfirm}
							/>
						)
					})()}
				</div>
			</div>
		);

		return (
			<div id="bitCoin">
				{isCryptoTransferActive ? redirectImgComponent : formComponent}
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.BitCoin = BitCoin;
