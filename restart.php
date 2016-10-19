<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>
<?php
require_once('config/phpConfig.php');


class restart
{
  /**
   * Constructor
   */
  public function __construct($params)
  {
    $this->cashierURL = CASHIER_CONTROLLER_WS;
    $this->params = http_build_query($params, '', '&');
  }

  /**
   * request Transaction with token received
   */
  public function getTransactionInfo()
  {
    $this->curl($this->params, $this->cashierURL);
  }

  /**
   * curl class
   */
  private function curl($parameters, $URL)
  {

    $curl = curl_init();

    $parameters .= "&sys_access_pass=1";

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

    if ($result->response->sid) {
      $_SESSION["sid"] = $result->response->sid;
    }

    if ($_SESSION["sid"]) {
      $html = <<<HTML
    <form id="alForm" action="/" method="POST">
        <input type="hidden" id="sid" name="sid" value={$_SESSION["sid"]}>
        <input type="hidden" id="companyID" name="companyID" value={$result->response->companyId}>
        <input type="hidden" id="option" name="option" value="deposit">
        <input type="hidden" id="restart" name="restart" value="1">
        <input type="hidden" id="processorId" name="processorId" value={$result->response->processorId}>
        <input type="hidden" id="Tstatus" name="Tstatus" value={$result->response->tStatusId}>
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

}

$restart = new restart($_REQUEST);
$restart->getTransactionInfo();
?>

</body>
</html>