import React from 'react'
import { translate } from '../../../constants/Translate'
import { Input } from '../../Inputs'
import { UIService } from '../../../services/UIService'

let ExtraInfo = React.createClass({

	propTypes: {
		dobMonth: React.PropTypes.node,
		dobDay: React.PropTypes.node,
		dobYear: React.PropTypes.node,
		ssn: React.PropTypes.node,
		changeValue: React.PropTypes.func
	},

	render(){
		let selectMonths = [];
		let selectYears = [];
		let selectDays = [];
		let dobDay = this.props.dobDay;
		let dobMonth = this.props.dobMonth;
		let dobYear = this.props.dobYear;
		let ssn = this.props.ssn;

		for(let i = 1; i < 32; i++){
			selectDays.push(UIService.renderOption({ label: i }, i));
		}

		for(let i = 1; i < 13; i++){
			selectMonths.push(UIService.renderOption({ label: i }, i));
		}
		let allowYear = new Date().getFullYear()-17;
		for(let i = 1940; i < allowYear; i++){
			selectYears.push(UIService.renderOption({ label: i }, i));
		}

		return (
			<div id="visaExtraInfo">
				
				<div className="form-group">
					<label className="col-sm-4 control-label">{translate('CREDIT_CARD_SSN')}:</label>
					<div className="col-sm-8">
						<Input type="text" name="ssn" id="ssn" require ref="ssn" validate="isNumber" maxlength="4" autoComplete="off" onChange={this.props.changeValue.bind(null,'ssn', 'transaction', 0)} value={ssn}/>
					</div>
				</div>
				
				<div className="form-group">
					<label className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
					<div className="col-sm-2">
						<select className="form-control" id="dobMonth" ref="dobMonth" name="dobMonth" onChange={this.props.changeValue.bind(null,'dobMonth', 'transaction', 1)} value={dobMonth}>
							{selectMonths}
						</select>
					</div>
					<div className="col-sm-2">
						<select className="form-control" id="dobDay" ref="dobDay" name="dobDay" onChange={this.props.changeValue.bind(null,'dobDay', 'transaction', 1)} value={dobDay}>
							{selectDays}
						</select>
					</div>
					<div className="col-sm-4">
						<select className="form-control" id="dobYear" ref="dobYear" name="dobYear" onChange={this.props.changeValue.bind(null,'dobYear', 'transaction', 1)} value={dobYear}>
							{selectYears}
						</select>
					</div>
				</div>
				
			</div>
		)
	}
});

module.exports.ExtraInfo = ExtraInfo;