import { CashierActions } from '../actions/CashierActions'
import { customerService } from '../services/CustomerService'
import { applicationService } from './ApplicationService'
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
				customerService.customerLoginResponse();
				break;

			case actions.CUSTOMER_INFO_RESPONSE:
				applicationService.getStates();
				break;

			case actions.PROCESSORS_RESPONSE:
				customerService.CustomerProcessorsResponse(data);
				break;

			default:
				console.log(data.state);
		}
	};
}

export let onResponseService = new OnResponseService();
