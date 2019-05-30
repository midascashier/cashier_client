import React from 'react'
import {RedirectTicket} from '../../../methodTickets/RedirectTicket'
import {PendingTicket} from '../../../methodTickets/PendingTicket'
import {CashierStore} from '../../../../stores/CashierStore'

let WMEcommpayTicketPending = React.createClass({
  render(){
    let transaction = CashierStore.getLastDataTransactionResponse();
    if("gotoURLAction" in transaction && "gotoURL" in transaction){
      return (
          <div>
            <RedirectTicket/>
          </div>
      )
    }
    else{
      return (
          <div>
            <PendingTicket/>
          </div>
      )
    }
  }
});

module.exports.WMEcommpayTicketPending = WMEcommpayTicketPending;
