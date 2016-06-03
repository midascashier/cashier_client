let AppActions = require('../actions/AppActions');
import { rabbitConfig } from '../../config/rabbitConfig';

class stomp {
	constructor(){
		this.ws = new WebSocket(`ws://${rabbitConfig.get('ip')}:${rabbitConfig.get('port')}/ws`);
		this.client = Stomp.over(this.ws);
	}

	on_error() {
		console.log('Connection Error');
	}

	on_connect() {
		let callback = function(msg) {
			if (msg.body) {
				AppActions.receiveResponse(msg.body);
			}
		};

		let subscription = this.subscribe("/queue/test", callback);
	}

	connection(){
		this.client.connect(rabbitConfig.get('user'), rabbitConfig.get('pass'), this.on_connect, this.on_error, rabbitConfig.get('virtual'));
	}

	disconnect() {
		this.client.disconnect();
	}

	send(message, queue){
		this.client.send(`/queue/${queue}`,{"reply-to": "test", "correlation_id": "test"}, message);
	}
}

module.exports = stomp;