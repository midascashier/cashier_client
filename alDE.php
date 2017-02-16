<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Auto Login</title>

    <script>
            var isIovationReady = 0;
            var isAcuitytecReady = 0;
    </script>

<?php
    require_once('config/phpConfig.php');

    if (SECURITY_IOVATION_ENABLE === true){
        echo '<script src="https://mpsnare.iesnare.com/snare.js"></script><script src="/js/libs/iovation.js"></script>';
    }else{
        echo '<script>isIovationReady = 1;</script>';
    }
    if (SECURITY_ACUITYTEC_ENABLE === true){
        echo '<script src="https://service1.acuitytec.com/detect/detect3.min.js"></script><script src="/js/libs/acuitytec.js"></script>';
    }else{
             echo '<script>isAcuitytecReady = 1;</script>';
         }

?>
    <script>
        function ctrlResponse(data, service)
            {
                if (service == "iovation" && data){
                    isIovationReady = 1;
                    var hidden_field = document.getElementById("ioBB");
                }

                if (service == "acuitytec" && data){
                    isAcuitytecReady = 1;
                    var hidden_field = document.getElementById("atDeviceId");
                }

                if(hidden_field){
                    hidden_field.value = data;
                }

                redirect();
            }
    </script>
    </head>
    <body>
        <form id="alForm" action="/clientRedirect.php" method="POST">
          <input type="hidden" id="username" name="username" value=<?php echo $_REQUEST["username"]?> >
          <input type="hidden" id="password" name="password" value=<?php echo $_REQUEST["password"]?>>
          <input type="hidden" id="option" name="option" value=<?php echo $_REQUEST["option"]?>>
          <input type="hidden" id="ioBB" name="ioBB" value="">
          <input type="hidden" id="atDeviceId" name="atDeviceId" value="">
          <input type="hidden" id="f" name="doLogin" value="1">
        </form>
        <script>
            function redirect(){
                if (isIovationReady == 1 && isAcuitytecReady == 1){
                    var login_form = document.getElementById("alForm");
                    if(login_form){
                        login_form.submit();
                    }
                }
            }
            redirect();
        </script>
    </body>
</html>