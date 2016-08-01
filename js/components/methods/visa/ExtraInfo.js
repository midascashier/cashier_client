import React from 'react'
import { translate } from '../../../constants/Translate'
import { Input } from '../../Inputs'

let ExtraInfo = React.createClass({

	propTypes: {
		dobMonth: React.PropTypes.node,
		dobDay: React.PropTypes.node,
		dobYear: React.PropTypes.node,
		ssn: React.PropTypes.node,
		changeValue: React.PropTypes.func
	},

	/**
	 * Return option element to a html select
	 *
	 * @param item
	 * @param key
	 * @returns {XML}
	 */
	renderOption(item, key){
		return (
			<option key={key} value={key}>{item.label}</option>
		)
	},

	render()
	{
		let selectMonths = [];
		let selectYears = [];
		let selectDays = [];
		let dobDay = this.props.dobDay;
		let dobMonth = this.props.dobMonth;
		let dobYear = this.props.dobYear;
		let ssn = this.props.ssn;

		for(let i = 1; i < 32; i++){
			selectDays.push(this.renderOption({ label: i }, i));
		}

		for(let i = 1; i < 13; i++){
			selectMonths.push(this.renderOption({ label: i }, i));
		}

		for(let i = 1970; i < 2016; i++){
			selectYears.push(this.renderOption({ label: i }, i));
		}

		return (
			<div>
				<div className="form-group">
					<label for="" className="control-label">{translate('CREDIT_CARD_SSN')}:</label>
					<Input type="text" name="ssn" id="ssn" require ref="ssn" validate="isNumber"
								 autoComplete="off" onChange={this.props.changeValue.bind(null,'ssn', 0)}
								 value={ssn}/>
				</div>
				<div className="form-group">
					<label className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
					<div className="col-sm-4">
						<select className="form-control" id="dobMonth" ref="dobMonth" name="dobMonth"
										onChange={this.props.changeValue.bind(null,'dobMonth', 1)}
										value={dobMonth}>
							{selectMonths}
						</select>
					</div>
					<div className="col-sm-4">
						<select className="form-control" id="dobDay" ref="dobDay" name="dobDay"
										onChange={this.props.changeValue.bind(null,'dobDay', 1)}
										value={dobDay}>
							{selectDays}
						</select>
					</div>
					<div className="col-sm-4">
						<select className="form-control" id="dobYear" ref="dobYear" name="dobYear"
										onChange={this.props.changeValue.bind(null,'dobYear', 1)}
										value={dobYear}>
							{selectYears}
						</select>
					</div>
				</div>
			</div>)
	}
});

module.exports.ExtraInfo = ExtraInfo;