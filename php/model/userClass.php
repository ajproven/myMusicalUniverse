<?php
/** userClass.php
 * Entity userClass
 * autor  Roberto Plana
 * version 2012/09
 */
require_once "BDProject.php";
//id,username,password,name,surname1,surname2,type_user,email,address,bank_account,phone
class userClass {
    private $id;
    private $username;
    private $password;
    private $name;
    private $surname1;
    private $surname2;
    private $type_user;
    private $email;
    private $address;
    private $bank_account;
    private $phone;
    private $image;

    //----------Data base Values---------------------------------------
    private static $tableName = "users";
    private static $colNameId = "id";
    private static $colNameUserName = "username";
    private static $colNamePassword = "password";
    private static $colNameName = "name";
    private static $colNameSurname1 = "surname1";
    private static $colNameSurname2 = "surname2";
    private static $colNameTypeUser = "type_user";
    private static $colNameEmail = "email";
    private static $colNameAddress = "address";
    private static $colNameBankAccount = "bank_account";
    private static $colNamePhone = "phone";
    private static $colNameImage = "image";
           
    function __construct() {
    }

    public function getId() {
        return $this->id;
    }
    
    public function getUserName() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getName() {
        return $this->name;
    }
    
    public function getSurname1() {
        return $this->surname1;
    }

    public function getSurname2() {
        return $this->surname2;
    }
    
    public function getTypeUser() {
        return $this->type_user;
    }

    public function getEmail() {
        return $this->email;
    }
    
    public function getAddress() {
        return $this->address;
    }
    
    public function getBankAccount() {
        return $this->bank_account;
    }
    
    public function getPhone() {
        return $this->phone;
    }

    public function getImage() {
        return $this->image;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setUserName($username) {
        $this->username = $username;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function setName($name) {
        $this->name = $name;
    }    

	public function setSurname1($surname1) {
        $this->surname1 = $surname1;
    }

    public function setSurname2($surname2) {
        $this->surname2 = $surname2;
    }

    public function setTypeUser($type_user) {
        $this->type_user = $type_user;
    }
    
    public function setAddress($address) {
        $this->address = $address;
    }

    public function setEmail($email) {
        $this->email = $email;
    }
    
    public function setBankAccount($bank_account) {
        $this->bank_account = $bank_account;
    }

    public function setPhone($phone) {
        $this->phone = $phone;
    }

    public function setImage($image) {
        $this->image = $image;
    }
    
    public function getAll() {
		$data = array();
		$data["id"] = $this->id;
		$data["username"] = $this->username;
        $data["password"] = $this->password;
        $data["name"] = $this->name;
		$data["surname1"] = $this->surname1;
        $data["surname2"] = $this->surname2;
		$data["type_user"] = $this->type_user;
		$data["email"] = $this->email;		
		$data["address"] = $this->address;		
        $data["bank_account"] = $this->bank_account;
		$data["phone"] = $this->phone;
		$data["image"] = $this->image;

		return $data;
    }

    public function setAll($id,$username,$password,$name,$surname1,$surname2,$type_user,$email,$address,$bank_account,$phone,$image) {
		$this->setId($id);
		$this->setUserName($username);
        $this->setPassword($password);
        $this->setName($name);
		$this->setSurname1($surname1);
        $this->setSurname2($surname2);
		$this->setTypeUser($type_user);
        $this->setEmail($email);
        $this->setAddress($address);
        $this->setBankAccount($bank_account);
		$this->setPhone($phone);
		$this->setImage($image);
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
		$entity = userClass::fromResultSet( $row );
		
		$entityList[$i]= $entity;
		$i++;
	}
	return $entityList;
    }


        //id,username,password,name,surname1,surname2,type_user,email,address,bank_account,phone,image  
    /**
	* fromResultSet()
	* the query result is transformed into an object
	* @param res ResultSet del qual obtenir dades
	* @return object
    */
    private static function fromResultSet( $res ) {
	//We get all the values form the query
		$id = $res[ userClass::$colNameId];
        $username = $res[ userClass::$colNameUserName ];
        $password = $res[ userClass::$colNamePassword ];
        $name = $res[ userClass::$colNameName ];
        $surname1 = $res[ userClass::$colNameSurname1 ];
        $surname2 = $res[ userClass::$colNameSurname2 ];
        $type_user = $res[ userClass::$colNameTypeUser ];
        $email = $res[ userClass::$colNameEmail ];
        $address = $res[ userClass::$colNameAddress ];
        $bank_account = $res[ userClass::$colNameBankAccount ];
        $phone = $res[ userClass::$colNamePhone ];
        $image = $res[ userClass::$colNameImage ];

       	//Object construction
       	$entity = new userClass();
		$entity->setId($id);
		$entity->setUserName($username);
        $entity->setPassword($password);
        $entity->setName($name);
		$entity->setSurname1($surname1);
        $entity->setSurname2($surname2);
		$entity->setTypeUser($type_user);
		$entity->setEmail($email);
		$entity->setAddress($address);
        $entity->setBankAccount($bank_account);
		$entity->setPhone($phone);
		$entity->setImage($image);

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
	
	if ( $conn != null ) $conn->close();
	
	return userClass::fromResultSetList( $res );
    }

    /**
	 * findById()
	 * It runs a query and returns an object array
	 * @param id
	 * @return object with the query results
    */
    public static function findById( $id ) {
	$cons = "select * from `".userClass::$tableName."` where ".userClass::$colNameId." = \"".$id."\"";

	return userClass::findByQuery( $cons );
    }

    /**
     * findById()
     * It runs a query and returns an object array
     * @param id
     * @return object with the query results
    */
    public static function findNameById( $id ) {
    $cons = "select * from `".userClass::$tableName."` where ".userClass::$colNameId." =".$id;
    //echo $cons;
    return userClass::findByQuery( $cons );
    }

    /**
	 * findlikeName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findlikeName( $likeName ) {
		$cons = "select * from `".userClass::$tableName."` where ".userClass::$colNameName." like \"%".$likeName."%\"";
		return userClass::findByQuery( $cons );
    }


    
    /**
	* findByName()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByName( $name ) {
		$cons = "select * from `".userClass::$tableName."` where ".userClass::$colNameName." = \"".$name."\"";
		return userClass::findByQuery( $cons );
    }

    /**
	* findByNick()
	 * It runs a query and returns an object array
	 * @param name
	 * @return object with the query results
    */
    public static function findByNick( $nick ) {
		$cons = "select * from `".userClass::$tableName."` where ".userClass::$colNameNick." = \"".$nick."\"";
		return userClass::findByQuery( $cons );
    }
    
    /**
    * findByUsernameAndPass()
     * It runs a query and returns an object array
     * @param name
     * @return object with the query results
    */
    public static function findByUsernameAndPass( $username, $password ) {
        $cons = "select * from `".userClass::$tableName."` where ".userClass::$colNameUserName." = \"".$username."\" and ".userClass::$colNamePassword." = \"".$password."\"";
        return userClass::findByQuery( $cons );
    }

    public static function checkIfExistUserName( $userNick) {
        $cons = "select * from `".userClass::$tableName."` where ".userClass::$colNameUserName." = \"".$username."\"";

        return userClass::findByQuery( $cons );
    }
    
    /**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll( ) {
    	$cons = "select * from `".userClass::$tableName."`";
	return userClass::findByQuery( $cons );
    }


    /**
	 * create()
	 * insert a new row into the database
    */
    public function create() {
		//Connection with the database
		$conn = new BDcateringCompany();
		if (mysqli_connect_errno()) {
			printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
				exit();
		}

		//Preparing the sentence
		$stmt = $conn->stmt_init();
		if ($stmt->prepare("insert into ".userClass::$tableName." (`name`,`surname1`,`nick`,`password`,`address`,`telephone`,`mail`,`birthDate`,`entryDate`,`dropOutDate`,`active`,`image`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" )) {
			$stmt->bind_param("sssssissssis", $this->getName(), $this->getSurname1(), $this->getNick(), $this->getPassword(), $this->getAddress(), $this->getTelephone(), $this->getMail(), $this->getBirthDate(), $this->getEntryDate(), $this->getDropOutDate(), $this->getActive(), $this->getImage());
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
		$conn = new BDcateringCompany();
		if (mysqli_connect_errno()) {
    		printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
    		exit();
		}
		
		//Preparing the sentence
		$stmt = $conn->stmt_init();
		if ($stmt->prepare("delete from `".userClass::$tableName."` where ".userClass::$colNameId." = ?")) {
			$stmt->bind_param("i", $this->getId());
			$stmt->execute();
		}
		if ( $conn != null ) $conn->close();
    }


    /**
	 * update()
	 * it updates a row of the database
    */	
	 public function update() {
		//Connection with the database
		$conn = new BDcateringCompany();
		if (mysqli_connect_errno()) {
    		printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
    		exit();
		}
					    
		//Preparing the sentence
		$stmt = $conn->stmt_init();
		if ($stmt->prepare("update `".userClass::$tableName."` set ".userClass::$colNameId." = ?, ".userClass::$colNameName." = ?, ".userClass::$colNameSurname1." = ?, ".userClass::$colNameNick." = ?, ".userClass::$colNamePassword." = ?, ".userClass::$colNameAddress." = ?, ".userClass::$colNameTelephone." = ?, ".userClass::$colNameMail." = ?, ".userClass::$colNameBirthDate." = ?, ".userClass::$colNameEntryDate." = ?, ".userClass::$colNameDropOutDate." = ?, ".userClass::$colNameActive." = ?, ".userClass::$colNameImage." = ? where ".userClass::$colNameId." = '".$this->getId()."'") ) {
			$stmt->bind_param("isssssissssis", $this->getId(), $this->getName(), $this->getSurname1(), $this->getNick(), $this->getPassword(), $this->getAddress(), $this->getTelephone(), $this->getMail(), $this->getBirthDate(), $this->getEntryDate(), $this->getDropOutDate(), $this->getActive(), $this->getImage());
			
			$stmt->execute();
		}
		if ( $conn != null ) $conn->close();

    }
    public function toString() {
        $toString = "userClass[id=" . $this->id . "][name=" . $this->getName(). "][surname1=" . $this->getSurname1() . "][password=" . $this->password . "][email=" . $this->mail . "]";
		return $toString;

    }
}
?>
