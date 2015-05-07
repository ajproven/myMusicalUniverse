/*@name: userObj.js
 *@author: Sales Fabregat, Alejandro.
 *@date: 2015/05/04.
 *@description: it is the main class of the userObj.
 *@attributes:
 *		- id: main key for the medicineObj class.
 		- reference: it's the reference to medicine (such as bar code).
 		- idDisease: foreign key for the diseaseObj class.
 		- name: name of the medicine object.
 		- description: description of medicine object.
 		- effects: effects of medicine object.
 		- price: price of medicine object.
 		- entryDate: entry date of medicine object.
 *@methods:
 		- construct.
 		- set's and get's foor each stock.
 		- toCookie: method that transforms a medicine object on a string with proper formatting for cookies.
 		- cookieToObject: method that transforms a cookie on a medicine object.
 		- arrayToString: method passed an array of medicines objects, concatenated into a string object and returns the string.
 		- toString: method that concatenates a string each property of an object normally to display a warning message.
 *
 */

 //id,username, password, name, surname1, surname2, type_user, email, address, bank_account, phone, image


function userObj () 
{
	//  Attributs  //
	var id;
	var username;
	var password;
	var name;
	var surname1;
	var surname2;
	var type_user;
	var email;
	var address;
	var bank_account;
	var phone;
	var image;
	
	//  Construct  //
	this.construct = function (id,username,password,name,surname1,surname2,type_user,email,address,bank_account,phone,image) 
	{
		this.setId(id);
		this.setUserName(username);
		this.setPassword(password);
		this.setName(name);
		this.setSurname1(surname1);
		this.setSurname2(surname2);
		this.setTypeUser(type_user);
		this.setEmail(email);
		this.setAddress(address);
		this.setBankAccount(bank_account);
		this.setPhone(phone);
		this.setImage(image);
	}

	//  Accessors  //
	this.setId = function (id) {this.id = id;}
	this.setUserName = function (username) {this.username = username;}
	this.setPassword = function (password) {this.password = password;}
	this.setName = function (name) {this.name = name;}
	this.setSurname1 = function (surname1) {this.surname1 = surname1;}
	this.setSurname2 = function (surname2) {this.surname2 = surname2;}
	this.setTypeUser = function (type_user) {this.type_user = type_user;}
	this.setEmail = function (email) {this.email = email;}
	this.setAddress = function (address) {this.address = address;}
	this.setBankAccount = function (bank_account) {this.bank_account = bank_account;}
	this.setPhone = function (phone) {this.phone = phone;}
	this.setImage = function (image) {this.image = image;}

	this.getId = function () {return this.id;}
	this.getUserName = function () {return this.username;}
	this.getPassword = function () {return this.password;}
	this.getName = function () {return this.name;}
	this.getSurname1 = function () {return this.surname1;}
	this.getSurname2 = function () {return this.surname2;}
	this.getTypeUser = function () {return this.type_user;}
	this.getEmail = function () {return this.email;}
	this.getAddress = function () {return this.address;}
	this.getBankAccount = function () {return this.bank_account;}
	this.getPhone = function () {return this.phone;}
	this.getImage = function () {return this.image;}
	

	//  Methods  //
	this.toCookie = function ()
	{
		var cookieString ="id="+this.getId()+":username="+this.getUserName()+":password="+this.getPassword()+":name="+this.getName()+":surname1="+this.getSurname1();
		cookieString +=":surname2="+this.getSurname2()+":type_user="+this.getTypeUser()+":email="+this.getEmail()+":address="+this.getAddress()+":bank_account="+this.getBankAccount()+":phone="+this.getPhone()+":image="+this.getImage();
		
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
							  cookieValues.split(":")[10].split("=")[1],
							  cookieValues.split(":")[11].split("=")[1]);
	}

	this.arrayToString = function (arrayUserObj)
	{
		var userString ="";
		$.each(arrayUserObj, function (index, userObj){
			userString+="user number "+(index+1)+":"+userObj.toString()+"\n";
		});
		return userString;
		
	}

	this.toString = function () 
	{
		var clientString = "id="+this.getId()+" username="+this.getUserName()+" password="+this.getPassword()+" name="+this.getName();
		clientString += " surname1="+this.getSurname1()+" surname2="+this.getSurname2()+" type_user="+this.getTypeUser()+" email="+this.getEmail()+" address="+this.getAddress()+" bank_account="+this.getBankAccount()+" phone="+this.getPhone()+" image="+this.getImage();

		return clientString;
	}
}
