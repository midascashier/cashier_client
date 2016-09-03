import { rabbitConfig } from '../../config/rabbitConfig';
import { onResponseService } from './OnResponseService'
import { UIService } from './UIService'
import { CashierActions } from '../actions/CashierActions'

class StompConnector {

	/**
	 * StompConnector constructor
	 */
	constructor(){
		/**
		 * Stomp connection handler
		 * @type {}
		 */
		let ws = new WebSocket(`${rabbitConfig.get('protocol')}://${rabbitConfig.get('host')}:${rabbitConfig.get('port')}/${rabbitConfig.get('type')}`);
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
		this.resolveConnection = () =>{
		};
	}

	/**
	 * Initializes and prepares everything that's necessary for the STOMP Connection.
	 * @returns {Promise}
	 */
	initConnection(){
		return new Promise((resolve, reject) =>{
			if(this.stompClient.connected){
				resolve();
			} else{

				this.makeConnection().then(() =>{
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
	makeConnection(){
		return new Promise((resolve) =>{
			this.resolveConnection = resolve;
			this.stompClient.connect(rabbitConfig.get('user'), rabbitConfig.get('pass'), this.on_connect.bind(this), this.on_error.bind(this), rabbitConfig.get('virtual'));
		});
	};

	/**
	 * triggered after a successful stomp connection is made
	 */
	on_connect(){
		$('#msjs').hide();
		CashierActions.connectionError(0);
		// Resolve our Promise to the caller
		this.resolveConnection();
	};

	/**
	 * triggered when a stomp connection fails
	 */
	on_error(){
		$('#msjs').show();
		CashierActions.connectionError(1);
		UIService.changeUIState("/");
	};

	/**
	 * disconnects from rabbit
	 */
	disconnect(){
		this.stompClient.disconnect();
	};

	/**
	 * create and subscribe to reply-to queue
	 */
	prepareReplyQueue(){
		this.replyQueue = Math.random().toString(36).substring(7);

		this.stompClient.send(this.replyQueue, { "exclusive": true, "auto-delete": true }, "");
		this.reply_queue_subscription = this.stompClient.subscribe("/queue/" + this.replyQueue, this.processMessage);
	};

	/**
	 * callback function to process messages
	 *
	 * @param msg
	 */
	processMessage(msg){
		if(msg.body){
			let action = "";
			if(msg.headers && msg.headers["correlation-id"]){
				action = msg.headers["correlation-id"].toUpperCase();
			}

			let data = JSON.parse(msg.body);
			onResponseService.processResponse(action, data);
		}
	};

	/**
	 * send message to the customer queue
	 *
	 * @param headers
	 * @param message
	 */
	makeCustomerRequest(headers, message){
		this.sendMessage("customer", headers, message)
	};

	/**
	 * send message to the process queue
	 *
	 * @param headers
	 * @param message
	 */
	makeProcessRequest(headers, message){
		this.sendMessage("process", headers, message)
	};

	/**
	 * send message to the backend queue
	 *
	 * @param headers
	 * @param message
	 */
	makeBackendRequest(headers, message){
		this.sendMessage("backend", headers, message)
	};

	/**
	 * send message to the transaction queue
	 *
	 * @param headers
	 * @param message
	 */
	makeTransactionRequest(headers, message){
		this.sendMessage("transaction", headers, message)
	};

	/**
	 * send message to the bonus queue
	 *
	 * @param headers
	 * @param message
	 */
	makeBonusRequest(headers, message){
		this.sendMessage("bonus", headers, message)
	};

	/**
	 * timeout function
	 *
	 * @param time
	 * @returns {Promise}
	 */
	sleep(ms){
		$('#msjs').show();
		let start = new Date().getTime();
		let end = start;
		while(end < start + ms){
			end = new Date().getTime();
		}
	}

	/**
	 * get the message and the queue y send them to Rabbit
	 * @param message
	 * @param queue
	 */
	sendMessage(queue, headers, message){
		let correlation_id = message.f + "Response";
		if(!headers){
			headers = { "reply-to": this.replyQueue, "correlation_id": correlation_id };
		}
		if(this.stompClient.connected){
			this.stompClient.send(`/queue/${queue}`, headers, JSON.stringify(message));
		} else{
			this.sleep(2000);
			if(this.stompClient.connected){
				this.stompClient.send(`/queue/${queue}`, headers, JSON.stringify(message));
			}
		}
	};

}

export let stompConnector = new StompConnector();