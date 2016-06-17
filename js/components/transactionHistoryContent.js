import React from 'react'
import {Info} from './headerComponents/info'
import {TransactionHistory} from './contentComponents/TransactionHistory'
import {translate} from '../constants/translate'

let TransactionHistoryContent = React.createClass({
  propTypes: {
    transactions: React.PropTypes.array
  },
	render() {
		return (
			<div id="transactionHistoryContent">
				<Info />
        <div id="transactionHistory">
          <div className="row">
            <div className="col-sm-12">
              <div className="modules">
                <div className="title">{translate('TRANSACTION_HISTORY_TITLE')}</div>
                <div className=" table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>{translate('TRANSACTION_HISTORY_TABLE_COL_DATE')}</th>
                        <th>{translate('TRANSACTION_HISTORY_TABLE_COL_TYPE')}</th>
                        <th>{translate('TRANSACTION_HISTORY_TABLE_COL_METHOD')}</th>
                        <th>{translate('TRANSACTION_HISTORY_TABLE_COL_AMOUNT')}</th>
                        <th>{translate('TRANSACTION_HISTORY_TABLE_COL_STATUS')}</th>
                        <th>{translate('TRANSACTION_HISTORY_TABLE_COL_NOTES')}</th>
                      </tr>
                      <TransactionHistory transactions={this.props.transactions} />
                    </tbody>
                  </table>
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

			</div>
		)
	}
});

module.exports.TransactionHistoryContent = TransactionHistoryContent;