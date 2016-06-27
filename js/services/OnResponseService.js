import {CashierActions} from '../actions/CashierActions'
import {CustomerService} from '../services/CustomerService'
import {ApplicationService} from './ApplicationService'
import actions from '../constants/Actions'


class OnResponseService {

	processResponse(action, data) {

		switch (action) {
			case actions.LOGIN_RESPONSE:
				if (data) {
					CashierActions.login_response(data);
					if (data.response.sid) {
						CustomerService.getCustomerInfo();
						CustomerService.getCustomerProcessors();
						CustomerService.getCustomerTransactions();
						ApplicationService.getCompanyInfo();
						ApplicationService.getCountries();
					}
				}
				break;
			case actions.CUSTOMER_INFO_RESPONSE:
				if (data) {
					CashierActions.customerInfo_response(data);
					ApplicationService.getStates();
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
					CustomerService.getProcessorLimitRules();
					CustomerService.getCustomerProcessorsMinMax();
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
