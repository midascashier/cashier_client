import { CashierActions } from '../actions/CashierActions'
import { customerService } from '../services/CustomerService'
import { applicationService } from './ApplicationService'
import actions from '../constants/Actions'

/**
 * this class received all responses from cashier and trigger and action depends of the response
 */
class OnResponseService {
	processResponse(action, data){
			switch(action){
				case actions.LOGIN_RESPONSE:
					data.application = loginInfo;
					CashierActions.login_response(data);
					customerService.customerLoginResponse();
					break;

				case actions.CUSTOMER_INFO_RESPONSE:
					CashierActions.customerInfo_response(data);
					applicationService.getStates();
					break;

				case actions.COMPANY_INFO_RESPONSE:
					CashierActions.companyInfo_response(data);
					break;

				case actions.CUSTOMER_TRANSACTIONS_RESPONSE:
					CashierActions.getCustomerTransactions_response(data);
					break;

				case actions.COUNTRIES_RESPONSE:
					CashierActions.countries_response(data);
					break;

				case actions.STATES_RESPONSE:
					CashierActions.states_response(data);
					break;

				case actions.PROCESSORS_RESPONSE:
					CashierActions.getCustomerProcessors_response(data);
					customerService.CustomerProcessorsResponse(data);
					break;

				case actions.PAYACCOUNTS_BY_PROCESSOR_RESPONSE:
					CashierActions.getCustomerPreviousPayAccount_response(data);
					break;

				case actions.PAYACCOUNTS_DISABLE_RESPONSE:
					CashierActions.getDisablePayAccount_response(data);
					break;

				case actions.PROCESSORS_LIMIT_RULES_RESPONSE:
					CashierActions.getProcessorLimitRules_response(data);
					break;

				case actions.PROCESSORS_LIMIT_MIN_MAX_RESPONSE:
					CashierActions.getProcessorMinMaxLimits_response(data);
					break;

				case actions.PROCESS_RESPONSE:
					if(data.response || data.state){
						CashierActions.processResponse(data);
					} else{
						console.log(data);
					}
					break;

				default:
					console.log(data.state);
			}
	};
}

export let onResponseService = new OnResponseService();
