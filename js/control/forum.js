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
					$scope.idUserConnected = userObj.id;
					$scope.userConnected = true;
					$scope.userType = userObj.type_user;
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
						location.reload();			
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
//				location.reload();			
			}
			else alert("This browser does not support session variables");
				
		}

	});


	myMusicUniverseApp.controller("myMusicalUniverseForumController",['$scope','$sce', function($scope,$sce){
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
				url:"../php/control/control.php",
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


		this.deleteThread = function(id){
			var idSubforum= readUrlVar()["f"];
			var check = confirm("Do you really want to delete this thread?");
			if(check){
		$.ajax({
				url:"../php/control/control.php",
				type: "POST",
				data: "action=6&idThread="+id,
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

			location.reload();
			}

		}
		
		this.getThreadsById = function(){
			//variable para coger el id
			var id= readUrlVar()["f"];
			$scope.subforumId=id;
			this.threadObjArray = new Array();
			this.userObjArray = new Array();
			var outPutData = new Array();
			$.ajax({
				url:"../php/control/control.php",
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
					
					this.subforum = new subforumObj();
					this.subforum.construct(outPutData[2].id,outPutData[2].name,outPutData[2].description,outPutData[2].image,outPutData[2].type);
					this.subforumObjArray.push(this.subforum);
 					$scope.subforumName=this.subforumObjArray[0];


			for (var j = 0; j < outPutData[3].length; j++) {
					this.user = new userObj();
					this.user.construct(outPutData[3][j].id,outPutData[3][j].username,outPutData[3][j].password,outPutData[3][j].name,outPutData[3][j].surname1,outPutData[3][j].surname2,outPutData[3][j].type_user,outPutData[3][j].email,outPutData[3][j].address,outPutData[3][j].bank_account,outPutData[3][j].phone,outPutData[3][j].image);	
					this.userObjArray.push(this.user);
				
				for(var h=0;h<this.threadObjArray.length;h++){

					if(this.userObjArray[j].getId()== this.threadObjArray[j].getIdUser()){
						$scope.threadUserRelationship.push(this.userObjArray[j].getUserName());
						
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
		this.newThread = function(idUser,idSubforum){
			
			window.open("newThread.html?f="+idSubforum,"_self");
		}


		this.submitNewThread = function(idUser){
			tinyMCE.triggerSave();
			var idSubforum= readUrlVar()["f"];
			var outPutdata = new Array();
			var lala = $('#contentText').val();
			tinyMCE.triggerSave();
				

			this.thread.setId(0);
			this.thread.setIdSubforum(idSubforum);
			this.thread.setIdUser(idUser);
			this.thread.setEntryDate(new Date());
			this.thread.setTotalReplies(1);
			this.thread.setContent(lala);
			
			this.thread = angular.copy(this.thread);
			$.ajax({
				url:"../php/control/control.php",
				type: "POST",
				data: "action=5&threadObject="+JSON.stringify(this.thread),
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
			alert("Thread created successfully");
			window.open("subforum.html?f="+idSubforum,"_self");
			
		}



		this.quote = function(idUserQuoter,idMessage){
			alert("idquoter="+idUserQuoter);
			alert("idmessage="+idMessage);

		}
		this.editMessage = function(idMessage){

		}
		this.newThreadReply = function(){
			var id= readUrlVar()["t"];
			window.open("newReply.html?t="+id,"_self");
		}

		this.submitNewThreadReply = function(idUser,whereIsSent){
			tinyMCE.triggerSave();
			var idThread= readUrlVar()["t"];
			var outPutdata = new Array();
			var tinymce_editor_id = 'my_tinymce_id';
			var lala = $('#contentText').val();
			var regex = /(<([^>]+)>)/ig;
			var result = lala.replace(regex, "");
			if(lala=="" || result.length<3){

				alert("The message is too short. Must be minimum three characters");
			}else{

				this.threadReply.setId(0);
				this.threadReply.setIdUser(idUser);
				this.threadReply.setIdThread(idThread);
				this.threadReply.setContent(lala);
				this.threadReply.setEntryDate(new Date());
				this.threadReply.setNumReply(0);
				
				this.threadReply = angular.copy(this.threadReply);
				$.ajax({
					url:"../php/control/control.php",
					type: "POST",
					data: "action=7&threadReplyObject="+JSON.stringify(this.threadReply)+"&idThread="+JSON.stringify(idThread),
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
				alert("Response created successfully");
				
				if(whereIsSent==0){
					window.location.replace("http://localhost/myMusicalUniverse/html/thread.html?t="+idThread);
				}else{
					//tinyMCE.activeEditor.setContent('<span>some</span> html');
					location.reload();

				}	
			}
			

			
			
		}

		this.getThreadContent = function(){
			tinyMCE.triggerSave();
			var id= readUrlVar()["t"];
			this.threadContentArray = new Array();
			this.userObjArray = new Array();
			this.threadObjArray = new Array();
			
			$.ajax({
				url:"../php/control/control.php",
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
				$scope.replyContent=new Array();
				//$scope.replyUserImage = new Array();
			for (var i = 0; i < outPutData[1].length; i++) {
					this.threadReply = new threadReplyObj();
					this.threadReply.construct(outPutData[1][i].id,outPutData[1][i].idUser ,outPutData[1][i].idThread ,outPutData[1][i].entryDate ,outPutData[1][i].content,outPutData[1][i].numberReply);
					this.threadContentArray.push(this.threadReply);

					$scope.replyContent.push($sce.trustAsHtml(this.threadContentArray[i].getContent()));
			}

					//for(var u=0;u<outPutData[2].length;u++){
					this.thread = new threadObj();
					this.thread.construct(outPutData[2].id,outPutData[2].idUser ,outPutData[2].title ,outPutData[2].entryDate ,outPutData[2].content,outPutData[2].totalReplies,outPutData[2].idSubforum);
					this.threadObjArray.push(this.thread);
					$scope.threadName=this.threadObjArray[0].getTitle();
					
			for (var j = 0; j < outPutData[3].length; j++) {
					this.user = new userObj();
					this.user.construct(outPutData[3][j].id,outPutData[3][j].username,outPutData[3][j].password,outPutData[3][j].name,outPutData[3][j].surname1,outPutData[3][j].surname2,outPutData[3][j].type_user,outPutData[3][j].email,outPutData[3][j].address,outPutData[3][j].bank_account,outPutData[3][j].phone,outPutData[3][j].image);
					this.userObjArray.push(this.user);
				}
				for(var h=0;h<this.threadContentArray.length;h++){

					if(this.userObjArray[h].getId()== this.threadContentArray[h].getIdUser()){
						$scope.replyUserName.push(this.userObjArray[h]);

					}
 			}		

 				//subforum object creation and his scope
 					this.subforum = new subforumObj();
					this.subforum.construct(outPutData[4].id,outPutData[4].name,outPutData[4].description,outPutData[4].image,outPutData[4].type);
					this.subforumObjArray.push(this.subforum);
 					$scope.subforumName=this.subforumObjArray[0];

				
			
			}
		}


		
}]);
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
		  templateUrl:"../header-form.html",
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