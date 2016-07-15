import { CashierActions } from '../actions/CashierActions'
import { CustomerService } from '../services/CustomerService'
import { ApplicationService } from './ApplicationService'
import { TransactionService } from './TransactionService'
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
			case actions.PROCESS_P2P_GET_NAME_RESPONSE:
			case actions.PROCESS_CC_RESPONSE:
				TransactionService.processResponse(data);
				break;

			case actions.GET_CREDITCARD_TRANSACTION_RESPONSE:
				TransactionService.creditCardTransactionResponse(data);
				break;

			case actions.ADD_MODIFY_PAYACCOUNT:
				let processorID=data.response.payAccount.processorId;
				TransactionService.getPreviousPayAccount(processorID);
				break;
		}
	};
}

export let onResponseService = new OnResponseService();