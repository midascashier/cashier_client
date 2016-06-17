import React from 'react'
import {translate} from '../../constants/translate'
import {LoadingSpinner} from '../loading/loadingSpinner'

let TransactionHistory = React.createClass({
	render() {
      if (!this.props.transactions) {
        return <LoadingSpinner />;
      }
      return (
            (() => {
              if(this.props.transactions){
                return <span>test</span>;
              }
            })()
      )
	}
});

module.exports.TransactionHistory = TransactionHistory;