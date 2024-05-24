<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();
	
	if(isset($_REQUEST["classe"]))
	{
		$classe = $connection->real_escape_string($_REQUEST["classe"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante classe.");
	}
	
	$sql = "select data, materia, argomento from argomenti where classe = '$classe'";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>