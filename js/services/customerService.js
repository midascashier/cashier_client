import {CashierStore} from '../stores/CashierStore'
import assign from 'object-assign'
import {stompConnector} from './StompConnector'


class CustomerService {
  /**
   *Starts connection with RabbitMQ and then do the login
   *
   * @param loginInfo
   */
  stompConnection(loginInfo) {
    stompConnector.initConnection()
      .then(()=> {
        this.customerLogin(loginInfo);
      });
  };

  /**
   *sends login information to RabbitMQ to be process
   *
   * @param loginInfo
   */
  customerLogin(loginInfo) {
    let application = CashierStore.getApplication();
    let rabbitRequest = assign(loginInfo, application);
    stompConnector.makeCustomerRequest("", rabbitRequest);
  };

  /**
   * function to get Customer Information
   */
  getCustomerInfo() {
    let data = {f: "customerInfo"};
    let application = CashierStore.getApplication();
    let rabbitRequest = Object.assign(data, application);
    stompConnector.makeCustomerRequest("", rabbitRequest);
  };

  /**
   * function to get Customer Processors
   */
  getCustomerProcessors() {
    let data = {f: "processors"};
    let application = CashierStore.getApplication();
    let rabbitRequest = Object.assign(data, application);
    stompConnector.makeCustomerRequest("", rabbitRequest);
  };

  /**
   * function to get pay account information
   *
   * @param payAccountId
   */
  getCustomerPayAccount(payAccountId) {
    let data = {f: "getPayAccountInfo", payAccountId: payAccountId};
    let application = CashierStore.getApplication();
    let rabbitRequest = Object.assign(data, application);
    stompConnector.makeCustomerRequest("", rabbitRequest);
  };
}

export let customerService = new CustomerService();