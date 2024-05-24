<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();
	
	if(isset($_REQUEST["materia"]))
	{
		$materia = $_REQUEST["materia"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante materia.");
	}
	
	$sql = "select id, materia from materie where id = $materia";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>