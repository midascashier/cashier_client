// IOVATION
var io_install_stm = false;
var io_exclude_stm = 12;
// Network Latency
var io_submit_element_id = "btnlogin"; // Forms Submit Button
var io_max_wait = 30; // If BB is not ready after this, submit
var io_submit_form_id = "alForm";
var ioCompleted = false, atCompleted = false;

//get the blackBox
var io_bb_callback = function(bb, isComplete){
	ioCompleted = isComplete;
	if(isComplete){
		// Element to hold the BlackBox
		ctrlResponse(bb, "iovation");
	}
};