$(document).ready(function (){
	//TODO...
	
});

//Angular code
(function (){
	//Application module.
	var myMusicUniverseApp = angular.module('myMusicalUniverseManagement', ["ng-currency"]);

	//Controllers of the application
	//este el controlador de sesion login y registro
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
					location.reload();
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
				var user = JSON.parse(sessionStorage.getItem("userConnected"));
				
				if(user != undefined)
				{
					//window.open("mainWindow.html","_self");
					$scope.userConnected = true;
					$scope.userName = user.username;
					$scope.userId = user.id;
					
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
				//location.reload();			
			}
			else alert("This browser does not support session variables");
				
		}

	});
	myMusicUniverseApp.controller("myMusicalUniverseForumController", function($scope){
	//

		//======== PROPERTIES ===========//
		//Properties
		this.subforum = new subforumObj();
		this.thread = new threadObj();
		this.user = new userObj();
		this.threadReply = new threadReplyObj();

		this.subforumObjArray = new Array();
		this.threadObjArray = new Array();
		this.userObjArray = new Array();
		this.threadContentArray = new Array();		
		

		//Scope variables
		$scope.userAction=0;
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();

		

		this.getSubforums = function (){
			this.subforumObjArray = new Array();
			var outPutData = new Array();
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

		this.getThreadContent = function(){
			var id= readUrlVar()["t"];
			this.threadContentArray = new Array();
			//alert(id);

			var outPutData = new Array();
			$.ajax({
				url:"php/control/control.php",
				type: "POST",
				data: "action=4&idThread="+id,
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
			/*
				//var subforumObjArray = new Array();		
					for (var i = 0; i < outPutData.length; i++) {
					this.subforum = new subforumObj();
					
					this.subforum.construct(outPutData[i].id,outPutData[i].name,outPutData[i].description,outPutData[i].image,outPutData[i].type);
					this.subforumObjArray.push(this.subforum);
			*/		

		}
		
		this.getThreadsById = function(){
			//variable para coger el id
			var id= readUrlVar()["f"];
			this.threadObjArray = new Array();
			this.userObjArray = new Array();
			var outPutData = new Array();
			$.ajax({
				url:"php/control/control.php",
				type: "POST",
				data: "action=3&idSubforum="+id,
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
			if(outPutData[0]){
				$scope.threadUserRelationship=new Array();

			for (var i = 0; i < outPutData[1].length; i++) {
					this.thread = new threadObj();
					this.thread.construct(outPutData[1][i].id,outPutData[1][i].idUser ,outPutData[1][i].title ,outPutData[1][i].entryDate ,outPutData[1][i].content,outPutData[1][i].totalReplies,outPutData[1][i].idSubforum);
					this.threadObjArray.push(this.thread);
					//var fecha = this.threadObjArray[i].getEntryDate();
			}
			
					$scope.subforumName=outPutData[2];

			for (var j = 0; j < outPutData[3].length; j++) {
					this.user = new userObj();
					this.user.construct(outPutData[3][j].id,outPutData[3][j].username,outPutData[3][j].password,outPutData[3][j].name,outPutData[3][j].surname1,outPutData[3][j].surname2,outPutData[3][j].type_user,outPutData[3][j].email,outPutData[3][j].address,outPutData[3][j].bank_account,outPutData[3][j].phone,outPutData[3][j].image);	
					this.userObjArray.push(this.user);
				
				for(var h=0;h<this.threadObjArray.length;h++){

					if(this.userObjArray[h].getId()== this.thread.getIdUser()){
						$scope.threadUserRelationship.push(this.userObjArray[h].getUserName());
						
						break;
					}
				}
			}
			
			}

			

		}
		this.redirectToSubforumById = function(object){
			var id = object.getId();
			//var name = object.getName();
			 window.open("subforum.html?f="+id,"_self");
		}

		this.redirectToThreadById = function(id,content){
			//var name = object.getName();
			//var id = object.getId();
			//alert(content);
			 window.open("thread.html?t="+id,"_self");

		}
		this.getThreadContent = function(){
			
			var id= readUrlVar()["t"];
			this.threadContentArray = new Array();
			this.userObjArray = new Array();
			$.ajax({
				url:"php/control/control.php",
				type: "POST",
				data: "action=4&idThread="+id,
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
			if(outPutData[0]){
				$scope.replyUserName=new Array();
				//$scope.replyUserImage = new Array();
			for (var i = 0; i < outPutData[1].length; i++) {
					this.threadReply = new threadReplyObj();
					this.threadReply.construct(outPutData[1][i].id,outPutData[1][i].idUser ,outPutData[1][i].idThread ,outPutData[1][i].entryDate ,outPutData[1][i].content,outPutData[1][i].numberReply);
					this.threadContentArray.push(this.threadReply);
			}
					
					$scope.threadName=outPutData[2];

			for (var j = 0; j < outPutData[3].length; j++) {
					this.user = new userObj();
					this.user.construct(outPutData[3][j].id,outPutData[3][j].username,outPutData[3][j].password,outPutData[3][j].name,outPutData[3][j].surname1,outPutData[3][j].surname2,outPutData[3][j].type_user,outPutData[3][j].email,outPutData[3][j].address,outPutData[3][j].bank_account,outPutData[3][j].phone,outPutData[3][j].image);	
					this.userObjArray.push(this.user);
				
				for(var h=0;h<this.threadContentArray.length;h++){

					if(this.userObjArray[h].getId()== this.threadReply.getIdUser()){
						$scope.replyUserName.push(this.userObjArray[h]);
						//$scope.replyUserImage.push(this.userObjArray[h].getImage());
						break;
					}
				}
			}	
			
			}else{

			
			}

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
	//This template shows all data in property this.medicinesArray of the constructor for modify.
	myMusicUniverseApp.directive("threadData", function (){
		return {
		  restrict: 'E',
		  templateUrl:"templates/thread-content.html",
		  controller:function(){
			
		  },
		  controllerAs: 'threadData'
		};
	});
	
	//This template shows all data in property this.medicinesArray of the constructor for modify.
	myMusicUniverseApp.directive("threadForm", function (){
		return {
		  restrict: 'E',
		  templateUrl:"templates/thread-data.html",
		  controller:function(){
			
		  },
		  controllerAs: 'threadForm'
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