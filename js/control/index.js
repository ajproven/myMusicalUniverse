$(document).ready(function (){
	//TODO...
});

//Angular code
(function (){
	//Application module.
	var myMusicUniverseApp = angular.module('myMusicalUniverseManagement', ["ng-currency"]);

	//Controllers of the application
	myMusicUniverseApp.controller("myMusicalUniverseSessionController", function($scope){

		//======== PROPERTIES ===========//
		//Properties
		this.user = new userObj();

		//Scope variables
		$scope.userAction=0;
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();

		this.login = function ()
		{


		}

		this.sessionController = function ()
		{

			
			/*if(typeof(Storage))
			{
				var userObj = JSON.parse(sessionStorage.getItem("userConnected"));
				
				if(userObj != undefined)
				{
					window.open("mainWindow.html","_self");
				}
			}
			else alert("This browser does not support session variables");*/
		}


	});

	//This directive it's necesary to use the calendar plugin in the templates.
	myMusicUniverseApp.directive('calendar', function () {
            return {
                require: 'ngModel',
                link: function (scope, el, attr, ngModel) {
                    $(el).datepicker({
                        dateFormat: 'yy-mm-dd',
                        onSelect: function (dateText) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(dateText);
                            });
                        }
                    });
                }
            };
     });

	//This template shows all data in property this.medicinesArray of the constructor for modify.
	myMusicUniverseApp.directive("loginForm", function (){
		return {
		  restrict: 'E',
		  templateUrl:"templates/login-form.html",
		  controller:function(){
			
		  },
		  controllerAs: 'loginForm'
		};
	});

	//This template shows all data in property this.medicinesArray of the constructor for modify.
	myMusicUniverseApp.directive("headerForm", function (){
		return {
		  restrict: 'E',
		  templateUrl:"templates/header-form.html",
		  controller:function(){
			
		  },
		  controllerAs: 'headerForm'
		};
	});
})();

