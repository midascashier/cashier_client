import {CashierActions} from '../actions/cashierActions'
import {getCustomerInfo} from '../services/customerService'
import {getCountries, getStates} from './applicationService'
import actions from '../constants/actions'

exports.processResponse = (action, data) => {
	switch (action) {
		case actions.LOGIN_RESPONSE:
			if (data) {
				CashierActions.login_response(data);
				if (data.response.sid) {
					getCustomerInfo();
					getCountries();
				}
			}
			break;
		case actions.CUSTOMER_INFO_RESPONSE:
			if (data){
				CashierActions.customerInfo_response(data);
				getStates();
			}
			break;
		case actions.COUNTRIES_RESPONSE:
			if (data){
				CashierActions.countries_response(data);
			}
			break;
		case actions.STATES_RESPONSE:
			if (data){
				CashierActions.states_response(data);
			}
			break;
		default:
			console.log(data.state);
	}
};
