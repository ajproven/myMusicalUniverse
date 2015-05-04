function GetTodayDate() {
   var tdate = new Date();
   var dd = tdate.getDate(); //yields day
   var MM = tdate.getMonth(); //yields month
   var yyyy = tdate.getFullYear(); //yields year
   var xxx;

   if(MM<10){
      xxx = yyyy + "-" +"0"+( MM+1) + "-" + dd;
   } else {
      xxx = yyyy + "-" +( MM+1) + "-" + dd;
   }
   return xxx;
}


function createDOMElement(tagType, attrArray, eventsArray, optAttrValues)
{
  var elem = $("<"+tagType+"></"+tagType+">");
  
  for (var attrElm in attrArray) elem.attr(attrElm,attrArray[attrElm]);
  
  for (var event in eventsArray)
  {
    elem.bind(event,function (){eval(eventsArray[event])});
  }
  
  for (var i = 0; i < optAttrValues.length; i++)
  {
    var option = $("<option></option>").html(optAttrValues[i][1]);
    
    for(var attrOpt in optAttrValues[i][0]) option.attr(attrOpt,optAttrValues[i][0][attrOpt]);
    
    elem.append(option);
  }
  
  return elem;
}

/**
* getAllDiseases()
* This method makes an ajax call to pick up all disease objects in database.
* @param route: variable route to make the call in popUpWindow.html or index.html.
* @return outPutData: array of disease objects.
* @version Sales Fabregat, Alejandro.
*/

//El Robert diu de fer-ho passant tots els parametres aixi es pot fer servir aquesta funcio amb totes les crides $ajax.
//TODO...
function getAllDiseases(route) {

  var outPutData = new Array();
  var diseaseObjArray = new Array();
  $.ajax({
        url:route+"php/control/control.php",
        type: "POST",
        data: "action=10031&idDisease=",
        dataType: "json",
        async: false,
        beforeSend: function () { 

          $("#loadDiv").css("display","block");
        },
        complete: function () { 
            
            $('#loadDiv').css("display","none");
        },
        success: function (response) {
          outPutData = response;
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert("There has been an error while connecting to the server, try later");
          console.log(xhr.status+"\n"+thrownError);
        }
    });

    if(outPutData[0]){
          //Omplim l'array d'objectes malaltia que teniem amb les dades rebudes del servidor.
          for (var i = 0; i < outPutData[1].length; i++) {
            var diseaseOb = new diseaseObj();
            diseaseOb.construct(outPutData[1][i].id,outPutData[1][i].colloquialName,outPutData[1][i].scientificName,outPutData[1][i].originLocation,outPutData[1][i].description,outPutData[1][i].symptoms);
            diseaseObjArray.push(diseaseOb);
          };
    } else {
      showErrors(outPutData[1]);
    }

  return diseaseObjArray;
}


function showErrors(errors)
{
  var errorString = "";
  
  $.each(errors, function (index, error){
    errorString+=error+"\n";
  });
  /*
  for (var i = 0; i < errors.length; i++)
  {
    error+=errors[i]+"\n";
  }
  */
  alert(errorString);
}

/*@name: validateDate()
 *@author: Sales Fabregat, Alejandro.
 *@date: 05/12/2014.
 *@description: This function validates whether the client discharge
                date is correct or is well formatted.
 *@param: date is value of discharge date.
 *  
*/
function validateDate (date)
{
	var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
          if(date.match(dateformat)){
          var seperator1 = date.split('/');
          var seperator2 = date.split('-');

          if (seperator1.length>1)
          {
              var splitdate = date.split('/');
          }
          else if (seperator2.length>1)
          {
              var splitdate = date.split('-');
          }

          var dd = parseInt(splitdate[0]);
          var mm  = parseInt(splitdate[1]);
          var yy = parseInt(splitdate[2]);

          var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
          if (mm==1 || mm>2)
          {
              if (dd>ListofDays[mm-1])
              {
                  return false;
              }
          }
          if (mm==2)
          {
              var lyear = false;
              if ( (!(yy % 4) && yy % 100) || !(yy % 400))
              {
                  lyear = true;
              }
              if ((lyear==false) && (dd>=29))
              {
                  return false;
              }
              if ((lyear==true) && (dd>29))
              {
                  return false;
              }
          }
          return true;
      }
      else
      {
          return false;
      }
}

/*@name: isNIF()
 *@author: Sales Fabregat, Alejandro.
 *@date: 05/12/2014.
 *@description: this function check if a NIF is correct. (between 5 and 8 letters followed by the letter).
                accepts NIEs (Foreigners with X, Y or Z to first character).
 *@param: nif is the value of client nif.
 *  
*/ 
function isNIF (nif) {
	var num, let, letter;
	var regular_expresion = /^[XYZ]?\d{5,8}[A-Z]$/;
 
	nif = nif.toUpperCase();
 
	if(regular_expresion.test(nif) === true){
		num = nif.substr(0,nif.length-1);
		num = num.replace('X', 0);
		num = num.replace('Y', 1);
		num = num.replace('Z', 2);
		let = nif.substr(nif.length-1, 1);
		num = num % 23;
		letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
		letter = letter.substring(num, num+1);
		if (letter != let) {
			//Invalid NIF, the letter does not correspond.
			return false;
		}else{
			//NIF valid.
			return true;
		}
	}else{
		//Invalid NIF, the format does not match.
		return false;
	}
}

/*@name: checkEmail()
 *@author: Sales Fabregat, Alejandro.
 *@date: 05/12/2014.
 *@description: This function validates if the email client is well formatted.
 *@param: mail is the value of email client.
 *  
*/
function checkEmail (mail) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(mail)) {
    //mail.focus;
      return false;
    } else {
      return true;
    }
}
