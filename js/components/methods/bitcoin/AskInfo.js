import React from 'react'
import {SelectPayAccount} from '../../SelectPayAccount'
import {AmountController} from '../../AmountController'
import {CashierActions} from '../../../actions/CashierActions'

let AskInfo = React.createClass({
	propTypes: {
		originPath: React.PropTypes.string,
		netellerPasswordInput: React.PropTypes.func,
		password: React.PropTypes.string,
		selectedProcessor: React.PropTypes.object,
		isWithDraw: React.PropTypes.number
	},

	/**
	 * React function to set component initial state
	 * @returns {*|{value}|{value: string}}
	 */
	getInitialState() {
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount() {
		CashierActions.changeCurrentStep(2);
		CashierActions.changeCurrentView(this.customerAction()+"/"+this.props.selectedProcessor.displayName.toLowerCase());
	},

	/**
	 * this function returns customer selected option
	 *
	 * @returns {*}
	 */
	customerAction(){
		if (!this.props.isWithDraw) {
			return "deposit";
		}
		else {
			return "withdraw";
		}
	},

	/**
	 *
	 * @returns {{value: string}}
	 */
	refreshLocalState() {
		return {
			value: ''
		}
	},

	render() {
		let originPath = this.props.originPath;
		let netellerPasswordInput = this.props.netellerPasswordInput;
		let password = this.props.password;

		return (
			<div id="askAmount" className="box">
				<div className="row">
					<div className="col-sm-12">
						<div className="row">
							<div className="col-sm-12">
								<div className="title">Please Enter the Deposit Information</div>
							</div>
							<div className="col-sm-12">
								<div className="infoCol">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-3">
												<div className="method active pull-left">
													<img className="img-responsive" src={originPath + '/images/processors/814.png'}
															 alt="Bitcoin"/>
												</div>
											</div>
											<div className="col-sm-9">
												Neteller Account:
												<SelectPayAccount />
												Amount:
												<AmountController />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});


module.exports.AskInfo = AskInfo;
