import assign from 'object-assign'
import {CashierStore} from '../stores/CashierStore'
import {stompConnector} from './StompConnector'

class TransactionService {
	/**
	 * this function sends to process a transaction
	 */
	process() {
		/*let data = {f: "process", companyId: 9};
		let application = CashierStore.getApplication();
		let rabbitRequest = assign(data, loginInfo, application);
		stompConnector.makeTransactionRequest("", rabbitRequest);*/
		console.log("PROCESS TRANSACTION");
	};
}

export let transactionService = new TransactionService();