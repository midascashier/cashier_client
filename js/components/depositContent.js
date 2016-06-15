import React from 'react'
import {Header} from './header'
import {MethodsDepositList} from './contentComponents/methodsDepositList'
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
      selectedProcessor: CashierStore.getProcessor().processorId,
      originPath: CashierStore.getOriginPath()
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
                      <MethodsDepositList selectedProcessor={this.state.selectedProcessor} depositProcessors={this.state.depositProcessors} originPath={this.state.originPath}/>
                </div>
                <div className="col-sm-6">
                  asd
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