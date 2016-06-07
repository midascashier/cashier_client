import React from 'react'
import {Link} from 'react-router'
import {translate} from '../constants/translate'
import {Header} from './header'
import {MethodsWithdrawList} from './contentComponents/methodsWithdrawList'

let WithdrawContent = React.createClass({
	render() {
		return (
			<div id="withdrawContent" className="deposit-page">
        <Header />
        <div className="row">
          <div className="col-sm-12">
            <div className="modules">
              <div className="row">

                <div className="col-sm-6 ">
                  <p><Link to={`/transaction_history/`}>{translate('METHOD_TRANSACTION_HISTORY')}</Link></p>
                  <MethodsWithdrawList />
                </div>

                <div className="col-sm-6">
                  {this.props.children}
                </div>

              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
});

module.exports.WithdrawContent = WithdrawContent;