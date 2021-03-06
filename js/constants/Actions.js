/**
 * Created by jobando on 08-Jun-16.
 */
export default {
	LOGIN: 'AUTHCUSTOMER',
	LOGIN_RESPONSE: 'AUTHCUSTOMERRESPONSE',
	COMPANY_INFO: 'COMPANYINFORMATION',
	COMPANY_INFO_RESPONSE: 'GETCOMPANYINFORESPONSE',
	COUNTRIES: 'COUNTRIES',
	COUNTRIES_RESPONSE: 'COUNTRIESRESPONSE',
	COUNTRY_ZIP_CODE_RESPONSE: 'COUNTRYZIPCODERESPONSE',
	STATES: 'STATES',
	STATES_RESPONSE: 'STATESRESPONSE',
	PROCESSORS: 'PROCESSORS',
	PROCESSORS_RESPONSE: 'PROCESSORSRESPONSE',
	GET_CURRENCY_RESPONSE: 'GETCURRENCYRESPONSE',
	CUSTOMER_INFO_RESPONSE: 'CUSTOMERINFORESPONSE',
	CUSTOMER_TRANSACTIONS: 'CUSTOMERLASTTRANSACTIONS',
	CUSTOMER_TRANSACTIONS_RESPONSE: 'CUSTOMERLASTTRANSACTIONSRESPONSE',
	CUSTOMER_TRANSACTIONS_PENDING_MTCN_RESPONSE: 'GETASSIGNEDP2PNAMESRESPONSE',
	PAYACCOUNTS_BY_PROCESSOR: 'PAYACCOUNTS',
	PAYACCOUNTS_BY_PROCESSOR_RESPONSE: 'GETPAYACCOUNTSBYCUSTOMERRESPONSE',
  CUSTOMER_PAYACCOUNTS_BY_PROCESSOR_RESPONSE: 'GETCUSTOMERPAYACCOUNTBYPROCESSORRESPONSE',
	PAYACCOUNTS_VALIDATE: 'PAYACCOUNTSVALIDATE',
	PAYACCOUNTS_VALIDATE_RESPONSE: 'GETPAYACCOUNTSBYCUSTOMERRESPONSE',
	PAYACCOUNTS_VALIDATE_SECURE_RESPONSE: 'UPDATECREDITCARDSECUREINFORESPONSE',
	PROCESSOR_FEES_CONFIGURATION_RESPONSE: 'GETPROCESSORFEESCONFIGRESPONSE',
	PROCESSOR_FEES_RESPONSE: 'GETPROCESSORFEESRESPONSE',
	PAYACCOUNTS_DISABLE: 'PAYACCOUNTSDISABLE',
	PAYACCOUNTS_DISABLE_RESPONSE: 'DISABLECUSTOMERPAYACCOUNTRESPONSE',
	PROCESSORS_LIMIT_MIN_MAX: 'PROCESSORLIMITMINMAX',
	PROCESSORS_LIMIT_MIN_MAX_RESPONSE: 'GETPROCESSORMINMAXLIMITSRESPONSE',
	PROCESSORS_LIMIT_RULES: 'PROCESSORLIMITRULE',
	PROCESSORS_LIMIT_RULES_RESPONSE: 'GETPROCESSORLIMITSRESPONSE',
	GET_CRYPTO_TRANSFER_LIMITS_RESPONSE: 'GETCRYPTOTRANSFERLIMITSRESPONSE',
	STOMP_CONNECTION: 'STOMPCONNECTION',
	STOMP_CONNECTION_SUCCESS: 'STOMP_CONNECTION_SUCCESS',
	CHANGE_PAYACCOUNT: 'CHANGE_PAYACCOUNT',
	GET_PAY_ACCOUNTS: 'GETPAYACCOUNTS',
	GET_PAY_ACCOUNT_LIMITS_RESPONSE: 'GETPAYACCOUNTLIMITSRESPONSE',
	CHANGE_TRANSACTION_AMOUNT: 'CHANGETRANSACTIONAMOUNT',
	CHANGE_TRANSACTION_FEE: 'CHANGETRANSACTIONFEE',
	CHANGE_TRANSACTION_FEETYPE: 'CHANGE_TRANSACTION_FEETYPE',
	CHANGE_TRANSACTION_TERMS: 'CHANGETRANSACTIONTERMS',
	CHANGE_TRANSACTION_CONTROL_NUMBER: 'CHANGETRANSACTIONCONTROLNUMBER',
	CHANGE_TRANSACTION_SEND_BY: 'CHANGETRANSACTIONSENDBY',
	CHANGE_TRANSACTION_PROMO_CODE: 'CHANGETRANSACTIONPROMOCODE',
	CHANGE_TRANSACTION_TIMEFRAME: 'CHANGETRANSACTIONTIMEFRAME',
	PROCESS_RESPONSE: 'PROCESSRESPONSE',
	PROCESS_CC_RESPONSE: 'CCPROCESSRESPONSE',
	PROCESS_P2P_GET_NAME_RESPONSE: 'P2PGETNAMERESPONSE',
	PROCESS_P2P_SUBMIT_RESPONSE: 'P2PSENDMTCNRESPONSE',
	START_TRANSACTION: 'START_TRANSACTION',
	PROCESS: 'PROCESS',
	SELECT_PROCESSOR: 'SELECT_PROCESSOR',
	SET_STEP: 'SETCURRENTSTEP',
	GET_BITCOIN_TRANSACTION_RESPONSE: "GETBITCOINTRANSACTIONRESPONSE",
	GET_CRYPTO_TRANSACTION_RESPONSE: "GETCRYPTOTRANSACTIONRESPONSE",
	GET_CRYPTO_TRANSFER_TRANSACTION_RESPONSE: "GETCRYPTOTRANSFERTRANSACTIONRESPONSE",
	GET_CREDITCARD_TRANSACTION_RESPONSE: 'GETCREDITCARDTRANSACTIONRESPONSE',
	VALIDATE_PAYACCOUNT: 'VALIDATEPAYACCOUNTRESPONSE',
	CHANGE_APPLICATION_SELECTED_COUNTRY: 'CHANGEAPPLICATIONSELECTEDCOUNTRY',
	SET_BITCOIN_ADDRESS: 'SETBITCOINADDRESS',
	CHANGE_TRANSACTION_FEE_AMOUNT: 'CHANGETRANSACTIONFEEAMOUNT',
	SET_TRANSACTION_ID: 'SETTRANSACTIONID',
	GET_PACIFIC_TIME_HOUR_RESPONSE: 'GETPACIFICTIMEHOURRESPONSE',
	SEND_TRANSACTION_TOKEN_RESPONSE: 'SENDTRANSACTIONTOKENRESPONSE',
	VERIFY_TRANSACTION_TOKEN_RESPONSE: 'VERIFYTRANSACTIONTOKENRESPONSE',
	START_SECOND_FACTOR: 'STARTSECONDFACTOR',
	SET_TUID: 'SETTUID',
	CONNECTION_ERRROR: 'CONNECTIONERRROR',
	SETS_PAYACCOUNT: 'SETSPAYACCOUNT',
	RESTART_TRANSACTION_RESPONSE: 'RESTARTTRANSACTIONRESPONSE',
	GET_PENDING_PAYOUT_RESPONSE: 'GETPENDINGPAYOUTRESPONSE',
	USER_MESSAGE: 'USERMESSAGE',
	SET_EDITCC: 'EDITCCMODE',
	CHANGE_TRANSACTION_CVV: 'CHANGETRANSACTIONCVV',
	CHANGE_TRANSACTION_CRYPTO_ADDRESS: 'CHANGETRANSACTIONCRYPTOADDRESS',
	CHANGE_TRANSACTION_CURRENCY_NAME: 'CHANGETRANSACTIONCURRENCYNAME',
	CHANGE_TRANSACTION_CURRENCY_SYM: 'CHANGETRANSACTIONCURRENCYSYM',
	CHANGE_TRANSACTION_BTC_CONVERTION_AMOUNT: 'CHANGETRANSACTIONBTCCONVERTIONAMOUNT',
	SWITCH_ACTION: 'SWITCHACTION',
	CHANGE_STATUS_RESPONSE: 'CHANGESTATUSRESPONSE',
	UPDATE_PAYACCOUNT_INFO_RESPONSE: 'UPDATEPAYACCOUNTINFORESPONSE',
	GET_CRYPTO_CURRENCIES_RESPONSE: 'GETCRYPTOCURRENCIESRESPONSE',
	GET_CRYPTO_CURRENCY_LIMITS_RESPONSE: 'GETCRYPTOCURRENCYLIMITSRESPONSE',
	VALIDATE_CRYPTO_ADDRESS: 'VALIDATECRYPTOADDRESS',
	VALIDATE_ACCOUNT: 'VALIDATEACCOUNT',
	SET_PLAYER_ACCOUNT: "SETPLAYERACCOUNT",
	GET_TRANSFER_LINK: "GETTRANSFERLINK",
	DOCS_FILES_GET_FORMS_CATEGORIES_RESPONSE: 'DOCSFILESGETFORMSCATEGORIESRESPONSE',
	DOCS_FILES_GET_FORMS_INPUTS_CATEGORIES_RESPONSE: 'DOCSFILESGETFORMSINPUTSCATEGORIESRESPONSE',
	DOCS_FILES_GET_CUSTOMER_PENDING_FORMS_RESPONSE: 'DOCSFILESGETCUSTOMERPENDINGFORMSRESPONSE',
	DOCS_FILES_GET_CUSTOMER_KYC_IS_APPROVE: 'DOCSFILESGETCUSTOMERKYCISAPPROVE',
	DOCS_FILES_GET_CUSTOMER_FORMS_INFORMATION_RESPONSE: 'DOCSFILESGETCUSTOMERFORMSINFORMATIONRESPONSE',
	DOCS_FILES_GET_ACCOUNT_FORMS_INFORMATION_RESPONSE: 'DOCSFILESGETACCOUNTFORMSINFORMATIONRESPONSE',
	DOCS_FILES_GET_ISSUE_FORMS_INFORMATION_RESPONSE: 'DOCSFILESGETISSUEFORMSINFORMATIONRESPONSE',
	DOCS_FILES_GET_VERIFICATION_FORMS_INFORMATION_RESPONSE: 'DOCSFILESGETVERIFICATIONFORMSINFORMATIONRESPONSE',
	DOCS_FILES_GET_RECOVERY_FORMS_INFORMATION_RESPONSE: 'DOCSFILESGETRECOVERYFORMSINFORMATIONRESPONSE',
	DOCS_FILE_SAVE_RESPONSE: "DOCSFILESAVERESPONSE"
}
