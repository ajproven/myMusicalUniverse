<?php
/**
 * toDoClass class
 * it controls the hole server part of the application
*/
require_once "../model/subforumClass.php";

class toDoClass {
	/*static public function login($action, $username, $password)
	{
		
	}*/

	static public function getAllSubforums($action)
	{
		$outPutData = array();
		$errors = array();
		$error = false;
		//calls the function
		$log = subforumClass::findAll();
		
		foreach($log as $value){
			if($value!=null){
			array_push($outPutData,$value->getAll());
			}
		}
		
		 return json_encode($outPutData);
		
		 
	}
/*
	static public function getAllSubforums($action){


	$listSubforums = array();
	$listSubforums = subforumClass::findAll();		
	$outPutData = array();
		$errors = array();
		$outPutData[0]=true;

		if (count($listSubforums)==0)
		{
			$outPutData[0]=false;
			$errors[]="No subforums have been found into the databse";
			$outPutData[1]=$errors;
		}
		else
		{	$listSubforumOutPut = array();
			foreach ($listSubforums as $subforums) {
			
				$listSubforumOutPut[]=$subforums->getAll();
			}
			
			$outPutData[1]=$listSubforums;
		}
		
		return json_encode($outPutData);
		
	}*/
	/*
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
	}*/
}
?>
