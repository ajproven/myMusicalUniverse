<?php
/*
* Connection with database
* author: Sales Fabregat, Alejandro
* version: 2015/03/15
*/
class BDmyMusicalU extends mysqli
{
	function __construct()
	{
		parent::__construct(
			"localhost",
			"root",
			"root",
			"mymusicaluniverse"
		);
	}
}
?>
