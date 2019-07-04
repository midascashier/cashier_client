import React from 'react'
import {CashierStore} from '../../../../stores/CashierStore'
import {RedirectTicket} from '../../../methodTickets/RedirectTicket'
import {PendingTicket} from '../../../methodTickets/PendingTicket'

let VisaPendingTicket = React.createClass({

  render(){
    let transaction = CashierStore.getLastDataTransactionResponse();
    if("gotoURLAction" in transaction && "gotoURL" in transaction){
      return (
          <div>
            <RedirectTicket/>
          </div>
      )
    }else{
      return (
          <div>
            <PendingTicket/>
          </div>
      )
    }
  }
});

module.exports.VisaPendingTicket = VisaPendingTicket;