<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Auto Login</title>
</head>
<body>
<form id="alForm" action="/" method="POST">
  <input type="hidden" id="username" name="username" value="midasbc">
  <input type="hidden" id="password" name="password" value="t3st0m1das">
  <input type="hidden" id="option" name="option" value="deposit">
  <input type="hidden" id="ioBB" name="ioBB" value="">
  <input type="hidden" id="atDeviceId" name="atDeviceId" value="">
</form>
<!-- scripts -->
<script>
  //var io_install_flash = false;
  var io_install_stm = false;
  var io_exclude_stm = 12;
  // Network Latency
  var io_submit_element_id = 'btnlogin'; // Forms Submit Button
  var io_max_wait = 30; // If BB is not ready after this, submit
  var io_submit_form_id = 'alForm';
  var ioCompleted = false;

  //get the blackBox
  var io_bb_callback = function(bb, isComplete){
    ioCompleted = isComplete;
    if(isComplete){
      // Element to hold the BlackBox
      var hidden_field = document.getElementById('ioBB');
      if(hidden_field){
        hidden_field.value = bb;
      }
    }
  };

  var checkTimeOut = setInterval(function(){
    if(ioCompleted){
      clearInterval(checkTimeOut);
      var login_form = document.getElementById('alForm');
      if (login_form){
        login_form.submit();
      }
    }
  }, 100);
</script>
<script src="https://mpsnare.iesnare.com/snare.js"></script>
</body>
</html>