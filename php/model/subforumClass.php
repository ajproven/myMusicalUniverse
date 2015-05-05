<?php 

/** subforumClass.php
 * Entity subforumClass
 * autor  Pavon Muñoz, Jose Luis
 * version 2015/05/04
 */

require_once "BDProject.php";


class subforumClass {

private $id;
    private $name;
    private $description;
    

    //----------Data base Values---------------------------------------
    private static $tableName = "subforums";
    private static $colNameId = "id";
    private static $colNameName = "name";
    private static $colNameDescription = "description";

    function __construct() {
    }

    public function getId() {
        return $this->id;
    }
    
    
    public function getName() {
        return $this->name;
    }
	
    public function getDescription() {
        return $this->description;
    }

    public function setId($id) {
        $this->id = $id;
    }
    
    
    public function setName($name) {
        $this->name = $name;
    }
	
    public function setDescription($description) {
        $this->description = $description;
    }
    public function getAll() {
		$data = array();
		$data["id"] = $this->getId();	
		$data["name"] = $this->getName();
		$data["description"] = $this->getDescription();
		return $data;
    }

    public function setAll($id,$name,$description) {
		$this->setId($id);
		$this->setName($name);
		$this->setDescription($description);
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
			$entity = subforumClass::fromResultSet( $row );
			
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
		$id = $res[ subforumClass::$colNameId];
		$name = $res[ subforumClass::$colNameName ];
		$description = $res[ subforumClass::$colNameDescription ];		
		
       	//Object construction
       	$entity = new subforumClass();
		$entity->setId($id);
		$entity->setName($name);
		$entity->setDescription($description);
		
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

		return subforumClass::fromResultSetList( $res );
    }

    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll( ) {
    	$cons = "select * from `".subforumClass::$tableName."`";
		return subforumClass::findByQuery( $cons );
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
		//return "insert into ".subforumClass::$tableName." (`reference`,`idDisease`,`name`,`description`,`effects`,`price`,`entryDate`) values (?, ?, ?, ?, ?, ?, ?)";
		if ($stmt->prepare("insert into ".subforumClass::$tableName." (`id`,`name`,`description`) values (?, ?, ?)" )) {
			$stmt->bind_param("iss",  $this->getId(), $this->getName(), $this->getDescription());
			//executar consulta
			$stmt->execute();
			}
			
			if ( $conn != null ) $conn->close();
	}

}
?>