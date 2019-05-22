<?php

  /**
   * cashier controller url
   *
   * @var string
   */
  const CASHIER_CONTROLLER_WS = 'http://cashier:8080/wscashier/wsController.php';

  /**
   * Enable / Disable Flag - Must be in sync with phpConfig::SECURITY_IOVATION_ENABLE
   *
   * @var bool
   */
  const SECURITY_IOVATION_ENABLE = false;

  /**
   * Enable / Disable Flag - Must be in sync with phpConfig::SECURITY_ACUITYTEC_ENABLE
   *
   * @var bool
   */
  const SECURITY_ACUITYTEC_ENABLE = false;

  /**
   * skin name
   */
  const SKIN_POKER_HTTP_DOMAIN_NAME = "poker.new";

  /**
   * CompanyId
   */
  const COMPANY_ID_POKER = '50';

 /**
  * CompanyId Poker Nuts
  */
  const COMPANY_ID_PN = '51';

 /**
  * CompanyId Poker King
  */
  const COMPANY_ID_PK = '52';

  /**
   * debug active
   */
  const DEBUG_ENABLED = false;

  /**
   * access password
   */
  const ACCESS_PASSWORD = 1;

  /**
   * online user id
   */
  const ONLINE_BE_USER_ID = 10093;

  /**
   * timeout of connect
   */
  const WS_CONNECT_TIMEOUT = 10;

  /**
   * timeout of execution
   */
  const WS_TIMEOUT = 30;

  const _WS_CASHIER = 'http://cashier:8080/wscashier/wsController.php';
  const _WS_LIMITS = 'http://cashier:8080/wsprivate/wsLimits.php';
  const _WS_BACKEND = 'http://cashier.backend:8080/ws/wsBEController.php';
  const _WS_BONUS = 'http://bonus:8080/ws/wsBonus.php';

?>
