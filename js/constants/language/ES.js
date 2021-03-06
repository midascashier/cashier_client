/**
 * Created by jobando on 03-Jun-16.
 */
let _langTags = {
	//Sorts words
	IMPORTANT: "Importante: ",
	WARNING_MINER_DEPOSIT_CC: "Enviar solamente {cryptoName} ({cryptoSymbol}) a esta dirección. Al envíar otra criptomoneda podría perder los fondos.",
	WARNING_MINER_DEPOSIT_EXTRA: "Enviar solamente <strong>{cryptoName} {cryptoSymbol}</strong> a esta dirección y para asegurarse de que utiliza el correspondiente <strong>{extraInfoName}</strong>. Si envía cualquier otro <strong>{extraInfoName}</strong>, se podría perder los fondos.",
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
	METHOD_REQUESTS: "Mis Solicitudes",
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
	TRANSACTION_HISTORY_STATUS_PENDING: "Tu transacción se encuentra en cola de revisión.",
	TRANSACTION_HISTORY_STATUS_DEFERRED: "Pending verify information.",
	TRANSACTION_HISTORY_STATUS_PROCESSING: "Tu transacción se encuentra en proceso de ser acreditada o pagada.",
	TRANSACTION_HISTORY_STATUS_PRE_APPROVE: "A la espera de comprobar la información.",
	TRANSACTION_HISTORY_STATUS_APPROVED: "Tu transacción ha sido aprobada y será acreditada o pagada lo antes posible.",
	TRANSACTION_HISTORY_STATUS_REJECTED: "Por favor verifique la información.",
	TRANSACTION_HISTORY_STATUS_CANCELLED: "Tu transacción fue cancelada, por favor revisa tu correo electrónico para más detalles.",
	TRANSACTION_HISTORY_STATUS_FAILED: "Por favor contactenos para más información.",
	TRANSACTION_HISTORY_STATUS_REJECTED_AND_FAILED: "Un error no nos permitió procesar tu transacción, por favor contáctanos para más detalles.",

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
	PROCESSING_WITHDRAW_IMPORTANT_NOTE: "NOTA IMPORTANTE",
	//ProcessingTransaction
	PROCESSING: "Procesando... por favor espere!",
	PROCESSING_DEPOSIT_INFORMATION_TITLE: "Ingrese la Información para el Depósito",
	PROCESSING_DEPOSIT_INFORMATION_TITLE_CREDIT_CARD: "Por favor introduzca los datos de la tarjeta",
	PROCESSING_WITHDRAW_INFORMATION_TITLE: "Ingrese la Información para el Retiro",
	PROCESSING_WITHDRAW_IMPORTANT_NOTE_MESSAGE: "Todos los cheques realizados por WPN deben hacerse efectivos dentro de 60 días al ser recibidos. Los cheques que no se hagan efectivos durante este tiempo rebotarán y resultarán en pérdida permamente para el jugador.",
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
	PROCESSING_GO_BACK: "Regresar",
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
	SKRILL_INSTRUCTIONS_PROCESS_INSIDE: "Todos los pagos se procesan en el orden en que se reciben. El tiempo promedio de procesamiento tarda entre 24 y 72 horas, aunque algunos casos pueden tardar hasta 15 días hábiles en procesarse, ya que todas las solicitudes están sujetas a una revisión exhaustiva.",
	SELECT_ACCOUNT: "Seleccione su cuenta",
	NETELLER_SECURE: "2FA o ID de Seguridad",
	NETELLER_NEW: "Ingrese su cuenta de Neteller",
	NETELLER_INSTRUCTIONS_PROCESS_INSIDE: "Todos los pagos se procesan en el orden en que se reciben. El tiempo promedio de procesamiento tarda entre 24 y 72 horas, aunque algunos casos pueden tardar hasta 15 días hábiles en procesarse, ya que todas las solicitudes están sujetas a una revisión exhaustiva.",
	DEBITCARD_INFO: 'Información de la tarjeta de débito',
	DEBITCARD_INSTRUCTIONS_PROCESS_INSIDE: "Todos los pagos se procesan en el orden en que se reciben. El tiempo promedio de procesamiento tarda entre 24 y 72 horas, aunque algunos casos pueden tardar hasta 15 días hábiles en procesarse, ya que todas las solicitudes están sujetas a una revisión exhaustiva.",
	DEBITCARD_NEW_IN_DONWLOAD: "NUEVO EN TARJETAS DE DÉBITO, HAGA CLIC AQUÍ PARA DESCARGAR E IMPRIMIR EL FORMULARIO DE KYC",
	DEBITCARD_STEEPS_INFORMATION: "<p>El servicio al cliente requerirá este formulario para proceder con la entrega GRATUITA de su tarjeta de débito.</p><p>Para solicitar una targeta débito, siga estos sencillos pasos:</p><p><span>1.</span> Escanee o fotografíe una de las siguientes opciones:</p><ul><li>Pasaporte</li><li>ID nacional</li><li>Licencia de conducir con SSC</li></ul><p><span>2.</span> Escanee o fotografíe su factura de servicios (debe coincidir con la dirección y el nombre en el formulario KYC)</p><p><span>3.</span> Escanee o fotografíe el formulario KYC</p><p><span>4.</span> Envíe por correo electrónico su escaneado documentos a cashier@DigitalExchange.eu</p>",
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
	BITCOIN_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros de BitCoin se procesarán dentro de las 24 horas, pero normalmente se procesan ensegida.",
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
	CREDIT_CARD_DEPOSIT_SUCCESSFUL: "<div class='title'>Tu depósito de {currencyAmount} fue exitoso.</div><p>Este cargo aparecerá en tu extracto como <strong>{descriptor}</strong>.</p><p>Tu saldo ahora es {currencyFormat}</p><p>Se ha enviado un correo electrónico a {email} con los detalles de la transacción.</p>",
	CREDIT_CARD_DEPOSIT_REJECTED: "<p>Su tarjeta de crédito nos dijo que <strong>{currencyFormat}</strong> excede el límite de crédito.</p><p>¿Qué cantidad más pequeña le gustaría depositar?</p>",
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
	P2P_IMPORTANCE_NOTICE: "<strong>Haga su pago</strong><strong>Aviso importante: no seguir las instrucciones a continuación dará como resultado una transacción rechazada.</strong>",
	P2P_INSTRUCTIONS_ONLY_VALID: "<li><strong>Su transacción debe ser enviada en USD y recibida en USD</strong>.</li><li>La información de este receptor solo es válida durante las próximas 48 horas.</li>",
	PENDING_MTCN: "Confirmaciones Pendientes",
	PENDING_MTCN_SENDER: "Remitente",
	PENDING_MTCN_RECEIVER: "Beneficiario",
	PENDING_MTCN_DESTINATION: "Destino",
	PENDING_MTCN_MTCN: "Número de Control",
	PENDING_MTCN_AMOUNT: "Monto",
	PENDING_MTCN_FEE: "Costos",
	PENDING_MTCN_DIGITS: "dígitos",
	GENCK_INSTRUCTIONS_PROCESS_INSIDE: "Todos los pagos se procesan en el orden en que se reciben. El tiempo promedio de procesamiento tarda entre 24 y 72 horas, aunque algunos casos pueden tardar hasta 15 días hábiles en procesarse, ya que todas las solicitudes están sujetas a una revisión exhaustiva.",
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
	ECOPAYZ_WITHDRAWS_PROCESS: "Los retiros se procesan dentro de las próximas 24 horas, pero normalmente se procesan en una hora.",
	REGISTER_NEW_ACCOUNT_CC: "Agregar nueva tarjeta de crédito",
	REGISTER_NEW_ACCOUNT: "Registrar una cuenta",
	LOADING: "Cargando...",
	M_BELOW_MIN: "Aumente el monto e intente de nuevo por favor",
	M_ABOVE_MAX: "Disminuya el monto e intente de nuevo por favor",
	CREDIT_CARD_REACHED: "La tarjeta de crédito seleccionada ha alcanzado su límite permitido con nosotros. Seleccione otra tarjeta de crédito",
	CC_MAX_TRANSACTION: "La tarjeta de crédito seleccionada ha alcanzado su número máximo de transacciones permitidas. Seleccione otra tarjeta de crédito",
	ONETAP_ACCOUNT: "Cuenta de 1TAP",
	ONETAB_INSTRUCTIONS_PROCESS_INSIDE: "Todos los pagos se procesan en el orden en que se reciben. El tiempo promedio de procesamiento tarda entre 24 y 72 horas, aunque algunos casos pueden tardar hasta 15 días hábiles en procesarse, ya que todas las solicitudes están sujetas a una revisión exhaustiva.",
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
	CRYPTO_UNAVAILABLE_TXT: 'Temporalmente deshabilitado',
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
	CRYPTO_MONERO_MESSAGE: "Si ingresa una dirección de reembolso de Monero, NO use una dirección de un intercambio o una billetera compartida que requiera una identificación de pago. Solo use una dirección de reembolso de una billetera que controle, que no requiere una identificación de pago.",
	CRYPTO_EXPIRED_SESSION_MSG: 'Su sesión ha expirado debido a inactividad. Por favor, vuelva a iniciar sesión para continuar usando nuestro cajero.',
	CRYPTO_INSTRUCTIONS_PROCESS_INSIDE: "Los retiros de Crypto Transfer se procesarán dentro de las 24 horas, pero generalmente se procesan lo antes posible.",
	CRYPTO_WITHDRAWS_INSIDE: "Los retiros de Crypto Transfer se procesarán dentro de las 24 horas, pero generalmente se procesan lo antes posible.",
	CRYPTO_PROCESS_VALIDATION_ERROR: "Algo salió mal con su solicitud. Por favor inténtalo de nuevo",

	//resources
	CC_LIMIT_ERROR_COUNT: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle"></i><strong>{displayName}</strong> - <span>La tarjeta seleccionada ha alcanzado el máximo número de transacciones permitido por nosotros. Por favor intente otra tarjeta</span></div>',
	CC_LIMIT_ERROR_COUNT_TIME_SPAN: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle"></i><strong>{displayName}</strong> - <span>La tarjeta seleccionada ha alcanzado el máximo número de transacciones permitido por nosotros. Estará disponible de nuevo en: <strong>{remaining} minuto(s)</strong></span></div>',
	CC_LIMIT_ERROR_AMOUNT: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle"></i><strong>{displayName}</strong> - <span>La tarjeta seleccionada ha alcanzado nuestro límite permitido. Por favor intente otra tarjeta</span></div>',
	CC_LIMIT_ERROR_NUM_CC: '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle"></i><span>Usted ha excedido el número máximo de tarjetas permitidas con nosotros. Por favor seleccione una registrada anteriormente</span></div>',
	CC_LIMIT_ERROR_OTHER: '',
	CC_LIMIT_AVAILABLE: '<div class="alert alert-success" role="alert"><i class="fa fa-check"></i><strong>{displayName}</strong> - <span>available:</span><strong> {available} {currencyCode}</strong></div>',
	CC_LIMIT_BELOW_MIN: '<div class="alert alert-danger" role="alert"><i class="fa fa-ban"></i><span>Our minimum deposit amount is {minAmount} {currencyCode}</span></div>',
	CC_LIMIT_ABOVE_MAX: '<div class="alert alert-danger" role="alert"><i class="fa fa-ban"></i><span>Our maximum deposit amount is {maxAmount} {currencyCode}</span></div>',
	CC_LIMIT_ABOVE_AVAILABLE: '<div class="alert alert-info" role="alert"><i class="fa fa-ban"></i><strong>{displayName}</strong> - <span>The maximum amount available for this card is {available} {currencyCode}</span></div>',

	ASTROPAY_SUCCESS_DEPOSIT_BALANCE: "<div class='title'>Tu depósito de {currencyAmount} {currency} fue exitoso.</div><p>Su saldo ahora es {balance} {currency}</p><p> Se ha enviado un correo electrónico a {email} con los detalles de la transacción.</p>",

	TICKET_SUCCESS_DEPOSIT: "<div class='title'>Tu depósito de {currencyAmount} {currency} fue exitoso.</div><p>Su saldo ahora es {balance} {currency}</p><p> Se ha enviado un correo electrónico a {email} con los detalles de la transacción.</p>",
	TICKET_SUCCESS_WITHDRAW: "<div class='title'>Tu retiro de {currencyAmount} {currency} fue exitoso.</div><p>Su saldo ahora es {balance} {currency}</p><p> Se ha enviado un correo electrónico a {email} con los detalles de la transacción.</p>",

	MY_REQUEST_TITLE: "Mis Solicitudes",
	DOCS_FILE_TAB_KYC: "Verificar mi identidad",
	DOCS_FILE_TAB_UPDATEACCOUNTINFO: "Actualizar mi información",
	DOCS_FILE_TAB_CCISSUES: "Informar de un problema",
	DOCS_FILE_TAB_RECOVERY: 'Recuperación',
	DOCS_FILE_NEXT_STEP: 'Siguiente',
	DOCS_FILE_REJECTED_REASONS_TITLE: 'Razones de rechazo',
	MY_REQUEST_ADDITIONAL_INFO: "Informacion adicional",
	MY_REQUEST_RECOVERY: "Recuperar",
	MY_REQUEST_VERIFY_TITLE: "Tipo de verificación",
	MY_REQUEST_DOCS_OPTION_ID_TXT: "ID",
	MY_REQUEST_DOCS_OPTION_VE_EW_TXT: "BILLETERA ELECTRÓNICA",

	DRAG_DROP_ERROR_MAX_FILE: "Máximo 5 archivos, {fileName} no aceptado.",
	DRAG_DROP_ERROR_MAX_SIZE: "Maximum size 5 mb, {fileName} not accepted",
	DRAG_DROP_ERROR_FILE_TYPE: "Tipo de archivo, {fileName} no aceptado",

	DRAG_DROP_FILES_TXT: "Arrastra tus archivos aquí o haz clic en esta área.",
	DRAG_DROP_UPLOAD_TXT: "Subir",
	DOCFILE_FORM_LABEL_ISSUE_REASON: 'Razón de rechazo',
	DOCFILE_FORM_LABEL_FILE_ID_SELFIE: 'Selfi',
	DOCFILE_FORM_LABEL_FILE_CARD_FRONT: 'Lado frontal',
	DOCFILE_FORM_LABEL_FILE_CARD_BACK: 'Lado trasero',
	DOCFILE_FORM_LABEL_FILE_ID_3RD: 'Identificación de tercero',
	DOCFILE_FORM_LABEL_CC_LIST: "Seleccione su tarjeta",
	DOCFILE_FORM_OPTION_DUPLICATE_CHARGE: 'Cargo duplicado',
	DOCFILE_FORM_OPTION_REJECTED_BANK: 'Pago rechazado pero procesado por el banco',
	DOCFILE_FORM_OPTION_OVERCHARGE: 'Sobrecargos en la operación',

	DOCS_FILE_VERIFY_IMPORTANT_TXT: 'Cargue solo imágenes, los cuatro bordes de la identificación o pasaporte deben estar visibles en la imagen y la información debe estar clara, si es posible evite usar el flash.',
	DOCS_FILE_SELECT_DOCUMENT_TYPE: 'Seleccione el tipo de documento.',
	DOCS_FILE_VERITY_ADD_DOCUMENT: 'Nuevo Documento',
	DOCFILE_FORM_LABEL_FILE_ID: "Envíe el archivo correspondiente para el proceso de identificación.",
	BD_TEXT_TYPE_LICENCE2: "Licencia de conducir.",
	BD_TEXT_TYPE_ID: "Documento de identificación.",
	BD_TEXT_TYPE_PASSPORT: "Pasaporte",
	BD_TEXT_TYPE_EWALLET: "Monedero electrónico",
	BD_TEXT_TYPE_UTILITY_BILL: "Factura de servicios públicos",
	BD_TEXT_TYPE_UTILITY: "Factura de servicios públicos",
	BD_TEXT_TYPE_BANK: "Extracto de cuenta",

	DOCFILE_FORM_LABEL_UPDATE_INFO_REASON: "Seleccione el campo a actualizar",
	DOCFILE_FORM_OPTION_EMAIL: "Correo electrónico",
	DOCFILE_FORM_OPTION_PHONE: "Telephone",
	DOCFILE_FORM_OPTION_ADDRESS: "Domicilio",

	DOCFILE_FORM_LABEL_UPDATE_INFO_VALUE: "Ingrese el valor",

	DOCFILE_FORM_LABEL_NAME: "Nombre completo",
	DOCFILE_FORM_LABEL_IDNUMBER: "Número de identificación",
	DOCFILE_FORM_LABEL_EMAIL: "Correo electrónico",
	DOCFILE_FORM_LABEL_PHONE: "Número de teléfono",
	DOCFILE_FORM_LABEL_BANKNAME: "Nombre del banco",
	DOCFILE_FORM_LABEL_ACCOUNT_TYPE: "Tipo de cuenta",
	DOCFILE_FORM_OPTION_SAVING_ACCOUNT: "Cuenta de ahorros",
	DOCFILE_FORM_OPTION_CURRENT_ACCOUNT: "Cuenta corriente",
	DOCFILE_FORM_LABEL_ACCOUNT_NO: "Número de cuenta",
	BD_TEXT_TYPE_ID_SELFIE: "Selfi",
	BD_TEXT_TYPE_CARD: 'Tome una foto de su tarjeta en el lado correspondiente',
	BD_TEXT_TYPE_3RD_ID: 'Identificación de tercero',

	DOCS_FILE_VERITY_CHANGE_OPTIONS: "Cambiar opcion",
	DOCS_FILE_GO_HOME: "< Inicio",
	DOCS_FILE_GO_BACK: "< Regresar",
	DOCS_FILE_EDIT_BTN: 'Editar',

	DOCS_FILE_UPLOAD_ERROR_RESPONSE: 'Error al cargar',
	DOCS_FILE_UPLOAD_SUCCESS_RESPONSE: '¡Carga exitosa!',
	DOCS_FILE_UPLOAD_SUCCESS_NOTIFIED_: 'Se te notificará sobre el estado de este proceso',
	DOCS_FILE_KYC_SUCCESS_ID: 'Su verificación esta completa',

	DOCS_FILE_STATUS_1: 'ENVIADO',
	DOCS_FILE_STATUS_2: 'EN REVISION',
	DOCS_FILE_STATUS_3: 'PENDIENTE',
	DOCS_FILE_STATUS_4: 'RECHAZADO',
	DOCS_FILE_STATUS_5: 'APROVADO',

	DOCFILE_FORM_KYC_TABLE_DOCUMENT: 'Documento',
	DOCFILE_FORM_KYC_TABLE_CREATED_DATE: 'Fecha de creación',
	DOCFILE_FORM_KYC_TABLE_STATUS: 'Estado',
	DOCFILE_FORM_KYC_TABLE_ACTION: 'Acción',
	DOCFILE_FORM_KYC_ID_TITLE: 'Identificación',
	DOCFILE_FORM_UPDATEINFO_TITLE: 'Actualizar información de la cuenta',
	DOCFILE_FORM_ISSUE_TITLE: 'Nuevo problema con la tarjeta de crédito',
	DOCFILE_FORM_KYC_CARD_TITLE: 'Verificación de tarjeta',
	DOCFILE_FORM_KYC_EWALLET_TITLE: 'Verificación de billetera electronica',
	DOCFILE_FORM_RECOVERY_TITLE: 'Recuperación',
	DOCFILE_FORM_VERIFICATION_TITLE: 'Verificación adicional',
	DOCFILE_FORM_PROOF_TITLE: 'Prueba de domicilio',
	DOCFILE_FORM_OPTION_FIX_NAME: 'Corregir nombre',
	DOCFILE_FORM_PENDING_DEPOSIT_TITLE: 'Deposito pendiente',
	DOCFILE_FORM_LABEL_FILE_BANK_STATEMENT: 'Depósito pendiente',
	DOCFILE_FORM_LABEL_FILE_BANK_STATEMENT2: 'Depósito pendiente',
	DOCFILE_FORM_LABEL_FILE_EWALLET: 'Foto de su billetera electrónica',
	DOCFILE_FORM_LABEL_FILE_UTILITY: 'Recibo de servicio público',
	DOCFILE_FORM_THIRD_ID_TITLE: 'ID de tercero',
	DOCFILE_FORM_BANK_LETTER_TITLE: 'Carta bancaria',
	DOCFILE_FORM_LABEL_FILE_LETTER: 'Carta bancaria',

	DOCS_FILE_TAB_VERIFICATIONREQUIRED: "Información Adicional",

	AGENT_TRANSFER_USER_ACCOUNT: "Cuenta de usuario",
	AGENT_TRANSFER_FEE_PAYMENT: "Pague le costo de envío con",
	AGENT_TRANSFER_FEE_PAYMENT_CASH: "Efectivo",
	AGENT_TRANSFER_FEE_PAYMENT_BETPOINTS: "BetPoints",
	AGENT_TRANSFER_INVALID_USER_ACCOUNT: "Verifique que la cuenta exista",
	AGENT_TRANSFER_ACCOUNT_FROM: "Transferir desde",
	AGENT_TRANSFER_ACCOUNT_TO_USERNAME: "Cuenta destino",
	AGENT_TRANSFER_ACCOUNT_TO_FULLNAME: "Nombre",

	SECURITY_BLOCK_TITTLE: "Bloqueo de Seguridad",
	SECURITY_BLOCK_MESSAGE: "El método de pago que estás intentando utilizar se encuentra asociado a otra cuenta. Para ayudarte a resolver el problema, por favor contáctanos.",

	METHODS_NO_AVAILABLE_DEPOSITS: 'Depósitos',
	METHODS_NO_AVAILABLE_WITHDRAWALS: 'Retiros',
	METHODS_NO_AVAILABLE_TITLE: 'Bloqueo de Seguridad',
	METHODS_NO_AVAILABLE_MESSAGE: 'Selección actual no disponible </br> Por favor contactar a servicio al cliente para obtener asistencia inmediata.',

	WITHDRAW_PASS_MODAL_TITTLE: 'Por favor ingrese su contraseña',
	WITHDRAW_PASS_MODAL_WRONG_MESSAGE: 'Contraseña incorrecta, por favor intente de nuevo.',
	VISA_FEE_MAIN: 'Tenga en cuenta que WPN cobra 10% en todas las transacciones de Visa. Si, por ejemplo, usted deposita $100 con Visa, se acreditarán $90 en su cuenta de póker.',

  ASK_INFO_100200100: 'Aceptamos transferencias bancarias al banco local. Sin cargos. En moneda local. Para más detalles, póngase en contacto con support@pokernuts.eu.',
  ASK_INFO_100200200: 'Tenemos método de depósito en efectivo en Israel. Para el agente más cercano, póngase en contacto con support@pokernuts.eu.'
};

export function ES(){
	return _langTags;
}
