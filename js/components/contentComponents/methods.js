import React from 'react'
import {TransactionHistory} from './transactionHistory'

let Methods = React.createClass({
	render() {
		return (
			<div id="methods" className="col-sm-6">
        <TransactionHistory />
        <div className="box">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-12">
                  <div className="title">Select Your Deposit Method</div>
                </div>
                <div className="col-sm-12">
                  <div className="processors">

                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="method active">
                            <img src="images/processors/proc_11001.png" alt="Visa"/>
                            <i className="fa fa-check-circle"></i>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="method">
                            <img src="images/processors/proc_13.png" alt="Skrill"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="method">
                            <img src="images/processors/proc_814.png" alt="BitCoin"/>
                          </div>
                        </div>
                      </div>
                    </div>

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

module.exports.Methods = Methods;