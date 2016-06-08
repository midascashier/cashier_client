import { rabbitConfig } from '../../config/rabbitConfig';
import {CashierActions} from '../actions/cashierActions';
/**
 * Stomp class
 */
class CashierStomp {
	/**
	 * Constructor
	 */
	constructor(){
		this.ws = new WebSocket(`ws://${rabbitConfig.get('ip')}:${rabbitConfig.get('port')}/ws`);
		this.stompClient = Stomp.over(this.ws);
		this.replyQueue=Math.random().toString(36).substring(7);
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
			CashierActions.responses(action, data);
		}
	}

	/**
	 * callback function if the connection OK, after that subscribe and keep listening to reply queue
	 */
	on_connect(){
		this.stompClient.send(this.replyQueue,{"exclusive":true,"auto-delete":true},"");
		this.stompClient.subscribe("/queue/"+this.replyQueue, this.processMessage);
		CashierActions.login(loginInfo);
	}

	/**
	 * Create Rabbit Connection
	 */
	connection(){
		this.stompClient.connect(rabbitConfig.get('user'), rabbitConfig.get('pass'), this.on_connect.bind(this), this.on_error, rabbitConfig.get('virtual'));
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
	send(queue, headers, message){
		let correlation_id=message.f+"Response";
		if (!headers){
			headers={"reply-to": this.replyQueue, "correlation_id": correlation_id};
		}
		this.stompClient.send(`/queue/${queue}`, headers, JSON.stringify(message));
	}
}

module.exports.CashierStomp = CashierStomp;