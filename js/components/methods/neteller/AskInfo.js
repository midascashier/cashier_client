import React from 'react'
import {SelectPayAccount} from '../../SelectPayAccount'
import {Input} from '../../Inputs'
import {AmountController} from '../../AmountController'

let NetellerAskInfo = React.createClass({
	propTypes: {
		originPath: React.PropTypes.string,
		NetellerPasswordInput: React.PropTypes.func,
		password: React.PropTypes.string
	},

	/**
	 * React function to set component initial state
	 * @returns {*|{value}|{value: string}}
	 */
	getInitialState() {
		return this.refreshLocalState();
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
		let NetellerPasswordInput = this.props.NetellerPasswordInput;
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
													<img className="img-responsive" src={originPath + '/images/processors/333.png'}
															 alt="Neteller"/>
												</div>
											</div>
											<div className="col-sm-9">
												Neteller Account:
												<SelectPayAccount />
												Password:
												<Input onChange={NetellerPasswordInput} value={password} type="password"/>
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


module.exports.NetellerAskInfo = NetellerAskInfo;
