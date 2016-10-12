import { CashierActions } from '../actions/CashierActions'
import { CustomerService } from '../services/CustomerService'
import { ApplicationService } from './ApplicationService'
import { TransactionService } from './TransactionService'
import actions from '../constants/Actions'
import Cashier from '../constants/Cashier'

/**
 * this class received all responses from cashier and trigger and action depends of the response
 */
class OnResponseService {
	processResponse(action, data){
		CashierActions.responses(action, data);

		switch(action){
			case actions.CUSTOMER_INFO_RESPONSE:
				CashierActions.setSelectedCountry();
				ApplicationService.getCountryStates();
				break;

			case actions.PROCESSORS_RESPONSE:
				CustomerService.customerProcessorsResponse(data);
				break;

			case actions.PROCESS_RESPONSE:
			case actions.PROCESS_P2P_GET_NAME_RESPONSE:
			case actions.PROCESS_P2P_SUBMIT_RESPONSE:
			case actions.PROCESS_CC_RESPONSE:
				TransactionService.processResponse(data);
				break;

			case actions.GET_CREDITCARD_TRANSACTION_RESPONSE:
				TransactionService.creditCardTransactionResponse(data);
				break;

			case actions.VALIDATE_PAYACCOUNT:
				let processorID = data.response.payAccount.processorIdRoot;
				if (processorID == Cashier.PROCESSOR_ID_ECOPAYZ || processorID == Cashier.PROCESSOR_ID_1TAP){
					let payAccount = {};
					CashierActions.setsPayAccount(data.response.payAccount);
					TransactionService.process({ account: data.response.payAccount.displayName, askAmount: true }, "ticket");
				}else{
					TransactionService.getPreviousPayAccount(processorID);
				}
				break;

			case actions.PAYACCOUNTS_DISABLE_RESPONSE:
				let currentProcessor = TransactionService.getCurrentProcessor();
				TransactionService.getPreviousPayAccount(currentProcessor.processorId);
				break;
		}
	};
}

export let onResponseService = new OnResponseService();