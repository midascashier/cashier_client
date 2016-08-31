<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Cashier</title>
	<link rel="stylesheet" href="./css/bootstrap.min.css">
	<link rel="stylesheet" href="./css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="./css/font-awesome.min.css">
	<link rel="stylesheet" href="./css/style.css">
</head>
<body>
	<div id="app"></div>
	<script>
  	  let loginInfo = <?php echo((count($_REQUEST)) > 0 ? json_encode($_REQUEST) : "null") ?>;
  	  if (!loginInfo){
  	    loginInfo = {companyID: localStorage.companyID, option: localStorage.option, sid: localStorage.sid};
  	  }
  	</script>
	<script src="./js/libs/jquery.min.js"></script>
    <script src="./js/libs/stomp.js"></script>
	<script src="./build/bundle.js"></script>
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="./js/libs/bootstrap.min.js"></script>
</body>
</html>
