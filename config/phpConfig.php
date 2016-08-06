<?php

class phpConfig
{
	/**
	 * cashier controller url
	 *
	 * @var string
	 */
	const CASHIER_CONTROLLER_WS = 'http://cashier.localhost:8080/wscashier/wsController.php';

  /**
   * Enable / Disable Flag - Must be in sync with phpConfig::SECURITY_IOVATION_ENABLE
   *
   * @var bool
   */
  const SECURITY_IOVATION_ENABLE = true;

  /**
   * Enable / Disable Flag - Must be in sync with phpConfig::SECURITY_ACUITYTEC_ENABLE
   *
   * @var bool
   */
	const SECURITY_ACUITYTEC_ENABLE = true;
}
?>