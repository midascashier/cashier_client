	<?php
	  $_POST['companyId']=9;
	  $_POST['f']="authCustomer";
	?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Cashier</title>
	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="/css/font-awesome.min.css">
	<link rel="stylesheet" href="/css/style.css">
</head>
<body>
	<div id="app"></div>
	<script>
  	  var loginInfo = <?php echo json_encode($_POST) ?>;
  	</script>
    <script src="/js/libs/stomp.js"></script>
	<script src="/js/index.js"></script>
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="/js/libs/jquery.min.js"></script>
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="/js/libs/bootstrap.min.js"></script>
</body>
</html>
