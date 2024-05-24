<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();

	if(isset($_REQUEST["idVoto"]))
	{
		$idVoto = $_REQUEST["idVoto"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante idVoto.");
	}
	if(isset($_REQUEST["voto"]))
	{
		$voto = $_REQUEST["voto"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante voto.");
	}
	
	$sql = "update voti set voto = $voto where id = $idVoto";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>