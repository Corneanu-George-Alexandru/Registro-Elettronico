<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();
	
	if(isset($_REQUEST["id"]))
	{
		$id = $_REQUEST["id"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante id.");
	}
	
	$sql = "select materie from classi where id = $id";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>