import {CashierActions} from '../actions/cashierActions'
import {getCustomerInfo} from '../services/customerService'
import {getCountries} from './applicationService'
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
			}
			break;
		default:
			console.log(data.state);
	}
};
