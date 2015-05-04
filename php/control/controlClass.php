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
                    
					case '10030':
						echo toDoClass::searchMedicinesByIdDisease($this->params['action'], $this->params['idDisease']);
						break;
					case '10031':
						echo toDoClass::searchDiseases($this->params['action'], $this->params['idDisease']);
						break;
					case '10040':
						echo toDoClass::modifyMedicines($this->params['action'], $this->params['JSONmedicinesArray']);
						break;
					case '10060':
						echo toDoClass::insertMedicine($this->params['action'], $this->params['JSONData']);
						break;
					case '10070':
						echo toDoClass::userConnection($this->params['action'], $this->params['JSONData']);
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
