import React from 'react'
import { Input } from '../../Inputs'
import { translate } from '../../../constants/Translate'
import { CashierStore } from '../../../stores/CashierStore'

let BillingInformationForm = React.createClass({
	propTypes: {
		renderOption: React.PropTypes.func,
		changeValue: React.PropTypes.func,
		selectedCountry: React.PropTypes.string,
		selectedState: React.PropTypes.string,
		firstName: React.PropTypes.string,
		lastName: React.PropTypes.string,
		city: React.PropTypes.string,
		address1: React.PropTypes.string,
		zip: React.PropTypes.string,
		email: React.PropTypes.string,
		phone: React.PropTypes.string
	},


	render()
	{
		let UI = CashierStore.getUI();
		let countries = UI.countries;
		let states = UI.countryStates;

		let countryOptionNodes = [];
		for(let i = 0; i < countries.length; i++){
			countryOptionNodes.push(this.props.renderOption({ label: countries[i]['Name'] }, countries[i]['Small']));
		}

		let stateOptionNodes = [];
		for(let i = 0; i < states.length; i++){
			stateOptionNodes.push(this.props.renderOption({ label: states[i]['Name'] }, states[i]['Small']));
		}

		return (
			<div>
				<div className="form-group">
					<label for="" className="control-label">First Name:</label>
					<Input type="text" id="firstName" onChange={this.props.changeValue.bind(null, 'firstName', 0)} value={this.props.firstName}/>
				</div>
				<div className="form-group">
					<label for="" className="control-label">Last Name:</label>
					<Input type="text" id="lastName" onChange={this.props.changeValue.bind(null, 'lastName', 0)} value={this.props.lastName}/>
				</div>
				<div className="form-group">
					<div className="row">
						<div className="col-sm-6">
							<div className="form-group">
								<label for="" className="control-label">{translate('CREDIT_COUNTRY', 'Country')}:</label>
								<select className="form-control" id="country" value={this.props.selectedCountry}
												onChange={this.props.changeValue.bind(null, 'country',1)}>
									{countryOptionNodes}
								</select>
							</div>
						</div>
						<div className="col-sm-6">
							<label for="" className="control-label">{translate('CREDIT_STATE', 'State')}:</label>
							<select className="form-control" id="countryState" value={this.props.selectedState}
											onChange={this.props.changeValue.bind(null, 'state',1)}>
								{stateOptionNodes}
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label for="" className="control-label">City / Town:</label>
					<Input type="text" id="city" onChange={this.props.changeValue.bind(null, 'city', 0)} value={this.props.city}/>
				</div>
				<div className="form-group">
					<label for="" className="control-label">Address:</label>
					<Input type="text" id="address" onChange={this.props.changeValue.bind(null, 'address1', 0)} value={this.props.address1}/>
				</div>
				<div className="form-group">
					<label for="" className="control-label">ZIP / Postal Code:</label>
					<Input type="text" id="zip" onChange={this.props.changeValue.bind(null, 'zip', 0)} value={this.props.zip}/>
				</div>
				<div className="form-group">
					<label for="" className="control-label">Email Address:</label>
					<Input type="text" id="email" onChange={this.props.changeValue.bind(null, 'email', 0)} value={this.props.email}/>
				</div>
				<div className="form-group">
					<label for="" className="control-label">Phone:</label>
					<Input type="text" id="phone" onChange={this.props.changeValue.bind(null, 'phone', 0)} value={this.props.phone}/>
				</div>
			</div>
		)
	}
});

module.exports.BillingInformationForm = BillingInformationForm;