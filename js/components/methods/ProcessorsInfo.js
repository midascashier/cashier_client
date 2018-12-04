import React from 'react'
import {Link} from 'react-router'
import {UIService} from '../../services/UIService'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'
import {CustomerService} from '../../services/CustomerService'
import {ProcessorInfo} from '../contentComponents/ProcessorInfo'
import {ProcessorsList} from '../contentComponents/ProcessorsList'
import {LoadingSpinner} from '../../components/loading/LoadingSpinner'
import {ProcessorsNoAvailable} from '../contentComponents/ProcessorsNoAvailable'

let ProcessorsInfo = React.createClass({

	readyInit: false,

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
		return {
            loadingPass: false,
			customer: CashierStore.getCustomer(),
            validPass: CashierStore.getValidPass(),
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
			if(customer.customerId){
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
				{(() =>{
					if(this.state.customer.loadProcessors && processors && processors.length == 0){
						return <ProcessorsNoAvailable/>
					}else{
						return <div>
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
										return (
											<Link to={`/requests/`}>
												<span><b>{translate('METHOD_REQUESTS')}</b></span>
											</Link>
										)
									}
								})()}

								<ProcessorsList processors={processors} waitLimits={this.waitLimits} selectedProcessor={parseInt(this.state.selectedProcessor.processorId)}/>
							</div>
							<div className="col-sm-6">
								{(() =>{
									if(!this.state.selectedProcessor.processorId){
										return <LoadingSpinner/>;
									}
									return <ProcessorInfo selectedProcessor={this.state.selectedProcessor} waitLimits={this.state.waitLimits}/>
								})()}
							</div>
						</div>
					}
				})()}

                {(() =>{
                    if(this.state.selectedProcessor.processorId && UIService.getIsWithDraw() && !this.state.validPass){
                    	let wrongPassWord = (!this.state.validPass && this.readyInit);
                    	let inputClass =  wrongPassWord ? 'withdrawPassInputPasswordWrong' : 'withdrawPassInputPassword';

                        return(
                            <div id='expiredSessionModal'>
                                <div id="withdrawPassModal-content">
									<div id="withdrawPassModal-frame">
										<p id="withdrawPassModal-tittle">{translate('WITHDRAW_PASS_MODAL_TITTLE')}</p>
										<form onSubmit={this.withdrawPassAuthorized}>
											<input type='password' id="withdrawPassInputPassword" className={inputClass} required/>

											{wrongPassWord? <p id='withdrawPassWrongMessage'>{translate('WITHDRAW_PASS_MODAL_WRONG_MESSAGE', 'Wrong password, please try again.')}</p> : ''}

											{
												this.state.loadingPass
													? <LoadingSpinner/> :
												<button type='submit' className='btn btn-green withdrawPassInputBTN'>
													{translate('PROCESSING_BUTTON_NEXT', 'Next')}
												</button>
											}
										</form>
									</div>
                                </div>
                            </div>
						)
					}
                })()}
			</div>
		)
	},

    /**
	 * Send verification withdraw pass
     */
	withdrawPassAuthorized(event){
		event.preventDefault();

		let pass = document.getElementById('withdrawPassInputPassword');

        this.readyInit = false;
        let state = this.state;
        state.loadingPass = true;

		CustomerService.verifiedPassInWithdraw(pass.value).then((result)=>{
			if(result.hasOwnProperty('response')){
				if(result.response.hasOwnProperty('access')){
                    this.readyInit = true;
                    state.validPass = result.response.access;
                    state.loadingPass = false;

                    CashierStore.setValidPass(state.validPass);
                    this.setState(state)
				}
			}
		});

        this.setState(state)
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