<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();

	if(isset($_REQUEST["residenza"]))
	{
		$residenza = $connection->real_escape_string($_REQUEST["residenza"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante residenza.");
	}
	if(isset($_REQUEST["indirizzo"]))
	{
		$indirizzo = $connection->real_escape_string($_REQUEST["indirizzo"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante indirizzo.");
	}
	if(isset($_REQUEST["matricola"]))
	{
		$matricola = $_REQUEST["matricola"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante matricola.");
	}
	
	$sql = "update studenti set residenza = '$residenza', indrizzo = '$indirizzo' where matricola = $matricola";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>