/**
* Created by fede
*/

import Cashier from './Cashier';

const SETTING_NUM_OF_STEPS = 'numOfSteps';
const SETTING_ROUTE = 'route';
const LIMITS_VALIDATION_VERSION = 'validationVersion';

let settings = [];

settings[Cashier.PROCESSOR_ID_NETELLER] = [];
settings[Cashier.PROCESSOR_ID_NETELLER][SETTING_NUM_OF_STEPS] = 2;
settings[Cashier.PROCESSOR_ID_NETELLER][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_NETELLER][SETTING_ROUTE] = 'neteller_new/';

settings[Cashier.PROCESSOR_ID_BITCOIN] = [];
settings[Cashier.PROCESSOR_ID_BITCOIN][SETTING_NUM_OF_STEPS] = 3;
settings[Cashier.PROCESSOR_ID_BITCOIN][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_BITCOIN][SETTING_ROUTE] = 'btcscreen/';

settings[Cashier.PROCESSOR_ID_VISA] = [];
settings[Cashier.PROCESSOR_ID_VISA][SETTING_NUM_OF_STEPS] = 3;
settings[Cashier.PROCESSOR_ID_VISA][SETTING_ROUTE] = 'visa/';

settings[Cashier.PROCESSOR_ID_MONEYGRAM] = [];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][SETTING_NUM_OF_STEPS] = 3;
settings[Cashier.PROCESSOR_ID_MONEYGRAM][SETTING_ROUTE] = 'moneygram/';

export default {
  settings: settings,
  SETTING_NUM_OF_STEPS: SETTING_NUM_OF_STEPS,
  SETTING_ROUTE: SETTING_ROUTE,
  LIMITS_VALIDATION_VERSION: LIMITS_VALIDATION_VERSION
};