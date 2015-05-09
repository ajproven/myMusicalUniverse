$(document).ready(function (){
	//TODO...
	
	
});

//Angular code
(function (){
	//Application module.
	var myMusicUniverseApp = angular.module('myMusicalUniverseManagement', ["ng-currency", 'ui.bootstrap']);

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

	    this.sessionController = function ()
		{

			
			if(typeof(Storage))
			{
				var userObj = JSON.parse(sessionStorage.getItem("userConnected"));
				
				if(userObj != undefined)
				{
					$scope.userName = userObj.username;
					$scope.userConnected = true;
				}
			}
			else alert("This browser does not support session variables");
		}

		this.login = function ()
		{
			var outPutdata = new Array();
			//control error messages TODO...
			
				this.user = angular.copy(this.user);

				//Check if credentials are correct in database
				$.ajax({
					  url: 'php/control/control.php',
					  type: 'POST',
					  async: false,
					  data: 'action=10060&JSONData='+JSON.stringify(this.user),
					  dataType: "json",
					  beforeSend: function () { 

							//$("#loadDiv").css("display","block");
					  },
					  complete: function () { 
							  
							  //$('#loadDiv').css("display","none");
					  },
					  success: function (response) { 
						  outPutdata = response;

					  },
					  error: function (xhr, ajaxOptions, thrownError) {
							alert(xhr.status+"\n"+thrownError);
					  }	
				});

				if(outPutdata[0])
				{
					if(typeof(Storage))
					{
						 //id,username, password, name, surname1, surname2, type_user, email, address, bank_account, phone, image
						this.user = new userObj();
						this.user.construct(outPutdata[1][0].id, outPutdata[1][0].username, outPutdata[1][0].password, outPutdata[1][0].name, outPutdata[1][0].surname1, outPutdata[1][0].surname2, outPutdata[1][0].type_user, outPutdata[1][0].email, outPutdata[1][0].address, outPutdata[1][0].bank_account, outPutdata[1][0].phone, outPutdata[1][0].image);
						sessionStorage.setItem("userConnected",JSON.stringify(this.user));
						//TODO...
						$scope.userName = this.user.getUserName();
						$scope.userConnected = true;
						$("#loginModal").modal("hide");
					}
					else alert("This browser does not support session variables");

				}else showErrors(outPutdata[1]);
			
		}

		this.signUp = function ()
		{
			//this.user = new userObj();
			var outPutdata = new Array();
					
			//create an array for the images names.
			var imagesNameArray = this.imagesManagement(this.user.getUserName());
			this.user.setImage(imagesNameArray[0]);
			this.user.setId(0);
			this.user.setTypeUser(3);
			this.user.setBankAccount(null);
			this.user = angular.copy(this.user);
			
			$.ajax({
				  url: 'php/control/control.php',
				  type: 'POST',
				  async: false,
				  data: 'action=10005&userObject='+JSON.stringify(this.user),
				  dataType: "json",
				  beforeSend: function () { 

						//$("#loadDiv").css("display","block");
				  },
				  complete: function () { 
						  
						 // $('#loadDiv').css("display","none");
				  },
				  success: function (response) { 
					  outPutdata = response;
				  },
				  error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status+"\n"+thrownError);
				  }	
			});
			//alert(outPutdata);
			$scope.modalMessage = "Successfully registered, you will be identified immediately";

			$('.js-loading-bar').modal({
			  backdrop: 'static',
			  show: false
			});

			var $modal = $('.js-loading-bar'),
			$bar = $modal.find('.progress-bar');

			$modal.css("top","41%");
				  
			$modal.modal('show');
			$bar.addClass('animate');

			setTimeout(function() {
			  $bar.removeClass('animate');
			  $modal.modal('hide');
			  $("#signUpModal").modal("hide");
			}, 2000);

			this.login();
		}

		this.imagesManagement = function (userName)
		{
			var imageFiles = new FormData();
			var userNamesArray = new Array();
			userNamesArray.push(userName);
			
			var image = $("#imageUser")[0].files[0];
			
			imageFiles.append('images[]',image);
			
			var serverFileNames = new Array();
			
			$.ajax({
				url : 'php/control/controlFiles.php?action=10000&userNamesArray='+JSON.stringify(userNamesArray),
		        type : 'POST',
		        async: false,
		        data : imageFiles,
		        dataType: "json",
		        //~ beforesend:
		        //~ complete:
		        processData : false, 
		        contentType : false, 
		        success : function(response){
		                   serverFileNames = response;
		        },
		        error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status+"\n"+thrownError);
				}                
		    });
		    
		    return serverFileNames;
		}

		this.checkUserName = function () {

			var outPutData = new Array();

			$.ajax({
				url:"php/control/control.php",
				type: "POST",
				data: "action=10000&userName="+this.user.getUserName(),
				dataType: "json",
				beforeSend: function () { 

					//$("#loadDiv").css("display","block");
				},
				complete: function () { 
					  
					 // $('#loadDiv').css("display","none");
				},
				async: false,
				success: function (response) {
					outPutData = response;
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert("There has been an error while connecting to the server, try later");
					console.log(xhr.status+"\n"+thrownError);
				}
				});

				if(outPutData[0]){
					$("#username").removeClass("ng-invalid").addClass("ng-valid");
				} else {
					//showErrors(outPutData[1]);
					$("#username").removeClass("ng-valid").addClass("ng-invalid");
					alert("Error - User with username: "+this.user.getUserName()+" already exist in database");
					//this message must be change to div message in template in header-form.html TODO...
				}
		}

		this.checkPassword = function () 
		{
			if (this.user.getPassword() != $scope.repeatPassword)
			{
				$scope.passwordValid = true;
				$("#repeatPass").removeClass("ng-valid").addClass("ng-invalid");
			}
			else
			{
				$scope.passwordValid = false;
				$("#repeatPass").removeClass("ng-invalid").addClass("ng-valid");
			}	
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

	myMusicUniverseApp.controller("myMusicalUniverseMainController", function($scope){

		//======== PROPERTIES ===========//
		//Properties
		this.article = new articleObj();
		this.user = new userObj();
		this.usersArray = new Array();
		this.articlesArray = new Array();

		//Scope variables
		$scope.userAction=0;
		$scope.userConnected = false;
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();

		//Take all articles in the database.
		this.accessMainData = function () {

			var outPutData = new Array();

			$.ajax({
				url:"php/control/control.php",
				type: "POST",
				data: "action=10010",
				dataType: "json",
				beforeSend: function () { 

					//$("#loadDiv").css("display","block");
				},
				complete: function () { 
					  
					//$('#loadDiv').css("display","none");
				},
				async: false,
				success: function (response) {
					outPutData = response;
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert("There has been an error while connecting to the server, try later");
					console.log(xhr.status+"\n"+thrownError);
				}
			});

			if(outPutData[0] && outPutData[2]!=undefined){
				$scope.userArticleArray = new Array();
				for (var i = 0; i < outPutData[1].length; i++) {
					this.article = new articleObj();
					this.article.construct(outPutData[1][i].id, outPutData[1][i].idUser, outPutData[1][i].title, outPutData[1][i].entry_date, outPutData[1][i].content, outPutData[1][i].theme, outPutData[1][i].image);
					this.articlesArray.push(this.article);


				};
				//alert(this.articlesArray);
				for (var j = 0; j < outPutData[2].length; j++) {
						this.user = new userObj();
						this.user.construct(outPutData[1][j].id, outPutData[1][j].username, outPutData[1][j].password, outPutData[1][j].name, outPutData[1][j].surname1, outPutData[1][j].surname2, outPutData[1][j].type_user, outPutData[1][j].email, outPutData[1][j].address, outPutData[1][j].bank_account, outPutData[1][j].phone, outPutData[1][j].image);
						
						this.usersArray.push(this.user);
						for (var k = 0; k < this.articlesArray.length; k++) {
							if (this.articlesArray[k].getIdUser()==this.usersArray[j].getId()){
								$scope.userArticleArray.push(this.usersArray[k]);
							}
						}
				}				
			} else showErrors(outPutData[1]);
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
	myMusicUniverseApp.directive("articlesFormData", function (){
		return {
		  restrict: 'E',
		  templateUrl:"templates/articles-form-data.html",
		  controller:function(){
			
		  },
		  controllerAs: 'articlesFormData'
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

