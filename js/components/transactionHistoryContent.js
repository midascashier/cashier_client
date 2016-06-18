import React from 'react'
import {Info} from './headerComponents/info'
import {TransactionHistory} from './contentComponents/TransactionHistory'
import {translate} from '../constants/translate'
import {LoadingSpinner} from '../components/loading/loadingSpinner'
import {CashierStore} from '../stores/cashierStore'
import {CashierActions} from '../actions/cashierActions'

let TransactionHistoryContent = React.createClass({

  getInitialState(){
    CashierActions.getCustomerTransactions();
    return this.refreshLocalState();
  },

  componentDidMount: function() {
    CashierStore.addChangeListener(this._onChange);
  },

  refreshLocalState() {
    return {
      transactions: CashierStore.getCustomer().lastTransactions
    }
  },

  _onChange() {
    this.setState(this.refreshLocalState());
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
                {(() => {
                  if(this.state.transactions.length <= 0){
                    return <LoadingSpinner />;
                  }else{
                    return <TransactionHistory />;
                  }
                })()}
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