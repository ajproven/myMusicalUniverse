$(document).ready(function (){
	//TODO...
	
});

//Angular code
(function (){
	//Application module.
	var myMusicUniverseApp = angular.module('myMusicalUniverseManagement', ["ng-currency"]);

	//Controllers of the application
	//este el controlador de sesion login y registro
	myMusicUniverseApp.controller("myMusicalUniverseForumController", function($scope){
	//

		//======== PROPERTIES ===========//
		//Properties
		this.subforum = new subforumObj();
		this.subforumObjArray = new Array();
		

		//Scope variables
		$scope.userAction=0;
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();

		this.login = function(){

		}

		this.getSubforums = function (){
			this.subforumObjArray = new Array();
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
			
				//var subforumObjArray = new Array();		
					for (var i = 0; i < outPutData.length; i++) {
					this.subforum = new subforumObj();
					
					this.subforum.construct(outPutData[i].id,outPutData[i].name,outPutData[i].description,outPutData[i].image,outPutData[i].type);
					this.subforumObjArray.push(this.subforum);
					
					}				
		}

		this.showThreadsBySubforum = function(id){
			alert(id);

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

	//This template shows all data in property this.medicinesArray of the constructor for modify.
	myMusicUniverseApp.directive("subforumForm", function (){
		return {
		  restrict: 'E',
		  templateUrl:"templates/subforum-data.html",
		  controller:function(){
			
		  },
		  controllerAs: 'subforumForm'
		};
	});
	

})();


		
