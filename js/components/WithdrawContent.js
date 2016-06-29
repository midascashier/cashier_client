import React from 'react'
import {CashierStore} from '../stores/CashierStore'
import {Header} from './Header'

let WithdrawContent = React.createClass({

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
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return {
			originPath: CashierStore.getOriginPath(),
			isWithDraw: CashierStore.getIsWithdraw(),
      UI: CashierStore.getUI()
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

	render() {
		return (
			<div id="withdrawContent">
        <Header isWithDraw={this.state.isWithDraw} currentView={this.state.UI.currentView} />
				<div id="internal-content" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">
								<div className="row">
									{this.props.children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.WithdrawContent = WithdrawContent;