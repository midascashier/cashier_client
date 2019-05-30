import React from 'react'
import {CashierStore} from '../../stores/CashierStore'
import {UIService} from '../../services/UIService'

let PendingTicket = React.createClass({
  /**
   * initialize the state
   */
  getInitialState(){
    return this.refreshLocalState();
  },

  /**
   * build the state
   */
  refreshLocalState(){
    let company = UIService.getCompanyInformation();
    let customer = UIService.getCustomerInformation();
    let transaction = UIService.getTransactionInformation();
    let processorName = UIService.getProcessorDisplayName();
    return {
      currency: customer.currency,
      currencyAmount: transaction.amount,
      processorName: processorName,
      companyPhone: company.companyLabel.COMPANY_PHONE
    }
  },

  /**
   * refresh the state when changes occur
   *
   * @private
   */
  _onChange(){
    this.setState(this.refreshLocalState());
  },

  /**
   * send the customer to select the processor again
   */
  setFirstStep(){
    UIService.setFirstStep();
  },

  /**
   * function to open chat window
   */
  openChat(event){
    chat();
  },

  render(){
    let processorName = this.state.processorName;
    let companyPhone = this.state.companyPhone;
    let isWithDraw = UIService.getIsWithDraw();
    let action;
    if(isWithDraw){
      action = "withdraw";
    }else{
      action = "deposit";
    }

    return (
        <div className="col-sm-12">
          <div className="modules">
            <div className="row">
              <div className="col-sm-12">
                <div className="alert alert-warning" role="alert">
                  <div className="text-center col-sm-12 ticket-header">
                    <i className="fa fa-warning yellow"></i>
                    <strong>
                      Pending Transaction
                    </strong>
                  </div>
                  <div className="ticket-body text-center">
                    <p>
                      Your transaction with <strong>{processorName}</strong> is processing in this moment, please wait.
                    </p>
                    <p>
                      If you have questions call us at {companyPhone} or <a onClick={this.openChat}>Live Chat.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  },

  /**
   * component is ready
   */
  componentDidMount(){
    CashierStore.addChangeListener(this._onChange);
  },

  /**
   * React function to remove listener to this component once is unmounted
   */
  componentWillUnmount(){
    CashierStore.removeChangeListener(this._onChange);
  }
});
module.exports.PendingTicket = PendingTicket;
