import {CashierActions} from '../actions/CashierActions'
import {customerService} from '../services/CustomerService'
import {applicationService} from './ApplicationService'
import actions from '../constants/Actions'
import RouterContainer from './RouterContainer'
import {CashierStore} from '../stores/CashierStore'

/** this class received all responses from cashier and trigger and action depends of the response
 *
 */
class OnResponseService {
	processResponse(action, data) {
		switch (action) {
			case actions.LOGIN_RESPONSE:
				if (data) {
					CashierActions.login_response(data);
					if (data.response.sid) {
						let customerAction = "deposit";
						if (CashierStore.getIsWithdraw()) {
							customerAction = "withdraw";
						}
						CashierStore.setCurrentStep(1);
						CashierStore.setCurrentView(customerAction);
						RouterContainer.get().props.history.push("/"+customerAction+"/");
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
					let customerOption = "deposit";
					if (CashierStore.isWithDraw) {
						return "withdraw";
					}
					let processorID = data.response.processors[customerOption][0].caProcessor_Id;
					if (processorID) {
						let currentProcessor = CashierStore.getProcessor();
						if (!currentProcessor.processorId) {
								customerService.changeMethod(processorID);
						}
						else{
							customerService.getProcessorLimitRules(processorID);
							customerService.getCustomerProcessorsMinMax(processorID);
						}
						CashierActions.getCustomerProcessors_response(data);

					}
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

			case actions.PROCESS_RESPONSE:
				if (data.userMessage) {
					if (data.state=="error") {
						let currentProcessor=CashierStore.getProcessor();
						RouterContainer.get().props.history.push("/deposit/"+currentProcessor.displayName.toLowerCase()+"/ticket/rejected");
					}
					CashierActions.processResponse(data);
				}
				else {
					console.log(data);
				}
				break;
			default:
				console.log(data.state);
		}
	};
}

export let onResponseService = new OnResponseService();
