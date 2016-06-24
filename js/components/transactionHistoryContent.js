import React from 'react'
import {Link} from 'react-router'
import {Info} from './headerComponents/info'
import {TransactionHistory} from './contentComponents/transactionHistory'
import {translate} from '../constants/translate'
import {CashierStore} from '../stores/cashierStore'

let TransactionHistoryContent = React.createClass({

  getInitialState(){
    return this.refreshLocalState();
  },

  refreshLocalState() {
    return {
      transactions: CashierStore.getCustomer().lastTransactions
    }
  },

  _onChange() {
    if(this.isMounted() === true){
      this.setState(this.refreshLocalState());
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
                    <Link to={`/deposit/`}>
                      <button type="submit" className="btn btn-green">{translate('DEPOSIT')}</button>
                    </Link>
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