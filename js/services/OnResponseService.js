import { CashierActions } from '../actions/CashierActions'
import { CustomerService } from '../services/CustomerService'
import { ApplicationService } from './ApplicationService'
import { UIService } from './UIService'
import actions from '../constants/Actions'

/**
 * this class received all responses from cashier and trigger and action depends of the response
 */
class OnResponseService {
	processResponse(action, data){

		if(action == actions.LOGIN_RESPONSE){
			data.application = loginInfo;
		}

		CashierActions.responses(action, data);

		switch(action){
			case actions.LOGIN_RESPONSE:
				CustomerService.loginResponse();
				break;

			case actions.CUSTOMER_INFO_RESPONSE:
				ApplicationService.getStates();
				break;

			case actions.PROCESSORS_RESPONSE:
				CustomerService.customerProcessorsResponse(data);
				break;

			case actions.PROCESS_RESPONSE:
				CustomerService.getCustomerTransaction();
				break;

			case actions.CUSTOMER_TRANSACTION_RESPONSE:
				UIService.processResponse(data);
				break;

			default:
				console.log(data.state);
		}
	};
}

export let onResponseService = new OnResponseService();