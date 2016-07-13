import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {LoadingSpinner} from '../../../components/loading/LoadingSpinner'
import {AskInfo} from './AskInfo'
import {InfoMethod} from './InfoMethod'

let Person2Person = React.createClass({

	propTypes: {
		setAmount: React.PropTypes.func,
		allowContinue: React.PropTypes.number,
		amount: React.PropTypes.string
	},

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
			timeFrameDay: 'TODAY',
			timeFrameTime: 12
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
	 *
	 * @param event
	 */
	timeFrameDayChange: function(event) {
		this.setState({timeFrameDay: event.target.value});
	},

	/**
	 *
	 * @param event
	 */
	timeFrameTimeChange: function(event) {
		this.setState({timeFrameTime: Number(event.target.value)});
	},

	render() {
		return (
			<div id="person2person">
				<div className="col-sm-6">
					<AskInfo amount={this.props.amount}
									 setAmount={this.props.setAmount}
									 allowContinue={this.props.allowContinue}
									 timeFrameDay={this.state.timeFrameDay}
									 timeFrameTime={this.state.timeFrameTime}
									 timeFrameTimeChange={this.timeFrameTimeChange}
									 timeFrameDayChange={this.timeFrameDayChange}
					/>
				</div>
				<div className="col-sm-6">
					{(() =>{
						if(!this.state.selectedProcessor.processorId){
							return <LoadingSpinner />;
						} else{
							return <InfoMethod amount={this.props.amount}
																 allowContinue={this.props.allowContinue}
																 timeFrameDay={this.state.timeFrameDay}
																 timeFrameTime={this.state.timeFrameTime}
																 timeFrameTimeChange={this.timeFrameTimeChange}
																 timeFrameDayChange={this.timeFrameDayChange}
							/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Person2Person = Person2Person;