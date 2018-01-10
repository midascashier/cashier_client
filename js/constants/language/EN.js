/**
 * Created by jobando on 03-Jun-16.
 */
let _langTags = {
	PROCESSING_SPINNER: 'Processing... please wait!',
	WELCOME: "Welcome",
	WELCOME_TITLE: "Welcome to",
	WELCOME_TITLE_TO: "Real Money Poker!",
	WELCOME_LOADING: "Loading your account is easy as 1, 2, 3",
	WELCOME_GET_STARTED: "Get Started",
	DEPOSIT: "Deposit",
	WITHDRAW: "Withdraw",
	STEPS_DEPOSIT_METHOD: "Deposit Method",
	STEPS_WITHDRAW_METHOD: "Withdraw Method",
	STEPS_HOW_MUCH_DEPOSIT: "How Much?",
	STEPS_HOW_MUCH_WITHDRAW: "How Much?",
	STEPS_BILLING_INFO: "Billing Information",
	STEPS_INSTRUCTIONS: "Instructions",
	STEPS_CONFIRMATION: "Confirmation",
	CUSTOMER_INFO_USER: "User",
	CUSTOMER_INFO_EMAIL: "Email",
	CUSTOMER_INFO_BALANCE: "Current Balance",
	CUSTOMER_INFO_NEED_HELP: "Need Help? ",
	CUSTOMER_INFO_LIVE_CHAT: "Live Chat",
	CUSTOMER_INFO_PHONE: "Or",
	CUSTOMER_INFO_CITY: "City",
	CUSTOMER_INFO_STATE: "State",
	CUSTOMER_INFO_COUNTRY: "Country",
	CUSTOMER_INFO_ADDRESS: "Address",
	METHOD_TRANSACTION_HISTORY: "Transaction History",
	METHOD_SELECT_YOUR_DEPOSIT_METHOD: "Select Your Deposit Method",
	METHOD_SELECT_YOUR_WITHDRAW_METHOD: "Select Your Withdraw Method",
	METHOD_DETAILS_DEPOSIT: "Deposit Details",
	METHOD_DETAILS_WITHDRAW: "Withdraw Details",
	METHOD_EDIT_DETAILS_DEPOSIT: "Edit the deposit details",
	METHOD_EDIT_DETAILS_WITHDRAW: "Edit the withdraw details",
	METHOD_USE_DIFFERENT: "Use a different method.",
	SWICTH_WITHDRAW: "Withdraw Instead",
	SWITCH_DEPOSIT: "Deposit Instead",
	//TransactionHistory
	TRANSACTION_HISTORY: "Transaction History",
	TRANSACTION_HISTORY_TITLE: "Here are your last 10 transactions.",
	TRANSACTION_HISTORY_TABLE_COL_DATE: "Date",
	TRANSACTION_HISTORY_TABLE_COL_TYPE: "Type",
	TRANSACTION_HISTORY_TABLE_COL_METHOD: "Method",
	TRANSACTION_HISTORY_TABLE_COL_AMOUNT: "Amount",
	TRANSACTION_HISTORY_TABLE_COL_STATUS: "Status",
	TRANSACTION_HISTORY_TABLE_COL_NOTES: "Notes",
	TRANSACTION_HISTORY_STATUS_PENDING: "Waiting confirmation.",
	TRANSACTION_HISTORY_STATUS_PROCESSING: "Is being processed.",
	TRANSACTION_HISTORY_STATUS_PRE_APPROVE: "Pending verify information.",
	TRANSACTION_HISTORY_STATUS_APPROVED: "Complete transaction.",
	TRANSACTION_HISTORY_STATUS_REJECTED: "Rejected by the issuer.",
	TRANSACTION_HISTORY_STATUS_CANCELLED: "Cancelled Transaction.",
	TRANSACTION_HISTORY_STATUS_FAILED: "Please contact us for more information.",
	//TransactionTypes
	TRANSACTION_TYPE: "Type",
	TRANSACTION_TYPE_INITIAL_DEPOSIT: "First Deposit",
	TRANSACTION_TYPE_REUP_DEPOSIT: "Deposit",
	TRANSACTION_TYPE_PAYOUT: "Payout",
	TRANSACTION_TYPE_ID_1: "Deposit",
	TRANSACTION_TYPE_ID_2: "Payout",
	TRANSACTION_TYPE_ID_3: "First Deposit",
	//TransactionStatus
	TRANSACTION_STATUS: "Status",
	TRANSACTION_STATUS_PENDING: "Pending",
	TRANSACTION_STATUS_PROCESSING: "Processing",
	TRANSACTION_STATUS_PRE_APPROVE: "Pre-Approved",
	TRANSACTION_STATUS_APPROVED: "Approved",
	TRANSACTION_STATUS_REJECTED: "Rejected",
	TRANSACTION_STATUS_CANCELLED: "Cancelled",
	TRANSACTION_STATUS_FAILED: "Failed",
	TRANSACTION_STATUS_DEFERRED: "Deferred",
	//ProcessingTransaction
	PROCESSING: "Processing... please wait!",
	PROCESSING_DEPOSIT_INFORMATION_TITLE: "Please Enter the Deposit Information",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD: "Please Enter Your Card Details",
	PROCESSING_WITHDRAW_INFORMATION_TITLE: "Please Enter the Withdraw Information",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P: "Please Enter the Sender's Information",
	PROCESSING_WITHDRAW_INFORMATION_TITLE_P2P: "Please Enter the Receiver's Information",
	PROCESSING_DEPOSIT_INFORMATION_EDIT: "Edit the deposit details",
	PROCESSING_LIMIT_INFORMATION_TITLE: "{processorName} {transactionType} Limits",
	PROCESSING_LIMIT_REMAINING: "Remaining Limit",
	PROCESSING_BILLING_INFO_TITLE: "Ensure Your Billing Information is Correct",
	PROCESSING_BILLING_INFO_EDIT: "Edit the billing address",
	PROCESSING_BUTTON_NEXT: "Next",
	PROCESSING_BUTTON_NEXT_DEPOSIT: "Deposit with",
	PROCESSING_BUTTON_NEXT_WITHDRAW: "Withdraw to",
	PROCESSING_BUTTON_COMPLETE_DEPOSIT: "Complete Deposit",
	PROCESSING_BUTTON_COMPLETE_WITHDRAW: "Complete Withdraw",
	PROCESSING_BUTTON_SUBMIT: "Submit",
	PROCESSING_BUTTON_COPY: "Copy",
	PROCESSING_BUTTON_SAVE: "Save",
	PROCESSING_BUTTON_EDIT: "Edit",
	PROCESSING_BUTTON_CONFIRM: "Confirm",
	PROCESSING_BUTTON_CANCEL: "Cancel",
	PROCESSING_BUTTON_REPROCESS_FIX: "I fixed it. Try again",
	PROCESSING_BUTTON_DELETE_ACCOUNT: "Delete Account",
	PROCESSING_BUTTON_DELETE_CARD: "Delete Card",
	PROCESSING_BUTTON_DELETE_RECEIVER: "Delete Receiver",
	PROCESSING_BUTTON_DELETE_SENDER: "Delete Sender",
	PROCESSING_OPTION_SELECT: "-- Select one --",
	PROCESSING_AMOUNT: "Amount",
	PROCESSING_MIN: "Min.",
	PROCESSING_MAX: "Max.",
	PROCESSING_BALANCE: "Balance",
	PROCESSING_FEE: "Fee",
	PROCESSING_FEE_TYPE_OPTIONS: "Pay the fees with",
	PROCESSING_FEE_ENOUGH_BALANCE: "You don't have enough balance to cover the required fees",
	PROCESSING_BUTTON_EDIT_CARD: "Edit Card",
	//Transaction
	TRANSACTION_AMOUNT: "Amount",
	TRANSACTION_FEE_TYPE_CASH: "Cash",
	TRANSACTION_FEE_TYPE_BP: "BetPoints",
	TRANSACTION_FEE_TYPE_FREE: "Monthly Free Payment",
	TRANSACTION_FEE_AMOUNT: "Fee Amount",
	TRANSACTION_FEE_CURRENT_BALANCE: "Current Balance",
	TRANSACTION_PROMO_CODE: "Promo Code",
	//Processors
	NETELLER: "Neteller",
	NETELLER_ACCOUNT: "Neteller Account",
	SKRILL_ACCOUNT: "Skrill Account",
	SELECT_ACCOUNT: "Select your account",
	NETELLER_SECURE: "2FA or Secure ID",
	NETELLER_NEW: "Enter your Neteller Email Account",
	DEBITCARD_INFO: 'Debit Card Information',
	BITCOIN: "Bitcoin",
	BITCOIN_INSTRUCTIONS: "Now send your Bitcoin to us.",
	BITCOIN_INSTRUCTIONS_INFO: "Your funds should be available within 30 minutes of making the transfer from your wallet.",
	BITCOIN_INSTRUCTIONS_AMOUNT: "Send {btcAmount} BTC from your wallet",
	BITCOIN_INSTRUCTIONS_AMOUNT_INFO: "Otherwise, your transaction will not be successful.",
	BITCOIN_INSTRUCTIONS_ADDRESS: "Send the Bitcoin to the following address",
	BITCOIN_INSTRUCTIONS_ADDRESS_INFO: "Please include any Miners Fee your Bitcoin wallet charges.",
	BITCOIN_INSTRUCTIONS_TIME: "Prompty complete your transaction",
	BITCOIN_INSTRUCTIONS_TIME_INFO1: "This BTC transaction price is only valid for",
	BITCOIN_INSTRUCTIONS_TIME_INFO2: "minutes. After that, the transaction price will change, and you may receive a different amount than expected.",
	BITCOIN_ADDRESS: "Bitcoin Address",
	CREDIT_CARD: "Card",
	CREDIT_CARD_SELECT: "Credit Card",
	CREDIT_CARD_HOLDER: "Holder's Name",
	CREDIT_CARD_NUMBER: "Card Number",
	CREDIT_CARD_CVV: "CVV",
	CREDIT_CARD_EXPIRATION: "Expiration Date",
	CREDIT_CARD_SSN: "Last 4 Digits of Social Security Number",
	CREDIT_CARD_DOB: "Date of Birth",
	CREDIT_CARD_FIRST_NAME: "First Name",
	CREDIT_CARD_LAST_NAME: "Last Name",
	CREDIT_CARD_COUNTRY: "Country",
	CREDIT_CARD_STATE: "State",
	CREDIT_CARD_CITY: "City / Town",
	CREDIT_CARD_PHONE: "Phone",
	CREDIT_CARD_EMAIL: "Email Address",
	CREDIT_CARD_ADDRESS: "Address",
	CREDIT_CARD_ZIP: "ZIP / Postal Code",
	CREDIT_CARD_CHECK_TERMENS: "I agree to the ",
	CREDIT_CARD_TERMS_COND: "terms and conditions.",
	CREDIT_CARD_INFO: "Certain banks may interpret increased transaction volumes over the internet as a fraud risk and may decline subsequent deposit requests. We highly recommend depositing enough money now to cover your planned bets for the day.",
	CREDIT_CARD_QUICK_FIX: "Quick fix...",
	CREDIT_CARD_QUICK_FIX_INFO: "Your credit card was not recognized because of incorrect information. Please double-check the information below and make sure it's all correct. After that, we can get you to the poker tables with your stack of chips. Say when...",
	CREDIT_CARD_DEPOSIT_SUCCESSFUL: "<div className='title'>Your {currencyAmount} deposit was successful.</div><p>This charge will show up on your statement as <strong>{descriptor}</strong>.</p><p>Your balance is now {currencyFormat}</p><p>An email has been sent to {email} with the transaction details.</p>",
	P2P_TITLE_INFO_DEPOSIT: "Please Enter the Sender's Information",
	P2P_TITLE_INFO_WITHDRAW: "Please Enter the Receiver's Information",
	P2P_INSTRUCTIONS: "Now send your funds.",
	P2P_INSTRUCTIONS_SENDER: "Sender's Information",
	P2P_INSTRUCTIONS_RECEIVER: "Receiver's Information",
	P2P_INSTRUCTIONS_GET_RECEIVER: "Get New Receiver",
	P2P_INSTRUCTIONS_PENDING_MTCN: "Pending Control Number",
	P2P_INSTRUCTIONS_INFO: "You must submit your control number here to be able to claim your bonus. Call center submissions are not eligible for bonuses.",
	P2P_INSTRUCTIONS_INFO_PROCESSING: "Your control number has been submitted. Your funds will be available as soon as we have confirmed the transaction. Note: this process can take between 8-12 hours.",
	P2P_SELECT_DEPOSIT: "Select your Sender",
	P2P_SELECT_WITHDRAW: "Select your Receiver",
	P2P_FIRST_NAME: "First Name",
	P2P_LAST_NAME: "Last Name",
	P2P_NAME: "Name",
	P2P_AGENCY_NAME: "Agency Name",
	P2P_ADDRESS: "Address",
	P2P_RIA: "Make your payment in one of the following establishments",
	P2P_RECEIVER: "Receiver",
	P2P_COUNTRY: "Country",
	P2P_STATE: "State",
	P2P_CITY: "City",
	P2P_PHONE: "Phone",
	P2P_EMAIL: "Email",
	P2P_DESTINATION: "Destination",
	P2P_LOCATION: "Location",
	P2P_TIME_FRAME: "What time will you send these funds?",
	P2P_TIME_FRAME_TODAY: "Today",
	P2P_TIME_FRAME_TOMORROW: "Tomorrow",
	P2P_CONTROL_NUMBER: "Control #",
	P2P_AMOUNT_SEND: "Funds Sent",
	P2P_FEE_SEND: "Fee",
	PENDING_MTCN: "Pending Control Numbers",
	PENDING_MTCN_SENDER: "Sender",
	PENDING_MTCN_RECEIVER: "Receiver",
	PENDING_MTCN_DESTINATION: "Destination",
	PENDING_MTCN_MTCN: "Control Number",
	PENDING_MTCN_AMOUNT: "Amount",
	PENDING_MTCN_FEE: "Fee",
	PENDING_MTCN_DIGITS: "digits",
	SECOND_FACTOR_INFO: "As a new security measure we are requesting 2 factor authentication every time you request a withdraw",
	SECOND_FACTOR_PHONE_CONFIRMATION: "Please confirm your phone number bellow and request your code when ready",
	SECOND_FACTOR_PHONE_REGISTERED: "Registered phone number",
	SECOND_FACTOR_CODE: "Enter code here",
	SECOND_FACTOR_REQUEST_CODE_BUTTON: "Request Code",
	SECOND_FACTOR_ENTER_CODE: "Enter code Here",
	SECOND_FACTOR_VERIFY_CODE: "Verify Code",
	BONUS_NEWS1: "Good News! You have a",
	BONUS_NEWS2: " 100%",
	BONUS_NEWS3: " deposit bonus up to",
	BONUS_NEWS4: " $1,000.",
	USE_DIFFERENT_METHOD: "Use different Method",
	EDIT_DEPOSIT_DETAILS: "Edit the deposit details",
	ILL_DEPOSIT_DIFFERENT_WAY: "No thanks. I'll deposit a different way",
	GO_TO_POKER_LOBBY: "Go to Poker Lobby",
	SKRILL_EMAIL: "Skrill's Email",
	ECOPAYZ_ACCOUNT: "ECO Account Number",
	REGISTER_NEW_ACCOUNT_CC: "Add a new credit card",
	REGISTER_NEW_ACCOUNT: "Register new account",
	LOADING: "Loading...",
	M_BELOW_MIN: "Please increase the amount and try again",
	M_ABOVE_MAX: "Please decrease the amount and try again",
	ONETAP_ACCOUNT: "1TAP Account",
	CK_FIRST_NAME: "First Name",
	CK_MIDDLE_NAME: "Middle Name",
	CK_LAST_NAME: "Last Name",
	CK_ADDRESS1: "Address 1",
	CK_ADDRESS2: "Address 2",
	CK_CITY: "City",
	CK_COUNTRY: "Country",
	CK_STATE: "State",
	CK_ZIP: "ZIP / Postal Code",
	CK_CONTACT_PHONE: "Contact Phone",
	CK_EMAIL: "Email Address",
	CK_SEND_BY: "Send By",
	CK_SEND_BY_FEDEX: "FedEx",
	CK_SEND_BY_REGULAR: "Regular Email",
	IMPORTANT_REMINDERS: "Important Reminders",
	CARDHOLDER_NAME: "CardHolder name must include first and last Name",

	REDIRECT: "You are being redirected",

	//Crypto Transfer
	CRYPTO_AMOUNT_TXT: 'Crypto amount',
	CRYPTO_REFUND_ADDRESS: 'Refund address',
	CRYPTO_DEPOSIT_ADDRESS: 'Address',
	CRYPTO_SEARCH_TXT: 'Search currency name',
	CRYPTO_UNAVAILABLE_TXT : 'Temporarily disabled',
	CRYPTO_SELECT_CURRENCY: 'Select your crypto currency',
	CRYPTO_REFUND_ERROR_MSG: 'Invalid refund address format',
	CRYPTO_DEPOSIT_HELP: 'Enter the e-wallet address to deposit this transaction.',
	CRYPTO_REFUND_HELP: 'The refund address is where we\'ll send your funds if we need to refund your transaction.  You can find this by clicking on your deposit wallet where you receive coins. It should list an existing deposit address.  If one does not exist, click on generate new address. If you store your cryptocurrency in a hardware wallet, the refund address is under the ‘receiving coin\' section.  It\'s either your deposit or receiving address, depending on the wallet.',
	CRYPTO_2FAT_TITLE: '2 Factor Authentication',
	CRYPTO_INSTRUCTIONS: "Now send your {cryptoCurrency} to us.",
	CRYPTO_INSTRUCTIONS_AMOUNT: "Send {cryptoAmount} {cryptoCurrency} from your wallet",
	CRYPTO_INSTRUCTIONS_AMOUNT_INFO: "Otherwise, your transaction will not be successful.",
	CRYPTO_INSTRUCTIONS_ADDRESS: "Send the {cryptoCurrency} to the following address",
	CRYPTO_INSTRUCTIONS_ADDRESS_INFO: "Please include any Miners Fee your {cryptoCurrency} wallet charges.",
	CRYPTO_MONERO_MESSAGE : "If you enter a Monero refund address, DO NOT use an address from an exchange or shared wallet that requires a payment ID. Only use a refund address from a wallet you control, which doesn\'t require a payment ID.",
	CRYPTO_EXPIRED_SESSION_MSG : 'Your session has expired due to inactivity. Please login again to continue using our cashier.'
};

export function EN(){
	return _langTags;
};