import {CashierActions} from '../actions/cashierActions'
import {getCustomerInfo} from '../services/customerService'
import actions from '../constants/actions'


exports.processResponse = (action, data) => {
	switch (action) {
		case actions.LOGIN_RESPONSE:
			CashierActions.login_response(data);
			if (data.response.sid) {
				getCustomerInfo();
			}
			break;
		default:
			console.log(data.state);
	}
};
