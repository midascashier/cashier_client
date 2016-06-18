import React from 'react'
import {translate} from '../../constants/translate'
import {LoadingSpinner} from '../loading/loadingSpinner'

let TransactionHistory = React.createClass({
	render() {
      if(this.props.transactions) {
        return <LoadingSpinner />;
      }
      return (
        <div className=" table-responsive">
          <table className="table table-striped">
            <tbody>
            <tr>
              <th>{translate('TRANSACTION_HISTORY_TABLE_COL_DATE')}</th>
              <th>{translate('TRANSACTION_HISTORY_TABLE_COL_TYPE')}</th>
              <th>{translate('TRANSACTION_HISTORY_TABLE_COL_METHOD')}</th>
              <th>{translate('TRANSACTION_HISTORY_TABLE_COL_AMOUNT')}</th>
              <th>{translate('TRANSACTION_HISTORY_TABLE_COL_STATUS')}</th>
              <th>{translate('TRANSACTION_HISTORY_TABLE_COL_NOTES')}</th>
            </tr>
            {(() => {
              if(!this.props.transactions){
                return (
                  <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                )
              }
            })()}
            </tbody>
          </table>
        </div>
      )
	}
});

module.exports.TransactionHistory = TransactionHistory;