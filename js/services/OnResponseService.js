import { CashierActions } from '../actions/CashierActions'
import { CustomerService } from '../services/CustomerService'
import { ApplicationService } from './ApplicationService'
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
				CustomerService.CustomerProcessorsResponse(data);
				break;

			default:
				console.log(data.state);
		}
	};
}

export let onResponseService = new OnResponseService();