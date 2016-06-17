import React from 'react'
import {Header} from './header'
import {MethodsDepositList} from './contentComponents/methodsDepositList'
import {MethodInfo} from './contentComponents/methodInfo'
import {CashierStore} from '../stores/CashierStore'
import {LoadingSpinner} from '../components/loading/loadingSpinner'

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
      currentStep: CashierStore.getCurrentStep()
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
                      <p><a href="#">Transaction History</a></p>
                      {(() => {
                        if (this.state.currentStep==1) {
                          return <MethodsDepositList selectedProcessor={parseInt(this.state.selectedProcessor.processorId)}
                                              depositProcessors={this.state.depositProcessors}
                                              originPath={this.state.originPath}/>
                        }
                      })()}
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