/*@name: subforumObj.js
 *@author: Pavon Muñoz, Jose Luis.
 *@date: 2015/05/05.
 *@description: it is the main class of the subforumObj.
 *@attributes:
 *		- id: main key for the medicineObj class.
 		- name: name of the medicine object.
 		- description: description of medicine object.
 *@methods:
 		- construct.
 		- set's and get's foor each subforum.
 		- toCookie: method that transforms a medicine object on a string with proper formatting for cookies.
 		- cookieToObject: method that transforms a cookie on a medicine object.
 		- arrayToString: method passed an array of medicines objects, concatenated into a string object and returns the string.
 		- toString: method that concatenates a string each property of an object normally to display a warning message.
 *
 */

 //id,idUser, nif, name, surname1, surname2, address, email, phone, birthDate, entryDate, dropOutDate


function subforumObj () 
{
	//  Attributs  //
	var id;
	var name;
	var description;
	
	//  Construct  //
	this.construct = function (id,name,description) 
	{
		this.setId(id);
		this.setName(name);
		this.setDescription(description);
	}

	//  Accessors  //
	this.setId = function (id) {this.id = id;}
	this.setName = function (name) {this.name = name;}
	this.setDescription = function (description) {this.description = description;}
	
	this.getId = function () {return this.id;}
	this.getName = function () {return this.name;}
	this.getDescription = function () {return this.description;}
	

	//  Methods  //
	/*
	this.toCookie = function ()
	{
		var cookieString ="id="+this.getId()+":username="+this.getUserName()+":password="+this.getPassword()+":name="+this.getName()+":surname1="+this.getSurname1();
		cookieString +=":surname2="+this.getSurname2()+":type_user="+this.getTypeUser()+":email="+this.getEmail()+":address="+this.getAddress()+":bank_account="+this.getBankAccount()+":phone="+this.getPhone();
		
		return cookieString;
	}

	this.cookieToObject = function (cookieValues)
	{

		this.construct(cookieValues.split(":")[0].split("=")[1],
							  cookieValues.split(":")[1].split("=")[1],
							  cookieValues.split(":")[2].split("=")[1],
							  cookieValues.split(":")[3].split("=")[1],
							  cookieValues.split(":")[4].split("=")[1],
							  cookieValues.split(":")[5].split("=")[1],
							  cookieValues.split(":")[6].split("=")[1],
							  cookieValues.split(":")[7].split("=")[1],
							  cookieValues.split(":")[8].split("=")[1],
							  cookieValues.split(":")[9].split("=")[1],
							  cookieValues.split(":")[10].split("=")[1]);
	}
*//*
	this.arrayToString = function (arraysubforumObj)
	{
		var userString ="";
		$.each(arraysubforumObj, function (index, subforumObj){
			userString+="user number "+(index+1)+":"+subforumObj.toString()+"\n";
		});
		return userString;
		
	}

	this.toString = function () 
	{
		var clientString = "id="+this.getId()+" username="+this.getUserName()+" password="+this.getPassword()+" name="+this.getName();
		clientString += " surname1="+this.getSurname1()+" surname2="+this.getSurname2()+" type_user="+this.getTypeUser()+" email="+this.getEmail()+" address="+this.getAddress()+" bank_account="+this.getBankAccount()+" phone="+this.getPhone();

		return clientString;
	}*/
	this.toString = function () 
	{
		var subforumString = "id="+this.getId()+" name="+this.getName()+" description="+this.getDescription() ;
		

		return subforumString;
	}
}
