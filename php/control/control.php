<?php
	session_start();

	require_once "controlClass.php";	/* control class */

	$controller = new controlClass( $_REQUEST );
	$controller->actionToDO();
?>
