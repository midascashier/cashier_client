<?php
require_once 'system/Startup.class.php';

class DocsFileSave
{
  public function __construct(){
    //customer info
    $inputParams = $_REQUEST;
    $customer = ClientSessionManager::getClientCustomerData();

    $username = $customer->getUsername();
    $companyId = $customer->getCompanyId();
    $customerId = $customer->getCustomerId();

    $files = $_FILES;
    $documentManager = new DocumentManager();
    $result = $documentManager->saveDocument($inputParams, $files, $companyId, $customerId, $username);
    $returnMsjTag = ($result) ? 'DOCFILE_SENT_FORM' : 'DOCFILE_ERROR_SENT_FORM';
    $returnMsjText = ClientLanguage::text($returnMsjTag);
    ClientSessionManager::setData(ClientDocumentStatus::MSJ_SESSION, $returnMsjText);

    echo json_encode(array('result' => $result, 'msj' => $returnMsjText));
  }
}

new DocsFileSave();