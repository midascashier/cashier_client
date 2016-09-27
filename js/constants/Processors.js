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

settings[Cashier.PROCESSOR_ID_MC] = [];
settings[Cashier.PROCESSOR_ID_MC][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_MC][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_MC][SETTING_ROUTE] = 'mastercard/';

settings[Cashier.PROCESSOR_ID_MONEYGRAM] = [];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_MONEYGRAM][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][SETTING_ROUTE] = 'moneygram/';


settings[Cashier.PROCESSOR_ID_WU] = [];
settings[Cashier.PROCESSOR_ID_WU][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_WU][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_WU][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_WU][SETTING_ROUTE] = 'westernunion/';

settings[Cashier.PROCESSOR_ID_BILLPAY] = [];
settings[Cashier.PROCESSOR_ID_BILLPAY][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_BILLPAY][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_BILLPAY][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_BILLPAY][SETTING_ROUTE] = 'billpay/';

settings[Cashier.PROCESSOR_ID_RIA] = [];
settings[Cashier.PROCESSOR_ID_RIA][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_RIA][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_RIA][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_RIA][SETTING_ROUTE] = 'ria/';

export default {
	settings: settings,
	SETTING_ROUTE: SETTING_ROUTE,
	LIMITS_VALIDATION_VERSION: LIMITS_VALIDATION_VERSION,
	DEPOSIT_STEPS: DEPOSIT_STEPS,
	WITHDRAW_STEPS: WITHDRAW_STEPS
};