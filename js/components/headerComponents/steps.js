import React from 'react'
import {translate} from '../../constants/translate'

let Steps = React.createClass({
	render() {
		return (
			<div id="steps" className="steps">
				<div className="step1 active"><p><span>1</span>{translate('STEPS_DEPOSIT_METHOD')}</p></div>
				<div className="step2 normal"><p><span>2</span>{translate('STEPS_HOW_MUCH')}</p></div>
				<div className="step3 normal"><p><span>3</span>{translate('STEPS_BILLING_INFO')}</p></div>
			</div>
		)
	}
});

module.exports.Steps = Steps;