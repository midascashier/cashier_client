<?php
require_once('config/phpConfig.php');

class requestProxy
{
  function __construct()
  {
    $route = $_REQUEST['ws'];
    $routeWS = "_WS_".$route;
    unset($_REQUEST['ws']);

    $parameters = $_REQUEST;
    $parameters['format'] = 'json';
    $parameters['userId'] = ONLINE_BE_USER_ID;
    $parameters['sys_access_pass'] = ACCESS_PASSWORD;

    if(DEBUG_ENABLED){
      $parameters['XDEBUG_SESSION_START'] = 'ECLIPSE_DBGP';
    }

    $curl = curl_init();
    try{
      if(defined($routeWS)){

        $url = constant($routeWS);
        curl_setopt_array($curl, array(
          CURLOPT_POST => 1,
          CURLOPT_RETURNTRANSFER => 1,
          CURLOPT_SSL_VERIFYHOST => 0,
          CURLOPT_SSL_VERIFYPEER => 0,
          CURLOPT_URL => $url,
          CURLOPT_POSTFIELDS => urldecode(http_build_query($parameters, '', '&')),
          CURLOPT_USERAGENT => "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"
        ));

        $this->log('Request: ' . $url . '?' . urldecode(http_build_query($parameters, '', '&')));
        $response = curl_exec($curl);
        if($response){
          $responseData = json_decode($response);
          $check = ($responseData->state == 'ok');
          if(!$check){

            $lastErrorCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            $lastError = curl_error($curl);

            $content = "URL: \n";
            $content .= $url . " \n";
            $content .= "request: \n";
            $content .= urldecode(http_build_query($parameters, '', '&')) . " \n";
            $content .= "response: \n";
            $content .= $response . " \n";
            $content .= "Error information: \n";
            $content .= $lastErrorCode . ":" . $lastError . " \n";

            $this->log($content);
          }
        }else{
          $response = json_encode(array('error' => "Invalid Response"));
        }

        $this->log('Response: ' . $response);
      }else{
        $response = json_encode(array('error' => "{$routeWS} not defined ws config"));
        $this->log("Error {$routeWS} not defined ws config: " . urldecode(http_build_query($parameters, '', '&')));
      }
    }catch(Exception $e){
      $response = json_encode(array('error' => $e->getCode().'- '.$e->getMessage()));
      $this->log($e->getCode().'- '.$e->getMessage());
    }

    curl_close($curl);
    echo $response;
  }

  function log($message)
  {
    $content = date('Y-m-d H:i:s') . ": ";
    $content .= $message;
    $content .= "\n";

    @file_put_contents("poker-client.txt", $content, FILE_APPEND);
  }
}

new requestProxy();