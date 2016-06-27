import {CashierActions} from '../actions/CashierActions'
import {customerService} from '../services/CustomerService'
import {applicationService} from './ApplicationService'
import actions from '../constants/Actions'


class OnResponseService {

	processResponse(action, data) {

		switch (action) {
			case actions.LOGIN_RESPONSE:
				if (data) {
					CashierActions.login_response(data);
					if (data.response.sid) {
						customerService.getCustomerInfo();
						customerService.getCustomerProcessors();
						customerService.getCustomerTransactions();
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
			case actions.CUSTOMER_TRANSACTIONS_RESPONSE:
				if (data) {
					CashierActions.getCustomerTransactions_response(data);
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
					customerService.getProcessorLimitRules();
					customerService.getCustomerProcessorsMinMax();
				}
				break;
			case actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE:
				if (data) {
					CashierActions.getCustomerPreviousPayAccount_response(data);
				}
				break;
			case actions.PAYACCOUNTS_DISABLE_RESPONSE:
				if (data) {
					CashierActions.getDisablePayAccount_response(data);
				}
				break;
			case actions.PROCESSORS_LIMIT_RULES_RESPONSE:
				if (data) {
					CashierActions.getProcessorLimitRules_response(data);
				}
				break;
			case actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE:
				if (data) {
					CashierActions.getProcessorMinMaxLimits_response(data);
				}
				break;
			default:
				console.log(data.state);
		}
	};
}

export let onResponseService = new OnResponseService();
