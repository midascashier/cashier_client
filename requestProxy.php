<?php
require_once('config/phpConfig.php');

class requestProxy{

  function __construct()
  {
    $curl = curl_init();
    $ws = "_WS_{$_REQUEST['ws']}";
    $parameters = $_REQUEST;
    $parameters['sys_access_pass'] = ACCESS_PASSWORD;

    if(defined($ws)){
      curl_setopt_array($curl, array(
        CURLOPT_POST => 1,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_URL => constant($ws),
        CURLOPT_POSTFIELDS => $parameters,
        CURLOPT_USERAGENT => "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"
      ));

      $resp = curl_exec($curl);
      curl_close($curl);

    }else{
      $resp = "Error {$ws} not defined ws config";
    }

    echo $resp;
  }
}

new requestProxy();