import {CashierActions} from '../actions/cashierActions'
import {getCustomerInfo, getCustomerProcessors} from '../services/customerService'
import {getCountries} from './applicationService'
import actions from '../constants/actions'

exports.processResponse = (action, data) => {
	switch (action) {
		case actions.LOGIN_RESPONSE:
			if (data) {
				CashierActions.login_response(data);
				if (data.response.sid) {
					getCustomerInfo();
					getCustomerProcessors();
					getCountries();
				}
			}
			break;
		case actions.CUSTOMER_INFO_RESPONSE:
			if (data){
				CashierActions.customerInfo_response(data);
			}
			break;
		case actions.COUNTRIES_RESPONSE:
			if (data){
				CashierActions.countries_response(data);
			}
			break;
    case actions.PROCESSORS_RESPONSE:
      if (data){
        CashierActions.getCustomerProcessors_response(data);
      }
      break;
		default:
			console.log(data.state);
	}
};
