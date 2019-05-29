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

    if(SECURITY_IOVATION_ENABLE == true){
      echo '<script src="https://mpsnare.iesnare.com/snare.js"></script><script src="/js/libs/iovation.js"></script>';
    }else{
      echo '<script>isIovationReady = 1;</script>';
    }
    if(SECURITY_ACUITYTEC_ENABLE == true){
      echo '<script src="https://service1.acuitytec.com/detect/detect3.min.js"></script><script src="/js/libs/acuitytec.js"></script>';
    }else{
      echo '<script>isAcuitytecReady = 1;</script>';
    }

    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    echo "<script>
            var uid = '$username';
            var pwd = '$password';
          </script>";


    ?>
    <script>
      function ctrlResponse(data, service){
        if(service == "iovation" && data){
          isIovationReady = 1;
          var hidden_field = document.getElementById("ioBB");
        }

        if(service == "acuitytec" && data){
          isAcuitytecReady = 1;
          var hidden_field = document.getElementById("atDeviceId");
        }

        if(hidden_field){
          hidden_field.value = data;
        }
      }
    </script>
  </head>
  <body>
    <center>
      <h3>Loading Cashier</h3>
      <h3>Processing request over a secure connection</h3>
      <h3>Please wait</h3>
      <br>
      <img src='images/loader-70x70.gif'/>
    </center>

    <form id="alForm" action="/clientRedirect.php" method="POST">
      <input type="hidden" id="username" name="username" value="<?php echo $_REQUEST["username"] ?>">
      <input type="hidden" id="password" name="password" value="<?php echo $_REQUEST["password"] ?>">
      <input type="hidden" id="option" name="option" value="<?php echo $_REQUEST["option"] ?>">
      <input type="hidden" id="skin" name="skin" value="<?php echo $_REQUEST["skinAcronym"] ?>">
      <input type="hidden" id="referrer" name="referrer" value="<?php echo $_SERVER['HTTP_REFERER'] ?>">
      <input type="hidden" id="ioBB" name="ioBB" value="">
      <input type="hidden" id="atDeviceId" name="atDeviceId" value="">
      <input type="hidden" id="f" name="doLogin" value="1">
    </form>

    <form id="invalidLoginForm" action="/invalidLogin.php" method="POST"></form>
    <form id="rejectLoginForm" action="/rejectLogin.php" method="POST"></form>
    <script>
      //clear local store since this is a new session
      localStorage.clear();

      var id = 0;

      function redirect(){
        if(isIovationReady == 1 && isAcuitytecReady == 1){
          clearInterval(id);
          if(uid && pwd){
            var login_form = document.getElementById("alForm");
            if(login_form){
              login_form.submit();
            }else{
              var rejectLoginForm = document.getElementById("rejectLoginForm");
              rejectLoginForm.submit();
            }
          }else{
            var invalidLoginForm = document.getElementById("invalidLoginForm");
            invalidLoginForm.submit();
          }
        }
      }

      id = setInterval(redirect, 300);
    </script>
  </body>
</html>