import React from 'react'
import {Link} from 'react-router'
import {Header} from './header'
import {MethodsDepositList} from './contentComponents/methodsDepositList'
import {MethodInfo} from './contentComponents/methodInfo'
import {CashierStore} from '../stores/CashierStore'
import {LoadingSpinner} from '../components/loading/loadingSpinner'
import {AskInfo} from './methods/askInfo'
import {ProcessorMethodInfo} from './methods/infoMethod'
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
      currentStep: CashierStore.getCurrentStep(),
      customerOption: CashierStore.getCustomerAction(),
      customerCurrency: CashierStore.getCustomer().currency,
      transactions: CashierStore.getCustomer().lastTransactions
    }
  },

  _onChange() {
    this.setState(this.refreshLocalState());
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
                      <Link to={`/transaction_history/`}>
                        <p>{translate('TRANSACTION_HISTORY')}</p>
                      </Link>
                      {(() => {
                        if (this.state.currentStep==1) {
                          return <MethodsDepositList selectedProcessor={parseInt(this.state.selectedProcessor.processorId)}
                                              depositProcessors={this.state.depositProcessors}
                                              originPath={this.state.originPath}/>
                        }
                        if (this.state.currentStep==2) {
                          return <AskInfo originPath={this.state.originPath} customerOption={this.state.customerOption} selectedProcessor={this.state.selectedProcessor} />;
                        }
                      })()}
                    </div>
                    <div className="col-sm-6">
                      {(() => {
                        if (!this.state.selectedProcessor.processorId) {
                          return <LoadingSpinner />;
                        }else{
                          if (this.state.currentStep==1) {
                            return <MethodInfo selectedProcessor={this.state.selectedProcessor}
                                               customerAction={this.state.customerAction}
                                               originPath={this.state.originPath}/>;
                          }
                          if (this.state.currentStep==2) {
                            return <ProcessorMethodInfo selectedProcessor={this.state.selectedProcessor} />;
                          }
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