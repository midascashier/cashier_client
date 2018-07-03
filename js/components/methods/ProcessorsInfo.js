import React from 'react'
import {Link} from 'react-router'
import {UIService} from '../../services/UIService'
import {translate} from '../../constants/Translate'
import cashier from '../../constants/Cashier'
import {CashierStore} from '../../stores/CashierStore'
import {CustomerService} from '../../services/CustomerService'
import {ProcessorInfo} from '../contentComponents/ProcessorInfo'
import {ProcessorsList} from '../contentComponents/ProcessorsList'
import {LoadingSpinner} from '../../components/loading/LoadingSpinner'
import {ProcessorCryptoInfo} from '../contentComponents/ProcessorCryptoInfo'

let ProcessorsInfo = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func
	},

	/**
	 * React function to set component initial state
	 *
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return{
			customer: CashierStore.getCustomer(),
			waitLimits: CashierStore.getWaitLimits(),
			selectedProcessor: CashierStore.getProcessor()
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
	 * return the processor list
	 *
	 * @returns {Array}
	 */
	getProcessors(){
		if(UIService.getIsWithDraw()){
			return this.state.customer.withdrawProcessors;
		}else{
			return this.state.customer.depositProcessors;
		}
	},

	/**
	 * Restart customer info
	 */
	restartConnection(){
		let customer = CashierStore.getCustomer();
		if(!this.state.selectedProcessor.processorId && !customer.customerId){
			let login = CashierStore.getLoginInfo();
			if (customer.customerId){
				CustomerService.startConnection();
			}else{
				CustomerService.connectionDone(login);
			}
		}
	},

	/**
	 * Print loading message to wait limits test
	 */
	waitLimits(){
		CashierStore.waitLimits();
		this.setState(this.refreshLocalState());
	},

	render(){
		let processors = this.getProcessors();
		return (
			<div id="processorsInfo">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<span>{translate('TRANSACTION_HISTORY')}</span>
					</Link>

					&nbsp;
					&nbsp;

					{(() =>{
						let accounts = [
							'MidasTP',
							'MarioMidas',
							'MidasACR',
							'Jasonfxt',
							'MissCantina',
							'Kennycr',
							'Guayo08',
							'twofactoauth',
							'CamilleSurf',
							'tptech18',
							'Natilla.Cr',
							'bcp-mangos!!',
							'acr2015',
							'chipflip5',
							'Tatii92',
							'eso0402',
							'Roachthekid',
							'gracie87',
							'csolis61',
							'Gabrod',
							'CrazyCatMan',
							'Davimon',
							'baillando',
							'owenhascrabs',
							'testing123456'
						];

						let account = UIService.getCustomerInformation();
						if(accounts.indexOf(account.username) != -1){
							return(
								<Link to={`/requests/`}>
									<span><b>{translate('METHOD_REQUESTS')}</b></span>
								</Link>
							)
						}
					})()}

					<ProcessorsList
						processors={processors}
						waitLimits={this.waitLimits}
						selectedProcessor={parseInt(this.state.selectedProcessor.processorId)}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner/>;
						}

						if(this.state.selectedProcessor.processorId == cashier.PROCESSOR_ID_BITCOIN) {
							return <ProcessorCryptoInfo selectedProcessor={this.state.selectedProcessor} waitLimits={this.state.waitLimits}/>
						}

						return <ProcessorInfo selectedProcessor={this.state.selectedProcessor} waitLimits={this.state.waitLimits}/>
					})()}
				</div>
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		this.props.setAmount("");
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount(){
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.ProcessorsInfo = ProcessorsInfo;