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
	STEPS_DEPOSIT_METHOD: "Metodo de Depósito",
	STEPS_WITHDRAW_METHOD: "Retiro",
	STEPS_HOW_MUCH_DEPOSIT: "¿Cuánto quiere depositar?",
	STEPS_HOW_MUCH_WITHDRAW: "¿Cuánto quiere retirar?",
	STEPS_BILLING_INFO: "Revise Su Información",
	STEPS_INSTRUCTIONS: "Instrucciones",
	STEPS_CONFIRMATION: "Confirmación",
	CUSTOMER_INFO_USER: "Usuario",
	CUSTOMER_INFO_EMAIL: "Correo",
	CUSTOMER_INFO_BALANCE: "Balance Disponible",
	CUSTOMER_INFO_NEED_HELP: "¿Necesita Ayuda? ",
	CUSTOMER_INFO_LIVE_CHAT: "Chat en Vivo",
	CUSTOMER_INFO_PHONE: "o",
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
	TRANSACTION_STATUS_DEFERRED: "Diferida",
	//ProcessingTransaction
	PROCESSING: "Procesando... por favor espere!",
	PROCESSING_DEPOSIT_INFORMATION_TITLE: "Ingrese la Información para el Depósito",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD: "Por favor introduzca los datos de la tarjeta",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P: "Por favor, introduzca la información del destinatario",
	PROCESSING_WITHDRAW_INFORMATION_TITLE_P2P: "Por favor, introduzca la información del beneficiario",
	PROCESSING_DEPOSIT_INFORMATION_EDIT: "Editar los detalles del depósito",
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
	PROCESSING_BUTTON_SAVE: "Guardar",
	PROCESSING_BUTTON_EDIT: "Modificar",
	PROCESSING_BUTTON_CONFIRM: "Confirmar",
	PROCESSING_BUTTON_CANCEL: "Cancelar",
	PROCESSING_BUTTON_REPROCESS_FIX: "Corregido. Intentar nuevamente.",
	PROCESSING_BUTTON_DELETE_ACCOUNT: "Borrar Cuenta",
	PROCESSING_BUTTON_DELETE_CARD: "Borrar Tarjeta",
	PROCESSING_BUTTON_DELETE_RECEIVER: "Borrar destinatario",
	PROCESSING_BUTTON_DELETE_SENDER: "Borrar beneficiario",
	PROCESSING_AMOUNT: "Monto",
	PROCESSING_MIN: "Mín.",
	PROCESSING_MAX: "Máx.",
	PROCESSING_BALANCE: "Balance",
	PROCESSING_FEE: "Comisión",
	PROCESSING_FEE_TYPE_OPTIONS: "Pagar la carga con",
	PROCESSING_FEE_ENOUGH_BALANCE: "You don't have enough balance to cover the required fees",
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
	SKRILL_ACCOUNT: "Cuenta de Skrill",
	NETELLER_SECURE: "2FA o ID de Seguridad",
	NETELLER_NEW: "Ingrese su cuenta de Neteller",
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
	CREDIT_CARD_HOLDER: "Nombre exacto en su tarjeta",
	CREDIT_CARD_NUMBER: "Número de tarjeta",
	CREDIT_CARD_CVV: "CVV",
	CREDIT_CARD_EXPIRATION: "Fecha de Expiración",
	CREDIT_CARD_SSN: "# Seguro Social",
	CREDIT_CARD_DOB: "Fecha Nacimiento",
	CREDIT_CARD_FIRST_NAME: "Nombre",
	CREDIT_CARD_LAST_NAME: "Apellidos",
	CREDIT_CARD_COUNTRY: "País",
	CREDIT_CARD_STATE: "Estado / Provincia",
	CREDIT_CARD_CITY: "Ciudad",
	CREDIT_CARD_PHONE: "Teléfono",
	CREDIT_CARD_EMAIL: "Email",
	CREDIT_CARD_ADDRESS: "Dirección",
	CREDIT_CARD_ZIP: "ZIP / Código Postal",
	CREDIT_CARD_CHECK_TERMENS: "Acepto términos y condiciones.",
	CREDIT_CARD_INFO: "Algunos bancos pueden interpretar el aumento de los volúmenes de transacciones en internet como un riesgo de fraude y pueden rechazar las solicitudes de depósitos posteriores. Recomendamos altamente depositar dinero suficiente para cubrir sus apuestas previstas para el día.",
	CREDIT_CARD_QUICK_FIX: "Arreglo rapido...",
	CREDIT_CARD_QUICK_FIX_INFO: "Su tarjeta de crédito no fue reconocida debido a la información incorrecta. Compruebe por favor la siguiente información y asegurarse de que todo correcta. Después de eso, podemos llegar a las mesas de Poker con su pila de fichas. Di cuando...",
	P2P_TITLE_INFO_DEPOSIT: "Por favor, introduzca la información del remitente",
	P2P_TITLE_INFO_WITHDRAW: "Por favor, introduzca la información del Receptor",
	P2P_INSTRUCTIONS: "Envíanos tus fondos.",
	P2P_INSTRUCTIONS_SENDER: "Información del remitente",
	P2P_INSTRUCTIONS_RECEIVER: "Receiver's Information",
	P2P_INSTRUCTIONS_GET_RECEIVER: "Solicitar Nuevo Nombre",
	P2P_INSTRUCTIONS_PENDING_MTCN: "Información del Receptor",
	P2P_INSTRUCTIONS_INFO: "Usted debe ingresar su Número de Control aquí para ser capaz de reclamar su bono. Las confirmaciones por medio del centro de llamadas no son elegibles para los bonos.",
	P2P_INSTRUCTIONS_INFO_PROCESSING: "Your control number has been submitted and your funds are now available. Thank you for your deposit.",
	P2P_SELECT_DEPOSIT: "Seleccione el destinatario",
	P2P_SELECT_WITHDRAW: "Seleccione el beneficiario",
	P2P_FIRST_NAME: 'Nombre',
	P2P_LAST_NAME: 'Apellidos',
	P2P_NAME: "Nombre",
	P2P_AGENCY_NAME: "Nombre de la Agencia",
	P2P_ADDRESS: "Dirección",
	P2P_RIA: "Haga su pago en una de los siguientes establecimientos",
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
	P2P_FEE_SEND: "Costos",
	PENDING_MTCN: "Confirmaciones Pendientes",
	PENDING_MTCN_SENDER: "Remitente",
	PENDING_MTCN_RECEIVER: "Beneficiario",
	PENDING_MTCN_DESTINATION: "Destino",
	PENDING_MTCN_MTCN: "Número de Control",
	PENDING_MTCN_AMOUNT: "Monto",
	PENDING_MTCN_FEE: "Costos",
	PENDING_MTCN_DIGITS:"dígitos",
	SECOND_FACTOR_INFO: "As a new security measure we are requesting 2 factor authentication every time you request a withdraw",
	SECOND_FACTOR_PHONE_CONFIRMATION: "Please confirm your phone number bellow and request your code when ready",
	SECOND_FACTOR_PHONE_REGISTERED: "Registered phone number",
	SECOND_FACTOR_CODE: "Enter code here",
	SECOND_FACTOR_REQUEST_CODE_BUTTON: "Request Code",
	SECOND_FACTOR_ENTER_CODE: "Enter code Here",
	SECOND_FACTOR_VERIFY_CODE: "Verify Code",
	BONUS_NEWS: "Buenas Noticias! Tiene 100% de bono en sus depósitos por mas de $1,000",
	CREDIT_CARD_CHECK_TERMENS: "Estoy de acuerdo con los ",
	CREDIT_CARD_TERMS_COND: "términos y condiciones.",
	USE_DIFFERENT_METHOD: "Usar otro método",
	EDIT_DEPOSIT_DETAILS: "Editar detalles del depósito",
	ILL_DEPOSIT_DIFFERENT_WAY: "No gracias, voy a depositar de otra forma",
	GO_TO_POKER_LOBBY: "Ir al salón de Poker",
	SKRILL_EMAIL: "Correo del Skrill",
	ECOPAYZ_ACCOUNT: "Número de cuenta",
	REGISTER_NEW_ACCOUNT: "Registrar una cuenta",
	LOADING: "Cargando...",
	M_BELOW_MIN: "Aumente el monto e intente de nuevo por favor",
	M_ABOVE_MAX: "Disminuya el monto e intente de nuevo por favor",
	ONETAP_ACCOUNT: "Cuenta de 1TAP",
	CK_FIRST_NAME: "Primer Nombre",
	CK_MIDDLE_NAME: "Segundo Nombre",
	CK_LAST_NAME: "Apellidos",
	CK_ADDRESS1: "Dirección 1",
	CK_ADDRESS2: "Dirección 2",
	CK_CITY:"Ciudad",
	CK_COUNTRY:"Pais",
	CK_STATE:"Estado",
	CK_ZIP:"ZIP / Código Postal",
	CK_CONTACT_PHONE:"Número de Teléfono de Contacto",
	CK_EMAIL:"Correo Electrónico",
	IMPORTANT_REMINDERS: "Notas Importantes"
};

export function ES(){
	return _langTags;
};