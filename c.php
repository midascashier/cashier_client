<?php
    $CashierURL = "http://cashier.localhost:8080/wscashier/wsController.php";

    $_POST['sys_access_pass']=1;
    $_POST['format']="json";

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $CashierURL,
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => $_POST
    ));

    $resp = curl_exec($curl);

    curl_close($curl);

    print_r($resp);
?>