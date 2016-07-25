/**
 * Created by jobando on 03-Jun-16.
 */
let _langTags = {
	PROCESSING_SPINNER: 'Procesando... favor espere!',
	WELCOME: "Inicio",
	WELCOME_TITLE: "Bienvenido(a) a ",
	WELCOME_TITLE_TO: "Poker con Dinero Real!",
	WELCOME_LOADING: "Cargando su cuenta es fácil como 1, 2, 3",
	WELCOME_GET_STARTED: "Iniciar",
	DEPOSIT: "Depósito",
	WITHDRAW: "Retiro",
	STEPS_DEPOSIT_METHOD: "Depósito",
	STEPS_WITHDRAW_METHOD: "Retiro",
	STEPS_HOW_MUCH_DEPOSIT: "¿Cuánto quiere depositar?",
	STEPS_HOW_MUCH_WITHDRAW: "¿Cuánto quiere retirar?",
	STEPS_BILLING_INFO: "Revise Su Información",
	STEPS_INSTRUCTIONS: "Instruciones",
	STEPS_CONFIRMATION: "Confirmación",
	CUSTOMER_INFO_USER: "Cuenta",
	CUSTOMER_INFO_EMAIL: "Correo",
	CUSTOMER_INFO_BALANCE: "Balance Disponible",
	CUSTOMER_INFO_NEED_HELP: "¿Necesita Ayuda?",
	CUSTOMER_INFO_LIVE_CHAT: "Chat en Vivo",
	CUSTOMER_INFO_PHONE: "Teléfono",
	CUSTOMER_INFO_CITY: "City",
	CUSTOMER_INFO_STATE: "State",
	CUSTOMER_INFO_COUNTRY: "Country",
	CUSTOMER_INFO_ADDRESS: "Address",
	METHOD_TRANSACTION_HISTORY: "Historial",
	METHOD_SELECT_YOUR_DEPOSIT_METHOD: "Deposita con:",
	METHOD_SELECT_YOUR_WITHDRAW_METHOD: "¿Cómo quiere retirar?",
	METHOD_DETAILS_DEPOSIT: "Detalles del depósito",
	METHOD_DETAILS_WITHDRAW: "Detalles del retiro",
	METHOD_EDIT_DETAILS_DEPOSIT: "Editar detalles del depósito",
	METHOD_EDIT_DETAILS_WITHDRAW: "Editar detalles del retiro",
	METHOD_USE_DIFFERENT: "Cambiar Método.",
	//TransactionHistory
	TRANSACTION_HISTORY: "Historial de Transacciones",
	TRANSACTION_HISTORY_TITLE: "Aquí están sus últimas 10 transacciones.",
	TRANSACTION_HISTORY_TABLE_COL_DATE: "Fecha",
	TRANSACTION_HISTORY_TABLE_COL_TYPE: "Tipo",
	TRANSACTION_HISTORY_TABLE_COL_METHOD: "Método",
	TRANSACTION_HISTORY_TABLE_COL_AMOUNT: "Monto",
	TRANSACTION_HISTORY_TABLE_COL_STATUS: "Estado",
	TRANSACTION_HISTORY_TABLE_COL_NOTES: "Mensaje",
	TRANSACTION_HISTORY_STATUS_PENDING: "Esperando confirmación.",
	TRANSACTION_HISTORY_STATUS_PROCESSING: "Está siendo procesada.",
	TRANSACTION_HISTORY_STATUS_PRE_APPROVE: "A la espera de comprobar la información.",
	TRANSACTION_HISTORY_STATUS_APPROVED: "Transacción Completada.",
	TRANSACTION_HISTORY_STATUS_REJECTED: "Por favor verifique la información.",
	TRANSACTION_HISTORY_STATUS_CANCELLED: "Transacción Cancelada.",
	TRANSACTION_HISTORY_STATUS_FAILED: "Por favor contactenos para más información.",
	//TransactionTypes
	TRANSACTION_TYPE: "Tipo",
	TRANSACTION_TYPE_INITIAL_DEPOSIT: "Primer Depósito",
	TRANSACTION_TYPE_REUP_DEPOSIT: "Depósito",
	TRANSACTION_TYPE_PAYOUT: "Retiro",
	TRANSACTION_TYPE_ID_1: "Depósito",
	TRANSACTION_TYPE_ID_2: "Retiro",
	TRANSACTION_TYPE_ID_3: "Primer Depósito",
	//TransactionStatus
	TRANSACTION_STATUS: "Estado",
	TRANSACTION_STATUS_PENDING: "Pendiente",
	TRANSACTION_STATUS_PROCESSING: "Procesando",
	TRANSACTION_STATUS_PRE_APPROVE: "Pre-Aprobada",
	TRANSACTION_STATUS_APPROVED: "Aprobada",
	TRANSACTION_STATUS_REJECTED: "Rechazada",
	TRANSACTION_STATUS_CANCELLED: "Cancelada",
	TRANSACTION_STATUS_FAILED: "Fallida",
	//ProcessingTransaction
	PROCESSING_DEPOSIT_INFORMATION_TITLE: "Ingrese la Información para el Depósito",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD: "Por favor introduzca sus datos de la tarjeta",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P: "Por favor, introduzca la información del remitente",
  PROCESSING_WITHDRAW_INFORMATION_TITLE: "Ingrese la Información para el Retiro",
	PROCESSING_LIMIT_INFORMATION_TITLE: "Límites de {processorName} para {transactionType}",
	PROCESSING_LIMIT_REMAINING: "Restante",
	PROCESSING_BILLING_INFO_TITLE: "Compruebe la información de facturación",
	PROCESSING_BILLING_INFO_EDIT: "Editar la dirección de facturación",
	PROCESSING_BUTTON_NEXT: "Siguiente",
	PROCESSING_BUTTON_NEXT_DEPOSIT: "Depositar con",
	PROCESSING_BUTTON_NEXT_WITHDRAW: "Retire con",
	PROCESSING_BUTTON_COMPLETE_DEPOSIT: "Completar Depósito",
	PROCESSING_BUTTON_COMPLETE_WITHDRAW: "Completar Retiro",
	PROCESSING_BUTTON_SUBMIT: "Confirmar",
	PROCESSING_BUTTON_COPY: "Copiar",
	PROCESSING_AMOUNT: "Monto",
	PROCESSING_MIN: "Mín.",
	PROCESSING_MAX: "Máx.",
	PROCESSING_FEE: "Comisión",
	PROCESSING_FEE_TYPE_OPTIONS: "Pagar la carga con",
	//Transaction
	TRANSACTION_AMOUNT: "Monto",
	TRANSACTION_FEE_TYPE_CASH: "Efectivo",
	TRANSACTION_FEE_TYPE_BP: "BetPoints",
	TRANSACTION_FEE_TYPE_FREE: "Retiro Gratis Mensual",
	TRANSACTION_FEE_AMOUNT: "Monto de Comisión",
	TRANSACTION_FEE_CURRENT_BALANCE: "Balance Actual",
	//Processors
	NETELLER: "Neteller",
	NETELLER_ACCOUNT: "Cuenta de Neteller",
	NETELLER_SECURE: "2FA o ID de Seguridad",
	BITCOIN: "BitCoin",
	BITCOIN_INSTRUCTIONS: "Envíenos sus BitCoin's",
	BITCOIN_INSTRUCTIONS_INFO: "Sus fondos deben estar disponibles dentro de los 30 minutos después de hacer su transferencia.",
	BITCOIN_INSTRUCTIONS_AMOUNT: "Enviar exactamente {btcAmount} BTC",
	BITCOIN_INSTRUCTIONS_AMOUNT_INFO: "De lo contrario, su transacción no tendrá éxito.",
	BITCOIN_INSTRUCTIONS_ADDRESS: "Enviar el Bitcoin a la siguiente dirección",
	BITCOIN_INSTRUCTIONS_ADDRESS_INFO: "Por favor, incluya cualquier cargo de los Mineros.",
	BITCOIN_INSTRUCTIONS_TIME: "Pronto se completará su transacción",
	BITCOIN_INSTRUCTIONS_TIME_INFO: "El precio de la transacción BTC sólo es válida durante {btcMinutes} minutos. Después de eso, el precio de la transacción va a cambiar, y puede recibir una cantidad diferente de lo esperado.",
	BITCOIN_ADDRESS: "BitCoin Address",
	CREDIT_CARD: "Tarjeta",
	CREDIT_CARD_SELECT: "Seleccione su tarjeta",
	CREDIT_CARD_HOLDER: "Holder's Name",
	CREDIT_CARD_NUMBER: "Card Number",
	CREDIT_CARD_CVV: "CVV",
	CREDIT_CARD_EXPIRATION: "Expiration Date",
	CREDIT_CARD_SSN: "Social Secuirty #",
	CREDIT_CARD_DOB: "Date of Birth",
	CREDIT_CARD_CHECK_TERMENS: "Acepto términos y condiciones.",
	CREDIT_CARD_INFO: "Algunos bancos pueden interpretar el aumento de los volúmenes de transacciones en internet como un riesgo de fraude y pueden rechazar las solicitudes de depósitos posteriores. Recomendamos altamente depositar dinero suficiente para cubrir sus apuestas previstas para el día.",
	CREDIT_COUNTRY: "País",
	CREDIT_STATE: "Estado",
	P2P_TITLE_INFO_DEPOSIT: "Por favor, introduzca la información del remitente",
	P2P_TITLE_INFO_WITHDRAW: "Por favor, introduzca la información del Receptor",
	P2P_INSTRUCTIONS: "Envíanos tus fondos.",
	P2P_INSTRUCTIONS_SENDER: "Información del remitente",
	P2P_INSTRUCTIONS_RECEIVER: "Receiver's Information",
	P2P_INSTRUCTIONS_GET_RECEIVER: "Solicitar Nuevo Nombre",
	P2P_INSTRUCTIONS_PENDING_MTCN: "Información del Receptor",
	P2P_INSTRUCTIONS_INFO: "Usted debe ingresar su Número de Control aquí para ser capaz de reclamar su bono. Las confirmaciones por medio del centro de llamadas no son elegibles para los bonos.",
	P2P_SELECT_DEPOSIT: "Seleccione el remitente",
	P2P_SELECT_WITHDRAW: "Seleccione el beneficiario",
	P2P_FIRST_NAME: 'Nombre',
	P2P_LAST_NAME: 'Apellidos',
	P2P_NAME: "Nombre",
	P2P_RECEIVER: "Beneficiario",
	P2P_COUNTRY: 'País',
	P2P_STATE: 'Estado',
	P2P_CITY: 'Ciudad',
	P2P_PHONE: 'Teléfono',
	P2P_EMAIL: 'Correo Electrónico',
	P2P_DESTINATION: "Destino",
	P2P_LOCATION: "Locación",
	P2P_TIME_FRAME: '¿A qué hora va a enviar estos fondos?',
	P2P_TIME_FRAME_TODAY: 'Hoy',
	P2P_TIME_FRAME_TOMORROW: 'Mañana',
	P2P_CONTROL_NUMBER: "Número de Control",
	P2P_AMOUNT_SEND: "Monto Enviado",
	P2P_FEE_SEND: "Costos"
};

export function ES(){
	return _langTags;
};