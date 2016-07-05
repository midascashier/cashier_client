/**
* Created by fede
*/

import Cashier from './Cashier';

const SETTING_NUM_OF_STEPS = 'numOfSteps';
const SETTING_ROUTE = 'route';

let settings = [];

settings[Cashier.PROCESSOR_ID_NETELLER] = [];
settings[Cashier.PROCESSOR_ID_NETELLER][SETTING_NUM_OF_STEPS] = 2;
settings[Cashier.PROCESSOR_ID_NETELLER][SETTING_ROUTE] = 'neteller/';

settings[Cashier.PROCESSOR_ID_BITCOIN] = [];
settings[Cashier.PROCESSOR_ID_BITCOIN][SETTING_NUM_OF_STEPS] = 3;
settings[Cashier.PROCESSOR_ID_BITCOIN][SETTING_ROUTE] = 'bitcoin/';

export default {
  settings: settings,
  SETTING_NUM_OF_STEPS: SETTING_NUM_OF_STEPS,
  SETTING_ROUTE: SETTING_ROUTE
};