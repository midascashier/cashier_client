/**
 * Created by jobando on 03-Jun-16.
 */
let _langTags = {
	//Sorts words
	IMPORTANT: "Important: ",
	WARNING_MINER_DEPOSIT_CC: "Only send {cryptoName} {cryptoSymbol} to this address. Sending any other digital asset will result in permanent loss.",
	WARNING_MINER_DEPOSIT: "If your deposit is less than ",
	WARNING_MINER_DEPOSIT_END: "  might not qualify for refund.",
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
	METHOD_REQUESTS: "My Requests",
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
	TRANSACTION_HISTORY_STATUS_PENDING: "Your transaction is in queue to be reviewed.",
	TRANSACTION_HISTORY_STATUS_DEFERRED: "Pending verify information.",
	TRANSACTION_HISTORY_STATUS_PROCESSING: "Your transaction is in the process of being credited or paid.",
	TRANSACTION_HISTORY_STATUS_PRE_APPROVE: "The transaction has been approved and will be credited or paid out as soon as possible.",
	TRANSACTION_HISTORY_STATUS_APPROVED: "Transaction has been completed successfully.",
	TRANSACTION_HISTORY_STATUS_REJECTED: "Rejected by the issuer.",
	TRANSACTION_HISTORY_STATUS_CANCELLED: "Your transaction has been cancelled, and we’ve sent you an email referencing the reason.",
	TRANSACTION_HISTORY_STATUS_FAILED: "Please contact us for more information.",
	TRANSACTION_HISTORY_STATUS_REJECTED_AND_FAILED: "An error has kept us from processing this transaction, please contact us for more details.",

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
	TRANSACTION_STATUS_REJECTED_AND_FAILED: "Rejected and Failed",
	PROCESSING_WITHDRAW_IMPORTANT_NOTE: "IMPORTANT NOTE",

	//ProcessingTransaction
	PROCESSING: "Processing... please wait!",
	PROCESSING_DEPOSIT_INFORMATION_TITLE: "Please Enter the Deposit Information",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD: "Please Enter Your Card Details",
	PROCESSING_WITHDRAW_INFORMATION_TITLE: "Please Enter the Withdraw Information",
	PROCESSING_WITHDRAW_IMPORTANT_NOTE_MESSAGE: "All checks issued by WPN must be cashed within 60 days of receiving them. Checks not cashed within 60 days will not process and funds will be forfeited permanently by the player.",
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
	PROCESSING_GO_BACK: "Go Back",
	//Validations
	PROCESSING_VALIDATION_DOB: "Please, check your date of birth!",
	PROCESSING_VALIDATION_DOB_SSN: "Please, check your date of birth or SSN!",
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
	SKRILL_INSTRUCTIONS_PROCESS_INSIDE: "Withdraws will be process inside 24 hours, but are typically processed within an hour.",
	SELECT_ACCOUNT: "Select your account",
	NETELLER_SECURE: "2FA or Secure ID",
	NETELLER_NEW: "Enter your Neteller Email Account",
	NETELLER_INSTRUCTIONS_PROCESS_INSIDE: "Withdraws will be process inside 24 hours, but are typically processed within an hour.",
	DEBITCARD_INFO: 'Debit Card Information',
	DEBITCARD_INSTRUCTIONS_PROCESS_INSIDE: "Withdraws will be process inside 24 hours, but are typically processed within an hour.",
	DEBITCARD_NEW_IN_DONWLOAD: "NEW ON DEBIT CARDS CLICK HERE TO DOWNLOAD AND PRINT THE KYC FORM",
	DEBITCARD_STEEPS_INFORMATION: "<p>This form will be required by customer service to proceed with the FREE delivery of your DebitCard.</p><p>In order to apply for a prepaid debit, follow these easy steps:</p><p><span>1.</span> Scan or photograph one of the following options:</p><ul><li>Passport</li><li>National ID</li><li>Driver's license with SSC</li></ul><p><span>2.</span> Scan or photograph your utility bill (must match the address and the name on the KYC Form)</p><p><span>3.</span> Scan or photograph the KYC form</p><p><span>4.</span> Email your scanned documents to cashier@DigitalExchange.eu</p>",
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
	BITCOIN_INSTRUCTIONS_PROCESS_INSIDE: "BitCoin withdrawals will be processed within 24 hours, but are usually processed as soon as possible.",
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
	CREDIT_CARD_DEPOSIT_SUCCESSFUL: "<div class='title'>Your {currencyAmount} deposit was successful.</div><p>This charge will show up on your statement as <strong>{descriptor}</strong>.</p><p>Your balance is now {currencyFormat}</p><p>An email has been sent to {email} with the transaction details.</p>",
	CREDIT_CARD_DEPOSIT_REJECTED: "<p>Your credit card told us	<strong>{currencyFormat}</strong> puts you over the credit limit.</p><p>What smaller amount would you like to deposit?</p>",

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
	P2P_ADDRESS: "Address: ",
	P2P_ADDRESS_LOCATION: "150 meters North of the pharmacy La Bomba, front hostel Catalonia, San Pedro de Montes de Oca",
	P2P_RIA: "Make your payment in one of the following establishments",
	P2P_RECEIVER: "Receiver",
	P2P_COUNTRY: "Country",
	P2P_STATE: "State",
	P2P_CITY: "City",
	P2P_MAKE_PAYMENT: "Make your payment in one of the following establishments",
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
	P2P_INSTRUCTION_REJECT: "Important Notice: Not following the instructions below will result in a rejected transaction Details.",
	P2P_INSTRUCTION_NEXT_HOURS: "This receiver's information is only valid for the next 48 hours.",
	P2P_INSTRUCTION_MIN_DEPOSIT: "The minimum deposit is $50.00, and the maximum is $400.00",
	P2P_INSTRUCTION_ONLY_USD: "Your transaction must be sent in USD and received in USD.",
	P2P_IMPORTANCE_NOTICE: "<strong>Make your payment</strong><strong>Important Notice: Not following the instructions below will result in a rejected transaction details.</strong>",
	P2P_INSTRUCTIONS_CORRECT_ADDRESS: "Ensure your address is correct. If you need to change your address, you can change it in the client. Then you may request your Money Transfer withdraw to the new address.",
	P2P_INSTRUCTIONS_ONLY_VALID: "<li><strong>Your transaction must be sent in USD and received in USD</strong>.</li><li>This receiver's information is only valid for the next 48 hours.</li>",
	PENDING_MTCN: "Pending Control Numbers",
	PENDING_MTCN_SENDER: "Sender",
	PENDING_MTCN_RECEIVER: "Receiver",
	PENDING_MTCN_DESTINATION: "Destination",
	PENDING_MTCN_MTCN: "Control Number",
	PENDING_MTCN_AMOUNT: "Amount",
	PENDING_MTCN_FEE: "Fee",
	PENDING_MTCN_DIGITS: "digits",
	GENCK_INSTRUCTIONS_PROCESS_INSIDE: "Withdraws will be process inside 24 hours, but are typically processed within an hour.",
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
	ECOPAYZ_WITHDRAWS_PROCESS: "Withdraws will be process inside 24 hours, but are typically processed within an hour.",
	REGISTER_NEW_ACCOUNT_CC: "Add a new credit card",
	REGISTER_NEW_ACCOUNT: "Register new account",
	LOADING: "Loading...",
	M_BELOW_MIN: "Please increase the amount and try again",
	M_ABOVE_MAX: "Please decrease the amount and try again",
	CREDIT_CARD_REACHED: "The credit card selected has reached its allowed limit with us. Please select another credit card",
	CC_MAX_TRANSACTION: "The credit card selected has reached its maximum number of transactions allowed. Please select another credit card",
	ONETAP_ACCOUNT: "1TAP Account",
	ONETAB_INSTRUCTIONS_PROCESS_INSIDE: "Withdraws will be process inside 24 hours, but are typically processed within an hour.",
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
	CK_SEND_BY_REGULAR: "Regular Mail",
	IMPORTANT_REMINDERS: "Important Reminders",
	CARDHOLDER_NAME: "CardHolder name must include first and last Name",

	REDIRECT: "You are being redirected",

	//Crypto Transfer
	CRYPTO_AMOUNT_TXT: 'Crypto amount',
	CRYPTO_REFUND_ADDRESS: 'Refund address',
	CRYPTO_DEPOSIT_ADDRESS: 'Address',
	CRYPTO_SEARCH_TXT: 'Search currency name',
	CRYPTO_UNAVAILABLE_TXT: 'Temporarily disabled',
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
	CRYPTO_MONERO_MESSAGE: "If you enter a Monero refund address, DO NOT use an address from an exchange or shared wallet that requires a payment ID. Only use a refund address from a wallet you control, which doesn\'t require a payment ID.",
	CRYPTO_EXPIRED_SESSION_MSG: 'Your session has expired due to inactivity. Please login again to continue using our cashier.',
	CRYPTO_INSTRUCTIONS_PROCESS_INSIDE: "Crypto Transfer withdrawals will be processed within 24 hours, but are usually processed as soon as possible.",
	CRYPTO_WITHDRAWS_INSIDE: "Crypto Transfer withdrawals will be processed within 24 hours, but are usually processed as soon as possible.",
	CRYPTO_PROCESS_VALIDATION_ERROR: "Something went wrong with your request. Please try again",

	//resources
	CC_LIMIT_ERROR_COUNT: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><strong>{displayName}</strong> - <span>The credit card selected has reached its maximum number of transactions allowed. Please select another credit card</span></div>',
	CC_LIMIT_ERROR_COUNT_TIME_SPAN: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><strong>{displayName}</strong> - <span>The credit card selected has reached its maximum number of transactions allowed. It will be available again in <strong>{remaining} minute(s)</strong></span></div>',
	CC_LIMIT_ERROR_AMOUNT: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><strong>{displayName}</strong> - <span>The credit card selected has reached its allowed limit with us. Please select another credit card</span></div>',
	CC_LIMIT_ERROR_NUM_CC: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><span>You have exceeded the maximum number of different credit cards we allow. Please select from one of the cards already on file</span></div>',
	CC_LIMIT_AVAILABLE: '<div class="alert alert-success" role="alert"><i class="fa fa-check"></i><strong>{displayName}</strong> - <span>available:</span><strong> {available} {currencyCode}</strong></div>',
	CC_LIMIT_BELOW_MIN: '<div class="alert alert-danger" role="alert"><i class="fa fa-ban"></i><span>Our minimum deposit amount is {minAmount} {currencyCode}</span></div>',
	CC_LIMIT_ABOVE_MAX: '<div class="alert alert-danger" role="alert"><i class="fa fa-ban"></i><span>Our maximum deposit amount is {maxAmount} {currencyCode}</span></div>',
	CC_LIMIT_ABOVE_AVAILABLE: '<div class="alert alert-info" role="alert"><i class="fa fa-ban"></i><strong>{displayName}</strong> - <span>The maximum amount available for this card is {available} {currencyCode}</span></div>',

	ASTROPAY_SUCCESS_DEPOSIT_BALANCE: "<div class='title'>Your {currencyAmount} {currency} deposit was successful.</div><p>Your balance is now {balance} {currency}</p><p>An email has been sent to {email} with the transaction details.</p>",

	TICKET_SUCCESS_DEPOSIT: "<div class='title'>Your {currencyAmount} {currency} deposit was successful.</div><p>Your balance is now {balance} {currency}</p><p>An email has been sent to {email} with the transaction details.</p>",
	TICKET_SUCCESS_WITHDRAW: "<div class='title'>Your {currencyAmount} {currency} withdraw was successful.</div><p>Your balance is now {balance} {currency}</p><p>An email has been sent to {email} with the transaction details.</p>",

	MY_REQUEST_TITLE: "My Requests",
	DOCS_FILE_TAB_KYC: "Identity Verification",
	DOCS_FILE_TAB_UPDATEACCOUNTINFO: "Update my information",
	DOCS_FILE_TAB_CCISSUES: "Report an issue",
	DOCS_FILE_TAB_RECOVERY: 'Recovery',
	DOCS_FILE_NEXT_STEP: 'Next',
	BD_TEXT_TYPE_3RD_ID: 'Third party identification',
	DOCFILE_FORM_LABEL_FILE_BANK_STATEMENT: 'Pending Deposit',
	DOCFILE_FORM_LABEL_FILE_BANK_STATEMENT2: 'Pending Deposit',
	DOCS_FILE_REJECTED_REASONS_TITLE: 'Rejected reasons',
	MY_REQUEST_ADDITIONAL_INFO: "Additional information",
	MY_REQUEST_RECOVERY: "Recovery",
	MY_REQUEST_VERIFY_TITLE: "Verification type",
	MY_REQUEST_DOCS_OPTION_ID_TXT: "ID",
	MY_REQUEST_DOCS_OPTION_VE_EW_TXT: "E-WALLET",

	DOCFILE_FORM_LABEL_ISSUE_REASON: 'Issue reason',
	DOCFILE_FORM_LABEL_FILE_ID_SELFIE: 'Selfie',
	DOCFILE_FORM_LABEL_FILE_CARD_FRONT: 'Front side',
	DOCFILE_FORM_LABEL_FILE_CARD_BACK: 'Rear side',
	BD_TEXT_TYPE_CARD: 'Take a picture of your card on the corresponding side',
	DOCFILE_FORM_LABEL_FILE_ID_3RD: 'Third party identification',

	DOCFILE_FORM_OPTION_DUPLICATE_CHARGE: 'Duplicate charge',
	DOCFILE_FORM_OPTION_REJECTED_BANK: 'Payment rejected but processed by the bank',
	DOCFILE_FORM_OPTION_OVERCHARGE: 'Surcharges in the operation',

	DRAG_DROP_FILES_TXT: "Drag your files here or click in this area.",
	DRAG_DROP_UPLOAD_TXT: "Upload",
	DRAG_DROP_ERROR_MAX_FILE: "Maximum 5 files, {fileName} not accepted.",
	DRAG_DROP_ERROR_MAX_SIZE: "Maximum total file size, {fileName} not accepted",
	DRAG_DROP_ERROR_FILE_TYPE: "File type, {fileName} not accepted.",

	AGENT_TRANSFER_USER_ACCOUNT: "User account",
	AGENT_TRANSFER_FEE_PAYMENT: "Pay the fees with",
	AGENT_TRANSFER_FEE_PAYMENT_CASH: "Cash",
	AGENT_TRANSFER_FEE_PAYMENT_BETPOINTS: "BetPoints",
	AGENT_TRANSFER_INVALID_USER_ACCOUNT: "Please verify the user account exists",
	AGENT_TRANSFER_ACCOUNT_FROM: "Sender",
	AGENT_TRANSFER_ACCOUNT_TO_USERNAME: "Receiver username",
	AGENT_TRANSFER_ACCOUNT_TO_FULLNAME: "Receiver name",

	DOCS_FILE_VERIFY_IMPORTANT_TXT: 'Please upload pictures only, four edges of the ID or Passport have to be visible in the picture and the information must be clear so avoid using flash.',
	DOCS_FILE_SELECT_DOCUMENT_TYPE: 'Select document type.',
	DOCFILE_FORM_LABEL_FILE_ID: "Send the current file for the identification process.",
	BD_TEXT_TYPE_LICENCE2: "Driver's license.",
	BD_TEXT_TYPE_ID: "Identification document",
	BD_TEXT_TYPE_PASSPORT: "Passport",
	BD_TEXT_TYPE_EWALLET: "E-Wallet",
	BD_TEXT_TYPE_UTILITY_BILL: "Utility bill",
	BD_TEXT_TYPE_UTILITY: "Utility bill",
	BD_TEXT_TYPE_BANK: "Bank statement",
	BD_TEXT_TYPE_ID_SELFIE: "Selfie",

	DOCFILE_FORM_LABEL_UPDATE_INFO_REASON: "Select the field to update",
	DOCFILE_FORM_OPTION_EMAIL: "Email",
	DOCFILE_FORM_OPTION_PHONE: "Phone",
	DOCFILE_FORM_OPTION_ADDRESS: "Address",

	DOCFILE_FORM_LABEL_UPDATE_INFO_VALUE: "Enter the value",

	DOCFILE_FORM_LABEL_NAME: "Full name",
	DOCFILE_FORM_LABEL_IDNUMBER: "Identification number",
	DOCFILE_FORM_LABEL_EMAIL: "Email",
	DOCFILE_FORM_LABEL_PHONE: "Phone number",
	DOCFILE_FORM_LABEL_BANKNAME: "Bank name",
	DOCFILE_FORM_LABEL_CC_LIST: "Select your card",
	DOCFILE_FORM_LABEL_ACCOUNT_TYPE: "Account type",
	DOCFILE_FORM_OPTION_SAVING_ACCOUNT: "Savings account",
	DOCFILE_FORM_OPTION_CURRENT_ACCOUNT: "Current account",
	DOCFILE_FORM_LABEL_ACCOUNT_NO: "Account number",

	DOCS_FILE_VERITY_CHANGE_OPTIONS: "Change option",
	DOCS_FILE_GO_BACK: "< Back",
	DOCS_FILE_GO_HOME: "< Home",
	DOCS_FILE_EDIT_BTN: 'Edit',

	DOCS_FILE_VERITY_ADD_DOCUMENT: 'Add Document',
	DOCS_FILE_UPLOAD_ERROR_RESPONSE: 'Error to upload',
	DOCS_FILE_UPLOAD_SUCCESS_RESPONSE: 'Successful upload!',
	DOCS_FILE_UPLOAD_SUCCESS_NOTIFIED_: 'You`ll be notified about the status of this process',
	DOCS_FILE_KYC_SUCCESS_ID: 'Your verification is complete',

	DOCS_FILE_STATUS_1: 'SENT',
	DOCS_FILE_STATUS_2: 'REVIEW',
	DOCS_FILE_STATUS_3: 'PENDING',
	DOCS_FILE_STATUS_4: 'REJECTED',
	DOCS_FILE_STATUS_5: 'APPROVED',

	DOCFILE_FORM_KYC_TABLE_DOCUMENT: 'Document',
	DOCFILE_FORM_KYC_TABLE_CREATED_DATE: 'Created date',
	DOCFILE_FORM_KYC_TABLE_STATUS: 'Status',
	DOCFILE_FORM_KYC_TABLE_ACTION: 'Action',
	DOCFILE_FORM_KYC_ID_TITLE: 'ID',
	DOCFILE_FORM_UPDATEINFO_TITLE: 'Update account information',
	DOCFILE_FORM_ISSUE_TITLE: 'Credit card new issue',
	DOCFILE_FORM_KYC_CARD_TITLE: 'Card verification',
	DOCFILE_FORM_KYC_EWALLET_TITLE: 'E-wallet',
	DOCFILE_FORM_RECOVERY_TITLE: 'Pending Deposit',
	DOCFILE_FORM_VERIFICATION_TITLE: 'Additional verification',
	DOCFILE_FORM_PROOF_TITLE: 'Proof of address',
	DOCFILE_FORM_OPTION_FIX_NAME: 'Fix name',
	DOCFILE_FORM_PENDING_DEPOSIT_TITLE: 'Pending deposit',
	DOCFILE_FORM_THIRD_ID_TITLE: 'Third ID',
	DOCFILE_FORM_BANK_LETTER_TITLE: 'Bank Letter',
	DOCFILE_FORM_LABEL_FILE_LETTER: 'Bank Letter',

	DOCFILE_FORM_LABEL_FILE_EWALLET: 'Photo of your e-wallet',
	DOCFILE_FORM_LABEL_FILE_UTILITY: 'Public service receipt',

	DOCS_FILE_TAB_VERIFICATIONREQUIRED: "Additional Information",

	SECURITY_BLOCK_TITTLE: "Security Block",
	SECURITY_BLOCK_MESSAGE: "This payment method is currently associated to another account. To help you fix this, please contact customer service.",

	METHODS_NO_AVAILABLE_DEPOSITS: 'Deposits',
	METHODS_NO_AVAILABLE_WITHDRAWALS: 'Withdrawals',
	METHODS_NO_AVAILABLE_TITLE: 'Security Block',
	METHODS_NO_AVAILABLE_MESSAGE: 'Current selection is not available </br> Please get in touch with customer service in order obtain immediate assistance.',
	VISA_FEE_MAIN: 'Please note WPN charges 10% on all Visa Transactions. If for example you deposit $100 with Visa, $90 will be credited to your poker account.'
};

export function EN(){
	return _langTags;
}