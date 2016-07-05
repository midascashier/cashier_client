import assign from 'object-assign'
import { CashierStore } from '../stores/CashierStore'
import { stompConnector } from './StompConnector'

class TransactionService {
	/**
	 * this function sends to process a transaction
	 */
	process(dynamicParams){
		let application = CashierStore.getApplication();
		let customerInfo = CashierStore.getCustomer();
		let transaction = CashierStore.getTransaction();
		let processorSelected = CashierStore.getProcessor();
		let payAccountSelected = CashierStore.getCurrentPayAccount();
		let action = "d";
		let isDefer = 0;
		if(CashierStore.getIsWithdraw()){
			action = "w";
			isDefer = 1;
		}
		let rabbitRequest = {
			f: "process",
			companyId: customerInfo.companyId,
			username: customerInfo.username,
			password: customerInfo.password,
			remoteAddr: application.remoteAddr,
			remoteHost: application.remoteHost,
			referrer: application.referrer,
			xForwardedFor: application.xForwardedFor,
			lang: application.lang,
			platform: application.platform,
			userAgent: application.userAgent,
			createdBy: customerInfo.customerId,
			type: action,
			isDefer: isDefer,
			processorId: processorSelected.processorId,
			amount: transaction.amount,
			payAccountId: payAccountSelected.payAccountId,
			sys_access_pass: application.sys_access_pass,
			sid: application.sid,
			dynamicParams: dynamicParams
		};

		stompConnector.makeProcessRequest("", rabbitRequest);
	};
}

export let transactionService = new TransactionService();