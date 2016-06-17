import React from 'react'
import {translate} from '../../constants/translate'

let Steps = React.createClass({
	propTypes: {
		step: React.PropTypes.number
	},

	render() {
		let step1="";
		switch (this.props.step){
			case 1:
				step1="step1 active";
				break;
			default:
				break
		}
		return (
			<div id="steps" className="steps">
				<div className={step1}><p><span>1</span>{translate('STEPS_DEPOSIT_METHOD')}</p></div>
				<div className="step2 normal"><p><span>2</span>{translate('STEPS_HOW_MUCH')}</p></div>
				<div className="step3 normal"><p><span>3</span>{translate('STEPS_BILLING_INFO')}</p></div>
				<div className="step3 normal" hidden="hidden"><p><span>3</span>{translate('STEPS_INSTRUCTIONS')}</p></div>
			</div>
		)
	}
});

module.exports.Steps = Steps;