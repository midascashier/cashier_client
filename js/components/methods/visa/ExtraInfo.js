import React from 'react'
import cashier from '../../../constants/Cashier'
import {Input} from '../../commonComponents/Inputs'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'
import {CashierStore} from '../../../stores/CashierStore'

let ExtraInfo = React.createClass({

	propTypes: {
		ssn: React.PropTypes.node,
		dobDay: React.PropTypes.node,
		dobYear: React.PropTypes.node,
		country: React.PropTypes.node,
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
		let allowYear = new Date().getFullYear()-17;

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
		for(let i = 1940; i < allowYear; i++){
			selectYears.push(UIService.renderOption({ label: i }, i));
		}

		return(
			<div id="visaExtraInfo">
				{(() =>{
					let country = this.props.country;
					if(!country){
						country = CashierStore.getSelectedCountry();
					}

					if(country == cashier.USA_COUNTRY_CODE){
						return(
							<div className="form-group">
								<label className="col-sm-4 control-label">{translate('CREDIT_CARD_SSN')}:</label>
								<div className="col-sm-4">
									<Input
										id="ssn"
										ref="ssn"
										name="ssn"
										type="text"
										value={ssn}
										maxlength="4"
										validate="isSSN"
										autoComplete="off"
										onChange={this.props.changeValue.bind(null,'ssn', 'transaction', 0)}
										require
									/>
								</div>
							</div>
						)
					}
				})()}

				<div className="form-group">
					<label className="col-sm-4 control-label">{translate('CREDIT_CARD_DOB')}:</label>
					<div className="col-sm-2">
						<select
							id="dobMonth"
							ref="dobMonth"
							name="dobMonth"
							value={dobMonth}
							className="form-control"
							data-validation='isNumber'
							onChange={this.props.changeValue.bind(null,'dobMonth', 'transaction', 1)}
							data-isRequired
						>
							{selectMonths}
						</select>
					</div>
					<div className="col-sm-2">
						<select
							id="dobDay"
							ref="dobDay"
							name="dobDay"
							value={dobDay}
							data-isRequired
							className="form-control"
							data-validation='isNumber'
							onChange={this.props.changeValue.bind(null,'dobDay', 'transaction', 1)}
						>
							{selectDays}
						</select>
					</div>
					<div className="col-sm-4">
						<select
							id="dobYear"
							ref="dobYear"
							name="dobYear"
							value={dobYear}
							data-isRequired
							className="form-control"
							data-validation='isNumber'
							onChange={this.props.changeValue.bind(null,'dobYear', 'transaction', 1)}
						>
							{selectYears}
						</select>
					</div>
				</div>
			</div>
		)
	}
});

module.exports.ExtraInfo = ExtraInfo;