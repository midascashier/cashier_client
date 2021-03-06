/**
 * Created by fede
 */

import Cashier from './Cashier';

const SETTING_ROUTE = 'route';
const DEPOSIT_STEPS = 'depositSteps';
const WITHDRAW_STEPS = 'withdrawSteps';
const LIMITS_VALIDATION_VERSION = 'validationVersion';
const REGISTER_ACCOUNTS_ALLOW = 'registerAccountsAllow';

let settings = [];

settings[0] = [];
settings[0][DEPOSIT_STEPS] = ["selectMethod", "askInfo"];
settings[0][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];

settings[Cashier.PROCESSOR_ID_NETELLER] = [];
settings[Cashier.PROCESSOR_ID_NETELLER][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_NETELLER][SETTING_ROUTE] = 'neteller_new/';
settings[Cashier.PROCESSOR_ID_NETELLER][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_SKRILL] = [];
settings[Cashier.PROCESSOR_ID_SKRILL][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_SKRILL][SETTING_ROUTE] = 'skrill_ew/';
settings[Cashier.PROCESSOR_ID_SKRILL][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_ECOPAYZ] = [];
settings[Cashier.PROCESSOR_ID_ECOPAYZ][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_ECOPAYZ][DEPOSIT_STEPS] = ["selectMethod", "askInfo"];
settings[Cashier.PROCESSOR_ID_ECOPAYZ][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_ECOPAYZ][SETTING_ROUTE] = 'crd3co/';
settings[Cashier.PROCESSOR_ID_ECOPAYZ][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_1TAP] = [];
settings[Cashier.PROCESSOR_ID_1TAP][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_1TAP][SETTING_ROUTE] = 'skrill_1tap/';
settings[Cashier.PROCESSOR_ID_1TAP][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_BITCOIN] = [];
settings[Cashier.PROCESSOR_ID_BITCOIN][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_BITCOIN][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_BITCOIN][SETTING_ROUTE] = 'bitcoin/';
settings[Cashier.PROCESSOR_ID_BITCOIN][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_VISA] = [];
settings[Cashier.PROCESSOR_ID_VISA][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_VISA][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_VISA][SETTING_ROUTE] = 'visa/';
settings[Cashier.PROCESSOR_ID_VISA][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_ASTROPAY] = [];
settings[Cashier.PROCESSOR_ID_ASTROPAY][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_ASTROPAY][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_ASTROPAY][SETTING_ROUTE] = 'pp_apcc/';
settings[Cashier.PROCESSOR_ID_ASTROPAY][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_MC] = [];
settings[Cashier.PROCESSOR_ID_MC][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_MC][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_MC][SETTING_ROUTE] = 'mastercard/';
settings[Cashier.PROCESSOR_ID_MC][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_AMEX] = [];
settings[Cashier.PROCESSOR_ID_AMEX][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_AMEX][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_AMEX][SETTING_ROUTE] = 'amex/';
settings[Cashier.PROCESSOR_ID_AMEX][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_JCB] = [];
settings[Cashier.PROCESSOR_ID_JCB][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_JCB][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_JCB][SETTING_ROUTE] = 'jcb/';
settings[Cashier.PROCESSOR_ID_JCB][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_DISCOVER] = [];
settings[Cashier.PROCESSOR_ID_DISCOVER][LIMITS_VALIDATION_VERSION] = "full";
settings[Cashier.PROCESSOR_ID_DISCOVER][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_DISCOVER][SETTING_ROUTE] = 'discover/';
settings[Cashier.PROCESSOR_ID_DISCOVER][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_P2C] = []
settings[Cashier.PROCESSOR_ID_P2C][LIMITS_VALIDATION_VERSION] = 'full'
settings[Cashier.PROCESSOR_ID_P2C][DEPOSIT_STEPS] = ['selectMethod', 'askInfo', 'confirm']
settings[Cashier.PROCESSOR_ID_P2C][SETTING_ROUTE] = 'paytocard/'
settings[Cashier.PROCESSOR_ID_P2C][REGISTER_ACCOUNTS_ALLOW] = 1

settings[Cashier.PROCESSOR_ID_MONEYGRAM] = [];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_MONEYGRAM][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_MONEYGRAM][SETTING_ROUTE] = 'moneygram/';
settings[Cashier.PROCESSOR_ID_MONEYGRAM][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_WU] = [];
settings[Cashier.PROCESSOR_ID_WU][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_WU][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_WU][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_WU][SETTING_ROUTE] = 'westernunion/';
settings[Cashier.PROCESSOR_ID_WU][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_BILLPAY] = [];
settings[Cashier.PROCESSOR_ID_BILLPAY][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_BILLPAY][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_BILLPAY][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_BILLPAY][SETTING_ROUTE] = 'billpay/';
settings[Cashier.PROCESSOR_ID_BILLPAY][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_RIA] = [];
settings[Cashier.PROCESSOR_ID_RIA][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_RIA][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_RIA][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_RIA][SETTING_ROUTE] = 'ria/';
settings[Cashier.PROCESSOR_ID_RIA][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_GENCK] = [];
settings[Cashier.PROCESSOR_ID_GENCK][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_GENCK][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_GENCK][SETTING_ROUTE] = 'genck/';
settings[Cashier.PROCESSOR_ID_GENCK][REGISTER_ACCOUNTS_ALLOW] = 1;

settings[Cashier.PROCESSOR_ID_DEBITCARD] = [];
settings[Cashier.PROCESSOR_ID_DEBITCARD][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_DEBITCARD][WITHDRAW_STEPS] = ["selectMethod", "askInfo"];
settings[Cashier.PROCESSOR_ID_DEBITCARD][SETTING_ROUTE] = 'debitcards/';
settings[Cashier.PROCESSOR_ID_DEBITCARD][REGISTER_ACCOUNTS_ALLOW] = 0;

settings[Cashier.PROCESSOR_ID_CRYPTO_TRANSFER] = [];
settings[Cashier.PROCESSOR_ID_CRYPTO_TRANSFER][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_CRYPTO_TRANSFER][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_CRYPTO_TRANSFER][WITHDRAW_STEPS] = ["selectMethod", "askInfo"];
settings[Cashier.PROCESSOR_ID_CRYPTO_TRANSFER][SETTING_ROUTE] = 'btc_crypto_transfer/';
settings[Cashier.PROCESSOR_ID_CRYPTO_TRANSFER][REGISTER_ACCOUNTS_ALLOW] = 0;

settings[Cashier.PROCESSOR_ID_CRYPTOScreen] = [];
settings[Cashier.PROCESSOR_ID_CRYPTOScreen][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_CRYPTOScreen][DEPOSIT_STEPS] = ["selectMethod", "askInfo", "instructions"];
settings[Cashier.PROCESSOR_ID_CRYPTOScreen][WITHDRAW_STEPS] = ["selectMethod", "askInfo"];
settings[Cashier.PROCESSOR_ID_CRYPTOScreen][SETTING_ROUTE] = 'cryptoscreen/';
settings[Cashier.PROCESSOR_ID_CRYPTOScreen][REGISTER_ACCOUNTS_ALLOW] = 0;

settings[Cashier.PROCESSOR_ID_AGENT_TRANSFER] = [];
settings[Cashier.PROCESSOR_ID_AGENT_TRANSFER][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_AGENT_TRANSFER][WITHDRAW_STEPS] = ["selectMethod", "askInfo", "confirm"];
settings[Cashier.PROCESSOR_ID_AGENT_TRANSFER][SETTING_ROUTE] = 'player2agent/';
settings[Cashier.PROCESSOR_ID_AGENT_TRANSFER][REGISTER_ACCOUNTS_ALLOW] = 0;

settings[Cashier.PROCESSOR_ID_CCECOMMPAY] = [];
settings[Cashier.PROCESSOR_ID_CCECOMMPAY][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_CCECOMMPAY][DEPOSIT_STEPS] = ["selectMethod", "askInfo"];
settings[Cashier.PROCESSOR_ID_CCECOMMPAY][SETTING_ROUTE] = 'cc_ecommpay/';
settings[Cashier.PROCESSOR_ID_CCECOMMPAY][REGISTER_ACCOUNTS_ALLOW] = 0;

settings[Cashier.PROCESSOR_ID_WMECOMMPAY] = [];
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][LIMITS_VALIDATION_VERSION] = "lite";
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][DEPOSIT_STEPS] = ["selectMethod", "askInfo"];
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][SETTING_ROUTE] = 'wm_ecommpay/';
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][REGISTER_ACCOUNTS_ALLOW] = 0;

settings[Cashier.PROCESSOR_ID_WMECOMMPAY] = []
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][LIMITS_VALIDATION_VERSION] = 'lite'
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][DEPOSIT_STEPS] = ['selectMethod', 'askInfo']
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][SETTING_ROUTE] = 'wm_ecommpay/'
settings[Cashier.PROCESSOR_ID_WMECOMMPAY][REGISTER_ACCOUNTS_ALLOW] = 0

settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT] = []
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT][LIMITS_VALIDATION_VERSION] = 'lite'
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT][DEPOSIT_STEPS] = ['selectMethod']
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT][SETTING_ROUTE] = 'deposit_text/'
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT][REGISTER_ACCOUNTS_ALLOW] = 0
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT_BANK_TRANSFER] = settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT]
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT_BANK_TRANSFER][SETTING_ROUTE] = 'bank_transfer/'
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT_CASH_AGENTS] = settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT]
settings[Cashier.PROCESSOR_ID_DEPOSIT_TEXT_CASH_AGENTS][SETTING_ROUTE] = 'cash_agents/'

export default {
	settings: settings,
	SETTING_ROUTE: SETTING_ROUTE,
	LIMITS_VALIDATION_VERSION: LIMITS_VALIDATION_VERSION,
	DEPOSIT_STEPS: DEPOSIT_STEPS,
	WITHDRAW_STEPS: WITHDRAW_STEPS,
	REGISTER_ACCOUNTS_ALLOW: REGISTER_ACCOUNTS_ALLOW
};
