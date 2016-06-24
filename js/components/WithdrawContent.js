import React from 'react'
import {translate} from '../constants/Translate'
import {CashierStore} from '../stores/CashierStore'
import {Header} from './Header'
import {MethodsWithdrawList} from './contentComponents/MethodsWithdrawList'

let WithdrawContent = React.createClass({
	render() {
		return (
			<div id="withdrawContent">
				<Header />
				<div id="internal-content" className="internal-content">
					<div className="row">
						<div className="col-sm-12">
							<div className="modules">

								{(() => {
									if (CashierStore.getCurrentStep() == 'infoMethod') {
										return (
											<div className="row">
												<div className="col-sm-6">
													{this.props.children}
												</div>
											</div>
										)
									} else {
										return (
											<div className="row">
												<div className="col-sm-6">
													<p><a href="/transaction_history/">{translate('TRANSACTION_HISTORY')}</a></p>
													<MethodsWithdrawList />
												</div>
												<div className="col-sm-6">
													{this.props.children}
												</div>
											</div>
										)
									}
								})()}

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.WithdrawContent = WithdrawContent;