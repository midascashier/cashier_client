import Cashier from './Cashier';
import { translate } from './Translate'

let limitsMsgs = [];
limitsMsgs[Cashier.M_BELOW_MIN] = translate('M_BELOW_MIN', 'Min.');
limitsMsgs[Cashier.M_ABOVE_MAX] = translate('M_ABOVE_MAX', 'Min.');
limitsMsgs[Cashier.M_AVAILABLE] = "The credit card selected has reached its allowed limit with us. Please select another credit card";
limitsMsgs[Cashier.COUNT_ERROR] = "The credit card selected has reached its maximum number of transactions allowed. Please select another credit card";
export default {
	limitsMsgs: limitsMsgs

}