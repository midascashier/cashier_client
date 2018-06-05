<?php
require_once('config/phpConfig.php');
require_once 'system/Startup.class.php';
session_start();

/**
 * @author Mario Vargas Ugalde
 */
class ClientRedirect{

  /**
   * session id after invoke login action
   */
  private $sid;

  /**
   * ClientRedirect constructor.
   */
  function __construct(){
    $cashierParams = array();
    $cashierParams["sid"] = "";
    $cashierParams["tuid"] = "";
    $cashierParams["format"] = "json";
    $cashierParams["f"] = "authCustomer";
    $cashierParams["platform"] = "desktop";
    $cashierParams["bd"] = $_REQUEST["bd"];
    $cashierParams["lang"] = $_REQUEST['lang'];
    $cashierParams["ioBB"] = $_REQUEST["ioBB"];
    $cashierParams["companyId"] = COMPANY_ID_POKER;
    $cashierParams["doLogin"] = $_REQUEST["doLogin"];
    $cashierParams["remoteAddr"] = $this->customerIp();
    $cashierParams["referrer"] = $_REQUEST["referrer"];
    $cashierParams["username"] = $_REQUEST["username"];
    $cashierParams["password"] = $_REQUEST["password"];
    $cashierParams["btnlogin"] = $_REQUEST["btnlogin"];
    $cashierParams["sys_access_pass"] = ACCESS_PASSWORD;
    $cashierParams["atDeviceId"] = $_REQUEST["atDeviceId"];
    $cashierParams["userAgent"] = $_SERVER["HTTP_USER_AGENT"];
    $cashierParams["remoteSessionId"] = $_REQUEST["remoteSessionId"];
    $cashierParams["xForwardedFor"] = $this->customerIp();;
    $cashierParams["remoteHost"] = gethostbyaddr($_SERVER['REMOTE_ADDR']);

    if (DEBUG_ENABLED){
      $cashierParams["XDEBUG_SESSION_START"] = "ECLIPSE_DBGP";
    }

    echo $this->domHTML($cashierParams);
  }

  private function domHTML($params){

    $this->loginManager($params);
    if($this->sid){
      $customerData = TblCustomer::getInstance();
      $customer = $customerData->getCustomerByUsername($params['companyId'], $params['username']);
      $remoteCompany = $customer->getRemoteCompany();

      $content = "
        <form id='alForm' action='/' method='POST'>
          <input type='hidden' id='sid' name='sid' value={$this->sid}>
          <input type='hidden' id='option' name='option' value={$_REQUEST['option']}>
          <input type='hidden' id='companyId' name='companyId' value={$params['companyId']}>
          <input type='hidden' id='remoteAddr' name='remoteAddr' value={$params['remoteAddr']}>
          <input type='hidden' id='remoteHost' name='remoteHost' value={$params['remoteHost']}>
          <input type='hidden' id='xForwardedFor' name='xForwardedFor' value={$params['xForwardedFor']}>
          <input type='hidden' id='remoteCompany' name='remoteCompany' value={$remoteCompany}>
        </form>

        <script>
          var login_form = document.getElementById('alForm');
          if(login_form){
            login_form.submit();
          }
        </script>

        <img src='images/loader-70x70.gif' />
      ";
    }else{
      $content = '<img src="images/loader-40x40.gif" />';
    }

    return "
      <center>
        <h3>Loading Cashier</h3>
        <h3>Processing request over a secure connection...</h3><br>
        {$content}
      </center> 
    ";
  }

  private function loginManager($params){

    $params['companyId'] = COMPANY_ID_POKER;

    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_POST => 1,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_SSL_VERIFYHOST => 0,
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_POSTFIELDS => $params,
      CURLOPT_URL => CASHIER_CONTROLLER_WS,
      CURLOPT_USERAGENT => "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"
    ));

    $resp = curl_exec($curl);
    $result = json_decode($resp);

    curl_close($curl);

    if ($result && $result->response && $result->response->sid){
      $this->sid = $result->response->sid;
    }else{
      //log in order to trace the issues on login
      $this->sid = null;
      //log in order to trace the issues on login
      $logFile = "login_error_" . strtoupper($params["username"]) . ".txt";
      $content = date('Y-m-d H:i:s') . ":\n";
      $content .= "request: \n";
      $strParams = json_encode($params);
      $content .= $strParams ." \n";
      $content .= "response: \n";
      $content .= $resp ." \n";
      $content .= "\n";
      @file_put_contents($logFile, $content, FILE_APPEND);
      //end of login trace
    }
  }

  private function customerIp(){
    $clientIP = $_SERVER['HTTP_CLIENT_IP'];
    if (!$clientIP){
      if ($_SERVER['HTTP_X_FORWARDED_FOR'] && (strlen($_SERVER['HTTP_X_FORWARDED_FOR']) > 0)){
        $proxy = $_SERVER['HTTP_X_FORWARDED_FOR'];
        if (strpos($proxy, ",") !== false){
          $proxyA = explode(',', $proxy);
          if (is_array($proxyA)){
            array_pop($proxyA);
            $clientIP = trim(array_pop($proxyA));
          }
        }else{
          $clientIP = trim($proxy);
        }
      }
    }
    // $_SERVER['HTTP_X_FORWARDED']
    if (!$clientIP){
      $clientIP = $_SERVER['HTTP_X_FORWARDED'];
    }
    // $_SERVER['HTTP_FORWARDED_FOR']
    if (!$clientIP){
      $clientIP = $_SERVER['HTTP_FORWARDED_FOR'];
    }
    // $_SERVER['HTTP_FORWARDED']
    if (!$clientIP){
      $clientIP = $_SERVER['HTTP_FORWARDED'];
    }
    // $_SERVER['REMOTE_ADDR']
    if (!$clientIP){
      $clientIP = $_SERVER['REMOTE_ADDR'];
    }
    // DEFAULT
    if (!$clientIP){
      $clientIP = '127.0.0.1';
    }

    return $clientIP;
  }
}

new ClientRedirect();