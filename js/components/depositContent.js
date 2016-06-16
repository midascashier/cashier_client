import React from 'react'
import {Header} from './header'
import {MethodsDepositList} from './contentComponents/methodsDepositList'
import {MethodInfo} from './contentComponents/methodInfo'
import {CashierStore} from '../stores/CashierStore'

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
      customerAction: CashierStore.getCustomerAction()
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
                      <MethodsDepositList selectedProcessor={parseInt(this.state.selectedProcessor.processorId)} depositProcessors={this.state.depositProcessors} originPath={this.state.originPath}/>
                </div>
                <div className="col-sm-6">
                      <MethodInfo selectedProcessorName={this.state.selectedProcessor.displayName} customerAction={this.state.customerAction} />
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