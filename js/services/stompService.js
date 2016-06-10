import {rabbitConfig} from '../../config/rabbitConfig';
import {processResponse} from './onResponseService'
/**
 * Stomp class
 */
class StompService {
	/**
	 * Constructor
	 */
	constructor() {
		this.ws = new WebSocket(`ws://${rabbitConfig.get('ip')}:${rabbitConfig.get('port')}/ws`);
		this.stompClient = Stomp.over(this.ws);
		this.replyQueue = Math.random().toString(36).substring(7);
		this.resolveConnection = () => {};
	}

	/**
	 * if any error during the connection shows a message in the console
	 */
	on_error() {
		console.log('Connection Error');
	}

	/**
	 * callback function to process messages
	 *
	 * @param msg
	 */
	processMessage(msg) {
		if (msg.body) {
			let action = msg.headers["correlation-id"].toUpperCase();
			let data = JSON.parse(msg.body);
			processResponse(action, data);
		}
	}

	/**
	 * callback function if the connection OK, after that subscribe and keep listening to reply queue
	 */
	on_connect() {
		// Resolve our Promise to the caller
		this.resolveConnection();
	}

	/**
	 * Create Rabbit Connection
	 */
	connection() {
		this.stompClient.connect(rabbitConfig.get('user'), rabbitConfig.get('pass'), this.on_connect.bind(this), this.on_error, rabbitConfig.get('virtual'));
		return new Promise(
			(resolve) => {
				this.resolveConnection = resolve;
			}
		);
	}

	prepareReplyQueue() {
		this.stompClient.send(this.replyQueue, {"exclusive": true, "auto-delete": true}, "");
		this.suscriptionID = this.stompClient.subscribe("/queue/" + this.replyQueue, this.processMessage.bind(this));
	}

	/**
	 * check if connection exist if not create it
	 */
	prepareConnection() {
		let p = new Promise((resolve, error) => {
			if (this.stompClient.connected) {
				resolve();
			}
			else {
				this.connection().then(() => {
					//set reply queue
					this.prepareReplyQueue();
					resolve();
				});
			}
		});
		return p;
	}

	/**
	 * disconnect from rabbit
	 */
	disconnect() {
		this.stompClient.disconnect();
	}

	/**
	 * get the message and the queue y send them to Rabbit
	 * @param message
	 * @param queue
	 */
	sendMessage(queue, headers, message) {
		let correlation_id = message.f + "Response";
		if (!headers) {
			headers = {"reply-to": this.replyQueue, "correlation_id": correlation_id};
		}
		this.stompClient.send(`/queue/${queue}`, headers, JSON.stringify(message));
	}
}

module.exports.StompService = StompService;