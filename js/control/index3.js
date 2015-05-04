$(document).ready(function (){
	//TODO...
});

//Angular code
(function (){
	//Application module.
	var pharmacyCartManagement = angular.module('pharmacyCartManagement', ["ng-currency"]);

	//Controllers of the application
	pharmacyCartManagement.controller("pharmacySessionController", function($scope){

		//======== PROPERTIES ===========//
		//Properties
		
		this.user = new userObj();

		this.client = new clientObj();
		
		//Scope variables
		$scope.userAction=0;
		$scope.repeatPassword;
		//Gets a todayDay correctly formatted.
		$scope.todayDate = GetTodayDate();
		$scope.image = "images/usersImages/defaultUser.png";
		this.user.setImage($scope.image);

		this.login = function ()
		{
			var outPutdata = new Array();
			
			this.user = angular.copy(this.user);
			
			//Check if credentials are correct in database
			$.ajax({
				  url: 'php/control/control.php',
				  type: 'POST',
				  async: false,
				  data: 'action=10070&JSONData='+JSON.stringify(this.user),
				  dataType: "json",
				  beforeSend: function () { 

						$("#loadDiv").css("display","block");
				  },
				  complete: function () { 
						  
						  $('#loadDiv').css("display","none");
				  },
				  success: function (response) { 
					  outPutdata = response;
				  },
				  error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status+"\n"+thrownError);
				  }	
			});

			
			if(outPutdata[0] && outPutdata[2]==undefined)
			{
				if(typeof(Storage))
				{
					this.user = new userObj();
					this.user.construct(outPutdata[1][0].id, outPutdata[1][0].nick, outPutdata[1][0].password, outPutdata[1][0].type_user, outPutdata[1][0].active, outPutdata[1][0].image);
					sessionStorage.setItem("userConnected",JSON.stringify(this.user));
					window.open("mainWindow.html","_self");
				}
				else alert("This browser does not support session variables");
			} 
			else if (outPutdata[0] && outPutdata[2]!=undefined)
			{
				this.user = new userObj();
				this.user.construct(outPutdata[1][0].id, outPutdata[1][0].nick, outPutdata[1][0].password, outPutdata[1][0].type_user, outPutdata[1][0].active, outPutdata[1][0].image);

				this.client = new clientObj();
				this.client.construct(outPutdata[2].id, outPutdata[2].idUser, outPutdata[2].nif, outPutdata[2].name, outPutdata[2].surname1, outPutdata[2].surname2, outPutdata[2].address, outPutdata[2].email, outPutdata[2].phone, outPutdata[2].birthDate, outPutdata[2].entryDate, outPutdata[2].dropOutDate);

				var userDataArray = new Array();
				userDataArray[0] = this.user;
				userDataArray[1] = this.client;
				sessionStorage.setItem("userConnected",JSON.stringify(userDataArray));
				window.open("mainWindow.html","_self");
			}else showErrors(outPutdata[1]);					
		}

		this.sessionController = function ()
		{
			
			if(typeof(Storage))
			{
				var userObj = JSON.parse(sessionStorage.getItem("userConnected"));
				
				if(userObj != undefined)
				{
					window.open("mainWindow.html","_self");
				}
			}
			else alert("This browser does not support session variables");
		}

		this.checkPassword = function () 
		{
			if (this.user.getPassword()!=$scope.repeatPassword)
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

		this.checkNickname = function () {

			var outPutData = new Array();

			$.ajax({
				url:"php/control/control.php",
				type: "POST",
				data: "action=10090&userNick="+this.user.getNick(),
				dataType: "json",
				beforeSend: function () { 

					$("#loadDiv").css("display","block");
				},
				complete: function () { 
					  
					  $('#loadDiv').css("display","none");
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
					$("#nickname").removeClass("ng-invalid").addClass("ng-valid");
					//alert("This reference is ok!");



				} else {
					//showErrors(outPutData[1]);
					$("#nickname").removeClass("ng-valid").addClass("ng-invalid");
					alert("Error - User with nick: "+this.user.getNick()+" already exist in database");
				}
		}

		this.userManagement = function ()
		{
			var outPutdata = new Array();
			this.user = angular.copy(this.user);
			this.client = angular.copy(this.client);

			var imagesNameArray = this.imagesManagement(this.user.getNick());
			this.user.setImage(imagesNameArray[0]);
			this.user.setId(0);
			this.user.setActive(0);
			this.user.setTypeUser(1);

			this.client.setId(0);
			this.client.setEntryDate(new Date());
			this.client.setDropOutDate("0000-00-00");
			
			$.ajax({
				  url: 'php/control/control.php',
				  type: 'POST',
				  async: false,
				  data: 'action=10005&clientObject='+JSON.stringify(this.client)+'&userObject='+JSON.stringify(this.user),
				  dataType: "json",
				  beforeSend: function () { 

						$("#loadDiv").css("display","block");
				  },
				  complete: function () { 
						  
						  $('#loadDiv').css("display","none");
				  },
				  success: function (response) { 
					  outPutdata = response;
				  },
				  error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status+"\n"+thrownError);
				  }	
			});
			//alert(outPutdata);
			alert("Successfully registered, you will be redirected to the homepage");
			
			this.login();
		}

		this.imagesManagement = function (userNick)
		{
			var imageFiles = new FormData();
			var nicksArray = new Array();
			nicksArray.push(userNick);
			
			var image = $("#imageUser")[0].files[0];
			
			imageFiles.append('images[]',image);
			
			var serverFileNames = new Array();
			
			$.ajax({
				url : 'php/control/controlFiles.php?action=10020&nicksArray='+JSON.stringify(nicksArray),
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

		this.validateBirthDate = function ()
		{
			if (this.client.getBirthDate()>$scope.todayDate){
				$("#birthDate").removeClass("ng-valid").addClass("ng-invalid");
				$scope.correctBirthDate = false;
			} else {
				$("#birthDate").removeClass("ng-invalid").addClass("ng-valid");
				$scope.correctBirthDate = true;
			}
		}

	});

	//This directive it's necesary to use the calendar plugin in the templates.
	pharmacyCartManagement.directive('calendar', function () {
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
	pharmacyCartManagement.directive("userDataForm", function (){
		return {
		  restrict: 'E',
		  templateUrl:"templates/user-data-form.html",
		  controller:function(){
			
		  },
		  controllerAs: 'userDataForm'
		};
	});
})();