/*@name: articleObj.js
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

 //id,idUser, title, entry_date, content, theme


function articleObj () 
{
	//  Attributs  //
	var id;
	var idUser;
	var title;
	var entry_date;
	var content;
	var theme;
	var image;
	
	//  Construct  //
	this.construct = function (id,idUser,title,entry_date,content,theme,image) 
	{
		this.setId(id);
		this.setIdUser(idUser);
		this.setTitle(title);
		this.setEntryDate(entry_date);
		this.setContent(content);
		this.setTheme(theme);
		this.setImage(image);
	}

	//  Accessors  //
	this.setId = function (id) {this.id = id;}
	this.setIdUser = function (idUser) {this.idUser = idUser;}
	this.setTitle = function (title) {this.title = title;}
	this.setEntryDate = function (entry_date) {this.entry_date = entry_date;}
	this.setContent = function (content) {this.content = content;}
	this.setTheme = function (theme) {this.theme = theme;}
	this.setImage = function (image) {this.image = image;}

	this.getId = function () {return this.id;}
	this.getIdUser = function () {return this.idUser;}
	this.getTitle = function () {return this.title;}
	this.getEntryDate = function () {return this.entry_date;}
	this.getContent = function () {return this.content;}
	this.getTheme = function () {return this.theme;}
	this.getImage = function () {return this.image;}

	//  Methods  //
	this.toCookie = function ()
	{
		var cookieString ="id="+this.getId()+":idUser="+this.getIdUser()+":title="+this.getTitle()+":entryDate="+this.getEntryDate()+":content="+this.getContent();
		cookieString +=":theme="+this.getTheme()+":image="+this.getImage();
		
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
							  cookieValues.split(":")[6].split("=")[1]);
	}

	this.arrayToString = function (arrayArticleObj)
	{
		var articleString ="";
		$.each(arrayArticleObj, function (index, articleObj){
			articleString+="article number "+(index+1)+":"+articleObj.toString()+"\n";
		});
		return articleString;
		
	}

	this.toString = function () 
	{
		var articleString = "id="+this.getId()+" idUser="+this.getIdUser()+" title="+this.getTitle()+" entryDate="+this.getEntryDate();
		articleString += " content="+this.getContent()+" theme="+this.getTheme()+" image="+this.getImage();

		return articleString;
	}
}
