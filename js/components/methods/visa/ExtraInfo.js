import React from 'react'
import { Input } from '../../Inputs'
import { UIService } from '../../../services/UIService'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'

let ExtraInfo = React.createClass({

	propTypes: {
		ssn: React.PropTypes.node,
		dobDay: React.PropTypes.node,
		dobYear: React.PropTypes.node,
		dobMonth: React.PropTypes.node,
		changeValue: React.PropTypes.func
	},

	render(){
		let selectDays = [];
		let selectYears = [];
		let selectMonths = [];
		let ssn = this.props.ssn;
		let dobDay = this.props.dobDay;
		let dobYear = this.props.dobYear;
		let dobMonth = this.props.dobMonth;

		selectDays.push(UIService.renderOption({ label: '' }, ''));
		selectYears.push(UIService.renderOption({ label: '' }, ''));
		selectMonths.push(UIService.renderOption({ label: '' }, ''));

		for(let i = 1; i < 32; i++){
			i = ('0' + i).slice(-2);
			selectDays.push(UIService.renderOption({ label: i }, i));
		}

		for(let i = 1; i < 13; i++){
			i = ('0' + i).slice(-2);
			selectMonths.push(UIService.renderOption({ label: i }, i));
		}

		let allowYear = new Date().getFullYear()-17;
		for(let i = 1940; i < allowYear; i++){
			selectYears.push(UIService.renderOption({ label: i }, i));
		}

		return (
			<div id="visaExtraInfo">
				{(() =>{
					let country = CashierStore.getSelectedCountry();
					if(country == 'US'){
						return(
							<div className="form-group">
								<label className="col-sm-4 control-label">{translate('CREDIT_CARD_SSN')}:</label>
								<div className="col-sm-4">
									<Input type="text" name="ssn" id="ssn" ref="ssn" validate="isSSN" maxlength="4" autoComplete="off" onChange={this.props.changeValue.bind(null,'ssn', 'transaction', 0)} value={ssn} require/>
								</div>
							</div>
						)
					}
				})()}

				<div className="form-group">
					<label className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
					<div className="col-sm-2">
						<select className="form-control" id="dobMonth" ref="dobMonth" data-validation='isNumber' name="dobMonth" onChange={this.props.changeValue.bind(null,'dobMonth', 'transaction', 1)} value={dobMonth} data-isRequired>
							{selectMonths}
						</select>
					</div>
					<div className="col-sm-2">
						<select className="form-control" id="dobDay" ref="dobDay" data-validation='isNumber' name="dobDay" onChange={this.props.changeValue.bind(null,'dobDay', 'transaction', 1)} value={dobDay} data-isRequired>
							{selectDays}
						</select>
					</div>
					<div className="col-sm-4">
						<select className="form-control" id="dobYear" ref="dobYear" data-validation='isNumber' name="dobYear" onChange={this.props.changeValue.bind(null,'dobYear', 'transaction', 1)} value={dobYear} data-isRequired>
							{selectYears}
						</select>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.ExtraInfo = ExtraInfo;