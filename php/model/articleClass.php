<?php
/** articleClass.php
 * Entity articleClass
 * version 2015-05-08
 */
require_once "BDmyMusicalU.php";
 //id,idUser, title, entry_date, content, theme, image
class articleClass {
    private $id;
    private $idUser;
    private $title;
    private $entry_date;
    private $content;
    private $theme;
    private $image;

    //----------Data base Values---------------------------------------
    private static $tableName = "article";
    private static $colNameId = "id";
    private static $colNameIdUser = "id_user";
    private static $colNameTitle = "title";
    private static $colNameEntryDate = "entry_date";
    private static $colNameContent = "content";
    private static $colNameTheme = "theme";
    private static $colNameImage = "image";

           
    function __construct() {
    }

    public function getId() {
        return $this->id;
    }
    
    public function getIdUser() {
        return $this->idUser;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getEntryDate() {
        return $this->entry_date;
    }
    
    public function getContent() {
        return $this->content;
    }

    public function getTheme() {
        return $this->theme;
    }

    public function getImage() {
        return $this->image;
    }
    
    public function setId($id) {
        $this->id = $id;
    }

    public function setIdUser($idUser) {
        $this->idUser = $idUser;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function setEntryDate($entry_date) {
        $this->entry_date = $entry_date;
    }    

    public function setContent($content) {
        $this->content = $content;
    }

    public function setTheme($theme) {
        $this->theme = $theme;
    }

    public function setImage($image) {
        $this->image = $image;
    }
  
    public function getAll() {
        $data = array();
        $data["id"] = $this->getId();
        $data["idUser"] = $this->getIdUser();
        $data["title"] = utf8_encode($this->getTitle());
        $data["entry_date"] = utf8_encode($this->getEntryDate());
        $data["content"] = utf8_encode($this->getContent());
        $data["theme"] = utf8_encode($this->getTheme());
        $data["image"] = $this->getImage();

        return $data;
    }

    public function setAll($id, $idUser, $title, $entry_date, $content, $theme, $image) {
        $this->setId($id);
        $this->setIdUser($idUser);
        $this->setTitle($title);
        $this->setEntryDate($entry_date);
        $this->setContent($content);
        $this->setTheme($theme);
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
        $entity = articleClass::fromResultSet( $row );
        
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
        $id = $res[ articleClass::$colNameId];                    //TODO......
        $idUser = $res[ articleClass::$colNameIdUser ];
        $title = $res[ articleClass::$colNameTitle ];
        $entry_date = $res[ articleClass::$colNameEntryDate ];
        $content = $res[ articleClass::$colNameContent ];
        $theme = $res[ articleClass::$colNameTheme ];
        $image = $res[ articleClass::$colNameImage ];


        //Object construction
        $entity = new articleClass();
        $entity->setId($id);
        $entity->setIdUser($idUser);
        $entity->setTitle($title);
        $entity->setEntryDate($entry_date);
        $entity->setContent($content);
        $entity->setTheme($theme);
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
    $conn = new BDmyMusicalU();
    if (mysqli_connect_errno()) {
            printf("Connection with the database has failed, error: %s\n", mysqli_connect_error());
            exit();
    }
    
    //Run the query
    $res = $conn->query($cons);

    
    if ( $conn != null ) $conn->close();
    
    return articleClass::fromResultSetList( $res );
    }

    /**
     * findById()
     * It runs a query and returns an object array
     * @param id
     * @return object with the query results
    */
    public static function findById( $id ) {
    $cons = "select * from `".articleClass::$tableName."` where ".articleClass::$colNameId." = \"".$id."\"";

    return articleClass::findByQuery( $cons );
    }

    /**
     * findlikeName()
     * It runs a query and returns an object array
     * @param name
     * @return object with the query results
    */
    public static function findlikeIdUser( $idUser ) {
        $cons = "select * from `".articleClass::$tableName."` where ".articleClass::$colNameIdUser." = \"".$idUser."\"";
        return articleClass::findByQuery( $cons );
    }


    
    /**
    * findByName()
     * It runs a query and returns an object array
     * @param name
     * @return object with the query results
    */
    public static function findByTitle( $title ) {
        $cons = "select * from `".articleClass::$tableName."` where ".articleClass::$colNameTitle." = \"".$title."\"";
        return articleClass::findByQuery( $cons );
    }

    
    /**
     * findAll()
     * It runs a query and returns an object array
     * @param none
     * @return object with the query results
    */
    public static function findAll( ) {
        $cons = "select * from `".articleClass::$tableName."`";
    return articleClass::findByQuery( $cons );
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
        //id,username,password,name,surname1,surname2,type_user,email,address,bank_account,phone
        //Preparing the sentence
        $stmt = $conn->stmt_init();
        if ($stmt->prepare("insert into ".articleClass::$tableName." (`id`,`idUser`,`title`,`entry_date`,`content`,`theme`,`image`) values (?, ?, ?, ?, ?, ?, ?)" )) {
            $stmt->bind_param("iisssss", $this->getId(), $this->getIsUser(), $this->getTitle(), $this->getEntryDate(), $this->getContent(), $this->getTheme(), $this->getImage());
            //executar consulta
            $stmt->execute();
            
            $this->setId($conn->insert_id);
        }
        
        if ( $conn != null ) $conn->close();
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
        if ($stmt->prepare("delete from `".articleClass::$tableName."` where ".articleClass::$colNameId." = ?")) {
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
        if ($stmt->prepare("update `".articleClass::$tableName."` set ".articleClass::$colNameId." = ?, ".articleClass::$colNameIdUser." = ?, ".articleClass::$colNameTitle." = ?, ".articleClass::$colNameEntryDate." = ?, ".articleClass::$colNameContent." = ?, ".articleClass::$colNameTheme." = ?, ".articleClass::$colNameImage." = ?") ) {
            $stmt->bind_param("iisssss", $this->getId(), $this->getIdUser(), $this->getTitle(), $this->getEntryDate(), $this->getContent(), $this->getTheme(), $this->getImage());
            
            $stmt->execute();
        }
        if ( $conn != null ) $conn->close();

    }
    public function toString() {
        $toString = "articleClass[id=" . $this->getId() . "][idUser=" . $this->getIdUser(). "][title=" . $this->getTitle() . "][entry_date=" . $this->getEntry_date() . "][content=" . $this->getMail() . "][theme=" . $this->getTheme() . "][image=" . $this->getImage() . "]";
        return $toString;

    }
}
?>
