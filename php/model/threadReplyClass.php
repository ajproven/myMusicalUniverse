<?php 

/** threadReplyClass.php
 * Entity threadReplyClass
 * autor  Pavon Muñoz, Jose Luis
 * version 2015/05/04
 */

require_once "BDProject.php";


class threadReplyClass {

	private $id;
    private $idUser;
    private $idThread;
    private $content;
    private $entryDate;
    private $numberReply;
    

    //----------Data base Values---------------------------------------
    private static $tableName = "thread_reply";
    private static $colNameId = "id";
    private static $colNameIdUser = "id_user";
    private static $colNameIdThread = "id_thread";
    private static $colNameContent = "content";
    private static $colNameEntryDate = "entry_date";
    private static $colNameNumberReply = "number_reply";

    function __construct() {
    }

    public function getId() {
        return $this->id;
    }
    
    public function getIdUser() {
        return $this->idUser;
    }
	public function getIdThread(){
		return $this->idThread;
	}
	public function getContent(){
		return $this->content;
	}
	public function getEntryDate(){
		return $this->entryDate;
	}
	public function getNumberReply(){
		return $this->numberReply;
	}
	
    

    public function setId($id) {
        $this->id = $id;
    }
    public function setIdUser($idUser) {
        $this->idUser = $idUser;
    }
    public function setIdThread($idThread){
    	$this->idThread=$idThread;
    }
    public function setContent($content){
    	$this->content=$content;
    }
    public function setEntryDate($entryDate){
    	$this->entryDate=$entryDate;
    }
    public function setNumberReply($numberReply){
    	$this->numberReply=$numberReply;
    }
    public function getAll() {
		$data = array();
		$data["id"] = $this->getId();	
		$data["idUser"] = $this->getIdUser();
		$data["idThread"] = $this->getIdThread();
		$data["entryDate"] = $this->getEntryDate();
		$data["content"] = $this->getContent();
		$data["numberReply"] = $this->getNumberReply();
		return $data;
    }

    public function setAll($id,$idUser,$idThread,$entryDate,$content,$numberReply) {
		$this->setId($id);
		$this->setIdUser($idUser);
		$this->setIdThread($idThread);
		$this->setEntryDate($entryDate);
		$this->setContent($content);
		$this->setNumberReply($numberReply);
		
    }

    //---Databese management section-----------------------
    /**
	 * fromResultSetList()
	 * this function runs a query and returns an array with all the result transformed into an object
	 * @param res query to execute
	 * @return objects collection
    */
    private static function fromResultSetList( $res ) {
		$entityList = array();
		$i=0;
		while ( ($row = $res->fetch_array(MYSQLI_BOTH)) != NULL ) {
			//We get all the values an add into the array
			$entity = threadReplyClass::fromResultSet( $row );
			
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
    private static function fromResultSet( $res ) {
	//We get all the values form the query
		$id = $res[ threadReplyClass::$colNameId];
		$idUser = $res[ threadReplyClass::$colNameIdUser ];
		$idThread = $res[ threadReplyClass::$colNameIdThread ];		
		$entryDate = $res[ threadReplyClass::$colNameEntryDate ];		
		$content = $res[ threadReplyClass::$colNameContent ];		
		$numberReply = $res[ threadReplyClass::$colNameNumberReply ];		
				
		
       	//Object construction
       	$entity = new threadReplyClass();
		$entity->setId($id);
		$entity->setIdUser($idUser);
		$entity->setIdThread($idThread);
		$entity->setEntryDate($entryDate);
		$entity->setContent($content);
		$entity->setNumberReply($numberReply);
		
		return $entity;
    }

    /**
	 * findByQuery()
	 * It runs a particular query and returns the result
	 * @param cons query to run
	 * @return objects collection
    */
    public static function findByQuery( $cons ) {
	//Connection with the database
		$conn = new BDProject();
		if (mysqli_connect_errno()) {
    		printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
    		exit();
		}
	
		//Run the query
		$res = $conn->query($cons);

		return threadReplyClass::fromResultSetList( $res );
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll( ) {
    	$cons = "select * from `".threadReplyClass::$tableName."`";
		return threadReplyClass::findByQuery( $cons );
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findById($idThread) {
    	

    	$cons = "select * from `".threadReplyClass::$tableName."` where ".threadReplyClass::$colNameIdThread." = '".$idThread."'";

		return threadReplyClass::findByQuery( $cons );
    }

    /**
	 * create()
	 * insert a new row into the database
    */

    
    public function create() {
		//Connection with the database
		$conn = new BDProject();
		if (mysqli_connect_errno()) {
			printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
				exit();
		}

		//Preparing the sentence
		$stmt = $conn->stmt_init();
		//return "insert into ".threadReplyClass::$tableName." (`reference`,`idDisease`,`name`,`description`,`effects`,`price`,`entryDate`) values (?, ?, ?, ?, ?, ?, ?)";
		if ($stmt->prepare("insert into ".threadReplyClass::$tableName." (`id`,`id_user`,`id_thread`,`entry_date`,`content`,`number_reply`) values (?, ?, ?,?,?,?)" )) {
			$stmt->bind_param("iiisss",  $this->getId(), $this->getIdUser(),$this->getIdThread(),$this->getEntryDate(), $this->getContent(),$this->getNumberReply());
			//executar consulta
			$stmt->execute();
			}
			
			if ( $conn != null ) $conn->close();
	}

}
?>