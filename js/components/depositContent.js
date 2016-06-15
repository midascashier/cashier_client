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
      depositProcessors: CashierStore.getCustomer().depositProcessors
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
                      <MethodsDepositList depositProcessors={this.state.depositProcessors} />
                </div>
                <div className="col-sm-6">
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