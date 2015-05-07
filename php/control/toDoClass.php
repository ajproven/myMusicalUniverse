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
				$dummy = userClass::findById($thread->getIdUser());
				
					//echo sizeof($dummy);
				//print_r($dummy[0]);
				$listNameCreators[] = $dummy[0]->getUsername();
				
			//print_r ($listNameCreators);
				
				//foreach ($listNameCreators as $list) {
				
					//print_r($listNameCreators);
				//}
				
			}
			//print_r($listNameCreators);
			//print_r($subforumName);
			$outPutData[1]=$listThreadsOutPut;
			$outPutData[2]=$subforumName[0]->getName();
			$outPutData[3]=$listNameCreators;

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
	static public function userConnection($action, $JSONData)
	{
		$userObj = json_decode(stripslashes($JSONData));

		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		
		$userList = userClass::findByUsernameAndPass($userObj->username, $userObj->password);
		
		if (count($userList)==0)
		{
			$outPutData[0]=false;
			$errors[]="No user has found with these data";
			$outPutData[1]=$errors;
		}
		else
		{
			foreach ( $userList as $user)
			{	
				$usersArray[]=$user->getAll();
			}
			
			$outPutData[1]=$usersArray;

		}
		//print_r( $outPutData);

		return json_encode($outPutData);
	}

	static function checkIfExistNickname($action, $userNick)
	{
		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		$listUsersSearch = array();

		$listUsersSearch = userClass::checkIfExistNick( $userNick );

		if (count($listUsersSearch)==0)
		{
			$outPutData[0]=true;
			$errors[]=false;
			$outPutData[1]=$errors;
		}
		else
		{
			$outPutData[0]=false;
			$errors[]=true;
			$outPutData[1]=$errors;
		}
		
		return json_encode($outPutData);
	}	
}
?>
