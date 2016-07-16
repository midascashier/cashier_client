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
	CUSTOMER_INFO_NEED_HELP: "Need Help?",
	CUSTOMER_INFO_LIVE_CHAT: "Live Chat",
	CUSTOMER_INFO_PHONE: "Phone",
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
	//ProcessingTransaction
	PROCESSING_DEPOSIT_INFORMATION_TITLE: "Please Enter the Deposit Information",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD: "Please Enter Your Card Details",
	PROCESSING_WITHDRAW_INFORMATION_TITLE: "Please Enter the Withdraw Information",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P: "Please Enter the Sender's Information",
	PROCESSING_LIMIT_INFORMATION_TITLE: "{processorName} {transactionType} Limits",
	PROCESSING_BILLING_INFO_TITLE: "Double-check Your Billing Information",
	PROCESSING_BILLING_INFO_EDIT: "Edit the billing address",
	PROCESSING_BUTTON_NEXT: "Next",
	PROCESSING_BUTTON_NEXT_DEPOSIT: "Deposit with",
	PROCESSING_BUTTON_NEXT_WITHDRAW: "Withdraw to",
	PROCESSING_BUTTON_COMPLETE_DEPOSIT: "Complete Deposit",
	PROCESSING_BUTTON_COMPLETE_WITHDRAW: "Complete Withdraw",
	PROCESSING_BUTTON_SUBMIT: "Submit",
	PROCESSING_BUTTON_COPY: "Copy",
	PROCESSING_AMOUNT: "Amount",
	PROCESSING_MIN: "Min.",
	PROCESSING_MAX: "Max.",
	PROCESSING_FEE: "Fee",
	PROCESSING_FEE_TYPE_OPTIONS: "Pay the fees with",
	//Transaction
	TRANSACTION_AMOUNT: "Amount",
	TRANSACTION_FEE_TYPE_CASH: "Cash",
	TRANSACTION_FEE_TYPE_BP: "BetPoints",
	TRANSACTION_FEE_TYPE_FREE: "Monthly Free Payment",
	TRANSACTION_FEE_AMOUNT: "Fee Amount",
	TRANSACTION_FEE_CURRENT_BALANCE: "Current Balance",
	//Processors
	NETELLER: "Neteller",
	NETELLER_ACCOUNT: "Neteller Account",
	NETELLER_SECURE: "2FA or Secure ID",
	BITCOIN: "BitCoin",
	BITCOIN_INSTRUCTIONS: "Now send your BitCoin to us.",
	BITCOIN_INSTRUCTIONS_INFO: "Your funds should be available within 30 minutes of making the transfer from your wallet.",
	BITCOIN_INSTRUCTIONS_AMOUNT: "Send exactly {btcAmount} BTC",
	BITCOIN_INSTRUCTIONS_AMOUNT_INFO: "Otherwise, your transaction will not be successful.",
	BITCOIN_INSTRUCTIONS_ADDRESS: "Send the BitCoin to the following address",
	BITCOIN_INSTRUCTIONS_ADDRESS_INFO: "Please include any Miners Fee your BitCoin wallet charges.",
	BITCOIN_INSTRUCTIONS_TIME: "Prompty complete your transaction",
	BITCOIN_INSTRUCTIONS_TIME_INFO: "This BTC transaction price is only valid for {btcMinutes} minutes. After that, the transaction price will change, and you may receive a different amount than expected.",
	BITCOIN_ADDRESS: "BitCoin Address",
	CREDIT_CARD: "Card",
	CREDIT_CARD_SELECT: "Select your card",
	CREDIT_CARD_HOLDER: "Holder's Name",
	CREDIT_CARD_NUMBER: "Card Number",
	CREDIT_CARD_CVV: "CVV",
	CREDIT_CARD_EXPIRATION: "Expiration Date",
	CREDIT_CARD_SSN: "Social Secuirty #",
	CREDIT_CARD_DOB: "Date of Birth",
	CREDIT_CARD_CHECK_TERMENS: "I agree to the terms and conditions.",
	CREDIT_CARD_INFO: "Certain banks may interpret increased transaction volumes over the internet as a fraud risk and may decline subsequent deposit requests. We highly recommend depositing enough money now to cover your planned bets for the day.",
	P2P_TITLE_INFO_DEPOSIT: "Please Enter the Sender's Information",
	P2P_TITLE_INFO_WITHDRAW: "Please Enter the Receiver's Information",
	P2P_INSTRUCTIONS: "Now send your funds.",
	P2P_INSTRUCTIONS_SENDER: "Sender's Information",
	P2P_INSTRUCTIONS_RECEIVER: "Receiver's Information",
	P2P_INSTRUCTIONS_PENDING_MTCN: "Pending Control Number",
	P2P_INSTRUCTIONS_INFO: "You must submit your control number here to be able to claim your bonus. Call center submissions are not eligible for bonuses.",
	P2P_SELECT_DEPOSIT: "Select your Sender",
	P2P_SELECT_WITHDRAW: "Select your Receiver",
	P2P_FIRST_NAME: "First Name",
	P2P_LAST_NAME: "Last Name",
	P2P_NAME: "Name",
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
	P2P_FEE_SEND: "Fee"
};

export function EN(){
	return _langTags;
};