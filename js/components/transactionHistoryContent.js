import React from 'react'
import {Info} from './headerComponents/info'
import {TransactionHistory} from './contentComponents/TransactionHistory'
import {translate} from '../constants/translate'
import {CashierStore} from '../stores/CashierStore'

let TransactionHistoryContent = React.createClass({

  getInitialState(){
    return this.refreshLocalState();
  },

  refreshLocalState() {
    return {
      transactions: CashierStore.getCustomer().lastTransactions
    }
  },
  
	render() {
		return (
			<div id="transactionHistoryContent">
				<Info />
        <div id="transactionHistory" className="internal-content">
          <div className="row">
            <div className="col-sm-12">
              <div className="modules">
                <div className="title">{translate('TRANSACTION_HISTORY_TITLE')}</div>
                <TransactionHistory transactions={this.state.transactions} />
                <div className="row">
                  <div className="col-sm-6">
                    <ul>
                      <li><span>{translate('TRANSACTION_STATUS_PENDING')}: </span>{translate('TRANSACTION_HISTORY_STATUS_PENDING')}</li>
                      <li><span>{translate('TRANSACTION_STATUS_PROCESSING')}: </span>{translate('TRANSACTION_HISTORY_STATUS_PROCESSING')}</li>
                      <li><span>{translate('TRANSACTION_STATUS_PRE_APPROVE')}: </span>{translate('TRANSACTION_HISTORY_STATUS_PRE_APPROVE')}</li>
                      <li><span>{translate('TRANSACTION_STATUS_APPROVED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_APPROVED')}</li>
                      <li><span>{translate('TRANSACTION_STATUS_REJECTED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_REJECTED')}</li>
                      <li><span>{translate('TRANSACTION_STATUS_CANCELLED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_CANCELLED')}</li>
                      <li><span>{translate('TRANSACTION_STATUS_FAILED')}: </span>{translate('TRANSACTION_HISTORY_STATUS_FAILED')}</li>
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <button type="submit" className="btn btn-green">{translate('DEPOSIT')}</button>
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