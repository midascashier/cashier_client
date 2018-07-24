import React from "react"
import {UIService} from "../../services/UIService"
import {translate} from '../../constants/Translate'

let SecurityBlock = React.createClass({
	render(){
		let text = translate('SECURITY_BLOCK_MESSAGE');
		let tittle = translate('SECURITY_BLOCK_TITTLE');
		let processorName = UIService.getProcessorDisplayName();

		return (
			<div id="securityBlock">
				<p id="securityBlocProcessor">{processorName}</p>
				<i id="securityBlockIcon" className="fa fa-lock" aria-hidden="true"/>
				<p id="securityBlockTitle">{tittle}</p>
				<p id="securityBlockText">{text}</p>
			</div>
		)
	}
});

module.exports.SecurityBlock = SecurityBlock;