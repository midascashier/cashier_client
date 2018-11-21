import React from "react"
import {Link} from 'react-router'
import {UIService} from "../../services/UIService"
import {translate} from '../../constants/Translate'

let ProcessorsNoAvailable = React.createClass({

	/**
	 * redirect to deposit/withdraw
	 */
	switchAction(){
		UIService.switchAction();
	},

	render(){
		const isWithDraw = UIService.getIsWithDraw();
		let title = translate('METHODS_NO_AVAILABLE_DEPOSITS', 'Deposits');
		if(isWithDraw){
			title = translate('METHODS_NO_AVAILABLE_WITHDRAWALS', 'Withdrawals');
		}
		let subTitle = translate('METHODS_NO_AVAILABLE_TITLE', 'Security Block');
		let text = translate('METHODS_NO_AVAILABLE_MESSAGE');

		let switch_button = translate('SWICTH_WITHDRAW', 'Withdraw Instead');
		if(isWithDraw){
			switch_button = translate('SWITCH_DEPOSIT', 'Deposit Instead');
		}

		return (
			<div id="processorsNoAvailable" className="col-sm-12">
				<div className="row">
					<div className="col-sm-6" style={{textAlign: 'left'}}>
						<Link to={`/transaction_history/`}>
							<span>{translate('TRANSACTION_HISTORY')}</span>
						</Link>
					</div>
					<div className="col-sm-6" style={{textAlign: 'right'}}>
						<a onClick={this.switchAction}>{switch_button}</a>
					</div>
				</div>
				<div className="row">
					<div id="securityBlock">
						<p id="securityBlocProcessor">{title}</p>
						<i id="securityBlockIcon" className="fa fa-exclamation-triangle" aria-hidden="true"/>
						<p id="securityBlockTitle">{subTitle}</p>
						<p id="securityBlockText" style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: text}}/>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.ProcessorsNoAvailable = ProcessorsNoAvailable;