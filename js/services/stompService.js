import {rabbitConfig} from '../../config/rabbitConfig';
import {processResponse} from './onResponseService'

let ws = new WebSocket(`ws://${rabbitConfig.get('ip')}:${rabbitConfig.get('port')}/ws`);
let stompClient = Stomp.over(ws);
let replyQueue = Math.random().toString(36).substring(7);
let resolveConnection = () => {};

/**
 * callback function if the connection OK, after that subscribe and keep listening to reply queue
 */
let on_connect = () => {
	// Resolve our Promise to the caller
	resolveConnection();
};

/**
 * if any error during the connection shows a message in the console
 */
let on_error = () => {
	console.log('Connection Error');
};

/**
 * disconnect from rabbit
 */
let disconnect = () => {
	stompClient.disconnect();
}

/**
 * Create Rabbit Connection
 */
let connection = () => {
	stompClient.connect(rabbitConfig.get('user'), rabbitConfig.get('pass'), on_connect.bind(this), on_error, rabbitConfig.get('virtual'));
	return new Promise(
		(resolve) => {
			resolveConnection = resolve;
		}
	);
};

/**
 * callback function to process messages
 *
 * @param msg
 */
let processMessage = (msg) => {
	if (msg.body) {
		let action = msg.headers["correlation-id"].toUpperCase();
		let data = JSON.parse(msg.body);
		processResponse(action, data);
	}
};

/**
 * create and subscrtibe to reply-to queue
 */
let prepareReplyQueue = () => {
	stompClient.send(replyQueue, {"exclusive": true, "auto-delete": true}, "");
	let suscriptionID = stompClient.subscribe("/queue/" + replyQueue, processMessage);
}

/**
 * waits for the connection and then prepare reply queue
 *
 * @returns {Promise}
 */
exports.prepareConnection = () => {
	let p = new Promise((resolve, error) => {
		if (stompClient.connected) {
			resolve();
		}
		else {
			connection().then(() => {
				//set reply queue
				prepareReplyQueue();
				resolve();
			});
		}
	});
	return p;
};

exports.makeCustomerRequest = (headers, message) => {
	sendMessage("customer",headers, message)
};

/**
 * get the message and the queue y send them to Rabbit
 * @param message
 * @param queue
 */
let sendMessage = (queue, headers, message) => {
	let correlation_id = message.f + "Response";
	if (!headers) {
		headers = {"reply-to": replyQueue, "correlation_id": correlation_id};
	}
	stompClient.send(`/queue/${queue}`, headers, JSON.stringify(message));
};
