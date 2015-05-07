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
		this.thread = new threadObj();
		this.user = new userObj();
		this.subforumObjArray = new Array();
		this.threadObjArray = new Array();
		this.userObjArray = new Array();
		
		

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
			for (var i = 0; i < outPutData[1].length; i++) {
					this.thread = new threadObj();
					this.thread.construct(outPutData[1][i].id,outPutData[1][i].idUser ,outPutData[1][i].title ,outPutData[1][i].entryDate ,outPutData[1][i].content,outPutData[1][i].totalReplies,outPutData[1][i].idSubforum);
					this.threadObjArray.push(this.thread);
					//var fecha = this.threadObjArray[i].getEntryDate();
			}
			/*for (var j = 0; j < outPutData[2].length; j++) {
					this.subforum = new subforumObj();
					
					this.subforum.construct(outPutData[2][j].id,outPutData[2][j].name,outPutData[2][j].description,outPutData[2][j].image,outPutData[2][j].type);
					this.subforumObjArray.push(this.subforum);
					alert(this.subforumObjArray[jjj]);
					}*/
					$scope.subforumName=outPutData[2];

			}/*
			for (var j = 0; j < outPutData[2].length; i++) {
					this.user = new userObj();
					this.user.construct(outPutData[1][2][j].id,outPutData[1][i].idUser ,outPutData[1][i].title ,outPutData[1][i].entryDate ,outPutData[1][i].content,outPutData[1][i].totalReplies,outPutData[1][i].idSubforum);
					this.userObjArray.push(this.user);
					//var fecha = this.threadObjArray[i].getEntryDate();
			}*/
			
		//	}else{

			
		//	}
		//	var name = readUrlVar()["n"];

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
		this.getThreadContentById = function(){
			
			var id= readUrlVar()["t"];
			this.threadReplyObjArray = new Array();
			//this.userObjArray = new Array();
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
			for (var i = 0; i < outPutData[1].length; i++) {
			//		this.thread = new threadObj();
			//		this.thread.construct(outPutData[1][i].id,outPutData[1][i].idUser ,outPutData[1][i].title ,outPutData[1][i].entryDate ,outPutData[1][i].content,outPutData[1][i].totalReplies,outPutData[1][i].idSubforum);
			//		this.threadObjArray.push(this.thread);
			//alert(outPutData[1]);
					//var fecha = this.threadObjArray[i].getEntryDate();
					}
			/*for (var i = 0; i < outPutData[2].length; i++) {
					this.user = new userObj();
					this.user.construct(outPutData[2][i].id,outPutData[2][i].name);
					this.userObjArray.push(this.user);
					//var fecha = this.threadObjArray[i].getEntryDate();
					}*/
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

})();


		
function readUrlVar(){
			var vars = {};
    	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    	});
	    return vars;
		}