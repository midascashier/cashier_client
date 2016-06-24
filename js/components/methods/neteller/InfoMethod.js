import React from 'react'
import {Link} from 'react-router'
import {CashierStore} from '../../../stores/CashierStore'
import {CashierActions} from '../../../actions/CashierActions'
import {Loading} from '../../loading/Loading'


let NetellerInfoMethod = React.createClass({
	propTypes: {
		password: React.PropTypes.string
	},

	/**
	 * React function to set component inital state
	 *
	 * @returns {*|{customer, company}}
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount: function () {
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 *  this function sets and return object with local states
	 *
	 * @returns {{processor: (*|{processorClass: number, processorId: number, displayName: string, bonus: Array, fees: Array}), currentPayAccount: *, originPath: (*|string)}}
	 */
	refreshLocalState() {
		return {
			processor: CashierStore.getProcessor(),
			currentPayAccount: CashierStore.getCurrentPayAccount(),
			originPath: CashierStore.getOriginPath()
		}
	},

	/**
	 * this is the callback function the store calls when a state change
	 *
	 * @private
	 */
	_onChange() {
		if (this.isMounted() === true) {
			this.setState(this.refreshLocalState());
		}
	},

	/**
	 *
	 */
	confirm() {
		CashierActions.confirmStep();
	},

	render() {
		let minPayAccount = <Loading />;
		let maxPayAccount = <Loading />;
		let submitButton = "";
		let payAccount = this.state.currentPayAccount;
		if (payAccount.payAccountId) {
			minPayAccount = payAccount.limitsData.minAmount + " " + payAccount.limitsData.currencyCode;
			maxPayAccount = payAccount.limitsData.maxAmount + " " + payAccount.limitsData.currencyCode;
		}

		let customerAction;

		if (!this.props.isWithDraw) {
			customerAction = "deposit";
		}

		let allowContinue = false;
		if (this.props.password) {
			if (String(this.props.password).length >= 5) {
				allowContinue = true;
			}
		}
		return (
			<div id="infoLimits" className="row">
				<div className="col-sm-12">
					<div className="title">Neteller Deposit Limits</div>
					<div className="table-responsive">
						<table className="table table-striped">
							<tbody>
							<tr>
								<td>Min. Deposit:</td>
								<td><span>{minPayAccount}</span></td>
							</tr>
							<tr>
								<td>Max. Deposit:</td>
								<td><span>{maxPayAccount}</span></td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="row">
								<div className="col-sm-6">
									{(() => {
										if (payAccount.payAccountId && allowContinue) {
											return <Link
												to={"/"+customerAction+"/"+this.props.selectedProcessor.displayName.toLowerCase()+"/ticket"}>
												<button type='button' className='btn btn-green'>Next</button>
											</Link>
										}
									})()}
								</div>
								<div className="col-sm-6">
									<img src={this.state.originPath + '/images/ssl.png'} alt="ssl"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.NetellerInfoMethod = NetellerInfoMethod;
