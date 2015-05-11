<?php 

/** threadClass.php
 * Entity threadClass
 * autor  Pavon Muñoz, Jose Luis
 * version 2015/05/04
 */

require_once "BDmyMusicalU.php";


class threadClass {

	public $id;
    public $idUser;
    public $title;
    public $entryDate;
    public $content;
    public $totalReplies;
    public $idSubforum;
    

    //----------Data base Values---------------------------------------
    private static $tableName = "thread";
    private static $colNameId = "id";
    private static $colNameIdUser = "id_user";
    private static $colNameTitle = "title";
    private static $colNameDate = "entry_date";
    private static $colNameContent = "content";
    private static $colNameReplies = "total_replies";
    private static $colNameIdSubforum = "id_subforum";

    function __construct() {
    }

    public function getId() {
        return $this->id;
    }
    
    public function getIdUser() {
        return $this->idUser;
    }
	public function getTitle(){
		return $this->title;
	}
	public function getEntryDate(){
		return $this->entryDate;
	}

	public function getContent(){
		return $this->content;
	}
	public function getTotalReplies(){
		return $this->totalReplies;
	}
	public function getIdSubforum(){
		return $this->idSubforum;
	}
    

    public function setId($id) {
        $this->id = $id;
    }
    public function setIdUser($idUser) {
        $this->idUser = $idUser;
    }
    public function setTitle($title){
    	$this->title=$title;
    }
    public function setEntryDate($entryDate){
    	$this->entryDate=$entryDate;
    }
    public function setContent($content){
    	$this->content=$content;
    }
    public function setTotalReplies($totalReplies){
    	$this->totalReplies=$totalReplies;
    }
    public function setIdSubforum($idSubforum){
    	$this->idSubforum=$idSubforum;
    }
	
    public function getAll() {
		$data = array();
		$data["id"] = $this->getId();	
		$data["idUser"] = $this->getIdUser();
		$data["title"] = $this->getTitle();
		$data["entryDate"] = $this->getEntryDate();
		$data["content"] = $this->getContent();
		$data["totalReplies"] = $this->getTotalReplies();
		$data["idSubforum"] = $this->getIdSubforum();
		return $data;
    }

    public function setAll($id,$idUser,$title,$entryDate,$content,$totalReplies,$idSubforum) {
		$this->setId($id);
		$this->setIdUser($idUser);
		$this->setTitle($title);
		$this->setEntryDate($entryDate);
		$this->setContent($content);
		$this->setTotalReplies($totalReplies);
		$this->setIdSubforum($idSubforum);
    }

    //---Databese management section-----------------------
    /**
	 * fromResultSetList()
	 * this function runs a query and returns an array with all the result transformed into an object
	 * @param res query to execute
	 * @return objects collection
    */
    private function fromResultSetList( $res ) {
		$entityList = array();
		$i=0;
		while ( ($row = $res->fetch_array(MYSQLI_BOTH)) != NULL ) {
			//We get all the values an add into the array
			$entity = threadClass::fromResultSet( $row );
			
			$entityList[$i]= $entity;
			$i++;
		}
		return $entityList;
    }

    /**
	* fromResultSet()
	* the query result is transformed into an object
	* @param res ResultSet del qual obtenir dades
	* @return object
    */
    private function fromResultSet( $res ) {
	//We get all the values form the query
		$id = $res[ threadClass::$colNameId];
		$idUser = $res[ threadClass::$colNameIdUser ];
		$title = $res[ threadClass::$colNameTitle ];		
		$entryDate = $res[ threadClass::$colNameDate ];		
		$content = $res[ threadClass::$colNameContent ];		
		$totalReplies = $res[ threadClass::$colNameReplies ];		
		$idSubforum = $res[ threadClass::$colNameIdSubforum ];		
		
       	//Object construction
       	$entity = new threadClass();
		$entity->setId($id);
		$entity->setIdUser($idUser);
		$entity->setTitle($title);
		$entity->setEntryDate($entryDate);
		$entity->setContent($content);
		$entity->setTotalReplies($totalReplies);
		$entity->setIdSubforum($idSubforum);
		
		return $entity;
    }

    /**
	 * findByQuery()
	 * It runs a particular query and returns the result
	 * @param cons query to run
	 * @return objects collection
    */
    public function findByQuery( $cons ) {
	//Connection with the database
		$conn = new BDmyMusicalU();
		if (mysqli_connect_errno()) {
    		printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
    		exit();
		}
	
		//Run the query
		$res = $conn->query($cons);

		return threadClass::fromResultSetList( $res );
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public function findAll( ) {
    	$cons = "select * from `".threadClass::$tableName."`";
		return threadClass::findByQuery( $cons );
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public function findById($idSubforum) {
    	
    	$cons = "select * from `".threadClass::$tableName."` where ".threadClass::$colNameIdSubforum." = '".$idSubforum."'";
		return threadClass::findByQuery( $cons );
    }


    /**
	 * findTitleById()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public function findTitleById($id) {
    	
    	$cons = "select * from `".threadClass::$tableName."` where ".threadClass::$colNameId." =".$id;
		return threadClass::findByQuery( $cons );
    }

    /**
	 * create()
	 * insert a new row into the database
    */

    
    public function create() {
		//Connection with the database
		$conn = new BDmyMusicalU();
		if (mysqli_connect_errno()) {
			printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
				exit();
		}

		//Preparing the sentence
		$stmt = $conn->stmt_init();
		//return "insert into ".threadClass::$tableName." (`reference`,`idDisease`,`name`,`description`,`effects`,`price`,`entryDate`) values (?, ?, ?, ?, ?, ?, ?)";
		if ($stmt->prepare("insert into ".threadClass::$tableName." (`id`,`id_user`,`title`,`entry_date`,`content`,`total_replies`,`id_subforum`) values (?,?,?,?,?,?,?)" )) {
			$stmt->bind_param("iisssii",  $this->getId(), $this->getIdUser(), $this->getTitle(),$this->getEntryDate(),$this->getContent(),$this->getTotalReplies(),$this->getIdSubforum());
			//executar consulta
			$stmt->execute();
			$this->setId($conn->insert_id);
			}
			
			if ( $conn != null ) $conn->close();
			return $this->getId();
	}

	/**
	 * delete()
	 * it deletes a row from the database
    */
    public function delete() {
		//Connection with the database
		$conn = new BDmyMusicalU();
		if (mysqli_connect_errno()) {
    		printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
    		exit();
		}
		
		//Preparing the sentence
		$stmt = $conn->stmt_init();
		if ($stmt->prepare("delete from `".threadClass::$tableName."` where ".threadClass::$colNameId." = ?")) {
			$stmt->bind_param("i", $this->getId());
			$stmt->execute();
		}
		if ( $conn != null ) $conn->close();
    }

}
?>