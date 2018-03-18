/**
 * Created by jobando on 15-Jun-16.
 */
export default {
	DEBUG_ENABLED: true,

	//Views
	VIEW_DEFAULT: 'deposit',
	VIEW_DEPOSIT: 'deposit',
	VIEW_WITHDRAW: 'withdraw',
	// Processors
	PROCESSOR_ID_NETELLER: 333,
	PROCESSOR_ID_BITCOIN: 814,
	PROCESSOR_ID_VISA: 11001,
	PROCESSOR_ID_MC: 11000,
	PROCESSOR_ID_AMEX: 11005,
	PROCESSOR_ID_MONEYGRAM: 16,
	PROCESSOR_ID_WU: 6,
	PROCESSOR_ID_SKRILL: 13,
	PROCESSOR_ID_AGENT_TRANSFER: 18,
	PROCESSOR_ID_BILLPAY: 36,
	PROCESSOR_ID_RIA: 26,
	PROCESSOR_ID_RIA_PROCESSOR: 500,
	PROCESSOR_ID_ECOPAYZ: 354,
	PROCESSOR_ID_CRYPTO_TRANSFER: 828,
	PROCESSOR_ID_CRYPTOScreen: 830,
	PROCESSOR_ID_1TAP: 13042,
	PROCESSOR_ID_DEBITCARD: 30200,
	// Processor Class
	PROCESSOR_CLASS_ID_CREDIT_CARDS: 1,
	PROCESSOR_CLASS_ID_E_WALLET: 5,
	PROCESSOR_CLASS_ID_PERSON_2_PERSON: 23,
	PROCESSOR_ID_GENCK: 70000,
	PROCESSOR_ID_ASTROPAY: 727,
	// Transaction Status
	TRANSACTION_STATUS_PENDING: 1,
	TRANSACTION_STATUS_APPROVED: 2,
	TRANSACTION_STATUS_REJECTED: 3,
	TRANSACTION_STATUS_FAILED: 4,
	TRANSACTION_STATUS_PROCESSING: 5,
	TRANSACTION_STATUS_CANCELLED: 8,
	TRANSACTION_STATUS_PRE_APPROVE: 22,
	TRANSACTION_STATUS_DEFERRED: 30,

	TRANSACTION_TYPE_PAYOUT: 2,
	IS_FLOWBACK: 1,

	M_BELOW_MIN: "M_BELOW_MIN",
	M_ABOVE_MAX: "M_ABOVE_MAX",
	M_AVAILABLE: "M_AVAILABLE",
	COUNT_ERROR: "COUNT_ERROR",
	LOADING: "LOADING",
	LIMIT_NO_ERRORS: "LIMIT_NO_ERRORS",
	NO_RESPONSE: "No Response",
	USA_COUNTRY_CODE: "US",
	CAN_COUNTRY_CODE: "CA",
	/**
	 * id for online user
	 */
	ONLINE_BE_USER_ID: 10093,

	SECOND_FACTOR_MAX_ATTEMPTS_REACHED: "MAX_ATTEMPTS_REACHED",

	CRYPTO_API_URL: 'https://shapeshift.io/',
	CRYPTO_API_GET_RATE: 'rate/',
	CRYPTO_API_GET_COINS: 'getcoins/',
	CRYPTO_API_GET_MARKET: 'marketinfo/',
	CRYPTO_API_VALIDATE_ADDRESS: 'validateAddress/',

	BONUS_WS: 'BONUS',
	CASHIER_WS: 'CASHIER',
	BACKEND_WS: 'BACKEND',

	REQUEST_PROXY: '/requestProxy.php',
	REQUEST_DOCS_FILE_SAVE: '/cashierServices/DocsFileSave.class.php'
}