<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Cashier Client">
    <meta name="author" content="Midas">

    <title>Cashier</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:592695,hjsv:6};a=o.getElementsByTagName(&apos;head&apos[0];r=o.createElement(&apos;script&apos;r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,&apos;<a href="https://static.hotjar.com/c/hotjar-&apos;,&apos;.js?sv=&apos;">https://static.hotjar.com/c/hotjar-&apos;,&apos;.js?sv=&apos;</a>);</script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      let sid = "<?php echo $_REQUEST['sid'] ?>";
      let tuid = "<?php echo $_REQUEST['tuid'] ?>";
      let remoteAddr = "<?php echo $_REQUEST['remoteAddr'] ?>";
      let remoteCompany = "<?php $_REQUEST['remoteCompany'] ?>";
      let xForwardedFor = "<?php echo $_REQUEST['xForwardedFor'] ?>";
      let remoteHost = "<?php echo gethostbyaddr($_SERVER['REMOTE_ADDR']) ?>";
      let loginInfo = <?php echo((count($_REQUEST)) > 0 ? json_encode($_REQUEST) : "null") ?>;

      let application = {
        sid: sid,
        tuid: tuid,
        lang: "en",
        platform: 'desktop',
        remoteAddr: remoteAddr,
        remoteHost: remoteHost,
        remoteAddress: remoteAddr,
        remoteCompany: remoteCompany,
        xForwardedFor: xForwardedFor,
        userAgent: navigator.userAgent,
        referrer: document.referrer || location.referrer
      };

      if(!loginInfo){
        let application = JSON.parse(localStorage.application);
        let ui = JSON.parse(localStorage.ui);
        let company = JSON.parse(localStorage.company);
        loginInfo = {companyId: company.companyId, remoteCompany: localStorage.application.remoteCompany, option: ui.currentView, sid: application.sid};
      }else{
        let localApp = localStorage.application;
        if (localApp) {
          application = JSON.parse(localApp);
        }
        if (remoteAddr) {
          application.remoteAddr = (application.remoteAddr) ? application.remoteAddr : remoteAddr;
        }
        if (remoteHost) {
          application.remoteHost = (application.remoteHost) ? application.remoteHost : remoteHost;
        }
        if (xForwardedFor) {
          application.xForwardedFor = (application.xForwardedFor) ? application.xForwardedFor : xForwardedFor;
        }

        localStorage.setItem('application', JSON.stringify(application));
      }
    </script>
    <script src="/js/libs/jquery.min.js"></script>
    <!--  <script src="/js/libs/stomp.js"></script> -->
    <script src="/js/libs/general.js"></script>
    <script src="/build/bundle.js"></script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/js/libs/bootstrap.min.js"></script>
  </body>

  <form id="reloadMeForm" name="reloadMeForm" action="/"></form>
</html>