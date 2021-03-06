import {UIService} from "./UIService";
import actions from '../constants/Actions'
import Cashier from '../constants/Cashier'
import {ApplicationService} from './ApplicationService'
import {TransactionService} from './TransactionService'
import {CashierActions} from '../actions/CashierActions'
import {CustomerService} from '../services/CustomerService'

/**
 * this class received all responses from cashier and trigger and action depends of the response
 */
class OnResponseService {
	processResponse(action, data){

		CashierActions.responses(action, data);
		CashierActions.showUserMessage(data.userMessage);

		switch(action){
			case actions.CUSTOMER_INFO_RESPONSE:
				CashierActions.setSelectedCountry();
				ApplicationService.getCountryStates();
				CustomerService.getPendingMTCNTransactions();
				ApplicationService.getCurrency(data.response.customerInfo.currency);
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
				if(data.response && data.response.payAccount){
					let processorID = data.response.payAccount.processorIdRoot;
					if(processorID == Cashier.PROCESSOR_ID_1TAP){
						CashierActions.setsPayAccount(data.response.payAccount);
						TransactionService.process({account: data.response.payAccount.displayName, askAmount: true}, "ticket");
					}else{
						TransactionService.getPreviousPayAccount(processorID);
					}

					if(data.response.isAllowed === "0"){
						UIService.changeUIState('/' + UIService.getCurrentView() + '/' + UIService.getProcessorName().toLowerCase() + '/securityBlock/');
					}
				}
				break;

			case actions.PAYACCOUNTS_DISABLE_RESPONSE:
				let currentProcessor = TransactionService.getCurrentProcessor();
				TransactionService.getPreviousPayAccount(currentProcessor.processorId);
				break;

			case actions.CUSTOMER_TRANSACTIONS_RESPONSE:
				TransactionService.getPendingPayout();
				break;

			case actions.CHANGE_STATUS_RESPONSE:
				CustomerService.getCustomerTransactions();
				break;
		}
	};
}

export let onResponseService = new OnResponseService();