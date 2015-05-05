$(document).ready(function (){
	//TODO...
	getSubforums();
});

//Angular code
(function (){
	//Application module.
	var myMusicUniverseApp = angular.module('myMusicalUniverseManagement', ["ng-currency"]);

	//Controllers of the application
	//este el controlador de sesion login y registro
	myMusicUniverseApp.controller("myMusicalUniverseSessionController", function($scope){
	//

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


		function getSubforums(){
			var subforumObjArray = new Array();
			$.ajax({
				url:"php/control/control.php",
				type: "POST",
				data: "action=2",
				dataType: "json",
				async: false,
				success: function (response) {
					outPutData = response;
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert("There has been an error while connecting to the server, try later");
					console.log(xhr.status+"\n"+thrownError);
				}
			});		
			var divContent="";	
				//var subforumObjArray = new Array();		
					for (var i = 0; i < outPutData.length; i++) {
					subforum = new subforumObj();
					
					subforum.construct(outPutData[i].id,outPutData[i].name,outPutData[i].description);
					subforumObjArray.push(this.subforum);
					
					divContent+="<a href='#'>"+subforumObjArray[i].getName()+"</a>";
					divContent+="<span>"+subforumObjArray[i].getDescription()+"</span>"
					}
					$('#subforumContent').html(divContent);
					
		}
