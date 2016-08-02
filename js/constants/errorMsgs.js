import Cashier from './Cashier';

let limitsMsgs = [];
limitsMsgs[Cashier.M_BELOW_MIN] = "Please increase the amount and try again";
limitsMsgs[Cashier.M_ABOVE_MAX] = "Please decrease the amount and try again";
limitsMsgs[Cashier.M_AVAILABLE] = "The credit card selected has reached its allowed limit with us. Please select another credit card";
limitsMsgs[Cashier.COUNT_ERROR] = "The credit card selected has reached its maximum number of transactions allowed. Please select another credit card";
export default {
	limitsMsgs: limitsMsgs

}