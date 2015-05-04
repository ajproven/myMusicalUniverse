<?php
/**
 * toDoClass class
 * it controls the hole server part of the application
*/
require_once "../model/subforumClass.php";

class toDoClass {
	static public function searchDiseases($action, $diseasesSearchField)
	{
		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		
		switch ( $action )
        {
			case '10031':
              		$listDiseasesSearch = diseaseClass::findAll();
					break;
			  default:
					echo "Action not correct in toDoClass, value: ".$action;
					break;
		}
		
		if (count($listDiseasesSearch)==0)
		{
			$outPutData[0]=false;
			$errors[]="No diseases have been found into the databse";
			$outPutData[1]=$errors;
		}
		else
		{
			$listSearchOutPut = array();
			foreach ($listDiseasesSearch as $disease) {
				# code...
				$listSearchOutPut[]=$disease->getAll();
			}
			$outPutData[1]=$listSearchOutPut;
		}
		
		return json_encode($outPutData);
	}
	
	static public function searchMedicinesByIdDisease($action, $idDisease)
	{
		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		$listMedicinesSearch = array();

		$listMedicinesSearch = medicineClass::findByIdDisease( $idDisease );

		if (count($listMedicinesSearch)==0)
		{
			$outPutData[0]=false;
			$errors[]="No medicines have been found into the databse";
			$outPutData[1]=$errors;
		}
		else
		{
			$listMedicinesOutPut = array();
			foreach ($listMedicinesSearch as $medicine) {
				# code...
				$listMedicinesOutPut[]=$medicine->getAll();
			}
			$outPutData[1]=$listMedicinesOutPut;
		}
		
		return json_encode($outPutData);
	}
	
	static public function modifyMedicines($action, $JSONmedicinesArray)
	{
		//medicines modification
		$medicinesArray = json_decode(stripslashes($JSONmedicinesArray));
		foreach($medicinesArray as $medicineObject)
		{
		    $medicine = new medicineClass();	   	    
		    $medicine->setAll($medicineObject->id, $medicineObject->reference, $medicineObject->idDisease, $medicineObject->name, $medicineObject->description, $medicineObject->effects, $medicineObject->price, $medicineObject->entryDate);
		    $medicine->update();		    
		}
		echo true;
	}

	static public function insertMedicine($action, $JSONData)
	{
		$medicineArray = json_decode(stripslashes($JSONData));
	    $medicine = new medicineClass();   
	    $medicine->setAll($medicineArray->id, $medicineArray->reference, $medicineArray->idDisease, $medicineArray->name, $medicineArray->description, $medicineArray->effects, $medicineArray->price, $medicineArray->entryDate);
	    $medicine->create();

		echo true;
	}
	
	static public function userConnection($action, $JSONData)
	{
		$userObj = json_decode(stripslashes($JSONData));

		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		
		$userList = userClass::findByNameAndPass($userObj->name, $userObj->password);
		
		if (count($userList)==0)
		{
			$outPutData[0]=false;
			$errors[]="No user has found with these data";
			$outPutData[1]=$errors;
		}
		else
		{
			$outPutData[1]=$userList;
		}
		
		return json_encode($outPutData);
	}
}
?>
