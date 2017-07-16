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
$cashierParams["username"] = $_REQUEST["username"];
$cashierParams["password"] = $_REQUEST["password"];
$cashierParams["ioBB"] = $_REQUEST["ioBB"];
$cashierParams["atDeviceId"] = $_REQUEST["atDeviceId"];
$cashierParams["sid"] = "";
$cashierParams["lang"] = "";
$cashierParams["platform"] = "desktop";
$cashierParams["remoteAddr"] = getCustomerIP();
$cashierParams["remoteHost"] = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$cashierParams["userAgent"] = $_SERVER["HTTP_USER_AGENT"];
$cashierParams["xForwardedFor"] = $_SERVER["HTTP_X_FORWARDED_FOR"];
$cashierParams["sys_access_pass"] = ACCESS_PASSWORD;
$cashierParams["format"] = "json";
$cashierParams["companyId"] = COMPANY_ID_POKER;

if (DEBUG_ENABLED){
    $cashierParams["XDEBUG_SESSION_START"] = "ECLIPSE_DBGP";
}

class LoginManager
{

  /**
   * session id after invoke login action
   */
  public $sid = null;

  /**
   * start login process
   */
  public function login($params)
  {
    //add company
    $params['companyId'] = COMPANY_ID_POKER;

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_SSL_VERIFYHOST => 0,
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_URL => CASHIER_CONTROLLER_WS,
      CURLOPT_POST => 1,
      CURLOPT_USERAGENT => "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)",
      CURLOPT_POSTFIELDS => $params
    ));

    $resp = curl_exec($curl);
    curl_close($curl);

    $result = json_decode($resp);
    if ($result && $result->response && $result->response->sid)
    {
      $this->sid = $result->response->sid;
    }
  }
}

?>

<center>
<h3>Loading Cashier</h3>
<h3>Processing request over a secure connection...</h3><br>

<?php
if ($_REQUEST["doLogin"] == "1")
{
  $login = new LoginManager();
  $login->login($cashierParams);
  if ($login->sid)
  {
    $html = <<<HTML
    <img src="images/loader-70x70.gif" />
    <form id="alForm" action="/" method="POST">
        <input type="hidden" id="sid" name="sid" value={$login->sid}>
        <input type="hidden" id="companyID" name="companyID" value={$cashierParams["companyId"]}>
        <input type="hidden" id="remoteAddr" name="remoteAddr" value={$cashierParams["remoteAddr"]}>
        <input type="hidden" id="remoteHost" name="remoteHost" value={$cashierParams["remoteHost"]}>
        <input type="hidden" id="xForwardedFor" name="xForwardedFor" value={$cashierParams["xForwardedFor"]}>
        <input type="hidden" id="option" name="option" value={$_REQUEST["option"]}>
    </form>
    <script>
        var login_form = document.getElementById("alForm");
        if(login_form)
        {
            login_form.submit();
        }
    </script>
HTML;

    echo $html;
  }
  else
  {
    echo '<img src="images/loader-40x40.gif" />';
  }
}
?>

</center>