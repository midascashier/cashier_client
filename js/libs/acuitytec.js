// ACUITYTEC
var at_max_wait = 30;
var atCompleted = false;
function receiveData(data){
	ctrlResponse(data, "acuitytec");
	atCompleted = true;
}
requestData();

// Get Ids
var dateATInit = new Date();
var checkTimeOut = setInterval(function(){
	var now = new Date();
	var time = now.getTime() - dateATInit.getTime();

	if((atCompleted || time >= at_max_wait)){
		clearInterval(checkTimeOut);
	}
}, 100);