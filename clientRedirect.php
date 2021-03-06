<?php
require_once('config/phpConfig.php');
session_start();

/**
 * @author Mario Vargas Ugalde
 */
class ClientRedirect
{

  /**
   * session id after invoke login action
   */
  private $sid;

  /**
   * validate if is invalid login
   *
   * @var bool
   */
  private $isInvalid = false;

  /**
   * ClientRedirect constructor.
   */
  function __construct()
  {
    $companyId = COMPANY_ID_POKER;
    $skin = strtoupper($_REQUEST["skin"]);
    if(defined("COMPANY_ID_POKER_".$skin)){
      $companyId = constant("COMPANY_ID_POKER_".$skin);
    }

    $cashierParams = array();
    $cashierParams["format"] = "json";
    $cashierParams["f"] = "authCustomer";
    $cashierParams["platform"] = "desktop";
    $cashierParams["bd"] = $_REQUEST["bd"];
    $cashierParams["lang"] = $_REQUEST['lang'];
    $cashierParams["ioBB"] = $_REQUEST["ioBB"];
    $cashierParams["companyId"] = $companyId;
    $cashierParams["doLogin"] = $_REQUEST["doLogin"];
    $cashierParams["remoteAddr"] = $this->customerIp();
    $cashierParams["referrer"] = $_REQUEST["referrer"];
    $cashierParams["username"] = $_REQUEST["username"];
    $cashierParams["password"] = $_REQUEST["password"];
    $cashierParams["redirectSite"] = $_REQUEST["redirectSite"];
    $cashierParams["sys_access_pass"] = ACCESS_PASSWORD;
    $cashierParams["atDeviceId"] = $_REQUEST["atDeviceId"];
    $cashierParams["userAgent"] = $_SERVER["HTTP_USER_AGENT"];
    $cashierParams["remoteSessionId"] = $_REQUEST["remoteSessionId"];
    $cashierParams["xForwardedFor"] = $this->customerIp();;
    $cashierParams["remoteHost"] = $_SERVER['HTTP_HOST'];

    $content = $this->domHTML($cashierParams);
    if($content){
      echo $content;
    }else{
      if($this->isInvalid){
        include 'invalidLogin.php';
      }else{
        include 'rejectLogin.php';
      }
    }
  }

  /**
   * Render current DOM
   *
   * @param $params
   *
   * @return string
   */
  private function domHTML($params)
  {
    $this->loginManager($params);

    if($this->sid){
      $customerData = $this->customerInfo();
      $customerInfo = $customerData->customerInfo;
      $remoteCompany = $customerInfo->remoteCompany;

      $vip = $customerInfo->vip;
      $newbie = $customerInfo->isNewbie;
      $country = $customerInfo->country;

      $username = strtolower($params['username']);
      $lang = ($params['lang']) ? strtolower($params['lang']) : 'en';
      $option = $_REQUEST['option'];
      $sid = $this->sid;
      if ($username == 'midastp')
      {
        if(DEBUG_ENABLED)
        {
          $content = "
          <script>
            window.location = 'http://localhost:4600/#/al/$sid/$lang/$option';
          </script>

          <img src='images/loader-70x70.gif' />
        ";
        }
        else
        {
          $content = "
          <script>
            window.location = 'https://poker.secureprivate.com/#/al/$sid/$lang/$option';
          </script>

          <img src='images/loader-70x70.gif' />
        ";
        }
      }
      else
      {
          $content = "
            <form id='alForm' action='/' method='POST'>
              <input type='hidden' id='vip' name='vip' value={$vip}>
              <input type='hidden' id='sid' name='sid' value={$this->sid}>
              <input type='hidden' id='newbie' name='newbie' value={$newbie}>
              <input type='hidden' id='country' name='country' value={$country}>
              <input type='hidden' id='option' name='option' value={$option}>
              <input type='hidden' id='companyId' name='companyId' value={$params['companyId']}>
              <input type='hidden' id='remoteCompany' name='remoteCompany' value={$remoteCompany}>
              <input type='hidden' id='remoteAddr' name='remoteAddr' value={$params['remoteAddr']}>
              <input type='hidden' id='remoteHost' name='remoteHost' value={$params['remoteHost']}>
              <input type='hidden' id='xForwardedFor' name='xForwardedFor' value={$params['xForwardedFor']}>
              <input type='hidden' id='redirectSite' name='redirectSite' value={$params['redirectSite']}>
            </form>

            <script>
              var login_form = document.getElementById('alForm');
              if(login_form){
                login_form.submit();
              }
            </script>

            <img src='images/loader-70x70.gif' />
          ";
      }

      return "
      <center>
        <h3>Loading Cashier</h3>
        <h3>Processing request over a secure connection...</h3><br>
        {$content}
      </center>
    ";
    }
  }

  /**
   * Call login manager verification
   *
   * @param $params
   */
  private function loginManager($params)
  {
    $result = $this->wsRequest($params);

    $this->sid = $result->sid;
  }

  /**
   * Get current customer info
   *
   * @return mixed
   */
  private function customerInfo()
  {
    $params['sid'] = $this->sid;
    $params['f'] = 'customerInfo';
    $params['sys_access_pass'] = ACCESS_PASSWORD;

    return $this->wsRequest($params);
  }

  /**
   * Get real customer ip
   *
   * @return string
   */
  private function customerIp()
  {
    $clientIP = $_SERVER['HTTP_CLIENT_IP'];
    if(!$clientIP){
      if($_SERVER['HTTP_X_FORWARDED_FOR'] && (strlen($_SERVER['HTTP_X_FORWARDED_FOR']) > 0)){
        $proxy = $_SERVER['HTTP_X_FORWARDED_FOR'];
        if(strpos($proxy, ",") !== false){
          $proxyA = explode(',', $proxy);
          if(is_array($proxyA)){
            array_pop($proxyA);
            $clientIP = trim(array_pop($proxyA));
          }
        }else{
          $clientIP = trim($proxy);
        }
      }
    }
    // $_SERVER['HTTP_X_FORWARDED']
    if(!$clientIP){
      $clientIP = $_SERVER['HTTP_X_FORWARDED'];
    }
    // $_SERVER['HTTP_FORWARDED_FOR']
    if(!$clientIP){
      $clientIP = $_SERVER['HTTP_FORWARDED_FOR'];
    }
    // $_SERVER['HTTP_FORWARDED']
    if(!$clientIP){
      $clientIP = $_SERVER['HTTP_FORWARDED'];
    }
    // $_SERVER['REMOTE_ADDR']
    if(!$clientIP){
      $clientIP = $_SERVER['REMOTE_ADDR'];
    }
    // DEFAULT
    if(!$clientIP){
      $clientIP = '127.0.0.1';
    }

    return $clientIP;
  }

  /**
   * Execute WS to cashier
   *
   * @param $params
   *
   * @return mixed
   */
  private function wsRequest($params)
  {
    if(DEBUG_ENABLED){
      $params["XDEBUG_SESSION_START"] = "ECLIPSE_DBGP";
    }

    $curl = curl_init();
    try{
      curl_setopt_array($curl, array(
        CURLOPT_POST => 1,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POSTFIELDS => $params,
        CURLOPT_URL => CASHIER_CONTROLLER_WS,
        CURLOPT_TIMEOUT => WS_TIMEOUT,
        CURLOPT_CONNECTTIMEOUT => WS_CONNECT_TIMEOUT,
        CURLOPT_USERAGENT => "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"
      ));

      $resp = curl_exec($curl);
      $result = json_decode($resp);
    }catch(Exception $e){
      $result = json_decode(json_encode(array('code' => $e->getCode(), 'message' => $e->getMessage())));
    }

    curl_close($curl);

    if(!$result || !$result->response){
      //log in order to trace the issues on login
      $this->sid = null;
      //log in order to trace the issues on login
      $logFile = "logs/login_error_".strtoupper($params["username"]).".txt";
      $content = date('Y-m-d H:i:s')."\n";
      $content .= "request: \n";
      $strParams = json_encode($params);
      $content .= $strParams." \n";
      $content .= "response: \n";
      $content .= $resp." \n";
      $strServer = json_encode($_SERVER);
      $content .= "Server: \n";
      $content .= $strServer." \n";
      $content .= "\n";
      @file_put_contents($logFile, $content, FILE_APPEND);

      $this->isInvalid = $result->userMessage == 'Invalid information';
      //end of login trace
      return false;
    }

    return $result->response;
  }
}

new ClientRedirect();
