$(document).ready(function (){
	//TODO...
	/*$("#loginButton").click(function(){

       $("#loginModal").modal('show');

    });*/


		//$("#myModal").modal('show');
	
});

//Angular code
(function (){
	//Application module.
	var myMusicUniverseApp = angular.module('myMusicalUniverseManagement', ["ng-currency"]);

	/*myMusicUniverseApp.controller('CarouselDemoCtrl', function ($scope) {
	  $scope.myInterval = 5000;
	  var slides = $scope.slides = [];
	  $scope.addSlide = function() {
	    var newWidth = 600 + slides.length + 1;
	    slides.push({
	      image: 'http://placekitten.com/' + newWidth + '/300',
	      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
	        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	    });
	  };
	  for (var i=0; i<4; i++) {
	    $scope.addSlide();
	  }
	});*/

	//Controllers of the application
	myMusicUniverseApp.controller("myMusicalUniverseSessionController", function($scope){

		//======== PROPERTIES ===========//
		//Properties
		this.user = new userObj();

		//Scope variables
		$scope.userAction=0;
		$scope.userConnected = false;
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();
		//$scope variables for use with modal angular bootstrap to login and new user registration.
		$scope.showModal = false;
		$scope.showModal2 = false;
	    $scope.toggleLoginModal = function(modal){
	        $scope.showModal = !$scope.showModal;
	    };
	    $scope.toggleSignUpModal = function(modal){
	        $scope.showModal2 = !$scope.showModal2;
	    };

		this.login = function ()
		{
			var outPutdata = new Array();
			
			this.user = angular.copy(this.user);
			
			//Check if credentials are correct in database
			$.ajax({
				  url: 'php/control/control.php',
				  type: 'POST',
				  async: false,
				  data: 'action=10060&JSONData='+JSON.stringify(this.user),
				  dataType: "json",
				  beforeSend: function () { 

						$("#loadDiv").css("display","block");
				  },
				  complete: function () { 
						  
						  $('#loadDiv').css("display","none");
				  },
				  success: function (response) {
				  		
					  outPutdata = response;
					  console.log(response);
				if(outPutdata[0])
				{
				if(typeof(Storage))
				{
					 //id,username, password, name, surname1, surname2, type_user, email, address, bank_account, phone, image
					this.user = new userObj();
					this.user.construct(outPutdata[1][0].id, outPutdata[1][0].username, outPutdata[1][0].password, outPutdata[1][0].name, outPutdata[1][0].surname1, outPutdata[1][0].surname2, outPutdata[1][0].type_user, outPutdata[1][0].email, outPutdata[1][0].address, outPutdata[1][0].bank_account, outPutdata[1][0].phone, outPutdata[1][0].image);
					sessionStorage.setItem("userConnected",JSON.stringify(this.user));
					//TODO...
					$scope.userConnected = true;
					$("#loginModal").modal("hide");
				}
				else alert("This browser does not support session variables");

				}else showErrors(outPutdata[1]);

				  },
				  error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status+"\n"+thrownError);
				  }	
			});
			


			

		}

		this.sessionController = function ()
		{

			
			if(typeof(Storage))
			{
				this.user = JSON.parse(sessionStorage.getItem("userConnected"));
				
				if(this.user != undefined)
				{
					//window.open("mainWindow.html","_self");
					$scope.userConnected = true;
					alert("Ok - there are a session active with user: "+this.user.username);
				}
			}
			else alert("This browser does not support session variables");
		}

		this.logOut = function ()
		{
			if(typeof(Storage))
			{
				sessionStorage.removeItem("userConnected");
				
				//sessionStorage.clear();
				
				$scope.userConnected = false;	
				location.reload();			
			}
			else alert("This browser does not support session variables");
				
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

	myMusicUniverseApp.directive('modal', function () {
	    return {
	      template: '<div class="modal fade">' + 
	          '<div class="modal-dialog">' + 
	            '<div class="modal-content">' + 
	              '<div class="modal-header">' + 
	                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
	                '<h4 class="modal-title">{{ title }}</h4>' + 
	              '</div>' + 
	              '<div class="modal-body" ng-transclude></div>' + 
	            '</div>' + 
	          '</div>' + 
	        '</div>',
	      	restrict: 'E',
	      	transclude: true,
	      	replace:true,
	      	scope:true,
	      	link: function postLink(scope, element, attrs) {
	        scope.title = attrs.title;

		        scope.$watch(attrs.visible, function(value){
		          if(value == true)
		            $(element).modal('show');
		          else
		            $(element).modal('hide');
		        });

		        $(element).on('shown.bs.modal', function(){
		          scope.$apply(function(){
		            scope.$parent[attrs.visible] = true;
		          });
		        });

		        $(element).on('hidden.bs.modal', function(){
		          scope.$apply(function(){
		            scope.$parent[attrs.visible] = false;
		          });
		        });
	      	}
	    };
  	});

})();

