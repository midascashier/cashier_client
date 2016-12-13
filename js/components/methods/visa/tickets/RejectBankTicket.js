import React from 'react'
import { UIService } from '../../../../services/UIService'
import { TransactionService } from '../../../../services/TransactionService'

let VisaRejectBankTicket = React.createClass({

	/**
	 * initialize the state
	 *
	 * @returns {*}
	 */
	getInitialState(){
		let ticketDate = Date();
		let state = {ticketDate: ticketDate, timer: '5:00', enableReprocess: false};
		return state;
	},

	/**
	 * timer to reprocess transaction
	 */
	timerTick(){
		if(this.isMounted()){
			let now = new Date();
			let ticketDateEvaluate = new Date(this.state.ticketDate);
			let timeDifference = (now.getTime() - ticketDateEvaluate.getTime())/1000;
			if(timeDifference > 300){
				clearInterval(this.timerTick);
				this.setState({timer: '0:00', enableReprocess: true})
			}else{

				let minutes = Math.floor((300 - timeDifference) / 60);
				let seconds = Math.round((300 - timeDifference) - minutes * 60);
				if(seconds < 10){
					seconds = "0" + seconds;
				}

				let score = minutes + ":" + seconds;
				this.setState({timer: score});
			}
		}
	},

	/**
	 * component is ready
	 */
	componentDidMount() {
		this.interval = setInterval(this.timerTick, 1000);
	},

	/**
	 * React function to remove listener to this component once is unmounted
	 */
	componentWillUnmount() {
		clearInterval(this.interval);
	},

	/**
	 * reprocesses a credit card transaction that just failed.
	 */
	reProcessTransaction(){
		TransactionService.processCC();
	},

	/**
	 * send the customer to select the processor again
	 */
	setFirstStep() {
		UIService.setFirstStep();
	},

	render() {
		return (
			<div className="internal-content" id="visaRejectBankTicket">
				<div className="row">
					<div className="col-sm-12">
						<div className="modules">
							<div className="title">Quick fix...</div>
							<p>Your credit card account is not setup to accept international transactions. You can call them and ask them to allow international transactions.</p>
							<p>After that, we can get you to the poker tables with your stack of chips.  We'll give you a few minutes to take care of it: <b><span className="red">{this.state.timer}</span></b></p>
							<button type="button" className="btn btn-green" disabled={!this.state.enableReprocess} onClick={this.reProcessTransaction}>I took care of it. Try again</button>
							<br />
							<p><a onClick={this.setFirstStep}>No thanks.  I'll deposit a different way.</a></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.VisaRejectBankTicket = VisaRejectBankTicket;