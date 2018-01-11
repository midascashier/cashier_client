/**
 * Created by jobando on 03-Jun-16.
 */
let _langTags = {
	//Sorts words
	IMPORTANT: "Importante: ",
	WARNING_MINER_DEPOSIT: "Si su depósito es menor que ",
	WARNING_MINER_DEPOSIT_END: "  podría no calificar para el reembolso.",
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
	CUSTOMER_INFO_CITY: "Ciudad",
	CUSTOMER_INFO_STATE: "Estado / Provincia",
	CUSTOMER_INFO_COUNTRY: "Pais",
	CUSTOMER_INFO_ADDRESS: "Direccion",
	METHOD_TRANSACTION_HISTORY: "Historial",
	METHOD_SELECT_YOUR_DEPOSIT_METHOD: "Deposita con:",
	METHOD_SELECT_YOUR_WITHDRAW_METHOD: "¿Cómo quiere retirar?",
	METHOD_DETAILS_DEPOSIT: "Detalles del depósito",
	METHOD_DETAILS_WITHDRAW: "Detalles del retiro",
	METHOD_EDIT_DETAILS_DEPOSIT: "Editar detalles del depósito",
	METHOD_EDIT_DETAILS_WITHDRAW: "Editar detalles del retiro",
	METHOD_USE_DIFFERENT: "Cambiar Método.",
	SWICTH_WITHDRAW: "Retiros",
	SWITCH_DEPOSIT: "Deposito",
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
	PROCESSING_WITHDRAW_INFORMATION_TITLE: "Ingrese la Información para el Retiro",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_P2P: "Por favor, introduzca la información del destinatario",
	PROCESSING_WITHDRAW_INFORMATION_TITLE_P2P: "Por favor, introduzca la información del beneficiario",
	PROCESSING_DEPOSIT_INFORMATION_EDIT: "Editar los detalles del depósito",
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
	PROCESSING_OPTION_SELECT: "-- Seleccionar --",
	PROCESSING_AMOUNT: "Monto",
	PROCESSING_MIN: "Mín.",
	PROCESSING_MAX: "Máx.",
	PROCESSING_BALANCE: "Balance",
	PROCESSING_FEE: "Comisión",
	PROCESSING_FEE_TYPE_OPTIONS: "Pagar la carga con",
	PROCESSING_FEE_ENOUGH_BALANCE: "No tiene saldo suficiente para cubrir las tarifas requeridas",
	PROCESSING_BUTTON_EDIT_CARD: "Editar tarjeta",
	//Validations
	PROCESSING_VALIDATION_DOB: "Por favor, verifique su fecha de nacimiento!",
	PROCESSING_VALIDATION_DOB_SSN: "Por favor, verifique su fecha de nacimiento o número de seguro social (SSN)!",
	//Transaction
	TRANSACTION_AMOUNT: "Monto",
	TRANSACTION_FEE_TYPE_CASH: "Efectivo",
	TRANSACTION_FEE_TYPE_BP: "BetPoints",
	TRANSACTION_FEE_TYPE_FREE: "Retiro Gratis Mensual",
	TRANSACTION_FEE_AMOUNT: "Monto de Comisión",
	TRANSACTION_FEE_CURRENT_BALANCE: "Balance Actual",
	TRANSACTION_PROMO_CODE: "Código Promocional",
	//Processors
	NETELLER: "Neteller",
	NETELLER_ACCOUNT: "Cuenta de Neteller",
	SKRILL_ACCOUNT: "Cuenta de Skrill",
	SKRILL_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros se procesarán dentro de las 24 horas, pero normalmente se procesan en una hora.",
	SELECT_ACCOUNT: "Seleccione su cuenta",
	NETELLER_SECURE: "2FA o ID de Seguridad",
	NETELLER_NEW: "Ingrese su cuenta de Neteller",
	NETELLER_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros se procesarán dentro de las 24 horas, pero normalmente se procesan en una hora.",
	DEBITCARD_INFO: 'Información de la tarjeta de débito',
	DEBITCARD_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros se procesarán dentro de las 24 horas, pero normalmente se procesan en una hora.",
	BITCOIN: "BitCoin",
	BITCOIN_INSTRUCTIONS: "Envíenos sus BitCoin's",
	BITCOIN_INSTRUCTIONS_INFO: "Sus fondos deben estar disponibles dentro de los 30 minutos después de hacer su transferencia.",
	BITCOIN_INSTRUCTIONS_AMOUNT: "Enviar exactamente {btcAmount} BTC",
	BITCOIN_INSTRUCTIONS_AMOUNT_INFO: "De lo contrario, su transacción no tendrá éxito.",
	BITCOIN_INSTRUCTIONS_ADDRESS: "Enviar el Bitcoin a la siguiente dirección",
	BITCOIN_INSTRUCTIONS_ADDRESS_INFO: "Por favor, incluya cualquier cargo de los Mineros.",
	BITCOIN_INSTRUCTIONS_TIME: "Pronto se completará su transacción",
	BITCOIN_INSTRUCTIONS_TIME_INFO1: "El precio de esta transacción de BTC solo es válido para",
	BITCOIN_INSTRUCTIONS_TIME_INFO2: "minutos. Después de eso, el precio de la transacción cambiará y es posible que reciba una cantidad diferente a la esperada.",
	BITCOIN_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros de BitCoin se procesarán dentro de las 24 horas, pero normalmente se procesan ensegida",
	BITCOIN_ADDRESS: "Direccion BitCoin",
	CREDIT_CARD: "Tarjeta",
	CREDIT_CARD_SELECT: "Seleccione su tarjeta",
	CREDIT_CARD_HOLDER: "Nombre exacto en su tarjeta",
	CREDIT_CARD_NUMBER: "Número de tarjeta",
	CREDIT_CARD_CVV: "CVV",
	CREDIT_CARD_EXPIRATION: "Fecha de Expiración",
	CREDIT_CARD_SSN: "Ultimos 4 dígitos de # Seguro Social",
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
	CREDIT_CARD_CHECK_TERMENS: "Estoy de acuerdo con la ",
	CREDIT_CARD_TERMS_COND: "terminos y condiciones.",
	CREDIT_CARD_INFO: "Algunos bancos pueden interpretar el aumento de los volúmenes de transacciones en internet como un riesgo de fraude y pueden rechazar las solicitudes de depósitos posteriores. Recomendamos altamente depositar dinero suficiente para cubrir sus apuestas previstas para el día.",
	CREDIT_CARD_QUICK_FIX: "Arreglo rapido...",
	CREDIT_CARD_QUICK_FIX_INFO: "Su tarjeta de crédito no fue reconocida debido a la información incorrecta. Compruebe por favor la siguiente información y asegurarse de que todo correcta. Después de eso, podemos llegar a las mesas de Poker con su pila de fichas. Di cuando...",
	P2P_TITLE_INFO_DEPOSIT: "Por favor, introduzca la información del remitente",
	P2P_TITLE_INFO_WITHDRAW: "Por favor, introduzca la información del Receptor",
	P2P_INSTRUCTIONS: "Envíanos tus fondos.",
	P2P_INSTRUCTIONS_SENDER: "Información del remitente",
	P2P_INSTRUCTIONS_RECEIVER: "Informacion del receptor",
	P2P_INSTRUCTIONS_GET_RECEIVER: "Solicitar Nuevo Nombre",
	P2P_INSTRUCTIONS_PENDING_MTCN: "Información del Receptor",
	P2P_INSTRUCTIONS_INFO: "Usted debe ingresar su Número de Control aquí para ser capaz de reclamar su bono. Las confirmaciones por medio del centro de llamadas no son elegibles para los bonos.",
	P2P_INSTRUCTIONS_INFO_PROCESSING: "Su número de control ha sido enviado. Sus fondos estarán disponibles tan pronto como hayamos confirmado la transacción. Nota: este proceso puede tomar entre 8-12 horas.",
	P2P_SELECT_DEPOSIT: "Seleccione el destinatario",
	P2P_SELECT_WITHDRAW: "Seleccione el beneficiario",
	P2P_FIRST_NAME: 'Nombre',
	P2P_LAST_NAME: 'Apellidos',
	P2P_NAME: "Nombre",
	P2P_AGENCY_NAME: "Nombre de la Agencia",
	P2P_ADDRESS: "Dirección",
	P2P_ADDRESS_LOCATION: "150 metros al norte de la farmacia La Bomba, frente albergue Cataluña, San Pedro de Montes de Oca",
	P2P_RIA: "Haga su pago en una de los siguientes establecimientos",
	P2P_RECEIVER: "Beneficiario",
	P2P_COUNTRY: 'País',
	P2P_STATE: 'Estado',
	P2P_CITY: 'Ciudad',
	P2P_MAKE_PAYMENT: "Haga su pago en uno de los siguientes establecimientos",
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
	P2P_INSTRUCTION_REJECT: "Aviso importante: No seguir las instrucciones a continuación dará como resultado una transacción rechazada. Detalles.",
	P2P_INSTRUCTION_NEXT_HOURS: "La información de este receptor solo es válida durante las próximas 48 horas.",
	P2P_INSTRUCTION_MIN_DEPOSIT: "El depósito mínimo es de $ 50.00, y el máximo es de $ 400.00",
	P2P_INSTRUCTION_ONLY_USD: "Su transacción debe ser enviada en USD y recibida en USD.",
	P2P_INSTRUCTIONS_CORRECT_ADDRESS: "Asegúrese de que su dirección sea correcta. Si necesita cambiar su dirección, puede cambiarla en el cliente. Luego puede solicitar su retiro de Money Transfer a la nueva dirección.",
	PENDING_MTCN: "Confirmaciones Pendientes",
	PENDING_MTCN_SENDER: "Remitente",
	PENDING_MTCN_RECEIVER: "Beneficiario",
	PENDING_MTCN_DESTINATION: "Destino",
	PENDING_MTCN_MTCN: "Número de Control",
	PENDING_MTCN_AMOUNT: "Monto",
	PENDING_MTCN_FEE: "Costos",
	PENDING_MTCN_DIGITS: "dígitos",
	GENCK_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros se procesarán dentro de las 24 horas, pero normalmente se procesan en una hora.",
	SECOND_FACTOR_INFO: "Como medida de seguridad nueva, solicitamos la autenticación de 2 factores cada vez que solicita un retiro",
	SECOND_FACTOR_PHONE_CONFIRMATION: "Por favor, confirme su número de teléfono abajo y solicite su código cuando esté listo",
	SECOND_FACTOR_PHONE_REGISTERED: "Número de teléfono registrado",
	SECOND_FACTOR_CODE: "Ingrese el código aquí",
	SECOND_FACTOR_REQUEST_CODE_BUTTON: "Solicitar código",
	SECOND_FACTOR_ENTER_CODE: "Ingrese el código aquí",
	SECOND_FACTOR_VERIFY_CODE: "Verificar código",
	BONUS_NEWS1: "Buenas Noticias! Tiene",
	BONUS_NEWS2: " 100%",
	BONUS_NEWS3: " de bono en sus depósitos por más de",
	BONUS_NEWS4: " $1,000",
	USE_DIFFERENT_METHOD: "Usar otro método",
	EDIT_DEPOSIT_DETAILS: "Editar detalles del depósito",
	ILL_DEPOSIT_DIFFERENT_WAY: "No gracias, voy a depositar de otra forma",
	GO_TO_POKER_LOBBY: "Ir al salón de Poker",
	SKRILL_EMAIL: "Correo del Skrill",
	ECOPAYZ_ACCOUNT: "Número de cuenta",
	REGISTER_NEW_ACCOUNT_CC: "Agregar nueva tarjeta de crédito",
	REGISTER_NEW_ACCOUNT: "Registrar una cuenta",
	LOADING: "Cargando...",
	M_BELOW_MIN: "Aumente el monto e intente de nuevo por favor",
	M_ABOVE_MAX: "Disminuya el monto e intente de nuevo por favor",
	CREDIT_CARD_REACHED: "La tarjeta de crédito seleccionada ha alcanzado su límite permitido con nosotros. Seleccione otra tarjeta de crédito",
	CC_MAX_TRANSACTION: "La tarjeta de crédito seleccionada ha alcanzado su número máximo de transacciones permitidas. Seleccione otra tarjeta de crédito",
	ONETAP_ACCOUNT: "Cuenta de 1TAP",
	ONETAB_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros se procesarán dentro de las 24 horas, pero normalmente se procesan en una hora.",
	CK_FIRST_NAME: "Primer Nombre",
	CK_MIDDLE_NAME: "Segundo Nombre",
	CK_LAST_NAME: "Apellidos",
	CK_ADDRESS1: "Dirección 1",
	CK_ADDRESS2: "Dirección 2",
	CK_CITY: "Ciudad",
	CK_COUNTRY: "País",
	CK_STATE: "Estado",
	CK_ZIP: "ZIP / Código Postal",
	CK_CONTACT_PHONE: "Número de Teléfono de Contacto",
	CK_EMAIL: "Correo Electrónico",
	CK_SEND_BY: "Enviar por",
	CK_SEND_BY_FEDEX: "FedEx",
	CK_SEND_BY_REGULAR: "Correo Regular",
	IMPORTANT_REMINDERS: "Notas Importantes",
	CARDHOLDER_NAME: "El nombre del titular de tarjeta debe incluir nombre y apellido",

	REDIRECT: "Usted está siendo redirigido",

	//Crypto Transfer
	CRYPTO_AMOUNT_TXT: 'Cripto Monto',
	CRYPTO_REFUND_ADDRESS: 'Dirección de rembolso',
	CRYPTO_DEPOSIT_ADDRESS: 'Dirección de depósito',
	CRYPTO_SEARCH_TXT: 'Buscar moneda',
	CRYPTO_UNAVAILABLE_TXT : 'Temporalmente deshabilitado',
	CRYPTO_SELECT_CURRENCY: 'Seleccione su cripto moneda',
	CRYPTO_REFUND_ERROR_MSG: 'Dirección de devolución invalida',
	CRYPTO_DEPOSIT_HELP: 'Introduzca la dirección de su monedero electrónico para depositar esta transacción.',
	CRYPTO_REFUND_HELP: 'La dirección de reembolso es donde le enviaremos sus fondos si necesitamos reembolsar su transacción. Puede encontrar esto haciendo clic en su billetera de depósito donde recibe monedas. Debería enumerar una dirección de depósito existente. Si no existe, haga clic en generar nueva dirección. Si almacena su criptomoneda en una billetera de hardware, la dirección de reembolso se encuentra en la sección "recibir monedas". Es su depósito o dirección de recepción, dependiendo de la billetera.',
	CRYPTO_2FAT_TITLE: 'Segundo factor de autentificación',
	CRYPTO_INSTRUCTIONS: "Ahora envié sus {cryptoCurrency} aquí.",
	CRYPTO_INSTRUCTIONS_AMOUNT: "Envié {cryptoAmount} {cryptoCurrency} desde su billetera",
	CRYPTO_INSTRUCTIONS_AMOUNT_INFO: "De lo contrario, su transacción no será exitosa.",
	CRYPTO_INSTRUCTIONS_ADDRESS: "Envié la {cryptoCurrency} a la siguiente dirección",
	CRYPTO_INSTRUCTIONS_ADDRESS_INFO: "Por favor incluya el cargo del minero en {cryptoCurrency} cargos de billetera.",
	CRYPTO_MONERO_MESSAGE : "Si ingresa una dirección de reembolso de Monero, NO use una dirección de un intercambio o una billetera compartida que requiera una identificación de pago. Solo use una dirección de reembolso de una billetera que controle, que no requiere una identificación de pago.",
	CRYPTO_EXPIRED_SESSION_MSG : 'Su sesión ha expirado debido a inactividad. Por favor, vuelva a iniciar sesión para continuar usando nuestro cajero.',
	CRYPTO_INSTRUCTIONS_PROCESS_INSIDE: "Las retiradas de Crypto Transfer se procesarán dentro de las 24 horas, pero normalmente se procesan dentro de una hora.",

	//resources
	CC_LIMIT_ERROR_COUNT: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><strong>{displayName}</strong> - <span>The credit card selected has reached its maximum number of transactions allowed. Please select another credit card.</span></div>',
	CC_LIMIT_ERROR_COUNT_TIME_SPAN: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><strong>{displayName}</strong> - <span>The credit card selected has reached its maximum number of transactions allowed. It will be available again in <strong>{remaining} minute(s)</strong>.</span></div>',
	CC_LIMIT_ERROR_AMOUNT: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><strong>{displayName}</strong> - <span>The credit card selected has reached its allowed limit with us. Please select another credit card. It will be available again in <strong>{remaining} minute(s)</strong>.</span></div>',
	CC_LIMIT_ERROR_NUM_CC: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle red"></i><span>You have exceeded the maximum number of different credit cards we allow. Please select from one of the cards already on file.</span></div>',
	CC_LIMIT_ERROR_OTHER: '',
	CC_LIMIT_AVAILABLE: '<div class="alert alert-success" role="alert"><i class="fa fa-check"></i><strong>{displayName}</strong> - <span>available:</span><strong> {available} {currencyCode}</strong></div>',
	CC_LIMIT_BELOW_MIN: '<div class="alert alert-danger" role="alert"><i class="fa fa-ban"></i><span>Our minimum deposit amount is {minAmount} {currencyCode}.</span></div>',
	CC_LIMIT_ABOVE_MAX: '<div class="alert alert-danger" role="alert"><i class="fa fa-ban"></i><span>Our maximum deposit amount is {maxAmount} {currencyCode}.</span></div>',
	CC_LIMIT_ABOVE_AVAILABLE: '<div class="alert alert-info" role="alert"><i class="fa fa-ban"></i><strong>{displayName}</strong> - <span>The maximum amount available for this card is {available} {currencyCode}.</span></div>',
};

export function ES(){
	return _langTags;
};