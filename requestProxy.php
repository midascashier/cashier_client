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
    $parameters['sys_access_pass'] = ACCESS_PASSWORD;

    if(DEBUG_ENABLED){
      $parameters['XDEBUG_SESSION_START'] = 'ECLIPSE_DBGP';
    }

    //$params_string = urldecode(http_build_query($parameters, '', '&'));
    //@file_put_contents("poker.txt", "Request: ".$params_string."\n", FILE_APPEND);

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
          CURLOPT_POSTFIELDS => $parameters,
          CURLOPT_USERAGENT => "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"
        ));

        $resp = curl_exec($curl);
        //@file_put_contents("poker.txt", "Response: ".json_encode($resp)."\n", FILE_APPEND);
      }else{
        $resp = "Error {$routeWS} not defined ws config";
      }
    }catch(Exception $e){
      $resp = 'Error: '.$e->getCode().'- '.$e->getMessage();
    }

    curl_close($curl);
    echo $resp;
  }
}

new requestProxy();