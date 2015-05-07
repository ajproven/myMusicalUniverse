<?php
/**
 * toDoClass class
 * it controls the hole server part of the application
*/
require_once "../model/subforumClass.php";
require_once "../model/threadClass.php";
require_once "../model/threadReplyClass.php";
require_once "../model/userClass.php";

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

	static public function getThreadsBySubforum($action,$idSubforum){

		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		$listThreadSearch = threadClass::findById($idSubforum);
		$subforumName = subforumClass::findNameById($idSubforum);

		
		 if (count($listThreadSearch)==0)
		{
			$outPutData[0]=false;
			$errors[]="No threads have been found into the databse";
			$outPutData[1]=$errors;
		}
		else
		{
			$listThreadsOutPut = array();
			$listNameCreators = array();
			foreach ($listThreadSearch as $thread) {
				$listThreadsOutPut[]=$thread->getAll();
				$dummy = userClass::findNameById($thread->getIdUser());
				
					//echo sizeof($dummy);
				//print_r($dummy[0]);
				$listNameCreators[] = $dummy[0]->getAll();
				
			//print_r ($listNameCreators);
				
				//foreach ($listNameCreators as $list) {
				
					//print_r($listNameCreators);
				//}
				
			}
			//print_r($listNameCreators);
			//print_r($subforumName);
			$outPutData[1]=$listThreadsOutPut;
			$outPutData[2]=$subforumName[0]->getName();
			//$outPutData[3]=$listNameCreators[0];

		}
		//print_r($outPutData);
		return json_encode($outPutData);

	}
	static public function getThreadContent($action,$idThread){

		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		$listThreadContent = threadReplyClass::findById($idThread);
		
		 if (count($listThreadContent)==0)
		{
			$outPutData[0]=false;
			$errors[]="No responses to this thread been found into the databse";
			$outPutData[1]=$errors;
		}
		else
		{
			$listThreadsOutPut = array();
			//$listUserOutPut = array();
			foreach ($listThreadContent as $threadReply) {
				$listThreadsOutPut[]=$threadReply->getAll();
				//$listNameCreators = userClass::findNameById($thread->getIdUser());
				//print_r ($listNameCreators[0]);
				
				//foreach ($listNameCreators as $list) {
					//$outPutData[2]=$listNameCreators[0]->getAll();
					//print_r($list);
				//}
				
			}

			$outPutData[1]=$listThreadsOutPut;
		}
		
		return json_encode($outPutData);
	}
}
?>
