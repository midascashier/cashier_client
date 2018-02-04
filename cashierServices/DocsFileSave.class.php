<?php
require_once 'system/Startup.class.php';

class DocsFileSave
{
  public function __construct(){
    //customer info
    $inputParams = $_REQUEST;
    $customer = ClientSessionManager::getClientCustomerData();

    $username = 'midasTP';
    $companyId = 101;
    $customerId = 137;

    $file = array();
    $files = $_FILES;

    foreach($files as $keys){
      foreach ($keys as $name => $values)
        foreach($values as $key => $value){
          $file[$name][$key] = $value;
        }
    }

    $files = array();
    $files[23] = $file;

    $documentManager = new DocumentManager();
    $result = $documentManager->saveDocument($inputParams, $files, $companyId, $customerId, $username);
    $returnMsjTag = ($result) ? 'DOCFILE_SENT_FORM' : 'DOCFILE_ERROR_SENT_FORM';
    $returnMsjText = ClientLanguage::text($returnMsjTag);
    ClientSessionManager::setData(ClientDocumentStatus::MSJ_SESSION, $returnMsjText);

    echo json_encode(array('result' => $result, 'msj' => $returnMsjText));
  }
}

new DocsFileSave();