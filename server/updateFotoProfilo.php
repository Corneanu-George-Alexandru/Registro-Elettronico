<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();

	if(isset($_REQUEST["file"]))
	{
		$file = $connection->real_escape_string($_REQUEST["file"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante file.");
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
	
	$sql = "update studenti set immagine = '$file' where matricola = $matricola";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>