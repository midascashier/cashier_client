import React from 'react'
import {Link} from 'react-router'
import {translate} from '../../constants/translate'
import {CashierStore} from '../../stores/CashierStore'

let MethodsWithdrawList = React.createClass({
	render() {
		return (
      <div id="methods" className="box">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">

              <div className="col-sm-12">
                <div className="title">{translate('METHOD_SELECT_YOUR_WITHDRAW_METHOD')}</div>
              </div>
              <div className="col-sm-12">
                <div className="processors infoCol">
                  <div className="col-sm-12">
                    <div className="row">

                      <div className="col-sm-6">
                        <div className="method active">
                          <Link to={`/withdraw/neteller`}>
                            <img src={CashierStore.getOriginPath() + '/images/processors/333.png'} alt="Neteller"/>
                            <i className="fa fa-check-circle"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="method">
                          <Link to={`/withdraw/debitcard`}>
                            <img src={CashierStore.getOriginPath() + '/images/processors/30200.png'} alt="Debit Cards"/>
                          </Link>
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

module.exports.MethodsWithdrawList = MethodsWithdrawList;