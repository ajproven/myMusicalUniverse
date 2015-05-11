<?php
/**
 * Classe FaCtrlClass
 * encapsula el control de l'aplicació de gestió de faltes d'assistència de l'alumnat
*/
require_once "toDoClass.php";
class controlClass {
    private $params;	// parametres de l'aplicacio: creats a partir dels formularis de la vista

	/**
	 * __construct()
	 * constructor de la classe
	 * parametre prmts: parametres a copiar a les propietats, provenen dels formularis de la vista
	 * author Robert Plana
	 * version 2012/09/18
	*/
	function __construct( $prmts )
	{
		$this->params = array();
		foreach ( $prmts as $n => $v)
		{
			$this->params[$n] = $v;
		}
	}

	/**
	 * doAccio()
	 * executa l'acció demanada des del formulari client (vista de l'aplicació)
	 * escriu el resultat del servei sol·licitat
	 * author Robert Plana
	 * version 2012/09/18
	*/
	public function actionToDO()
	{
		if ( isset($this->params['action']) )
        {
           switch ( $this->params['action'] )
           {
                    
					case '1':
						echo toDoClass::login($this->params['action'], $this->params['username'],$this->params['password']);
						break;
					case '2':
						echo toDoClass::getAllSubforums($this->params['action']);
						break;
					case '3':
						echo toDoClass::getThreadsBySubforum($this->params['action'],$this->params['idSubforum']);
						break;
					case '4':
						echo toDoClass::getThreadContent($this->params['action'], $this->params['idThread']);
						break;
					case '5':
						echo toDoClass::addNewThread($this->params['action'], $this->params['threadObject']);
						break;
					case '6':
						echo toDoClass::deleteThread($this->params['action'], $this->params['idThread']);
						break;
					case '10000':
						echo toDoClass::checkIfExistUserName($this->params['action'], $this->params['userName']);
						break;
                    case '10005':
                    	echo toDoClass::signUpUserData($this->params['action'], $this->params['userObject']);
                    	break; //NEW SIGN UP METHOD
                    case '10010':
						echo toDoClass::searchArticles($this->params['action']);
						break;
					case '10060':
						echo toDoClass::userConnection($this->params['action'], $this->params['JSONData']);
						break;
					case '10090':
						echo toDoClass::checkIfExistNickname($this->params['action'], $this->params['userNick']);
						break;
					default:
						echo "Action not correct, value: ".$this->params['action'];
						break;
		    }
		}
	}
	/**
	 * test()
	 * retorna les propietats de la classe (només per a test -> esborrar )
	 * author Jose Moreno
	 * version 2009/11/18
	*/
	private function test()
	{
		$r = "Variables enviades";
		foreach ($this->params as $n=>$v)
		{
			$r .= "<br />".$n."=".$v;
		}
		return $r;
	}
}
?>
