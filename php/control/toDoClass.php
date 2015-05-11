<?php
/**
 * toDoClass class
 * it controls the hole server part of the application
*/
require_once "../model/subforumClass.php";
require_once "../model/threadClass.php";
require_once "../model/threadReplyClass.php";
require_once "../model/userClass.php";
require_once "../model/articleClass.php";

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
			
				$listNameCreators[] = $dummy[0]->getAll();
				
			
			}
			
			$outPutData[1]=$listThreadsOutPut;
			$outPutData[2]=$subforumName[0]->getAll();
			$outPutData[3]=$listNameCreators;

		}
		//print_r($outPutData);
		return json_encode($outPutData);

	}

	static function checkIfExistUserName($action, $userName)
	{
		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		$listUsersSearch = array();

		$listUsersSearch = userClass::checkIfExistUserName( $userName );

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
	static public function signUpUserData($action, $userObj) //NEW METHOD TO SIGN UP NEW USER IN DATABASE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: <===
	{
		$userArray = json_decode(stripslashes($userObj));
		
		$user = new userClass();

	    $user->setAll($userArray->id, $userArray->username, $userArray->password, $userArray->name, $userArray->surname1, $userArray->surname2, $userArray->type_user, $userArray->email, $userArray->address, $userArray->bank_account, $userArray->phone, $userArray->image);

	    $user->create();

		echo true;
		//echo json_encode($medicine->toString());
	}


	static public function addNewThread($action, $threadObj) 
	{
		$threadArray = json_decode($threadObj);
		$thread = new threadClass();

	    $thread->setAll($threadArray->id, $threadArray->idUser, $threadArray->title, $threadArray->entryDate, $threadArray->content, $threadArray->totalReplies, $threadArray->idSubforum);
	    //print_r($thread);
	    $threadId = $thread->create();

	    //$thread->findById()
	    $threadReply = new threadReplyClass();
	    //$threadReply ->setId(0);
	    $threadReply->setAll(0,$thread->idUser,$threadId,$thread->content,$thread->entryDate,1);

	    $threadReply->create();

		echo true;
	
	}
	static public function addNewThreadReply($action, $threadReplyObj) 
	{
		/*$threadReplyArray = json_decode($threadReplyObj);
		$thread = new threadClass();

	    $thread->setAll($threadArray->id, $threadArray->idUser, $threadArray->idThread, $threadArray->content, $threadArray->entryDate, $threadArray->numberReply;
	    //print_r($thread);
	    $threadId = $thread->create();

	    //$thread->findById()
	    $threadReply = new threadReplyClass();
	    //$threadReply ->setId(0);
	    $threadReply->setAll(0,$thread->idUser,$threadId,$thread->content,$thread->entryDate,1);

	    $threadReply->create();*/

		echo true;
	
	}

	static public function deleteThread($action, $idThread) 
	{
		//$threadArray = json_decode(stripslashes($threadObj));
		//print_r($threadArray);
		$threadToDelete = new threadClass();
		$threadToDelete->setId($idThread);
		$threadToDelete->delete();
		echo true;
	
	}

	static public function searchArticles($action)
	{
		
		$outPutData = array();
		$errors = array();
		$articles = array();
		$articlesArray = array();
		$outPutData[0]=true;
		
		$articles = articleClass::findAll();

			
		if(count($articles)==0)
		{
			$outPutData[0]=false;
			$errors="There are no articles in database";
			$outPutData[1]=$errors;
		}
		else
		{
			$listNameUsers = array();

			foreach ( $articles as $article)
			{

				$articlesArray[]=$article->getAll();
				$usersArray = userClass::findUserById($article->getIdUser());
				$listNameUsers[] = $usersArray[0]->getAll();
			}
			
			
			$outPutData[1]=$articlesArray;
			$outPutData[2]=$listNameUsers;
		}

		return json_encode($outPutData);	
	}	

	static public function getThreadContent($action,$idThread){

		$outPutData = array();
		$errors = array();
		$outPutData[0]=true;
		$listThreadContent = threadReplyClass::findById($idThread);
		$listThreadTitle = threadClass::findTitleById($idThread);

		//$subforumName = subforumClass::findNameById();
		
		
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
				$dummy = userClass::findById($threadReply->getIdUser());
				$listNameCreators[] = $dummy[0]->getAll();
				
			}

			$outPutData[1]=$listThreadsOutPut;
			$outPutData[2]=$listThreadTitle[0]->getAll();
			$subforumName = subforumClass::findNameById($listThreadTitle[0]->getIdSubforum());
			//$subforumName[] = $dummy1[0]->getAll();
			$outPutData[3]=$listNameCreators;
			$outPutData[4]=$subforumName[0]->getAll();

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
