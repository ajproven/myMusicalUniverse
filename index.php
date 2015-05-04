<!DOCTYPE html>
<html ng-app="myMusicalUniverseManagement" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>My Musical Universe</title>

    <!--Css-->
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.theme.css" />
    <link rel="stylesheet" type="text/css" href="css/header.css" />

    <!-- Angular-->
    <script src="js/frameWorks/angular/angular.min.js" type="text/javascript" xml:space="preserve"></script>
    <script src="js/frameWorks/angular/i18n/angular-locale_es-es.js" type="text/javascript" xml:space="preserve"></script>
    <script src="js/frameWorks/angular/ng-currency.js" type="text/javascript" xml:space="preserve"></script>

    <!-- jQuery-->
    <script src="js/frameWorks/jQuery/jQuery.js" type="text/javascript" xml:space="preserve"></script>

    <!-- Datepicker-->
    <script src="js/frameWorks/jQuery/jquery.min.js" type = "text/javascript"></script>
    <script src="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.js" type = "text/javascript"></script>
    <script src="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.min.js" type = "text/javascript"></script>
    
    <!-- jQuery Cookies management-->
    <script src="js/frameWorks/jQuery/jquery-cookie/jquery.cookie.js" type="text/javascript" xml:space="preserve"></script>

    <!-- Own code-->
    <script src="js/model/userObj.js" type="text/javascript" xml:space="preserve"></script>
    
    <script src="js/control/generalFunctions.js" type="text/javascript" xml:space="preserve"></script>
    <script src="js/control/index.js" type="text/javascript" xml:space="preserve"></script>

  </head>
  <body ng-controller="myMusicalUniverseSessionController as myMusicalUniverseSessionCtrl" ng-init="myMusicalUniverseSessionCtrl.sessionController()">
    <header-form id="headerForm"></header-form>
    <div class="mainSection">
      <div class="container">
              <div class="row">
                <div class="col-sm-8" style="background-color: brown;">
                  <div id="loginDiv" ng-show="userAction==1">
                    <login-form id="LoginForm"></login-form>
                  </div>
                </div>
                <div class="col-sm-4" style="background-color: red;"></div>
              </div>
      </div>
    </div>   
  </body>
</html>