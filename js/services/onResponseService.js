import {CashierActions} from '../actions/cashierActions'
import {customerService} from '../services/customerService'
import {applicationService} from './applicationService'
import actions from '../constants/actions'


class OnResponseService {
	
	processResponse(action, data) {

		switch (action) {
			case actions.LOGIN_RESPONSE:
				if (data) {
					CashierActions.login_response(data);
					if (data.response.sid) {
						customerService.getCustomerInfo();
						customerService.getCustomerProcessors();
						applicationService.getCompanyInfo();
						applicationService.getCountries();
					}
				}
				break;
			case actions.CUSTOMER_INFO_RESPONSE:
				if (data) {
					CashierActions.customerInfo_response(data);
					applicationService.getStates();
				}
				break;
			case actions.COMPANY_INFO_RESPONSE:
				if (data) {
					CashierActions.companyInfo_response(data);
				}
				break;
			case actions.COUNTRIES_RESPONSE:
				if (data) {
					CashierActions.countries_response(data);
				}
				break;
			case actions.STATES_RESPONSE:
				if (data) {
					CashierActions.states_response(data);
				}
				break;
			case actions.PROCESSORS_RESPONSE:
				if (data) {
					CashierActions.getCustomerProcessors_response(data);
          customerService.getCustomerPreviousPayAccount();
				}
				break;
			case actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE:
				if (data) {
					CashierActions.getCustomerPreviousPayAccount_response(data);
				}
				break;
			default:
				console.log(data.state);
		}
	};
}

export let onResponseService = new OnResponseService();