import React from 'react'
import {translate} from '../../constants/Translate'
import {Link} from 'react-router'

let Steps = React.createClass({
	propTypes: {
		step: React.PropTypes.number,
		steps: React.PropTypes.number,
		customerAction: React.PropTypes.string,
		clickOnStep: React.PropTypes.func
	},

	/**
	 * this function send step to go to
	 */
	changeStep(step){
		console.log(step);
		//this.props.clickOnStep(step);
	},

	render() {
		let step1 = "step1";
		let step2 = "step2";
		let step3 = "step3";
		let customerAction = "/" + this.props.customerAction + "/";

		switch (this.props.step) {
			case 1:
				step1 += " active";
				step2 += " normal";
				step3 += " normal";
				break;
			case 2:
				step1 += " normal";
				step2 += " active";
				step3 += " inactive";
				break;
			case 3:
				step1 += " normal";
				step2 += " inactive";
				step3 += " active";
				break;
			default:
				break
		}

		return (
			<div id="steps" className="steps">
				<Link to={customerAction}>
					<div className={step1} onClick={this.changeStep(1)}><p><span>1</span>{translate('STEPS_DEPOSIT_METHOD')}</p>
					</div>
				</Link>
				<div className={step2}><p><span>2</span>{translate('STEPS_HOW_MUCH')}</p></div>
				{(() => {
					if (this.props.steps > 2) {
						let thirdStep = <div key="1" className={step3}><p><span>3</span>{translate('STEPS_BILLING_INFO')}</p></div>;
						let thirdStep2 = <div key="2" className={step3} hidden='hidden'><p>
							<span>3</span>{translate('STEPS_INSTRUCTIONS')}</p></div>;
						return ([thirdStep, thirdStep2]);
					}
				})()}
			</div>
		)
	}
});

module.exports.Steps = Steps;
