<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();

	if(isset($_REQUEST["pass"]))
	{
		$pass = $_REQUEST["pass"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante pass.");
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
	
	$passMd5 = md5($pass);
	$sql = "update studenti set pass = '$passMd5' where matricola = $matricola";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>