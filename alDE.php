<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Auto Login</title>
</head>
<body>
<?php
require_once('config/phpConfig.php');
session_start();

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
$cashierParams["remoteAddr"] = $_SERVER["SERVER_ADDR"];
$cashierParams["userAgent"] = $_SERVER["HTTP_USER_AGENT"];
$cashierParams["remoteHost"] = gethostbyaddr($_SERVER["REMOTE_ADDR"]);
$cashierParams["referrer"] = $_SESSION['referrer'];
$cashierParams["xForwardedFor"] = "127.0.0.1";
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
else
{
  $html = <<<HTML
<form id="alForm" action="/alDE.php" method="POST">
  <input type="hidden" id="username" name="username" value="MidasBKR">
  <input type="hidden" id="password" name="password" value="t3st0m1das">
  <input type="hidden" id="option" name="option" value={$_REQUEST["option"]}>
  <input type="hidden" id="ioBB" name="ioBB" value="">
  <input type="hidden" id="atDeviceId" name="atDeviceId" value="">
  <input type="hidden" id="f" name="doLogin" value="1">
</form>
HTML;

  $iovation = <<<IOVATION
    <!-- IOVATION -->
    <script src="https://mpsnare.iesnare.com/snare.js"></script>
    <script>

        // IOVATION
        var io_install_stm = false;
        var io_exclude_stm = 12;
        // Network Latency
        var io_submit_element_id = "btnlogin"; // Forms Submit Button
        var io_max_wait = 30; // If BB is not ready after this, submit
        var io_submit_form_id = "alForm";
        var ioCompleted = false, atCompleted = false;

        //get the blackBox
        var io_bb_callback = function(bb, isComplete){
            ioCompleted = isComplete;
            if(isComplete){
              // Element to hold the BlackBox
              var hidden_field = document.getElementById("ioBB");
              if(hidden_field){
                hidden_field.value = bb;
              }
            }
        };
    </script>
IOVATION;


  $auitytec = <<<ACUITYTEC
    <!-- ACUITYTEC -->
    <script src="https://service1.acuitytec.com/detect/detect3.min.js"></script>
    <script>
        // ACUITYTEC
        var at_max_wait = 30;
        function receiveData(data){
            var deviceId_field = document.getElementById("atDeviceId");
            if(deviceId_field){
                deviceId_field.value = data;
            }
            atCompleted = true;
        }
        requestData();

        // Get Ids
        var dateATInit = new Date();
        var checkTimeOut = setInterval(function(){
            var now = new Date();
            var time = now.getTime() - dateATInit.getTime();

            if((ioCompleted) && (atCompleted || time >= at_max_wait)){
                clearInterval(checkTimeOut);
                var login_form = document.getElementById("alForm");
                if(login_form){
                    login_form.submit();
                }
            }
        }, 100);

    </script>
ACUITYTEC;

    echo $html;

    if (SECURITY_IOVATION_ENABLE === true){
        echo $iovation;
    }
    if (SECURITY_ACUITYTEC_ENABLE === true){
        echo $auitytec;
    }else{
        echo '<script>
            var login_form = document.getElementById("alForm");
            if(login_form){
                login_form.submit();
            };
        </script>
        ';
    }
}

?>
</body>
</html>