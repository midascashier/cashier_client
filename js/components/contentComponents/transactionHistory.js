import React from 'react'
import {translate} from '../../constants/translate'

let TransactionHistory = React.createClass({
	render() {
		return (
			<div id="transactionHistory">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="title">{translate('HISTORY_TITLE')}</div>
							<div className=" table-responsive">
								<table className="table table-striped">
									<tbody>
									<tr>
										<th>{translate('HISTORY_TABLE_COL_DATE')}</th>
										<th>{translate('HISTORY_TABLE_COL_TYPE')}</th>
										<th>{translate('HISTORY_TABLE_COL_METHOD')}</th>
										<th>{translate('HISTORY_TABLE_COL_AMOUNT')}</th>
										<th>{translate('HISTORY_TABLE_COL_STATUS')}</th>
										<th>{translate('HISTORY_TABLE_COL_NOTES')}</th>
									</tr>
									<tr className="success">
										<td>10-Aug-15</td>
										<td>Deposit</td>
										<td>Visa</td>
										<td>$500</td>
										<td>Successful</td>
										<td></td>
									</tr>
									<tr className="danger">
										<td>5-Dec-15</td>
										<td>Deposit</td>
										<td>7Capital</td>
										<td>$100</td>
										<td>Failed</td>
										<td></td>
									</tr>
									<tr className="warning">
										<td>3-Jan-16</td>
										<td>Withdraw</td>
										<td>WU</td>
										<td>$300</td>
										<td>Pending</td>
										<td></td>
									</tr>
									<tr className="info">
										<td>3-Jan-16</td>
										<td>Withdraw</td>
										<td>WU</td>
										<td>$300</td>
										<td>Pre-Approved</td>
										<td></td>
									</tr>
									<tr className="active">
										<td>3-Jan-16</td>
										<td>Withdraw</td>
										<td>WU</td>
										<td>$300</td>
										<td>Rejected</td>
										<td></td>
									</tr>
									</tbody></table>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<ul>
										<li><span>Pre-Approved:</span> Pending verify information.</li>
										<li><span>Failed:</span> Please contact us for more information.</li>
										<li><span>Pending:</span> Waiting confirmation.</li>
										<li><span>Rejected:</span> Rejected by the issuer.</li>
									</ul>
								</div>
								<div className="col-sm-6">
									<button type="submit" className="btn btn-green">{translate('DEPOSIT')}</button>
									<button type="submit" className="btn btn-green">Go to Poker Lobby</button>
								</div>

							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.TransactionHistory = TransactionHistory;