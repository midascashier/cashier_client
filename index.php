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

    <script src="/js/libs/jquery.min.js"></script>
    <script src="/js/libs/general.js"></script>
    <script src="/js/libs/bootstrap.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      let vip = "<?php echo $_REQUEST['vip'] ?>";
      let sid = "<?php echo $_REQUEST['sid'] ?>";
      let tuid = "<?php echo $_REQUEST['tuid'] ?>";
      let newbie = "<?php echo $_REQUEST['newbie'] ?>";
      let country = "<?php echo $_REQUEST['country'] ?>";
      let redirectSite = "<?php echo $_REQUEST['redirectSite'] ?>";
      let remoteAddr = "<?php echo $_REQUEST['remoteAddr'] ?>";
      let remoteCompany = "<?php $_REQUEST['remoteCompany'] ?>";
      let xForwardedFor = "<?php echo $_REQUEST['xForwardedFor'] ?>";
      let remoteHost = "<?php echo gethostbyaddr($_SERVER['REMOTE_ADDR']) ?>";
      let loginInfo = <?php echo((count($_REQUEST)) > 0 ? json_encode($_REQUEST) : "null") ?>;

      let application = {
        vip: vip,
        sid: sid,
        tuid: tuid,
        lang: "en",
        newbie: newbie,
        country: country,
        platform: 'desktop',
        redirectSite: redirectSite,
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
        loginInfo = {companyId: company.companyId, remoteCompany: localStorage.application.remoteCompany, option: ui.currentView, sid: application.sid, redirectSite: application.redirectSite};
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
        if (redirectSite) {
          application.redirectSite = (application.redirectSite) ? application.redirectSite : redirectSite;
        }

        localStorage.setItem('application', JSON.stringify(application));
        if(loginInfo && loginInfo.restart){
          localStorage.setItem('restartInfo', JSON.stringify(loginInfo));
        }else{
          localStorage.removeItem('restartInfo')
        }
      }
    </script>
    <script src="/build/bundle.js"></script>
  </body>

  <form id="reloadMeForm" name="reloadMeForm" action="/"></form>
</html>