/**
 * Created by fede
 */

import Cashier from './Cashier';

const SETTING_ROUTE = 'route';
const DEPOSIT_STEPS = 'depositSteps';
const WITHDRAW_STEPS = 'withdrawSteps';
const LIMITS_VALIDATION_VERSION = 'validationVersion';

let settings = [];

settings[0] = [];
settings[0][DEPOSIT_STEPS] = ["selectMethod", "askInfo"];
settings[0][WITHDRAW_STEPS] = ["selectMethod","askInfo", "confirm"];

settings[Cashier.PROCESSOR_ID_NETELLER] = [];
settings[Cashier.PROCESSOR_ID_NETELLER][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_NETELLER][SETTING_ROUTE] = 'neteller_new/';

settings[Cashier.PROCESSOR_ID_BITCOIN] = [];
settings[Cashier.PROCESSOR_ID_BITCOIN][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_BITCOIN][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_BITCOIN][SETTING_ROUTE] = 'btcscreen/';

settings[Cashier.PROCESSOR_ID_VISA] = [];
settings[Cashier.PROCESSOR_ID_VISA][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_VISA][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_VISA][SETTING_ROUTE] = 'visa/';

settings[Cashier.PROCESSOR_ID_MONEYGRAM] = [];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_MONEYGRAM][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][SETTING_ROUTE] = 'moneygram/';

export default {
	settings: settings,
	SETTING_ROUTE: SETTING_ROUTE,
	LIMITS_VALIDATION_VERSION: LIMITS_VALIDATION_VERSION,
	DEPOSIT_STEPS: DEPOSIT_STEPS,
	WITHDRAW_STEPS: WITHDRAW_STEPS
};