import {rabbitConfig} from '../../config/RabbitConfig';
import {onResponseService} from './OnResponseService'

class StompConnector {

  /**
   * StompConnector constructor
   */
  constructor() {
    /**
     * Stomp connection handler
     * @type {}
     */
    let ws = new WebSocket(`ws://${rabbitConfig.get('ip')}:${rabbitConfig.get('port')}/ws`);
    this.stompClient = Stomp.over(ws);

    /**
     * Reply queue identifier
     * @type string
     */
    this.replyQueue = '';

    /**
     * reply queue subscription reference.
     * @type {}
     */
    this.reply_queue_subscription = null;

    /**
     * Promise to be fulfilled when the connection is finalized.
     */
    this.resolveConnection = () => {
    };
  }

  /**
   * Initializes and prepares everything that's necessary for the STOMP Connection.
   * @returns {Promise}
   */
  initConnection() {
    return new Promise((resolve, reject) => {
      if(this.stompClient.connected){
        resolve();
      } else{

        this.makeConnection().then(() => {
          //set reply queue
          this.prepareReplyQueue();
          resolve();
        });
      }
    });
  }

  /**
   * Create Rabbit Connection
   */
  makeConnection() {
    return new Promise((resolve) => {
      this.resolveConnection = resolve;

      this.stompClient.connect(rabbitConfig.get('user'), rabbitConfig.get('pass'), this.on_connect.bind(this), this.on_error.bind(this), rabbitConfig.get('virtual'));
    });
  };

  /**
   * triggered after a successful stomp connection is made
   */
  on_connect() {
    // Resolve our Promise to the caller
    this.resolveConnection();
  };

  /**
   * triggered when a stomp connection fails
   */
  on_error() {
    console.log('Connection Error');
  };

  /**
   * disconnects from rabbit
   */
  disconnect() {
    this.stompClient.disconnect();
  };

  /**
   * create and subscribe to reply-to queue
   */
  prepareReplyQueue() {
    this.replyQueue = Math.random().toString(36).substring(7);

    this.stompClient.send(this.replyQueue, {"exclusive": true, "auto-delete": true}, "");
    this.reply_queue_subscription = this.stompClient.subscribe("/queue/" +  this.replyQueue, this.processMessage);
  };

  /**
   * callback function to process messages
   *
   * @param msg
   */
  processMessage(msg) {
    if(msg.body){
      let action = "";
      if(msg.headers && msg.headers["correlation-id"]){
        action = msg.headers["correlation-id"].toUpperCase();
      }

      let data = JSON.parse(msg.body);
      onResponseService.processResponse(action, data);
    }
  };

  makeCustomerRequest(headers, message) {
    this.sendMessage("customer", headers, message)
  };

  makeProcessRequest(headers, message) {
    this.sendMessage("process", headers, message)
  };

  /**
   * get the message and the queue y send them to Rabbit
   * @param message
   * @param queue
   */
  sendMessage(queue, headers, message) {
    // TODO Add is dev config. 
    message.XDEBUG_SESSION_START = 'ECLIPSE_DBGP';

    let correlation_id = message.f + "Response";
    if(!headers){
      headers = {"reply-to": this.replyQueue, "correlation_id": correlation_id};
    }
    this.stompClient.send(`/queue/${queue}`, headers, JSON.stringify(message));
  };

}

export let stompConnector = new StompConnector();