import React from 'react'
import {Link} from 'react-router'
import {Header} from './header'
import {MethodsDepositList} from './contentComponents/methodsDepositList'
import {MethodInfo} from './contentComponents/methodInfo'
import {CashierStore} from '../stores/CashierStore'
import {CashierActions} from '../actions/cashierActions'
import {LoadingSpinner} from '../components/loading/loadingSpinner'
import {translate} from '../constants/translate'

let DepositContent = React.createClass({
  getInitialState(){
    return this.refreshLocalState();
  },

  componentDidMount: function() {
    CashierStore.addChangeListener(this._onChange);
  },

  refreshLocalState() {
    return {
      depositProcessors: CashierStore.getCustomer().depositProcessors,
      selectedProcessor: CashierStore.getProcessor(),
      originPath: CashierStore.getOriginPath(),
      customerAction: CashierStore.getCustomerAction(),
      transactions: CashierStore.getCustomer().lastTransactions
    }
  },

  _onChange() {
    this.setState(this.refreshLocalState());
  },

  getTransactions: function() {
    CashierActions.getCustomerTransactions();
  },

	render() {
		return (
        <div id="depositContent">
          <Header />
          <div id="internal-content" className="internal-content">
            <div className="row">
              <div className="col-sm-12">
                <div className="modules">
                  <div className="row">
                    <div className="col-sm-6">
                      <Link to={`/transaction_history/`} onClick={this.getTransactions} transaction={this.state.transactions}>
                        <p>{translate('TRANSACTION_HISTORY')}</p>
                      </Link>
                      <MethodsDepositList selectedProcessor={parseInt(this.state.selectedProcessor.processorId)} depositProcessors={this.state.depositProcessors} originPath={this.state.originPath}/>
                    </div>
                    <div className="col-sm-6">
                      {(() => {
                        if (!this.state.selectedProcessor.processorId) {
                          return <LoadingSpinner />;
                        }else{
                          return <MethodInfo selectedProcessor={this.state.selectedProcessor} customerAction={this.state.customerAction} originPath={this.state.originPath}/>;
                        }
                      })()}
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

module.exports.DepositContent = DepositContent;