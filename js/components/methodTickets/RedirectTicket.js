import React from 'react'
import {translate} from '../../constants/Translate'
import {CashierStore} from '../../stores/CashierStore'

let RedirectTicket = React.createClass({

	propTypes: {
		url: React.PropTypes.string,
		elements: React.PropTypes.object,
		transaction: React.PropTypes.object,
		simpleRedirect: React.PropTypes.bool
	},

	/**
	 * Validate initial function for redirect process
	 */
	componentWillMount(){
		this.props.simpleRedirect = 1;

		if(!this.props.transaction){
			this.props.transaction = CashierStore.getLastDataTransactionResponse();
		}

		if("gotoURLAction" in this.props.transaction && "gotoURL" in this.props.transaction){
			this.props.url = this.props.transaction.gotoURLAction;
			this.props.elements = this.props.transaction.gotoURL.elements;
		}
	},

	/**
	 * Generate inputs to post params to redirect process
	 *
	 * @param element
	 * @returns {XML}
	 */
	genInputs(element){
		let prop = this.props.elements[element];
		if(prop.type == 'hidden'){
			this.props.simpleRedirect = 0;
			return <input type={prop.type} id={element} name={element} value={prop.value}/>;
		}
	},

	render(){
		if("url" in this.props && "elements" in this.props){

			let params = Object.keys(this.props.elements);

			return (
				<div id="redirectTicket">
					<h2>{translate('REDIRECT', 'You are being redirected')}</h2>
					<form method="POST" id="message" name="message" action={this.props.url}>
						{params.map(this.genInputs)}
					</form>
				</div>
			)
		}
	},

	/**
	 * Execute post action in form
	 */
	componentDidMount(){
		if(this.props.simpleRedirect){
			window.location = this.props.url;
		}else{
			setTimeout(function(){
				document.getElementById("message").submit();
			}, 500);
		}
	}
});

module.exports.RedirectTicket = RedirectTicket;