<?php
require_once('config/phpConfig.php');
session_start();

 /**
   * Get the remote IP of the customer
   *
   * @return string
   */
function getCustomerIP()
{
    $clientIP = $_SERVER['HTTP_CLIENT_IP'];

    if (!$clientIP)
    {
      if ($_SERVER['HTTP_X_FORWARDED_FOR'] && (strlen($_SERVER['HTTP_X_FORWARDED_FOR']) > 0))
      {
        $proxy = $_SERVER['HTTP_X_FORWARDED_FOR'];
        if (strpos($proxy, ",") !== false)
        {
          $proxyA = explode(',', $proxy);
          if (is_array($proxyA))
          {
            array_pop($proxyA);
            $clientIP = trim(array_pop($proxyA));
          }
        }
        else
        {
          $clientIP = trim($proxy);
        }
      }
    }
    // $_SERVER['HTTP_X_FORWARDED']
    if (!$clientIP)
    {
      $clientIP = $_SERVER['HTTP_X_FORWARDED'];
    }
    // $_SERVER['HTTP_FORWARDED_FOR']
    if (!$clientIP)
    {
      $clientIP = $_SERVER['HTTP_FORWARDED_FOR'];
    }
    // $_SERVER['HTTP_FORWARDED']
    if (!$clientIP)
    {
      $clientIP = $_SERVER['HTTP_FORWARDED'];
    }
    // $_SERVER['REMOTE_ADDR']
    if (!$clientIP)
    {
      $clientIP = $_SERVER['REMOTE_ADDR'];
    }
    // DEFAULT
    if (!$clientIP)
    {
      $clientIP = '127.0.0.1';
    }
    return $clientIP;
}

$cashierParams = array();
$cashierParams["f"] = "authCustomer";
$cashierParams["username"] = $_POST["username"];
$cashierParams["password"] = $_POST["password"];
$cashierParams["ioBB"] = $_POST["ioBB"];
$cashierParams["atDeviceId"] = $_POST["atDeviceId"];
$cashierParams["sid"] = "";
$cashierParams["tuid"] = "";
$cashierParams["lang"] = "";
$cashierParams["platform"] = "desktop";
$cashierParams["remoteAddr"] = getCustomerIP();
$cashierParams["remoteHost"] = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$cashierParams["userAgent"] = $_SERVER["HTTP_USER_AGENT"];
$cashierParams["xForwardedFor"] = $_SERVER["HTTP_X_FORWARDED_FOR"];
$cashierParams["sys_access_pass"] = "1";
$cashierParams["format"] = "json";
$cashierParams["companyId"] = COMPANY_ID_POKER;
$cashierParams["XDEBUG_SESSION_START"] = "ECLIPSE_DBGP";

if ($_SESSION['referrer']){
    $_SESSION['referrer'] = $_SERVER["HTTP_REFERER"];
}

class login
{

  private $cashierParams = array();
  private $cashierURL = "";
  private $cashierClientURL = "";

  /**
   * Constructor
   */
  public function __construct($cashierParams)
  {
    $HTTPDomainName = $_SERVER['HTTP_HOST'];
    if(preg_match("~.*".SKIN_POKER_HTTP_DOMAIN_NAME.".*~i", $HTTPDomainName)){
      $companyId = COMPANY_ID_POKER;
    }else{
      $companyId = 9;
    }

  	$cashierParams['companyId'] = $companyId;
    $this->clientParams = $cashierParams;
    $this->cashierURL = CASHIER_CONTROLLER_WS;
  }

  /**
   * curl class
   */
  private function curl($parameters, $URL)
  {
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_SSL_VERIFYHOST => 0,
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_URL => $URL,
      CURLOPT_POST => 1,
      CURLOPT_USERAGENT => "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)",
      CURLOPT_POSTFIELDS => $parameters
    ));

    $resp = curl_exec($curl);
    curl_close($curl);

    $result = json_decode($resp);

    if ($result->response->sid)
    {
      $_SESSION["sid"] = $result->response->sid;
    }
  }

  /**
   * start login process
   */
  public function login()
  {
    $this->curl($this->clientParams, $this->cashierURL);
  }
}

if ($_POST["doLogin"] == "1")
{
  $login = new login($cashierParams);
  $login->login();
  if ($_SESSION["sid"])
  {
    $html = <<<HTML
    <form id="alForm" action="/" method="POST">
        <input type="hidden" id="sid" name="sid" value={$_SESSION["sid"]}>
        <input type="hidden" id="companyID" name="companyID" value={$cashierParams["companyId"]}>
        <input type="hidden" id="option" name="option" value={$_POST["option"]}>
    </form>
    <script>
                    var login_form = document.getElementById("alForm");
                    if(login_form){
                        login_form.submit();
                    }
    </script>
HTML;

    echo $html;
  }
}




?>