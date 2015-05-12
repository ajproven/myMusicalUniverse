$(document).ready(function (){
	//TODO...
	
	
});

//Angular code
(function (){

	//Application module.
	var myMusicUniverseApp = angular.module('myMusicalUniverseManagement', ["ng-currency", 'ui.bootstrap']);

	//Controllers of session
	myMusicUniverseApp.controller("myMusicalUniverseSessionController", function($scope){

		//======== PROPERTIES ===========//
		//Properties
		this.user = new userObj();

		//Scope variables
		$scope.userAction=0;
		$scope.userConnected = false
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();
		$scope.controlPage = window.location.href.split("/")[5].split(".")[0];

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
			var outPutData = new Array();
			//control error messages TODO...
			
				this.user = angular.copy(this.user);

				//Check if credentials are correct in database
				$.ajax({
					  url: '../php/control/control.php',
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
						  outPutData = response;

					  },
					  error: function (xhr, ajaxOptions, thrownError) {
							alert(xhr.status+"\n"+thrownError);
					  }	
				});

				if(outPutData[0])
				{
					if(typeof(Storage))
					{
						 //id,username, password, name, surname1, surname2, type_user, email, address, bank_account, phone, image
						this.user = new userObj();
						this.user.construct(outPutData[1][0].id, outPutData[1][0].username, outPutData[1][0].password, outPutData[1][0].name, outPutData[1][0].surname1, outPutData[1][0].surname2, outPutData[1][0].type_user, outPutData[1][0].email, outPutData[1][0].address, outPutData[1][0].bank_account, outPutData[1][0].phone, outPutData[1][0].image);
						sessionStorage.setItem("userConnected",JSON.stringify(this.user));
						//TODO...
						$scope.userName = this.user.getUserName();
						$scope.userConnected = true;
						$("#loginModal").modal("hide");
					}
					else alert("This browser does not support session variables");

				}else showErrors(outPutData[1]);
			
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
				  url: '../php/control/control.php',
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
				url : '../php/control/controlFiles.php?action=10000&userNamesArray='+JSON.stringify(userNamesArray),
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
				url:"../php/control/control.php",
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
		this.userObj = new userObj();
		this.usersArray = new Array();
		this.articlesArray = new Array(); //sobra
		this.replysArray = new Array();

		//Scope variables
		$scope.userAction=0;
		$scope.userConnected = false;
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();

		
		//Take all articles in the database.
		this.accessMainData = function () {

			var articleId = readUrlVar()["t"];

			var outPutData = new Array();

			$.ajax({
				url:"../php/control/control.php",
				type: "POST",
				data: "action=10020&articleId="+JSON.stringify(articleId),
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
			//alert(outPutData);

			if(outPutData[0] && outPutData[2]!=undefined){
				$scope.userArticleArray = new Array();
				
					this.article = new articleObj();
					this.article.construct(outPutData[1].id, outPutData[1].idUser, outPutData[1].title, outPutData[1].entry_date, outPutData[1].content, outPutData[1].theme, outPutData[1].image);
					$scope.articleDate = this.article.getEntryDate();
		
					this.userObj = new userObj();
					this.userObj.construct(outPutData[2].id, outPutData[2].username, outPutData[2].password, outPutData[2].name, outPutData[2].surname1, outPutData[2].surname2, outPutData[2].type_user, outPutData[2].email, outPutData[2].address, outPutData[2].bank_account, outPutData[2].phone, outPutData[2].image);

			} else showErrors(outPutData[1]);
			//alert(outPutData[2]);
		}

	});

	//This template shows all data in property this.medicinesArray of the constructor for modify.
	myMusicUniverseApp.directive("loginForm", function (){
		return {
		  restrict: 'E',
		  templateUrl:"../templates/login-form.html",
		  controller:function(){
			
		  },
		  controllerAs: 'loginForm'
		};
	});

	//This template shows all data in property this.medicinesArray of the constructor for modify.
	myMusicUniverseApp.directive("headerForm", function (){
		return {
		  restrict: 'E',
		  templateUrl:"../header-form.html",
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

function readUrlVar(){
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
	});
    return vars;
}