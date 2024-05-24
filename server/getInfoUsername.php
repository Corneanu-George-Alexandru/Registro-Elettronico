<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();
	
	if(isset($_REQUEST["username"]))
	{
		$username = $connection->real_escape_string($_REQUEST["username"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante username.");
	}
	
	$sql = "select matricola from studenti where user = '$username'";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>