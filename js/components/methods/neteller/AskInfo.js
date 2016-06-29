import React from 'react'
import {translate} from '../../../constants/Translate'
import {SelectPayAccount} from '../../SelectPayAccount'
import {Input} from '../../Inputs'
import {AmountController} from '../../AmountController'

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
                {(() => {
                  if (!this.props.isWithDraw) {
                    return (<div className="title">{translate('PROCESSING_DEPOSIT_INFORMATION_TITLE', 'Please Enter the Information')}</div>);
                  }else{
                    return (<div className="title">{translate('PROCESSING_WITHDRAW_INFORMATION_TITLE', 'Please Enter the Information')}</div>);
                  }
                })()}
							</div>
							<div className="col-sm-12">
								<div className="infoCol">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-3">
												<div className="method active pull-left">
													<img className="img-responsive" src={this.props.originPath + '/images/processors/333.png'} alt="Neteller"/>
												</div>
											</div>
											<div className="col-sm-9">
                        {translate('NETELLER_ACCOUNT', 'Neteller Account')}:
												<SelectPayAccount />
                        {translate('NETELLER_SECURE', 'Secure ID')}:
												<Input onChange={netellerPasswordInput} value={password} type="password"/>
                        {translate('PROCESSING_AMOUNT', 'Amount')}:
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
