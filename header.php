<?php
function cabecera(){
?>

<!DOCTYPE html>
<html ng-app="myMusicalUniverseManagement" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <!--Css-->
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="js/frameWorks/jQuery/jquery-ui-1.11.4/jquery-ui.theme.css" />
     <!-- Custom styles for this template -->
    <link href="css/header.css" rel="stylesheet">

    <!-- Angular-->
    <script src="js/frameWorks/angular/angular.min.js" type="text/javascript" xml:space="preserve"></script>
    <script src="js/frameWorks/angular/i18n/angular-locale_es-es.js" type="text/javascript" xml:space="preserve"></script>
    <script src="js/frameWorks/angular/ng-currency.js" type="text/javascript" xml:space="preserve"></script>

    <!-- jQuery-->
    <script src="js/frameWorks/jQuery/jQuery.js" type="text/javascript" xml:space="preserve"></script>

    <!-- Own code-->
    <script src="js/model/userObj.js" type="text/javascript" xml:space="preserve"></script>
    
    <script src="js/control/generalFunctions.js" type="text/javascript" xml:space="preserve"></script>
    <script src="js/control/index.js" type="text/javascript" xml:space="preserve"></script>
  </head>


<div id="header" ng-controller="myMusicalUniverseSessionController as myMusicalUniverseSessionCtrl">   
  <a href="index.php" id="logo">MyMusicalUniverse</a>
  <ul id="menu">
    <li><a href="index.php"><span>Home</span></a></li>
    <li><a href="#"><span>Forums</span></a></li>
    <li><a href="#"><span>Store</span></a></li>
    <li><a href="#"><span>Events</span></a></li>
  </ul>
  <ul id="menu2">
    <li><a href="#" ng-click="userAction=1"><span>Login</span></a></li>
    {{userAction}}
    <li><a href="#" ng-click="userAction=2"><span>Register</span></a></li>
    <div class="row" id="searchButton">
      <input type="text" class="btn btn-default">
        <button class="btn btn-default" type="button" onclick="searchWeb()"><span class="glyphicon glyphicon-search"></span></button>
    </div>
  </ul>
</div>
</html>
<?php
}
?>