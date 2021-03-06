import React from 'react'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'
import cashier from '../../constants/Cashier'

let LoadingTicket = React.createClass({

  /**
   * React function to set component initial state
   *
   */
  getInitialState(){
    return this.refreshLocalState()
  },

  /**
   * this function sets and return object with local states
   *
   * @returns {{transactionResponse: *}}
   */
  refreshLocalState(){
    return {
      transactionResponse: CashierStore.getLastTransactionResponse()
    }
  },

  /**
   * this is the callback function the store calls when a state change
   *
   * @private
   */
  _onChange(){
    this.setState(this.refreshLocalState())
  },

  render(){
    let transactionResponse = this.state.transactionResponse
    let processor = CashierStore.getProcessor()
    let processorClassId = processor.processorClass

    return (
        <div id="loadingTicket">
          {(() => {
            if((transactionResponse.status === '') && (!transactionResponse.userMessage)){

              return (
                  <div className="col-sm-12">
                    <div className="modules">
                      <div className="row">
                        <div className="col-sm-12">
                          <h2>{translate('PROCESSING', 'Processing... please wait!')}</h2>
                          <div className="loader"></div>
                        </div>
                      </div>
                    </div>
                  </div>
              )
            }

            if(
                processorClassId == cashier.PROCESSOR_CLASS_ID_CREDIT_CARDS &&
                processor.processorId != cashier.PROCESSOR_ID_P2C &&
                !transactionResponse.details.creditCardTransaction &&
                transactionResponse.status != cashier.TRANSACTION_STATUS_APPROVED &&
                transactionResponse.transactionId != ''
            ){
              return (
                  <div className="col-sm-12">
                    <div className="modules">
                      <div className="row">
                        <div className="col-sm-12">
                          <h2>{translate('PROCESSING', 'Processing... please wait!')}</h2>
                          <div className="loader"></div>
                        </div>
                      </div>
                    </div>
                  </div>
              )
            }

            return this.props.children
          })()}
        </div>
    )
  },

  /**
   * React function to add listener to this component once is mounted
   * here the component listen changes from the store
   */
  componentDidMount(){
    CashierStore.addChangeListener(this._onChange)
  },

  /**
   * React function to remove listener to this component once is unmounted
   */
  componentWillUnmount(){
    CashierStore.removeChangeListener(this._onChange)
  }
})

module.exports.LoadingTicket = LoadingTicket
