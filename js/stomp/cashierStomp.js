let AppActions = require('../actions/AppActions');
import { rabbitConfig } from '../../config/rabbitConfig';
/**
 * Stomp class
 */
class stomp {
	constructor(){
		this.ws = new WebSocket(`ws://${rabbitConfig.get('ip')}:${rabbitConfig.get('port')}/ws`);
		this.client = Stomp.over(this.ws);
	}

	/**
	 * if any error during the connection shows a message in the console
	 */
	on_error() {
		console.log('Connection Error');
	}

	/**
	 * callback function if the connection OK, after that subscribe and keep listening to reply queue
	 */
	on_connect() {
		let callback = function(msg) {
			if (msg.body) {
				AppActions.receiveResponse(msg.body);
			}
		};

		let subscription = this.subscribe("/queue/test", callback);
	}

	/**
	 * Create Rabbit Connection
	 */
	connection(){
		this.client.connect(rabbitConfig.get('user'), rabbitConfig.get('pass'), this.on_connect, this.on_error, rabbitConfig.get('virtual'));
	}

	/**
	 * disconnect from rabbit
	 */
	disconnect() {
		this.client.disconnect();
	}

	/**
	 * get the message and the queue y send them to Rabbit
	 * @param message
	 * @param queue
	 */
	send(message, queue){
		this.client.send(`/queue/${queue}`,{"reply-to": "test", "correlation_id": "test"}, message);
	}
}

module.exports = stomp;