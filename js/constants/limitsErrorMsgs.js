import Cashier from './Cashier';
import { translate } from './Translate'

let limitsMsgs = [];
limitsMsgs[Cashier.M_BELOW_MIN] = translate('M_BELOW_MIN', 'Min.');
limitsMsgs[Cashier.M_ABOVE_MAX] = translate('M_ABOVE_MAX', 'Min.');
limitsMsgs[Cashier.M_AVAILABLE] = translate('CREDIT_CARD_REACHED');
limitsMsgs[Cashier.COUNT_ERROR] = translate('CC_MAX_TRANSACTION');
export default {
	limitsMsgs: limitsMsgs
}