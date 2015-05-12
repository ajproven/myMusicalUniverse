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


function threadReplyObj () 
{
	//  Attributs  //
	var id;
	var idUser;
	var idThread;
	var entryDate;
	var content;
	var numReply;
	
	
	//  Construct  //
	this.construct = function (id,idUser,idThread,entryDate,content,numReply) 
	{
		this.setId(id);
		this.setIdUser(idUser);
		this.setIdThread(idThread);
		this.setEntryDate(entryDate);
		this.setContent(content);
		this.setNumReply(numReply);
		
	}

	//  Accessors  //
	this.setId = function (id) {this.id = id;}
	this.setIdUser = function (idUser) {this.idUser = idUser;}
	this.setIdThread = function (idThread) {this.idThread = idThread;}
	this.setEntryDate = function (entryDate) {this.entryDate = entryDate;}
	this.setContent = function (content) {this.content = content;}
	this.setNumReply = function (numReply) {this.numReply = numReply;}
	

	this.getId = function () {return this.id;}
	this.getIdUser = function () {return this.idUser;}
	this.getIdThread = function () {return this.idThread;}
	this.getEntryDate = function () {return this.entryDate;}
	this.getContent = function () {return this.content;}
	this.getNumReply = function () {return this.numReply;}
	
	
	this.toString = function () 
	{
		var threadsString = "id="+this.getId()+" idUser="+this.getIdUser()+" idThread="+this.getIdThread()+" entryDate="+this.getEntryDate()+" content= "+this.getContent()+" numReply="+this.getNumReply()+"\n";
		

		return threadsString;
	}
}
