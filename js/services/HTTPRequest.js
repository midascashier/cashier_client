import { onResponseService } from './OnResponseService'
import actions from '../constants/Actions'

class HttpRequest {

	serialize(obj){
		let str = [];
		for(let p in obj)
			if(obj.hasOwnProperty(p) && obj[p]){
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			} else{
				str.push(encodeURIComponent(p) + "=");
			}
		return str.join("&");
	}

	post(parameters){
		this.ajaxRequest(parameters, "POST");
	}

	loginSuccess(result){
		if(result){
			let data = JSON.parse(result);
			onResponseService.processResponse(actions.LOGIN_RESPONSE, data);
		}
	}

	ajaxRequest(parameters, method){

		let URL = "http://poker.new:8080/c.php";
		let requestParameters = this.serialize(parameters);

		$.ajax({
			url: URL,
			type: method,
			data: requestParameters,
			success: this.loginSuccess,
			error(error)
			{
				console.log(error);
			}
		});

	}

}

export let HTTPRequest = new HttpRequest();