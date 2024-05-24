<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();

	if(isset($_REQUEST["idAssenza"]))
	{
		$idAssenza = $_REQUEST["idAssenza"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante idAssenza.");
	}
	
	$sql = "update assenze set giustificato = 1 where id = $idAssenza";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>