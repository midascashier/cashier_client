import React from 'react'
import { Link } from 'react-router'
import { CashierStore } from '../../stores/CashierStore'
import { translate } from '../../constants/Translate'
import { ProcessorsList } from '../contentComponents/ProcessorsList'
import { ProcessorInfo } from '../contentComponents/ProcessorInfo'
import { LoadingSpinner } from '../../components/loading/LoadingSpinner'
import { UIService } from '../../services/UIService'

let ProcessorsInfo = React.createClass({
	propTypes: {
		setAmount: React.PropTypes.func
	},
	/**
	 * React function to set component inital state
	 *
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		this.props.setAmount("");
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
	 *
	 */
	refreshLocalState() {
		return {
			customer: CashierStore.getCustomer(), selectedProcessor: CashierStore.getProcessor()
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
	 * return the processor list
	 *
	 * @returns {Array}
	 */
	getProcessors(){
		if(UIService.getIsWithDraw()){
			return this.state.customer.withdrawProcessors;
		} else{
			return this.state.customer.depositProcessors;
		}
	},

	/**
	 * redirect to deposit
	 */
	switchAction(){
		UIService.switchAction();
	},

	render() {
		let processors = this.getProcessors();
		return (
			<div id="processorsInfo">
				<div className="col-sm-6">
					<Link to={`/transaction_history/`}>
						<p>{translate('TRANSACTION_HISTORY')}</p>
					</Link>
					{(() =>{
						if(UIService.getIsWithDraw()){
							return '';//<a href="javascript:;" onClick={this.switchAction}>GO TO DEPOSIT</a>
						}
					})()}
					<ProcessorsList
						selectedProcessor={parseInt(this.state.selectedProcessor.processorId)}
						processors={processors}/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						} else{
							return <ProcessorInfo selectedProcessor={this.state.selectedProcessor}/>
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.ProcessorsInfo = ProcessorsInfo;