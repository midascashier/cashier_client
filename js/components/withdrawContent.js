import React from 'react'
import {CashierStore} from '../stores/CashierStore'
import {Header} from './header'
import {MethodsWithdrawList} from './contentComponents/methodsWithdrawList'

let WithdrawContent = React.createClass({
	render() {
    return (
        <div id="withdrawContent">
          <Header />
          <div id="internal-content" className="internal-content">
            <div className="row">
              <div className="col-sm-12">
                <div className="modules">

                  {(() => {
                    if(CashierStore.getCurrentStep() == 'infoMethod'){
                      return (
                          <div className="row">
                            <div className="col-sm-12">
                              {this.props.children}
                            </div>
                          </div>
                      )
                    }else{
                      return (
                          <div className="row">
                            <div className="col-sm-6">
                              <MethodsWithdrawList />
                            </div>
                            <div className="col-sm-6">
                              {this.props.children}
                            </div>
                          </div>
                      )
                    }
                  })()}

                </div>
              </div>
            </div>
          </div>
        </div>
    )
	}
});

module.exports.WithdrawContent = WithdrawContent;