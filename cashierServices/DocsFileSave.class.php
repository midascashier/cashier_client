<?php
require_once 'system/Startup.class.php';

class DocsFileSave
{
  public function __construct(){
    $inputParams = $_REQUEST;
    $username = $inputParams['userName'];
    $companyId = $inputParams['companyId'];
    $customerId = $inputParams['customerId'];

    $file = array();
    $files = $_FILES;

    foreach($files as $keys){
      foreach ($keys as $name => $values)
        foreach($values as $key => $value){
          $file[$name][$key] = $value;
        }
    }

    $files = array();
    $files[key($_FILES)] = $file;

    $documentManager = new DocumentManager();
    $result = $documentManager->saveDocument($inputParams, $files, $companyId, $customerId, $username);
    $returnMsjTag = ($result) ? 'DOCFILE_SENT_FORM' : 'DOCFILE_ERROR_SENT_FORM';
    $returnMsjText = ClientLanguage::text($returnMsjTag);
    ClientSessionManager::setData(ClientDocumentStatus::MSJ_SESSION, $returnMsjText);

    echo json_encode(array('result' => $result, 'msj' => $returnMsjText));
  }
}

new DocsFileSave();