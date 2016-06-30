import React from 'react'
import {translate} from '../../constants/Translate'
import {Link} from 'react-router'
import {controllerUIService} from '../../services/ControllerService'

let Steps = React.createClass({
	propTypes: {
		step: React.PropTypes.number,
		steps: React.PropTypes.number,
		isWithDraw: React.PropTypes.number
	},

	render() {
		let step1 = "step1";
		let step2 = "step2";
		let step3 = "step3";
		let currentView = "/" + controllerUIService.getCurrentView() + "/";

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

		let steps_method = translate('STEPS_DEPOSIT_METHOD');
		let steps_how_much = translate('STEPS_HOW_MUCH_DEPOSIT');
		if (controllerUIService.getIsWithDraw) {
			steps_method = translate('STEPS_WITHDRAW_METHOD');
			steps_how_much = translate('STEPS_HOW_MUCH_WITHDRAW');
		}

		return (
			<div id="steps" className="steps">
				<Link to={currentView}>
					<div className={step1}>
						<p>
							<span>1</span>
							{steps_method}
						</p>
					</div>
				</Link>
				<div className={step2}>
					<p>
						<span>2</span>
						{steps_how_much}
					</p>

				</div>
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
