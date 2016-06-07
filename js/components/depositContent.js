import React from 'react'
import {Header} from './header'
import {MethodsDepositList} from './contentComponents/methodsDepositList'
import {CashierStore} from '../stores/CashierStore'

let DepositContent = React.createClass({
	render() {
		return (
        <div id="depositContent">
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
                                <MethodsDepositList />
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

module.exports.DepositContent = DepositContent;