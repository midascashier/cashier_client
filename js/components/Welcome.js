import React from 'react'
import { translate } from '../constants/Translate'
import { CashierStore } from '../stores/CashierStore'
import { CustomerService } from '../services/CustomerService'

let Welcome = React.createClass({

	/**
	 * React function to set component initial state
	 */
	getInitialState(){
		return this.refreshLocalState();
	},

	/**
	 * this function sets and return object with local states
	 */
	refreshLocalState() {
		return{
			customer: CashierStore.getCustomer()
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

	render(){
		let customer = this.state.customer;
		if (customer.customerId){
			let login = CashierStore.getLoginInfo();
			CustomerService.connectionDone(login);
		}

		return (
			<div id="welcome" className="welcome-page">
				<div className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="welcome-info">
								<div className="row">
									<div className="col-sm-12">
										<h2><span>{translate('WELCOME_TITLE')}</span><span>{translate('WELCOME_TITLE_TO')}</span></h2>
										<p className="title">{translate('WELCOME_LOADING')}</p>
									</div>

									<div className="col-sm-12">
										<div class="loader-lg">
											<img class="center-block" src="/images/loader-lg_70x70.gif" alt="loader"/>
										</div>
									</div>

									<div className="col-sm-12">
										<img src="/images/24-7_secure.png" alt="24/7 Secure"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	},

	/**
	 * React function to add listener to this component once is mounted
	 * here the component listen changes from the store
	 */
	componentDidMount(){
		CustomerService.startConnection();
		CashierStore.addChangeListener(this._onChange);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		CashierStore.removeChangeListener(this._onChange);
	}
});

module.exports.Welcome = Welcome;