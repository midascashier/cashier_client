import actions from '../constants/Actions'
import cashier from '../constants/Cashier'
import {onResponseService} from './OnResponseService'
import {CashierStore} from '../stores/CashierStore'

class connectorServices {

	/**
	 * ConnectorServices constructor
	 */
	constructor(){
		this.stop = false
	}

	/**
	 * send message to the backend
	 *
	 * @param action
	 * @param request
	 */
	makeBackendRequest(action, request){
		this.httpService(cashier.BACKEND_WS, action, request)
	};

	/**
	 * send message to the cashier
	 *
	 * @param action
	 * @param request
	 */
	makeCashierRequest(action, request){
		this.httpService(cashier.CASHIER_WS, action, request)
	};

	/**
	 * send message to the customer
	 *
	 * @param action
	 * @param request
	 */
	makeCustomerRequest(action, request){
		this.makeCashierRequest(action, request)
	};

	/**
	 * send message to the process
	 *
	 * @param action
	 * @param request
	 */
	makeProcessRequest(action, request){
		this.makeCashierRequest(action, request)
	};

	/**
	 * send message to the transaction
	 *
	 * @param action
	 * @param request
	 */
	makeTransactionRequest(action, request){
		this.makeCashierRequest(action, request)
	};

	/**
	 * send message to the bonus
	 *
	 * @param action
	 * @param request
	 */
	makeBonusRequest(action, request){
		this.httpService(cashier.BONUS_WS, action, request)
	};

	makeDocsFileSave(request){
		let url = cashier.REQUEST_DOCS_FILE_SAVE_URL;
		let action = actions.DOCS_FILE_SAVE_RESPONSE;
		this.httpSimpleService(url, action, request);
	};

	/**
	 * post service http
	 *
	 * @param module
	 * @param action
	 * @param request
	 */
	httpService(module, action, request){

		let application = CashierStore.getApplication();
		request = Object.assign('', application, request);

		let httpRequest = Object.assign(request, {ws: module});
		let url = cashier.REQUEST_PROXY;

		$.post(url, httpRequest).done(function(response){
			if(response){
				try{
					let dataResponse = JSON.parse(response);
					if(dataResponse && dataResponse.state == 'expired'){
						onResponseService.processResponse(actions.USER_MESSAGE, dataResponse);
					}else{
						if(dataResponse && dataResponse.state != 'ok'){
							onResponseService.processResponse(action, dataResponse);
						}else{
							if(dataResponse && dataResponse.response){
								onResponseService.processResponse(action, dataResponse);
							}else{
								onResponseService.processResponse(action, []);
							}
						}
					}
				}catch(e){
					console.log(e.message);
					console.log(response);
					onResponseService.processResponse(actions.USER_MESSAGE, {userMessage: 'Error processing your request'});
				}

			}else{
				onResponseService.processResponse(actions.USER_MESSAGE, {userMessage: 'Error processing your request'});
			}
		})
	};

	/**
	 * Simple http service
	 *
	 * @param url
	 * @param action
	 * @param request
     */
	httpSimpleService(url, action, request){
		$.post(url, request).done(function(response){
			if(response){
				try{
					let dataResponse = JSON.parse(response);
					if(dataResponse && dataResponse.state == 'expired'){
						onResponseService.processResponse(actions.USER_MESSAGE, dataResponse);
					}else{
						if(dataResponse && dataResponse.state != 'ok'){
							onResponseService.processResponse(action, dataResponse);
						}else{
							if(dataResponse && dataResponse.response){
								onResponseService.processResponse(action, dataResponse);
							}else{
								onResponseService.processResponse(action, []);
							}
						}
					}
				}catch(e){
					console.log(e.message);
					console.log(response);
					onResponseService.processResponse(actions.USER_MESSAGE, {userMessage: 'Error processing your request'});
				}

			}else{
				onResponseService.processResponse(actions.USER_MESSAGE, {userMessage: 'Error processing your request'});
			}
		})
	};
}

export let ConnectorServices = new connectorServices();