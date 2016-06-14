import {CashierStore} from '../stores/CashierStore'
import assign from 'object-assign'
import {stompConnector} from './StompConnector'

/**
 *Starts connection with RabbitMQ and then do the login
 *
 * @param loginInfo
 */
exports.stompConnection = (loginInfo) => {
  stompConnector.initConnection()
    .then(()=> {
      customerLogin(loginInfo);
    });
};

/**
 *sends login information to RabbitMQ to be process
 *
 * @param loginInfo
 */
let customerLogin = (loginInfo) => {
  let application = CashierStore.getApplication();
  let rabbitRequest = assign(loginInfo, application);
  stompConnector.makeCustomerRequest("", rabbitRequest);
};

/**
 * function to get Customer Information
 */
exports.getCustomerInfo = () => {
  let data = {f: "customerInfo"};
  let application = CashierStore.getApplication();
  let rabbitRequest = Object.assign(data, application);
  stompConnector.makeCustomerRequest("", rabbitRequest);
};

/**
 * function to get Customer Processors
 */
exports.getCustomerProcessors = () => {
  let data = {f: "processors"};
  let application = CashierStore.getApplication();
  let rabbitRequest = Object.assign(data, application);
  stompConnector.makeCustomerRequest("", rabbitRequest);
};
