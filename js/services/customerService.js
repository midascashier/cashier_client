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
    let data = {f: "authCustomer", companyId: 100};
    let application = CashierStore.getApplication();
    let rabbitRequest = assign(data, loginInfo, application);
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
   * function to get pay account previous pay accounts
   */
  getCustomerPreviousPayAccount() {
    let data = {f: "getPayAccountsByCustomer", processorId: CashierStore.getProcessor().processorId};
    let application = CashierStore.getApplication();
    let rabbitRequest = Object.assign(data, application);
    stompConnector.makeCustomerRequest("", rabbitRequest);
  };
}

export let customerService = new CustomerService();